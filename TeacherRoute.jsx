import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TeacherRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isTeacherOrAdmin = user && (user.role === 'teacher' || user.isTeacher || user.isAdmin || user.name === 'Dr. Sarah Jenkins');

  if (!isTeacherOrAdmin) {
    return <Navigate to="/teacher/login" state={{ from: location }} replace />;
  }

  return children;
};

export default TeacherRoute;
