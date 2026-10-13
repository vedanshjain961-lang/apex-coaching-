import React, { useState } from 'react';
import { 
  BookOpen, Video, Clock, CheckCircle2, MessageCircleQuestion, Plus, 
  ArrowRight, Sparkles, X 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getStoredCourses, getStoredDoubts, saveStoredDoubts, tutors } from '../data';

const MyLearning = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'schedule' | 'doubts'
  
  const [enrollments] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('apex_enrollments') || '[]');
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch (_e) {
      // ignore
    }
    return [
      {
        id: 'APX-84920',
        studentName: 'Jessica Taylor',
        courseId: 1,
        courseTitle: 'Advanced Mathematics',
        price: 299,
        status: 'In Progress',
        progress: '75%',
        date: new Date().toISOString()
      },
      {
        id: 'APX-92144',
        studentName: 'Jessica Taylor',
        courseId: 3,
        courseTitle: 'Computer Science & Python',
        price: 349,
        status: 'In Progress',
        progress: '40%',
        date: new Date().toISOString()
      }
    ];
  });

  const [doubts, setDoubts] = useState(() => getStoredDoubts());
  const [showAskDoubtModal, setShowAskDoubtModal] = useState(false);

  const [newDoubt, setNewDoubt] = useState({
    courseId: 1,
    topic: '',
    question: ''
  });

  const allCourses = getStoredCourses();

  const handleAskDoubtSubmit = (e) => {
    e.preventDefault();
    const pickedCourse = allCourses.find(c => String(c.id) === String(newDoubt.courseId)) || allCourses[0];
    const pickedTeacher = pickedCourse.instructor || tutors[0];

    const createdDoubt = {
      id: `DBT-${Math.floor(500 + Math.random() * 500)}`,
      studentName: user?.name || 'Jessica Taylor',
      studentEmail: user?.email || 'jessica@student.demo',
      courseId: pickedCourse.id,
      courseTitle: pickedCourse.title,
      instructorId: pickedTeacher.id,
      instructorName: pickedTeacher.name,
      question: newDoubt.question,
      topic: newDoubt.topic || 'General Problem Drill',
      status: 'Pending',
      date: new Date().toISOString(),
      solution: null
    };

    const updated = [createdDoubt, ...doubts];
    setDoubts(updated);
    saveStoredDoubts(updated);
    setShowAskDoubtModal(false);
    setNewDoubt({ courseId: 1, topic: '', question: '' });
    alert(`Your doubt has been assigned to ${pickedTeacher.name}! You will receive a response shortly.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Student Welcome Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-white/20 text-blue-100 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Student Learning Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Welcome back, {user?.name || 'Jessica'}! 🎓
            </h1>
            <p className="text-blue-100 text-sm mt-1">
              Your next live session in <strong>Advanced Mathematics</strong> starts today at 6:30 PM.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/live-class/1"
              className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg hover:bg-blue-50 transition-colors"
            >
              <Video className="w-4 h-4 text-red-600" />
              🔴 Join Live Class Now
            </Link>

            <button
              onClick={() => setShowAskDoubtModal(true)}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/20 backdrop-blur-md transition-colors"
            >
              <MessageCircleQuestion className="w-4 h-4 text-purple-200" />
              Ask a Doubt
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 mb-8 pb-px">
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'courses'
                ? 'border-blue-600 text-blue-700 bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            My Enrolled Programs ({enrollments.length})
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'schedule'
                ? 'border-blue-600 text-blue-700 bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
            }`}
          >
            <Video className="w-4 h-4" />
            Live Class Schedule
          </button>

          <button
            onClick={() => setActiveTab('doubts')}
            className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'doubts'
                ? 'border-blue-600 text-blue-700 bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
            }`}
          >
            <MessageCircleQuestion className="w-4 h-4" />
            My Doubts & Teacher Answers ({doubts.length})
          </button>
        </div>

        {/* TAB 1: ENROLLED COURSES */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((en) => {
              const matchedCourse = allCourses.find(c => c.id === en.courseId || c.title === en.courseTitle) || allCourses[0];

              return (
                <div key={en.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                        {matchedCourse.level}
                      </span>
                      {matchedCourse.isLive && (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span> LIVE BATCH
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">{matchedCourse.title}</h3>

                    {/* Teacher Card Mini */}
                    {matchedCourse.instructor && (
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl mb-4 border border-slate-100">
                        <img
                          src={matchedCourse.instructor.image}
                          alt={matchedCourse.instructor.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{matchedCourse.instructor.name}</p>
                          <p className="text-[11px] text-slate-500">{matchedCourse.instructor.credentials}</p>
                        </div>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
                        <span>Course Completion</span>
                        <span className="text-blue-600 font-mono">{en.progress || '50%'}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                          style={{ width: en.progress || '50%' }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">#{en.id}</span>
                    <Link
                      to={`/live-class/${matchedCourse.id}`}
                      className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                    >
                      Enter Classroom <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: LIVE SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Upcoming Live Interactive Batches</h2>
              <p className="text-xs text-slate-500 mb-6">Join your live video lectures and participate with your peers.</p>

              <div className="space-y-4">
                {allCourses.filter(c => c.isLive).slice(0, 3).map((course, idx) => (
                  <div key={course.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base text-slate-900">{course.title}</h4>
                          <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                            {course.batchSize}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Instructor: {course.instructor?.name} • Schedule: {course.liveSchedule}</p>
                      </div>
                    </div>

                    <Link
                      to={`/live-class/${course.id}`}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-red-600/30 transition-all shrink-0"
                    >
                      <Video className="w-4 h-4" />
                      Join Live Session
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOUBTS & RESOLUTIONS */}
        {activeTab === 'doubts' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Your Doubt Submissions</h2>
                <p className="text-xs text-slate-500">Track 1-on-1 answers provided by your assigned faculty</p>
              </div>

              <button
                onClick={() => setShowAskDoubtModal(true)}
                className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" /> Ask a New Doubt
              </button>
            </div>

            <div className="space-y-4">
              {doubts.map((doubt) => (
                <div key={doubt.id} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 font-mono">#{doubt.id}</span>
                        <h4 className="text-sm font-bold text-slate-900">{doubt.topic}</h4>
                        <span className="text-xs text-slate-400">• {doubt.courseTitle}</span>
                      </div>
                      <p className="text-xs text-purple-700 font-semibold mt-0.5">Assigned Teacher: {doubt.instructorName}</p>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                      doubt.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {doubt.status === 'Resolved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {doubt.status}
                    </span>
                  </div>

                  {/* Question */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed font-medium">
                    "{doubt.question}"
                  </div>

                  {/* Solution if resolved */}
                  {doubt.status === 'Resolved' && (
                    <div className="p-4 bg-purple-50/70 border border-purple-200/60 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span>Teacher Resolution from {doubt.instructorName}:</span>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line font-sans">
                        {doubt.solution}
                      </p>
                    </div>
                  )}

                  {doubt.status === 'Pending' && (
                    <p className="text-xs text-amber-600 font-medium">
                      ⏳ {doubt.instructorName} is currently preparing your step-by-step resolution.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ASK A NEW DOUBT */}
      {showAskDoubtModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-slate-100 relative">
            <button
              onClick={() => setShowAskDoubtModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-1">Ask Your Instructor a Doubt</h2>
            <p className="text-xs text-slate-500 mb-6">
              Your inquiry will be routed directly to the faculty member assigned to your course.
            </p>

            <form onSubmit={handleAskDoubtSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Course *</label>
                <select
                  value={newDoubt.courseId}
                  onChange={(e) => setNewDoubt({ ...newDoubt, courseId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  {allCourses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title} (Teacher: {c.instructor?.name})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Topic / Subject Area *</label>
                <input
                  type="text"
                  required
                  value={newDoubt.topic}
                  onChange={(e) => setNewDoubt({ ...newDoubt, topic: e.target.value })}
                  placeholder="e.g. Calculus Integration by Parts"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Question *</label>
                <textarea
                  rows="4"
                  required
                  value={newDoubt.question}
                  onChange={(e) => setNewDoubt({ ...newDoubt, question: e.target.value })}
                  placeholder="Describe where you got stuck or paste the problem text..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none leading-relaxed"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAskDoubtModal(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/30"
                >
                  Submit Doubt to Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyLearning;
