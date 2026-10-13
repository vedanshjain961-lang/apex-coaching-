import React, { useState } from 'react';
import { getStoredCourses } from '../data';
import { Search, ArrowRight, Video, Star, MessageCircleQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import EnrollModal from '../components/EnrollModal';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formatFilter, setFormatFilter] = useState('All'); // 'All' | 'Live' | 'Self' | 'TestPrep'
  const allCourses = getStoredCourses();

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.instructor?.name && course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesFormat = true;
    if (formatFilter === 'Live') matchesFormat = course.isLive;
    if (formatFilter === 'Self') matchesFormat = !course.isLive;
    if (formatFilter === 'TestPrep') matchesFormat = course.title.toLowerCase().includes('sat') || course.title.toLowerCase().includes('prep');

    return matchesSearch && matchesFormat;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 py-16 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            Spring 2026 Admissions Open
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Academic Programs & Live Batches
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Led by faculty from MIT, Harvard, and Stanford. Small interactive cohorts with 1-on-1 personalized doubt solving.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        
        {/* Search & Category Filter Pills */}
        <div className="mb-10 space-y-6">
          <div className="flex justify-center">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search subject, topic, or instructor name..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm text-base bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'All', label: 'All Curriculums' },
              { id: 'Live', label: '🔴 Live Interactive Batches' },
              { id: 'Self', label: 'Self-Paced Mastery' },
              { id: 'TestPrep', label: '🎯 SAT & Test Prep' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFormatFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  formatFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="p-7">
                  
                  {/* Top Badges */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-13 h-13 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center p-3 group-hover:scale-110 transition-transform shadow-sm">
                      {course.icon}
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      {course.isLive ? (
                        <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span> LIVE BATCH
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">
                          Self-Paced
                        </span>
                      )}

                      <span className="text-xs font-bold text-slate-900 font-mono">
                        ${course.price}.00
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">{course.title}</h3>
                  <p className="text-slate-600 text-xs mb-5 line-clamp-2 leading-relaxed">{course.description}</p>
                  
                  {/* Dedicated Assigned Instructor Card */}
                  {course.instructor && (
                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 mb-5 flex items-center gap-3">
                      <img
                        src={course.instructor.image}
                        alt={course.instructor.name}
                        className="w-11 h-11 rounded-xl object-cover border border-white shadow-sm shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900 truncate">{course.instructor.name}</p>
                          <span className="text-[11px] font-bold text-amber-600 flex items-center gap-0.5 shrink-0">
                            <Star className="w-3 h-3 fill-current" /> {course.instructor.rating || 4.9}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{course.instructor.credentials}</p>
                      </div>
                    </div>
                  )}

                  {/* Batch & Schedule Details */}
                  <div className="space-y-2 text-xs text-slate-600 bg-blue-50/40 p-3 rounded-2xl border border-blue-100/50">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Duration:</span>
                      <span className="font-semibold text-slate-900">{course.duration}</span>
                    </div>
                    {course.isLive && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Live Timing:</span>
                        <span className="font-bold text-purple-700">{course.liveSchedule}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Cohort Size:</span>
                      <span className="font-semibold text-slate-900">{course.batchSize || 'Small Batch'}</span>
                    </div>
                  </div>

                </div>
                
                {/* Action Footer */}
                <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2">
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    Enroll in Program <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex gap-2">
                    <Link
                      to={`/doubts?courseId=${course.id}`}
                      className="flex-1 py-2 px-3 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      title="View student questions and teacher answers for this course"
                    >
                      <MessageCircleQuestion className="w-3.5 h-3.5 text-purple-600" />
                      Course Doubts & Q&A
                    </Link>

                    {course.isLive && (
                      <Link
                        to={`/live-class/${course.id}`}
                        className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                        title="Preview the interactive virtual live room"
                      >
                        <Video className="w-3.5 h-3.5 text-red-500" />
                        Room
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No matching curriculums found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your search terms or category filters.</p>
          </div>
        )}
      </div>

      <EnrollModal 
        course={selectedCourse} 
        isOpen={!!selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />
    </div>
  );
};

export default Courses;
