import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TeacherLogin = () => {
  const [email, setEmail] = useState('teacher@apex.com');
  const [password, setPassword] = useState('teacher123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  const isTeacherOrAdmin = user && (user.role === 'teacher' || user.isTeacher || user.isAdmin || user.name === 'Dr. Sarah Jenkins');

  // If already logged in as teacher or admin, jump to teacher console
  if (isTeacherOrAdmin) {
    const destination = location.state?.from ? `${location.state.from.pathname}` : '/teacher';
    return <Navigate to={destination} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanEmail = email.trim().toLowerCase();

      // Check if teacher
      if (cleanEmail === 'teacher@apex.com' || cleanEmail === 'sarah.jenkins@apex.com' || cleanEmail === 'teacher') {
        login({
          name: 'Dr. Sarah Jenkins',
          email: 'sarah.jenkins@apex.com',
          role: 'teacher',
          isTeacher: true,
          isAdmin: false
        });
        navigate('/teacher', { replace: true });
        return;
      }

      // Check if admin
      if (cleanEmail === 'admin@apex.com' || cleanEmail === 'admin') {
        login({
          name: 'Administrator',
          email: 'admin@apex.com',
          role: 'admin',
          isTeacher: true,
          isAdmin: true
        });
        navigate('/teacher', { replace: true });
        return;
      }

      // Unauthorized
      setError('Access Denied. This confidential portal is restricted to authorized faculty members and administrators only.');
    }, 700);
  };

  const handleQuickTeacherDemo = () => {
    login({
      name: 'Dr. Sarah Jenkins',
      email: 'sarah.jenkins@apex.com',
      role: 'teacher',
      isTeacher: true,
      isAdmin: false
    });
    navigate('/teacher', { replace: true });
  };

  const handleQuickAdminDemo = () => {
    login({
      name: 'Administrator',
      email: 'admin@apex.com',
      role: 'admin',
      isTeacher: true,
      isAdmin: true
    });
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-7 bg-slate-900/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative z-10 text-white">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl mb-4 text-purple-400">
            <Shield className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Faculty & Staff Portal
          </h2>
          <p className="mt-2 text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Confidential • Teachers & Admins Only
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center leading-relaxed">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Staff Email / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all"
                placeholder="teacher@apex.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Access Key / Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all font-mono"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-semibold text-white text-sm shadow-lg shadow-purple-900/40 transition-all duration-200 disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Verifying Faculty Credentials...' : 'Sign In to Faculty Console'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Private Presentation Demo Shortcuts (Inside the private panel only) */}
        <div className="pt-4 border-t border-slate-800">
          <p className="text-[11px] text-slate-400 text-center mb-2.5">
            Internal Presentation Credentials:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickTeacherDemo}
              className="text-xs bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 py-2 px-3 rounded-xl font-medium border border-purple-500/30 transition-colors text-center"
            >
              👩‍🏫 Teacher Login
            </button>
            <button
              type="button"
              onClick={handleQuickAdminDemo}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-3 rounded-xl font-medium border border-slate-700 transition-colors text-center"
            >
              🛡️ Admin Login
            </button>
          </div>
        </div>

        <div className="text-center pt-1">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Portal
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TeacherLogin;
