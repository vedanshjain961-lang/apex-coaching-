import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@apex.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { user, login } = useAuth();

  // If already logged in as admin, jump straight to dashboard
  if (user && user.isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanEmail = email.trim().toLowerCase();
      
      if (cleanEmail === 'admin@apex.com' || cleanEmail === 'admin') {
        login({
          name: 'Administrator',
          email: 'admin@apex.com',
          isAdmin: true
        });
        navigate('/admin', { replace: true });
      } else {
        setError('Unauthorized credentials. This panel is restricted to system administrators.');
      }
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    login({
      name: 'Administrator',
      email: 'admin@apex.com',
      isAdmin: true
    });
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-slate-800/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-slate-700 shadow-2xl relative z-10 text-white">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl mb-4 text-purple-400">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Admin Portal Login
          </h2>
          <p className="mt-2 text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Confidential Management Console
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Admin Email / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="admin@apex.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Security Key / Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-mono"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-semibold text-white shadow-lg shadow-purple-900/30 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Verifying Credentials...' : 'Authenticate & Enter Dashboard'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="pt-4 border-t border-slate-700/60">
          <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-700/40 text-center">
            <p className="text-xs text-slate-400 mb-2">
              Client & Presentation Demo Mode:
            </p>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-3 py-1.5 rounded-lg font-medium transition-colors border border-purple-500/30"
            >
              1-Click Demo Admin Login
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Site
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
