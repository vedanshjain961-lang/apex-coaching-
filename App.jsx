import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Enroll from './pages/Enroll';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import LiveClassroom from './pages/LiveClassroom';
import MyLearning from './pages/MyLearning';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherDoubtSolver from './pages/TeacherDoubtSolver';
import TeacherLogin from './pages/TeacherLogin';
import DoubtScreen from './pages/DoubtScreen';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import TeacherRoute from './components/TeacherRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/doubts" element={<DoubtScreen />} />
              
              {/* Interactive Virtual Classroom */}
              <Route path="/live-class/:courseId" element={<LiveClassroom />} />

              {/* Student Portal */}
              <Route path="/my-learning" element={
                <ProtectedRoute>
                  <MyLearning />
                </ProtectedRoute>
              } />

              {/* Confidential Teacher & Faculty Portal */}
              <Route path="/teacher/login" element={<TeacherLogin />} />
              <Route path="/teacher-login" element={<TeacherLogin />} />
              <Route path="/teacher" element={
                <TeacherRoute>
                  <TeacherDashboard />
                </TeacherRoute>
              } />
              <Route path="/teacher/doubts" element={
                <TeacherRoute>
                  <TeacherDoubtSolver />
                </TeacherRoute>
              } />

              {/* Confidential Admin Portal */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />

              {/* Enrollment Protected Checkout */}
              <Route path="/enroll" element={
                <ProtectedRoute>
                  <Enroll />
                </ProtectedRoute>
              } />

              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
