import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MessageCircleQuestion, CheckCircle2, Clock, Sparkles, 
  Search, Plus, ThumbsUp, X, HelpCircle 
} from 'lucide-react';
import { getStoredCourses, getStoredDoubts, saveStoredDoubts, tutors } from '../data';
import { useAuth } from '../context/AuthContext';
import AiTutorModal from '../components/AiTutorModal';

const SAMPLE_AI_PRESETS = {
  'Calculus Limits': `Step-by-Step Resolution:
1. Recall the fundamental limit identity: lim(u -> 0) [sin(u) / u] = 1.
2. Multiply numerator and denominator by 3:
   (sin 3x) / (5x) = (3/5) * [sin(3x) / (3x)]
3. Evaluate the limit:
   (3/5) * 1 = 3/5 = 0.6.

Key Takeaway: Matching the trigonometric argument allows direct algebraic simplification without needing L'Hopital's rule.`,
  'Physics & Forces': `Conceptual Resolution:
1. Draw a Free Body Diagram (FBD) of all acting forces.
2. Apply Newton's Second Law along the x and y axes: ΣFx = m*ax, ΣFy = m*ay.
3. Solve the system of linear equations simultaneously for acceleration.`,
  'Data Structures': `Algorithmic Resolution:
- list.append(x) is O(1) amortized because Python pre-allocates contiguous memory arrays.
- list.insert(0, x) is O(n) linear time because all n existing elements must shift right in memory!
Recommendation: Use collections.deque for O(1) double-ended queue operations.`
};

