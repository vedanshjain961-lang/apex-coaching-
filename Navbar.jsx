import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Menu, X, User, Sparkles, GraduationCap, 
  MessageCircleQuestion, Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AiTutorModal from './AiTutorModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isTeacher = user?.role === 'teacher' || user?.isTeacher || user?.name === 'Dr. Sarah Jenkins';
  const isStudent = user && !user.isAdmin && !isTeacher;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses & Live Batches', path: '/courses' },
    { name: 'Doubts & Q&A', path: '/doubts' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Clean Main Navbar - All Staff & Teacher Logins are kept Private & Hidden */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-600/30">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-extrabold text-xl text-slate-900 tracking-tight">Apex Learning</span>
                  <span className="block text-[10px] text-blue-600 font-bold uppercase tracking-widest -mt-1">
                    Live Tutoring & Prep
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    location.pathname === link.path
                      ? 'text-blue-600 font-bold'
                      : 'text-slate-600 hover:text-blue-600 font-medium'
                  } transition-colors text-sm`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Dynamic Authenticated Role Links - Only visible when that role is logged in */}
              {isStudent && (
                <Link
                  to="/my-learning"
                  className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1"
                >
                  <GraduationCap className="w-3.5 h-3.5" /> My Learning
                </Link>
              )}

              {isTeacher && (
                <>
                  <Link
                    to="/teacher"
                    className="text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Teacher Console
                  </Link>
                  <Link
                    to="/teacher/doubts"
                    className="text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors flex items-center gap-1"
                  >
                    <MessageCircleQuestion className="w-3.5 h-3.5" /> Doubt Solver
                  </Link>
                </>
              )}

              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className="text-xs font-bold bg-amber-50 text-amber-700 px-3.5 py-1.5 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5" /> Admin Dashboard
                </Link>
              )}

              {/* Auth Area */}
              <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 text-slate-800 text-xs font-semibold">
                      <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                        {user.name ? user.name[0] : <User className="w-4 h-4" />}
                      </div>
                      <span className="truncate max-w-[120px]">{user.name}</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="text-slate-400 text-xs font-medium hover:text-red-600 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth"
                      className="text-slate-600 font-semibold hover:text-blue-600 transition-colors text-xs"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/courses"
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm text-xs"
                    >
                      Enroll Now
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsAiOpen(true)}
                className="p-2 text-purple-600 bg-purple-50 rounded-xl"
                title="AI Study Assistant"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-slate-900 p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                {link.name}
              </Link>
            ))}

            {isStudent && (
              <Link
                to="/my-learning"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-blue-700 bg-blue-50 rounded-lg"
              >
                🎓 My Learning Portal
              </Link>
            )}

            {isTeacher && (
              <>
                <Link
                  to="/teacher"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-sm font-bold text-purple-700 bg-purple-50 rounded-lg"
                >
                  👩‍🏫 Teacher Console
                </Link>
                <Link
                  to="/teacher/doubts"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-sm font-bold text-purple-700 bg-purple-50 rounded-lg"
                >
                  💬 Doubt Solver Screen
                </Link>
              </>
            )}

            {user?.isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-amber-700 bg-amber-50 rounded-lg"
              >
                🛡️ Admin Dashboard
              </Link>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {user ? (
                <>
                  <span className="text-xs font-semibold text-slate-600">{user.name}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-xs text-red-600 font-bold"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Floating Glowing AI Assistant Action Button (Fixed Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiOpen(true)}
          className="group flex items-center gap-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-3 rounded-full shadow-2xl shadow-purple-600/40 hover:scale-105 transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center animate-spin-slow">
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </div>
          <span className="text-xs font-bold pr-1">Apex AI Study Buddy</span>
        </button>
      </div>

      {/* Global AI Assistant Modal */}
      <AiTutorModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        initialRole={isTeacher ? 'teacher' : 'student'}
      />
    </>
  );
};

export default Navbar;
