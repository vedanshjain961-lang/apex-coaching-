import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  // If already logged in, redirect away
  if (user) {
    if (user.isAdmin) {
      return <Navigate to="/admin" replace />;
    }
    if (user.isTeacher || user.role === 'teacher') {
      return <Navigate to="/teacher" replace />;
    }
    return <Navigate to="/my-learning" replace />;
  }

  // Preserve the intended target or default to /courses so student can immediately browse
  const destination = location.state?.from 
    ? `${location.state.from.pathname}${location.state.from.search || ''}` 
    : '/my-learning';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const cleanEmail = email.trim().toLowerCase();
      const isAdmin = cleanEmail === 'admin@apex.com' || cleanEmail === 'admin';
      const isTeacher = cleanEmail === 'teacher@apex.com' || cleanEmail === 'sarah.jenkins@apex.com' || cleanEmail === 'teacher';
      
      const userData = {
        name: isLogin 
          ? (isAdmin ? 'Administrator' : (isTeacher ? 'Dr. Sarah Jenkins' : (cleanEmail.split('@')[0] || 'Student'))) 
          : (name.trim() || 'Student'),
        email: cleanEmail,
        isAdmin: isAdmin,
        isTeacher: isTeacher,
        role: isAdmin ? 'admin' : (isTeacher ? 'teacher' : 'student')
      };
      
      login(userData);

      if (isAdmin) {
        navigate('/admin', { replace: true });
      } else if (isTeacher) {
        navigate('/teacher', { replace: true });
      } else {
        navigate(destination, { replace: true });
      }
    }, 800);
  };

  const handleQuickStudentLogin = () => {
    login({
      name: 'Jessica Taylor',
      email: 'jessica@student.demo',
      isAdmin: false
    });
    navigate(destination, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 relative z-10">
        
        {/* Logo and Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 mb-4">
            <BookOpen className="w-9 h-9" />
            <span className="text-2xl font-bold text-gray-900">Apex Learning</span>
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Student Sign In' : 'Create Student Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)} 
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {location.state?.from?.pathname === '/enroll' && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3.5 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5">
            <span className="font-bold shrink-0">Enrollment Step:</span>
            <span>Please sign in or create an account to proceed with your course enrollment.</span>
          </div>
        )}

        {/* Form */}
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" 
                placeholder="student@example.com" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-colors mt-2"
          >
            {isLoading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Quick Demo Student Access */}
        <div className="pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={handleQuickStudentLogin}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold border border-blue-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            1-Click Demo Student Sign In
          </button>
        </div>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-gray-500 hover:text-gray-700">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
