import React from 'react';
import { X, ArrowRight, Lock, Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EnrollModal = ({ course, isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Box */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl relative z-10 overflow-hidden transform transition-all max-h-[90vh] flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {course.isLive ? (
                <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> LIVE INTERACTIVE BATCH
                </span>
              ) : (
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                  SELF-PACED MASTERY
                </span>
              )}
              <span className="text-xs text-slate-400 font-semibold">• {course.level}</span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">{course.title}</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">{course.description}</p>
          </div>

          {/* Teacher Profile Section */}
          {course.instructor && (
            <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-2xl flex items-center gap-4">
              <img
                src={course.instructor.image}
                alt={course.instructor.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{course.instructor.name}</h4>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" /> {course.instructor.rating || 4.9}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>1-on-1 faculty doubt solving included</span>
                  <Link
                    to={`/doubts?courseId=${course.id}`}
                    onClick={onClose}
                    className="font-bold text-purple-700 hover:underline"
                  >
                    Course Q&A ({course.title.split(' ')[0]}) →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Pricing & Duration Bar */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Program Tuition</span>
              <span className="text-2xl font-black text-blue-600 font-mono">${course.price}.00</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">Cohort Duration</span>
              <span className="text-sm font-bold text-slate-900">{course.duration}</span>
              {course.isLive && (
                <span className="text-[11px] text-purple-700 font-semibold block">{course.liveSchedule}</span>
              )}
            </div>
          </div>

          {/* Syllabus Modules */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Curriculum Highlights:
              </h4>
              <div className="space-y-1.5">
                {course.syllabus.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-3 shrink-0">
          <Link 
            to={`/enroll?courseId=${course.id}`}
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 text-sm"
          >
            {user ? (
              <>Proceed to Checkout <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>Enroll Now (Sign In to Proceed) <ArrowRight className="w-4 h-4" /></>
            )}
          </Link>
          
          {!user && (
            <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              You will be prompted to sign in before completing payment
            </p>
          )}

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> 100% Satisfaction Guarantee</span>
            <span>•</span>
            <span>Instant Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollModal;
