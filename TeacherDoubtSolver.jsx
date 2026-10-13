import React, { useState } from 'react';
import { Sparkles, Send, ArrowLeft, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStoredDoubts, saveStoredDoubts, tutors } from '../data';
import { useAuth } from '../context/AuthContext';

const AI_DRAFT_RESPONSES = {
  'Calculus Limits': `Great question! Here is the clean derivation without L'Hopital's Rule:

1. Use the identity: lim(u -> 0) [sin(u) / u] = 1.
2. Multiply numerator and denominator by 3:
   (sin 3x) / (5x) = (3/5) * [sin(3x) / (3x)]
3. Take limit as x -> 0:
   (3/5) * 1 = 3/5 = 0.6.

Let me know in our next live batch if you'd like another practice drill!`,
  'Data Structures & Big-O': `Excellent inquiry!
- list.append(item) is amortized O(1) constant time because Python over-allocates internal memory buffers at the tail.
- list.insert(0, item) is strictly O(n) linear time because every single element in memory must be shifted right by 1 index to free up index 0!

If you need frequent front-insertions, always use collections.deque which is O(1) on both ends.`
};

const TeacherDoubtSolver = () => {
  const { user } = useAuth();
  const currentTeacher = tutors.find(t => t.name === user?.name) || tutors[0];

  const [doubts, setDoubts] = useState(() => getStoredDoubts());
  const [selectedDoubtId, setSelectedDoubtId] = useState(() => {
    const list = getStoredDoubts();
    return list.length > 0 ? list[0].id : null;
  });
  const [filterStatus, setFilterStatus] = useState('All'); // 'All' | 'Pending' | 'Resolved'
  const [solutionDraft, setSolutionDraft] = useState(() => {
    const list = getStoredDoubts();
    return list.length > 0 ? (list[0].solution || '') : '';
  });
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const selectedDoubt = doubts.find(d => d.id === selectedDoubtId) || doubts[0];

  const handleSelectDoubt = (doubt) => {
    setSelectedDoubtId(doubt.id);
    setSolutionDraft(doubt.solution || '');
  };

  const handleGenerateAiDraft = () => {
    if (!selectedDoubt) return;
    setIsGeneratingAi(true);

    setTimeout(() => {
      setIsGeneratingAi(false);
      const matchedDraft = AI_DRAFT_RESPONSES[selectedDoubt.topic] || 
        `Hello ${selectedDoubt.studentName}! Here is the conceptual breakdown to solve your query:

1. First, identify the core formula and boundary conditions.
2. Substitute the given values and simplify algebraically.
3. Check units and verify against the standard identity.

Feel free to ask a follow-up if any intermediate step requires further explanation!`;

      setSolutionDraft(matchedDraft);
    }, 700);
  };

  const handleSaveResolution = (e) => {
    e.preventDefault();
    if (!solutionDraft.trim() || !selectedDoubt) return;

    const updated = doubts.map(d => {
      if (d.id === selectedDoubt.id) {
        return {
          ...d,
          status: 'Resolved',
          solution: solutionDraft.trim(),
          resolvedAt: new Date().toISOString()
        };
      }
      return d;
    });

    setDoubts(updated);
    saveStoredDoubts(updated);
    alert(`Resolution sent to ${selectedDoubt.studentName}! Status marked as Resolved.`);
  };

  const filteredDoubts = doubts.filter(d => {
    if (filterStatus === 'All') return true;
    return d.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/teacher"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Back to Teacher Console"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">1-on-1 Doubt Solving Workspace</h1>
                <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2.5 py-0.5 rounded-full">
                  Instructor Screen
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Answer student queries with step-by-step explanations and AI-assisted drafting.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Logged in as:</span>
            <div className="flex items-center gap-2 bg-purple-50 text-purple-800 px-3 py-1.5 rounded-xl text-xs font-bold border border-purple-200">
              <img src={currentTeacher.image} alt="Teacher" className="w-5 h-5 rounded-full object-cover" />
              <span>{currentTeacher.name}</span>
            </div>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Doubt Inbox Queue (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student Doubt Queue</span>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setFilterStatus('All')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    filterStatus === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  All ({doubts.length})
                </button>
                <button
                  onClick={() => setFilterStatus('Pending')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    filterStatus === 'Pending' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Pending ({doubts.filter(d => d.status === 'Pending').length})
                </button>
                <button
                  onClick={() => setFilterStatus('Resolved')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    filterStatus === 'Resolved' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Resolved ({doubts.filter(d => d.status === 'Resolved').length})
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredDoubts.map((doubt) => {
                const isSelected = selectedDoubt?.id === doubt.id;
                return (
                  <div
                    key={doubt.id}
                    onClick={() => handleSelectDoubt(doubt)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-50/60 border-purple-400 shadow-md ring-1 ring-purple-400'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50/80 shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-slate-900">{doubt.studentName}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        doubt.status === 'Resolved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {doubt.status === 'Resolved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {doubt.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-purple-700 mb-1">{doubt.courseTitle}</p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">"{doubt.question}"</p>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
                      <span>Topic: {doubt.topic}</span>
                      <span>{new Date(doubt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Resolution Canvas & Workspace (7 cols) */}
          <div className="lg:col-span-7">
            {selectedDoubt ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                {/* Doubt Card Header */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">#{selectedDoubt.id}</span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        Question from {selectedDoubt.studentName}
                      </h3>
                      <p className="text-xs text-slate-500">{selectedDoubt.studentEmail} • {selectedDoubt.courseTitle}</p>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      selectedDoubt.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {selectedDoubt.status}
                    </span>
                  </div>

                  <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    "{selectedDoubt.question}"
                  </div>
                </div>

                {/* Resolution Form / Workspace */}
                <form onSubmit={handleSaveResolution} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Teacher Resolution & Step-by-Step Explanation
                    </label>

                    {/* AI Drafting Tool */}
                    <button
                      type="button"
                      onClick={handleGenerateAiDraft}
                      disabled={isGeneratingAi}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-200 transition-colors disabled:opacity-50"
                      title="Use AI to generate an initial draft explanation"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      {isGeneratingAi ? 'Drafting with AI...' : '✨ Suggest AI Draft'}
                    </button>
                  </div>

                  <textarea
                    rows="8"
                    required
                    value={solutionDraft}
                    onChange={(e) => setSolutionDraft(e.target.value)}
                    placeholder="Type step-by-step mathematical or code explanation to guide the student..."
                    className="w-full p-4 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none leading-relaxed font-sans"
                  ></textarea>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[11px] text-slate-400">
                      Student will receive this response immediately in their 'My Learning' dashboard.
                    </p>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-purple-900/30 transition-all"
                    >
                      <Send className="w-4 h-4" /> Send Resolution
                    </button>
                  </div>
                </form>

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
                Select a doubt from the queue to start solving.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default TeacherDoubtSolver;
