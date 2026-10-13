import React, { useState } from 'react';
import { 
  Users, BookOpen, Video, MessageCircleQuestion, Plus, Star, 
  Clock, Sparkles, X 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { tutors, getStoredCourses, getStoredDoubts } from '../data';
import { useAuth } from '../context/AuthContext';

const TeacherDashboard = () => {
  const { user } = useAuth();

  // Active Teacher Profile (defaults to Dr. Sarah Jenkins for demo)
  const currentTeacher = tutors.find(t => t.name === user?.name) || tutors[0];

  const [allCourses, setAllCourses] = useState(() => getStoredCourses());
  const [doubts] = useState(() => getStoredDoubts());
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);

  // New Course Form State
  const [newCourse, setNewCourse] = useState({
    title: '',
    level: 'High School / College Prep',
    duration: '10 Weeks',
    price: 279,
    isLive: true,
    liveSchedule: 'Mon & Thu • 6:00 PM EST',
    batchSize: 'Max 12 Students • Live Batch',
    description: '',
    syllabusInput: 'Module 1: Fundamental Concepts\nModule 2: Advanced Problem Solving\nModule 3: Exam Readiness'
  });

  // Filter courses taught by this teacher
  const teacherCourses = allCourses.filter(c => 
    c.instructor?.name === currentTeacher.name || c.instructor?.id === currentTeacher.id
  );

  // Filter doubts assigned to this teacher
  const teacherDoubts = doubts.filter(d => 
    d.instructorName === currentTeacher.name || d.instructorId === currentTeacher.id
  );
  const pendingDoubts = teacherDoubts.filter(d => d.status === 'Pending');

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const syllabusList = newCourse.syllabusInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const createdCourse = {
      id: Date.now(),
      title: newCourse.title,
      level: newCourse.level,
      duration: newCourse.duration,
      price: Number(newCourse.price) || 249,
      isLive: newCourse.isLive,
      liveSchedule: newCourse.liveSchedule,
      nextClass: newCourse.isLive ? 'Upcoming Live Session' : 'Self-Paced Learning',
      batchSize: newCourse.batchSize,
      description: newCourse.description || 'Hands-on curriculum curated by certified university faculty.',
      rating: 4.9,
      enrolledCount: 1,
      instructor: currentTeacher,
      syllabus: syllabusList.length > 0 ? syllabusList : ['Module 1: Foundations', 'Module 2: Mastery Drills']
    };

    try {
      const stored = JSON.parse(localStorage.getItem('apex_custom_courses') || '[]');
      const updated = [createdCourse, ...stored];
      localStorage.setItem('apex_custom_courses', JSON.stringify(updated));
      setAllCourses(getStoredCourses());
      setShowCreateCourseModal(false);
      setNewCourse({
        title: '',
        level: 'High School / College Prep',
        duration: '10 Weeks',
        price: 279,
        isLive: true,
        liveSchedule: 'Mon & Thu • 6:00 PM EST',
        batchSize: 'Max 12 Students • Live Batch',
        description: '',
        syllabusInput: 'Module 1: Fundamental Concepts\nModule 2: Advanced Problem Solving\nModule 3: Exam Readiness'
      });
      alert(`Course "${createdCourse.title}" published successfully! It is now live in the course catalog.`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Teacher Profile Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentTeacher.image}
              alt={currentTeacher.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-purple-400/40 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold">{currentTeacher.name}</h1>
                <span className="text-xs bg-purple-500/20 text-purple-300 font-bold px-2.5 py-0.5 rounded-full border border-purple-500/30">
                  Verified Faculty
                </span>
              </div>
              <p className="text-purple-200 text-sm mt-1">{currentTeacher.credentials}</p>
              <div className="flex items-center gap-3 text-xs text-purple-300 mt-2">
                <span className="flex items-center gap-1 font-semibold text-yellow-300">
                  <Star className="w-4 h-4 fill-current" /> {currentTeacher.rating} Rating
                </span>
                <span>•</span>
                <span>{currentTeacher.studentsTaught} Students Taught</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCreateCourseModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-purple-900/40 transition-all"
            >
              <Plus className="w-4 h-4" /> Publish New Course
            </button>

            <Link
              to="/teacher/doubts"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/20 backdrop-blur-md transition-colors"
            >
              <MessageCircleQuestion className="w-4 h-4 text-purple-300" />
              Doubt Solver Screen
              {pendingDoubts.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {pendingDoubts.length} New
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Active Batches</p>
              <p className="text-3xl font-black text-slate-900">{teacherCourses.length}</p>
              <p className="text-xs text-purple-600 font-semibold mt-1">Live & Guided</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Students Enrolled</p>
              <p className="text-3xl font-black text-slate-900">
                {teacherCourses.reduce((sum, c) => sum + (c.enrolledCount || 10), 0)}
              </p>
              <p className="text-xs text-green-600 font-semibold mt-1">↑ 18 this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Pending Doubts</p>
              <p className="text-3xl font-black text-slate-900">{pendingDoubts.length}</p>
              <p className="text-xs text-amber-600 font-semibold mt-1">Requires answer</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <MessageCircleQuestion className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Doubt Response</p>
              <p className="text-2xl font-black text-slate-900">{currentTeacher.doubtResponseTime}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Avg turnaround</p>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Section: Live Classes To Host */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Live Teaching Schedule</h2>
              <p className="text-xs text-slate-500">Upcoming live batches assigned to you</p>
            </div>
            <span className="text-xs bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> Next Session Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teacherCourses.filter(c => c.isLive).map((course) => (
              <div key={course.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                      {course.batchSize || 'Live Small Group'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      {course.liveSchedule}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{course.title}</h3>
                  <p className="text-xs text-slate-600 mb-4">{course.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Session Status</span>
                    <span className="text-xs font-bold text-green-600">Virtual Room Available</span>
                  </div>

                  <Link
                    to={`/live-class/${course.id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-red-600/30 transition-all"
                  >
                    <Video className="w-4 h-4" />
                    Start Live Class
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Courses Created by This Teacher */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">My Published Courses</h2>
              <p className="text-xs text-slate-500">Curriculums published under your instructor profile</p>
            </div>
            <button
              onClick={() => setShowCreateCourseModal(true)}
              className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition-colors"
            >
              + Add Another Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teacherCourses.map((c) => (
              <div key={c.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-600">{c.level}</span>
                    <span className="font-bold text-slate-900 text-sm font-mono">${c.price}.00</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">{c.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">{c.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Duration: {c.duration}</span>
                  <Link to={`/live-class/${c.id}`} className="text-purple-600 font-bold hover:underline">
                    Preview Room →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL: TEACHER CREATE COURSE */}
      {showCreateCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCreateCourseModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-2xl font-bold text-slate-900">Teacher Course Creator</h2>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Create a new program. It will publish with your profile and photo as the instructor.
            </p>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="e.g. Master AP Calculus BC Live"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Grade / Level *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                    placeholder="High School / AP Prep"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    placeholder="12 Weeks"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tuition Fee ($ USD) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Format</label>
                  <select
                    value={newCourse.isLive ? 'live' : 'self'}
                    onChange={(e) => setNewCourse({ ...newCourse, isLive: e.target.value === 'live' })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="live">🔴 Live Interactive Classes</option>
                    <option value="self">Self-Paced with Q&A</option>
                  </select>
                </div>
              </div>

              {newCourse.isLive && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Live Days & Time *</label>
                    <input
                      type="text"
                      required
                      value={newCourse.liveSchedule}
                      onChange={(e) => setNewCourse({ ...newCourse, liveSchedule: e.target.value })}
                      placeholder="Mon & Thu • 6:00 PM EST"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Limit</label>
                    <input
                      type="text"
                      value={newCourse.batchSize}
                      onChange={(e) => setNewCourse({ ...newCourse, batchSize: e.target.value })}
                      placeholder="Max 12 Students"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Description</label>
                <textarea
                  rows="2"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Overview of syllabus, key learning goals..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Syllabus Outline (1 per line)</label>
                <textarea
                  rows="3"
                  value={newCourse.syllabusInput}
                  onChange={(e) => setNewCourse({ ...newCourse, syllabusInput: e.target.value })}
                  placeholder="Module 1: Foundations&#10;Module 2: Advanced Analysis&#10;Module 3: Exam Frameworks"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateCourseModal(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/30"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeacherDashboard;