const DoubtScreen = () => {
  const [searchParams] = useSearchParams();
  const initialCourseId = searchParams.get('courseId');

  const { user } = useAuth();
  const isTeacherOrAdmin = user && (user.role === 'teacher' || user.isTeacher || user.isAdmin || user.name === 'Dr. Sarah Jenkins');

  const [allCourses] = useState(() => getStoredCourses());
  const [doubts, setDoubts] = useState(() => getStoredDoubts());
  const [selectedCourseFilter, setSelectedCourseFilter] = useState(initialCourseId ? String(initialCourseId) : 'All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Pending' | 'Resolved'
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Solving states
  const [showAskModal, setShowAskModal] = useState(false);
  const [solvingDoubtId, setSolvingDoubtId] = useState(null);
  const [solutionDraft, setSolutionDraft] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [upvotes, setUpvotes] = useState({});

  // New doubt form state
  const [newDoubt, setNewDoubt] = useState({
    courseId: initialCourseId ? Number(initialCourseId) : 1,
    topic: '',
    question: ''
  });

  // Update filter if URL changes
  useEffect(() => {
    if (initialCourseId) {
      setSelectedCourseFilter(String(initialCourseId));
      setNewDoubt(prev => ({ ...prev, courseId: Number(initialCourseId) }));
    }
  }, [initialCourseId]);

  const activeCourseObj = allCourses.find(c => String(c.id) === String(selectedCourseFilter));

  // Filtered list
  const filteredDoubts = doubts.filter((d) => {
    const matchesCourse = selectedCourseFilter === 'All' || String(d.courseId) === String(selectedCourseFilter);
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    const matchesSearch = 
      d.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCourse && matchesStatus && matchesSearch;
  });

  const handleAskDoubtSubmit = (e) => {
    e.preventDefault();
    const pickedCourse = allCourses.find(c => String(c.id) === String(newDoubt.courseId)) || allCourses[0];
    const pickedTeacher = pickedCourse.instructor || tutors[0];

    const created = {
      id: `DBT-${Math.floor(500 + Math.random() * 500)}`,
      studentName: user?.name || 'Jessica Taylor',
      studentEmail: user?.email || 'student@example.com',
      courseId: pickedCourse.id,
      courseTitle: pickedCourse.title,
      instructorId: pickedTeacher.id,
      instructorName: pickedTeacher.name,
      question: newDoubt.question,
      topic: newDoubt.topic || 'Course Query',
      status: 'Pending',
      date: new Date().toISOString(),
      solution: null
    };

    const updated = [created, ...doubts];
    setDoubts(updated);
    saveStoredDoubts(updated);
    setShowAskModal(false);
    setNewDoubt({ courseId: 1, topic: '', question: '' });
  };

  const handleOpenSolver = (doubt) => {
    setSolvingDoubtId(doubt.id);
    setSolutionDraft(doubt.solution || '');
  };

  const handleGenerateAiDraft = (doubt) => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      const preset = SAMPLE_AI_PRESETS[doubt.topic] || 
        `Hello ${doubt.studentName}! Here is the conceptual resolution:

1. Identify governing formulas and given conditions for this problem.
2. Substitute parameters algebraically and evaluate intermediate quantities.
3. Verify units and boundary states.

Feel free to ask a follow-up during our next live batch session!`;
      setSolutionDraft(preset);
    }, 700);
  };

  const handleSaveSolution = (doubtId) => {
    if (!solutionDraft.trim()) return;

    const currentTeacher = isTeacherOrAdmin 
      ? (user?.name || 'Dr. Sarah Jenkins') 
      : 'Dr. Sarah Jenkins';

    const updated = doubts.map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          status: 'Resolved',
          solution: solutionDraft.trim(),
          instructorName: currentTeacher,
          resolvedAt: new Date().toISOString()
        };
      }
      return d;
    });

    setDoubts(updated);
    saveStoredDoubts(updated);
    setSolvingDoubtId(null);
    setSolutionDraft('');
  };

  const handleUpvote = (id) => {
    setUpvotes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-white/20 text-blue-100 font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-yellow-300" />
                Course Q&A & Doubt Solving Hub
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {activeCourseObj ? activeCourseObj.title : 'All Course Questions & Solutions'}
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Ask doubts directly to course faculty, view step-by-step verified explanations, and get 24/7 instant AI study assistance.
            </p>

            {activeCourseObj && activeCourseObj.instructor && (
              <div className="mt-4 flex items-center gap-3 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 w-fit">
                <img
                  src={activeCourseObj.instructor.image}
                  alt={activeCourseObj.instructor.name}
                  className="w-8 h-8 rounded-xl object-cover"
                />
                <div className="text-xs">
                  <span className="font-bold text-white">{activeCourseObj.instructor.name}</span>
                  <span className="text-purple-200 block text-[10px]">{activeCourseObj.instructor.credentials}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={() => setShowAskModal(true)}
              className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg hover:bg-blue-50 transition-all shadow-blue-950/20"
            >
              <Plus className="w-4 h-4 text-blue-700" />
              Ask a Doubt in this Course
            </button>

            <button
              onClick={() => setIsAiModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-purple-400/40 shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              Instant AI Tutor
            </button>
          </div>
        </div>

        {/* Course Filter Tabs */}
        <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 mb-8 pb-px">
          <button
            onClick={() => {
              setSelectedCourseFilter('All');
              setSearchParams({});
            }}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
              selectedCourseFilter === 'All'
                ? 'border-blue-600 text-blue-700 bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
            }`}
          >
            All Courses ({doubts.length})
          </button>

          {allCourses.map((c) => {
            const count = doubts.filter(d => d.courseId === c.id).length;
            const isSelected = selectedCourseFilter === String(c.id);

            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCourseFilter(String(c.id));
                  setSearchParams({ courseId: String(c.id) });
                }}
                className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                  isSelected
                    ? 'border-blue-600 text-blue-700 bg-white shadow-sm'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
                }`}
              >
                <span>{c.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Status Filters */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search previous questions, topics, or formulas..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Status:</span>
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setStatusFilter('All')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('Pending')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'Pending' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Pending Review
              </button>
              <button
                onClick={() => setStatusFilter('Resolved')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'Resolved' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Resolved
              </button>
            </div>
          </div>
        </div>

        {/* Doubts List */}
        <div className="space-y-6">
          {filteredDoubts.length > 0 ? (
            filteredDoubts.map((doubt) => {
              const courseOfDoubt = allCourses.find(c => c.id === doubt.courseId) || allCourses[0];
              const isSolvingThis = solvingDoubtId === doubt.id;
              const helpfulVotes = (upvotes[doubt.id] || 0) + (doubt.status === 'Resolved' ? 8 : 1);

              return (
                <div 
                  key={doubt.id} 
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-5"
                >
                  {/* Doubt Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm shrink-0">
                        {doubt.studentName ? doubt.studentName[0] : 'S'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm sm:text-base text-slate-900">{doubt.studentName}</h3>
                          <span className="text-[11px] text-slate-400 font-mono">#{doubt.id}</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {doubt.courseTitle} • Topic: <strong className="text-purple-700">{doubt.topic}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                        doubt.status === 'Resolved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {doubt.status === 'Resolved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {doubt.status === 'Resolved' ? 'Verified Teacher Answer' : 'Pending Teacher Solution'}
                      </span>
                    </div>
                  </div>

                  {/* Question Body */}
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    "{doubt.question}"
                  </div>

                  {/* Resolved Solution Box */}
                  {doubt.status === 'Resolved' && doubt.solution && (
                    <div className="p-5 bg-gradient-to-r from-purple-50/70 to-indigo-50/50 border border-purple-200/70 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={courseOfDoubt.instructor?.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"}
                            alt="Instructor"
                            className="w-7 h-7 rounded-full object-cover border border-purple-300"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-900">{doubt.instructorName || courseOfDoubt.instructor?.name}</span>
                            <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-1.5 py-0.5 rounded ml-2">
                              Verified Faculty
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400">Step-by-step explanation</span>
                      </div>

                      <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans bg-white/70 p-4 rounded-xl border border-purple-100">
                        {doubt.solution}
                      </div>
                    </div>
                  )}

                  {/* Inline Teacher Solving Form */}
                  {isSolvingThis && (
                    <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-300 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                          Faculty Resolution Workspace
                        </span>
                        <button
                          type="button"
                          onClick={() => handleGenerateAiDraft(doubt)}
                          disabled={isGeneratingAi}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-white hover:bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-300 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          {isGeneratingAi ? 'Drafting with AI...' : '✨ Suggest AI Draft Solution'}
                        </button>
                      </div>

                      <textarea
                        rows="6"
                        value={solutionDraft}
                        onChange={(e) => setSolutionDraft(e.target.value)}
                        placeholder="Type step-by-step explanation or derivation..."
                        className="w-full p-4 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-purple-600 outline-none leading-relaxed"
                      ></textarea>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSolvingDoubtId(null)}
                          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveSolution(doubt.id)}
                          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                        >
                          Post Solution to Student
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Card Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleUpvote(doubt.id)}
                      className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-semibold px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-blue-500" />
                      Helpful ({helpfulVotes})
                    </button>

                    <div className="flex items-center gap-2">
                      {/* Teacher inline solve trigger */}
                      {doubt.status === 'Pending' && !isSolvingThis && (
                        <button
                          onClick={() => handleOpenSolver(doubt)}
                          className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-1.5 rounded-xl transition-colors shadow-sm"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Solve This Doubt
                        </button>
                      )}

                      {doubt.status === 'Pending' && !isSolvingThis && !isTeacherOrAdmin && (
                        <button
                          onClick={() => setIsAiModalOpen(true)}
                          className="inline-flex items-center gap-1.5 text-purple-700 hover:bg-purple-50 font-bold px-3 py-1 rounded-xl border border-purple-200 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Ask AI Tutor Instead
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/80">
              <MessageCircleQuestion className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-slate-800 mb-1">No questions found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                Be the first to ask a question for this course! The assigned instructor will answer with step-by-step explanations.
              </p>
              <button
                onClick={() => setShowAskModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors"
              >
                + Ask the First Doubt
              </button>
            </div>
          )}
        </div>

      </div>

      {/* MODAL: SUBMIT NEW DOUBT */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-slate-100 relative">
            <button
              onClick={() => setShowAskModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-1">Ask a Course Question</h2>
            <p className="text-xs text-slate-500 mb-6">
              Your inquiry will be assigned to the course instructor.
            </p>

            <form onSubmit={handleAskDoubtSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Program *</label>
                <select
                  value={newDoubt.courseId}
                  onChange={(e) => setNewDoubt({ ...newDoubt, courseId: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  {allCourses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title} (Faculty: {c.instructor?.name})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Topic / Chapter *</label>
                <input
                  type="text"
                  required
                  value={newDoubt.topic}
                  onChange={(e) => setNewDoubt({ ...newDoubt, topic: e.target.value })}
                  placeholder="e.g. Limits with Trigonometry"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Detailed Question *</label>
                <textarea
                  rows="4"
                  required
                  value={newDoubt.question}
                  onChange={(e) => setNewDoubt({ ...newDoubt, question: e.target.value })}
                  placeholder="Paste problem text or explain where you are stuck..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none resize-none leading-relaxed"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30"
                >
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      <AiTutorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialRole={isTeacherOrAdmin ? 'teacher' : 'student'}
      />

    </div>
  );
};

export default DoubtScreen;
