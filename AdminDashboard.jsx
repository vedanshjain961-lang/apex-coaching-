import React, { useState } from 'react';
import { 
  Users, DollarSign, BookOpen, TrendingUp, 
  Search, Download, Plus, Trash2, MessageSquare, 
  Sparkles, RefreshCw, BarChart3, X, Calendar, 
  Video, Star, Tag, Award, Bell, Shield, 
  Printer, ArrowUpRight 
} from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courses as defaultCourses, tutors } from '../data';

const DEFAULT_DEMO_ENROLLMENTS = [
  {
    id: 'APX-84920',
    studentName: 'Alex Johnson',
    parentName: 'Sarah Johnson',
    email: 'alex.j@example.com',
    phone: '(555) 234-5678',
    courseId: 1,
    courseTitle: 'Advanced Mathematics',
    price: 299,
    status: 'In Progress',
    progress: '75%',
    grade: 'A (92%)',
    attendance: '96%',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'APX-61049',
    studentName: 'Emma Watson',
    parentName: 'David Watson',
    email: 'emma.w@example.com',
    phone: '(555) 345-6789',
    courseId: 2,
    courseTitle: 'Physics & Chemistry',
    price: 249,
    status: 'In Progress',
    progress: '40%',
    grade: 'B+ (88%)',
    attendance: '92%',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'APX-77312',
    studentName: 'Michael Brown',
    parentName: 'Robert Brown',
    email: 'michael.b@example.com',
    phone: '(555) 456-7890',
    courseId: 4,
    courseTitle: 'SAT & ACT Comprehensive Prep',
    price: 399,
    status: 'Completed',
    progress: '100%',
    grade: 'A+ (99th %tile)',
    attendance: '100%',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'APX-92144',
    studentName: 'Sophia Martinez',
    parentName: 'Elena Martinez',
    email: 'sophia.m@example.com',
    phone: '(555) 567-8901',
    courseId: 3,
    courseTitle: 'Computer Science & Python',
    price: 349,
    status: 'In Progress',
    progress: '60%',
    grade: 'A- (91%)',
    attendance: '94%',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_DEMO_COUPONS = [
  { id: 'CPN-1', code: 'APEX50', discount: '$50 OFF', type: 'fixed', value: 50, redemptions: 28, status: 'Active' },
  { id: 'CPN-2', code: 'SPRING20', discount: '20% OFF', type: 'percent', value: 20, redemptions: 54, status: 'Active' },
  { id: 'CPN-3', code: 'EARLYBIRD', discount: '$35 OFF', type: 'fixed', value: 35, redemptions: 19, status: 'Active' },
  { id: 'CPN-4', code: 'SATBOOST', discount: '15% OFF', type: 'percent', value: 15, redemptions: 33, status: 'Active' }
];

const DEFAULT_WEEKLY_SCHEDULE = [
  { id: 1, day: 'Monday', time: '5:00 PM EST', courseTitle: 'Physics & Chemistry', tutor: 'Dr. Sarah Jenkins', room: 'Virtual Room #2', isLive: true },
  { id: 2, day: 'Monday', time: '6:30 PM EST', courseTitle: 'Advanced Mathematics', tutor: 'Dr. Sarah Jenkins', room: 'Virtual Room #1', isLive: true },
  { id: 3, day: 'Monday', time: '7:00 PM EST', courseTitle: 'Computer Science & Python', tutor: 'Mark Davis', room: 'Virtual Room #3', isLive: true },
  { id: 4, day: 'Tuesday', time: '5:00 PM EST', courseTitle: 'Physics & Chemistry', tutor: 'Dr. Sarah Jenkins', room: 'Virtual Room #2', isLive: true },
  { id: 5, day: 'Tuesday', time: '6:00 PM EST', courseTitle: 'English Literature & Composition', tutor: 'Emily Chen', room: 'Virtual Room #4', isLive: true },
  { id: 6, day: 'Wednesday', time: '4:00 PM EST', courseTitle: 'Biology & Life Sciences', tutor: 'Dr. Aris Thorne', room: 'Virtual Room #5', isLive: true },
  { id: 7, day: 'Wednesday', time: '6:30 PM EST', courseTitle: 'Advanced Mathematics', tutor: 'Dr. Sarah Jenkins', room: 'Virtual Room #1', isLive: true },
  { id: 8, day: 'Thursday', time: '6:00 PM EST', courseTitle: 'SAT & ACT Comprehensive Prep', tutor: 'Robert Sterling', room: 'Virtual Room #6', isLive: true },
  { id: 9, day: 'Thursday', time: '7:00 PM EST', courseTitle: 'Computer Science & Python', tutor: 'Mark Davis', room: 'Virtual Room #3', isLive: true },
  { id: 10, day: 'Friday', time: '6:00 PM EST', courseTitle: 'English Literature & Composition', tutor: 'Emily Chen', room: 'Virtual Room #4', isLive: true },
  { id: 11, day: 'Saturday', time: '11:00 AM EST', courseTitle: 'SAT & ACT Comprehensive Prep', tutor: 'Robert Sterling', room: 'Virtual Room #6', isLive: true },
  { id: 12, day: 'Saturday', time: '4:00 PM EST', courseTitle: 'Biology & Life Sciences', tutor: 'Dr. Aris Thorne', room: 'Virtual Room #5', isLive: true }
];

const DEFAULT_ANNOUNCEMENTS = [
  { id: 1, title: 'National SAT Diagnostic Exam Session', category: 'Exam Alert', audience: 'High School Seniors', date: 'April 18, 2026', status: 'Active', message: 'Full 3-hour timed practice test with instant analytics and tutor review.' },
  { id: 2, title: 'Early Registration Promo: Use Code APEX50', category: 'Special Offer', audience: 'All Prospective Students', date: 'Active till April 30', status: 'Active', message: 'Get $50 off any 10-week or 12-week live cohort registration.' },
  { id: 3, title: 'Interactive Whiteboard Engine 2.0 Upgraded', category: 'Platform Update', audience: 'Faculty & Students', date: 'April 10, 2026', status: 'Active', message: 'Real-time mathematical formula rendering and PDF export now live in all virtual rooms.' }
];

const DEFAULT_AUDIT_LOGS = [
  { id: 101, actor: 'Alex Johnson', action: 'Order Completed: APX-84920 ($299.00)', category: 'ENROLLMENT', time: '12 mins ago', status: 'Success' },
  { id: 102, actor: 'Dr. Sarah Jenkins', action: 'Doubt Resolved: #DBT-501 with AI-assisted math proof', category: 'ACADEMIC', time: '35 mins ago', status: 'Verified' },
  { id: 103, actor: 'Admin Administrator', action: 'Scheduled Live Cohort: SAT Prep Saturday Batch #4', category: 'SCHEDULE', time: '2 hours ago', status: 'Success' },
  { id: 104, actor: 'Emma Watson', action: 'Redeemed Promo Coupon SPRING20 (-$49.80)', category: 'FINANCIAL', time: '4 hours ago', status: 'Applied' },
  { id: 105, actor: 'Admin Administrator', action: 'Exported Student Roster as CSV (24 records)', category: 'AUDIT', time: '6 hours ago', status: 'Logged' }
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); 
  // 'overview' | 'students' | 'courses' | 'timetable' | 'financials' | 'faculty' | 'announcements' | 'inquiries' | 'audit'

  // Data states
  const [enrollments, setEnrollments] = useState(() => {
    try {
      const stored = localStorage.getItem('apex_enrollments');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      localStorage.setItem('apex_enrollments', JSON.stringify(DEFAULT_DEMO_ENROLLMENTS));
      return DEFAULT_DEMO_ENROLLMENTS;
    } catch (_e) {
      return DEFAULT_DEMO_ENROLLMENTS;
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const stored = localStorage.getItem('apex_inquiries');
      return stored ? JSON.parse(stored) || [] : [];
    } catch (_e) {
      return [];
    }
  });

  const [customCourses, setCustomCourses] = useState(() => {
    try {
      const stored = localStorage.getItem('apex_custom_courses');
      return stored ? JSON.parse(stored) || [] : [];
    } catch (_e) {
      return [];
    }
  });

  const [coupons, setCoupons] = useState(DEFAULT_DEMO_COUPONS);
  const [weeklySchedule, setWeeklySchedule] = useState(DEFAULT_WEEKLY_SCHEDULE);
  const [announcements, setAnnouncements] = useState(DEFAULT_ANNOUNCEMENTS);
  const [auditLogs, setAuditLogs] = useState(DEFAULT_AUDIT_LOGS);

  // Filter & Search states
  const [studentSearch, setStudentSearch] = useState('');
  const [studentStatusFilter, setStudentStatusFilter] = useState('All');
  const [studentCourseFilter, setStudentCourseFilter] = useState('All');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');
  const [selectedDaySchedule, setSelectedDaySchedule] = useState('All');

  // Modals
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showCreateCouponModal, setShowCreateCouponModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [certificateStudent, setCertificateStudent] = useState(null);

  // Form states
  const [newStudent, setNewStudent] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    courseId: defaultCourses[0]?.id || 1,
    status: 'In Progress',
    progress: '25%',
    grade: 'A (92%)',
    attendance: '95%'
  });

  const [newCourse, setNewCourse] = useState({
    title: '',
    level: 'High School',
    duration: '10 Weeks',
    price: 249,
    description: ''
  });

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'fixed',
    value: 50
  });

  const [newScheduleSlot, setNewScheduleSlot] = useState({
    day: 'Monday',
    time: '6:00 PM EST',
    courseTitle: defaultCourses[0]?.title || 'Advanced Mathematics',
    tutor: tutors[0]?.name || 'Dr. Sarah Jenkins',
    room: 'Virtual Room #1'
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    category: 'Exam Alert',
    audience: 'All Students',
    message: ''
  });

  const saveEnrollments = (updated) => {
    setEnrollments(updated);
    try { localStorage.setItem('apex_enrollments', JSON.stringify(updated)); } catch (e) { console.error(e); }
  };

  const saveCustomCourses = (updated) => {
    setCustomCourses(updated);
    try { localStorage.setItem('apex_custom_courses', JSON.stringify(updated)); } catch (e) { console.error(e); }
  };

  // Auth gate
  if (!user || !user.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const allCourses = [...defaultCourses, ...customCourses];

  // Key Calculations
  const totalRevenue = enrollments.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const totalStudents = enrollments.length;
  const activePursuing = enrollments.filter(e => e.status !== 'Completed').length;
  const completedStudents = enrollments.filter(e => e.status === 'Completed').length;
  const completionRate = totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0;
  const avgOrderValue = totalStudents > 0 ? Math.round(totalRevenue / totalStudents) : 0;

  // Monthly Revenue Trend Data (Visual bar chart)
  const monthlyRevenueData = [
    { month: 'Nov', revenue: 8400, height: '40%' },
    { month: 'Dec', revenue: 11200, height: '55%' },
    { month: 'Jan', revenue: 14600, height: '70%' },
    { month: 'Feb', revenue: 16800, height: '80%' },
    { month: 'Mar', revenue: 19400, height: '90%' },
    { month: 'Apr (Current)', revenue: 21850, height: '100%' }
  ];

  // Quick Demo Sale Handler
  const handleQuickDemoSale = () => {
    const demoStudents = [
      { name: 'Lucas Scott', email: 'lucas@example.com', parent: 'Karen Scott' },
      { name: 'Chloe Bennett', email: 'chloe@example.com', parent: 'Thomas Bennett' },
      { name: 'Daniel Kim', email: 'daniel.k@example.com', parent: 'Min Kim' }
    ];
    const pickedStudent = demoStudents[Math.floor(Math.random() * demoStudents.length)];
    const pickedCourse = allCourses[Math.floor(Math.random() * allCourses.length)];
    
    const newRecord = {
      id: `APX-${Math.floor(10000 + Math.random() * 90000)}`,
      studentName: pickedStudent.name,
      parentName: pickedStudent.parent,
      email: pickedStudent.email,
      phone: '(555) 019-2834',
      courseId: pickedCourse.id,
      courseTitle: pickedCourse.title,
      price: pickedCourse.price,
      status: 'In Progress',
      progress: '15%',
      grade: 'A (93%)',
      attendance: '98%',
      date: new Date().toISOString()
    };

    saveEnrollments([newRecord, ...enrollments]);
    setAuditLogs([
      { id: Date.now(), actor: pickedStudent.name, action: `New Order: ${newRecord.id} ($${pickedCourse.price})`, category: 'ENROLLMENT', time: 'Just now', status: 'Success' },
      ...auditLogs
    ]);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo records back to initial template?')) {
      saveEnrollments(DEFAULT_DEMO_ENROLLMENTS);
      setCoupons(DEFAULT_DEMO_COUPONS);
      setWeeklySchedule(DEFAULT_WEEKLY_SCHEDULE);
      setAnnouncements(DEFAULT_ANNOUNCEMENTS);
      saveCustomCourses([]);
    }
  };

  // Filtered Students
  const filteredEnrollments = enrollments.filter((item) => {
    const matchesSearch = 
      item.studentName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      item.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      item.id.toLowerCase().includes(studentSearch.toLowerCase());
    
    const matchesStatus = studentStatusFilter === 'All' || item.status === studentStatusFilter;
    const matchesCourse = studentCourseFilter === 'All' || String(item.courseId) === String(studentCourseFilter);

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Toggle Student Status
  const handleToggleStatus = (id) => {
    const updated = enrollments.map((item) => {
      if (item.id === id) {
        const nextStatus = item.status === 'Completed' ? 'In Progress' : 'Completed';
        const nextProgress = nextStatus === 'Completed' ? '100%' : '50%';
        return { ...item, status: nextStatus, progress: nextProgress };
      }
      return item;
    });
    saveEnrollments(updated);
  };

  // Delete Enrollment
  const handleDeleteEnrollment = (id) => {
    if (window.confirm('Delete this enrollment record?')) {
      saveEnrollments(enrollments.filter(e => e.id !== id));
    }
  };

  // Add Manual Student
  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    const selectedCourseObj = allCourses.find(c => String(c.id) === String(newStudent.courseId)) || allCourses[0];

    const admissionRecord = {
      id: `APX-${Math.floor(10000 + Math.random() * 90000)}`,
      studentName: newStudent.studentName,
      parentName: newStudent.parentName || 'Direct Admission',
      email: newStudent.email,
      phone: newStudent.phone || 'N/A',
      courseId: selectedCourseObj.id,
      courseTitle: selectedCourseObj.title,
      price: selectedCourseObj.price,
      status: newStudent.status,
      progress: newStudent.progress,
      grade: newStudent.grade || 'A (92%)',
      attendance: newStudent.attendance || '95%',
      date: new Date().toISOString()
    };

    saveEnrollments([admissionRecord, ...enrollments]);
    setShowAddStudentModal(false);
  };

  // Add Coupon
  const handleCreateCouponSubmit = (e) => {
    e.preventDefault();
    const createdCoupon = {
      id: `CPN-${Date.now()}`,
      code: newCoupon.code.toUpperCase().trim(),
      discount: newCoupon.type === 'percent' ? `${newCoupon.value}% OFF` : `$${newCoupon.value} OFF`,
      type: newCoupon.type,
      value: Number(newCoupon.value),
      redemptions: 0,
      status: 'Active'
    };
    setCoupons([createdCoupon, ...coupons]);
    setShowCreateCouponModal(false);
    setNewCoupon({ code: '', type: 'fixed', value: 50 });
  };

  // Add Schedule Slot
  const handleCreateScheduleSlot = (e) => {
    e.preventDefault();
    const slot = {
      id: Date.now(),
      day: newScheduleSlot.day,
      time: newScheduleSlot.time,
      courseTitle: newScheduleSlot.courseTitle,
      tutor: newScheduleSlot.tutor,
      room: newScheduleSlot.room,
      isLive: true
    };
    setWeeklySchedule([...weeklySchedule, slot]);
    setShowScheduleModal(false);
  };

  // Add Announcement
  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    const notice = {
      id: Date.now(),
      title: newAnnouncement.title,
      category: newAnnouncement.category,
      audience: newAnnouncement.audience,
      date: 'Today',
      status: 'Active',
      message: newAnnouncement.message
    };
    setAnnouncements([notice, ...announcements]);
    setShowAnnouncementModal(false);
    setNewAnnouncement({ title: '', category: 'Exam Alert', audience: 'All Students', message: '' });
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Receipt ID', 'Student Name', 'Parent Name', 'Email', 'Phone', 'Course', 'Fee Paid', 'Status', 'Progress', 'Grade', 'Attendance'];
    const rows = enrollments.map(e => [
      e.id, `"${e.studentName}"`, `"${e.parentName || ''}"`, `"${e.email}"`, `"${e.phone || ''}"`,
      `"${e.courseTitle}"`, `$${e.price}`, e.status, e.progress, `"${e.grade || 'A'}"`, `"${e.attendance || '95%'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `apex_students_roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-purple-600 animate-ping"></span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Apex Enterprise Admin Suite
              </h1>
              <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Full Master Access
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Live enterprise management: revenue analytics, live timetable, faculty oversight, promo coupons, and audit security.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleQuickDemoSale}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-purple-900/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              + Quick Demo Sale
            </button>

            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Data
            </button>

            <Link
              to="/courses"
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-bold px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Public Catalog <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Master Tab Navigation */}
        <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 mb-8 pb-px">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'students', label: `Students (${enrollments.length})`, icon: <Users className="w-4 h-4" /> },
            { id: 'timetable', label: 'Live Timetable', icon: <Calendar className="w-4 h-4" /> },
            { id: 'financials', label: 'Financials & Coupons', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'courses', label: `Courses (${allCourses.length})`, icon: <BookOpen className="w-4 h-4" /> },
            { id: 'faculty', label: `Faculty (${tutors.length})`, icon: <Video className="w-4 h-4" /> },
            { id: 'announcements', label: 'Announcements', icon: <Bell className="w-4 h-4" /> },
            { id: 'inquiries', label: `Leads (${inquiries.length})`, icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'audit', label: 'Audit Logs', icon: <Shield className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-700 bg-white shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Enrolled</p>
                  <p className="text-3xl font-black text-slate-900">{totalStudents}</p>
                  <p className="text-xs text-blue-600 font-semibold mt-1">{activePursuing} Active Learners</p>
                </div>
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Users className="w-7 h-7" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Gross Revenue</p>
                  <p className="text-3xl font-black text-slate-900">${totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Avg ${avgOrderValue} / student</p>
                </div>
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-7 h-7" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Live Batches Running</p>
                  <p className="text-3xl font-black text-slate-900">{weeklySchedule.length}</p>
                  <p className="text-xs text-purple-600 font-semibold mt-1">Mon - Sun Weekly</p>
                </div>
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-7 h-7" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Completion Rate</p>
                  <p className="text-3xl font-black text-slate-900">{completionRate}%</p>
                  <p className="text-xs text-amber-600 font-semibold mt-1">{completedStudents} Graduates</p>
                </div>
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7" />
                </div>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => setActiveTab('timetable')}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md cursor-pointer transition-all"
              >
                <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Live Weekly Timetable</h3>
                <p className="text-xs text-slate-500 mb-4">View scheduled interactive video batches and assigned faculty.</p>
                <span className="text-xs font-bold text-purple-700 flex items-center gap-1">Open Schedule →</span>
              </div>

              <div 
                onClick={() => setActiveTab('financials')}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md cursor-pointer transition-all"
              >
                <div className="w-10 h-10 bg-green-50 text-green-700 rounded-xl flex items-center justify-center mb-3">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Financials & Coupon Engine</h3>
                <p className="text-xs text-slate-500 mb-4">Review monthly growth trends and manage promotional discounts.</p>
                <span className="text-xs font-bold text-green-700 flex items-center gap-1">Open Financials →</span>
              </div>

              <div 
                onClick={() => setActiveTab('announcements')}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md cursor-pointer transition-all"
              >
                <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Sitewide Announcements</h3>
                <p className="text-xs text-slate-500 mb-4">Broadcast exam dates and campus notices across the platform.</p>
                <span className="text-xs font-bold text-blue-700 flex items-center gap-1">Manage Broadcasts →</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENTS WITH REPORT CARD GENERATOR */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative min-w-[240px] flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search by student name, email, or order ID..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <select
                  value={studentStatusFilter}
                  onChange={(e) => setStudentStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <select
                  value={studentCourseFilter}
                  onChange={(e) => setStudentCourseFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none max-w-[180px] truncate"
                >
                  <option value="All">All Programs</option>
                  {allCourses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Manual Admission
                </button>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
                >
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4">Receipt</th>
                      <th className="px-6 py-4">Student & Contact</th>
                      <th className="px-6 py-4">Program</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Progress</th>
                      <th className="px-6 py-4">Grade & Attendance</th>
                      <th className="px-6 py-4 text-right">Academic Report</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredEnrollments.map((en) => (
                      <tr key={en.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-mono font-semibold text-xs text-slate-700">#{en.id}</td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{en.studentName}</p>
                          <p className="text-xs text-slate-500">{en.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                            {en.courseTitle}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleStatus(en.id)}
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              en.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {en.status}
                          </button>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs font-semibold">{en.progress || '50%'}</td>
                        <td className="px-6 py-4 text-xs">
                          <span className="font-bold text-purple-700 block">{en.grade || 'A (92%)'}</span>
                          <span className="text-slate-400">Att: {en.attendance || '95%'}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setCertificateStudent(en)}
                            className="inline-flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors border border-purple-200"
                          >
                            <Award className="w-3.5 h-3.5" />
                            Generate Report
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteEnrollment(en.id)}
                            className="text-slate-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WEEKLY LIVE CLASS TIMETABLE */}
        {activeTab === 'timetable' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Live Interactive Class Schedule</h2>
                <p className="text-xs text-slate-500">Master schedule of all recurring cohorts and room assignments</p>
              </div>

              <button
                onClick={() => setShowScheduleModal(true)}
                className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" /> + Schedule Class Slot
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDaySchedule(day)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedDaySchedule === day
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weeklySchedule
                .filter(slot => selectedDaySchedule === 'All' || slot.day === selectedDaySchedule)
                .map((slot) => (
                <div key={slot.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full uppercase">
                        {slot.day}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {slot.time}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 mb-1">{slot.courseTitle}</h3>
                    <p className="text-xs text-slate-500 mb-4">Faculty: <strong className="text-slate-700">{slot.tutor}</strong></p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600 font-mono">{slot.room}</span>
                    <Link
                      to="/live-class/1"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Video className="w-3.5 h-3.5" /> Room
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FINANCIALS & DISCOUNT PROMO COUPONS */}
        {activeTab === 'financials' && (
          <div className="space-y-8">
            {/* Visual Revenue Growth Bar Chart */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Gross Revenue Velocity (Last 6 Months)</h3>
                  <p className="text-xs text-slate-500">Monthly student tuition collections and payment processing trend</p>
                </div>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  ↑ +26% Month-over-Month
                </span>
              </div>

              <div className="grid grid-cols-6 gap-3 sm:gap-6 items-end h-56 pt-6 border-b border-slate-100">
                {monthlyRevenueData.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[11px] font-bold text-slate-700 font-mono">${(item.revenue / 1000).toFixed(1)}k</span>
                    <div 
                      className="w-full max-w-[48px] bg-gradient-to-t from-purple-700 to-indigo-500 rounded-t-xl transition-all duration-500 hover:brightness-110 shadow-sm"
                      style={{ height: item.height }}
                    ></div>
                    <span className="text-[11px] font-semibold text-slate-500">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupons Management */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Promotional Discount Engine</h3>
                  <p className="text-xs text-slate-500">Create and monitor coupon codes redeemed during checkout</p>
                </div>

                <button
                  onClick={() => setShowCreateCouponModal(true)}
                  className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors"
                >
                  <Tag className="w-4 h-4" /> + Create Promo Code
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coupons.map((c) => (
                  <div key={c.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-base font-extrabold text-purple-700 tracking-wider">
                          {c.code}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                          {c.status}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-1">{c.discount}</p>
                      <p className="text-xs text-slate-500">Applicable to all live cohorts</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                      <span>Redemptions: <strong className="text-slate-800">{c.redemptions}</strong></span>
                      <button
                        onClick={() => setCoupons(coupons.filter(x => x.id !== c.id))}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COURSE CATALOG */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Manage Course Offerings</h2>
                <p className="text-xs text-slate-500">Configure curriculums, live schedules, and active programs</p>
              </div>
              <button
                onClick={() => setShowAddCourseModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add New Course
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{course.title}</h3>
                    <p className="text-xs text-slate-500 mb-4">{course.level} • {course.duration}</p>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4">{course.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="font-mono text-purple-700 text-base">${course.price}.00</span>
                    <span className="text-slate-500">{course.isLive ? '🔴 Live Batch' : 'Self-Paced'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: FACULTY */}
        {activeTab === 'faculty' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Faculty & Tutor Directory</h2>
              <p className="text-xs text-slate-500 mb-6">Verified university educators and their teaching performance</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutors.map((tutor) => (
                  <div key={tutor.id} className="p-5 rounded-2xl border border-slate-200/80 hover:shadow-md transition-shadow flex items-start gap-4">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-900 truncate">{tutor.name}</h4>
                        <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5 shrink-0">
                          <Star className="w-3 h-3 fill-current" /> {tutor.rating}
                        </span>
                      </div>
                      <p className="text-xs text-purple-700 font-medium truncate">{tutor.subject}</p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{tutor.credentials}</p>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{tutor.studentsTaught} Students</span>
                        <span className="text-green-600 font-semibold">{tutor.activeBatches} Batches</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Broadcast Noticeboard</h2>
                <p className="text-xs text-slate-500">Publish alerts and announcements visible across the site</p>
              </div>
              <button
                onClick={() => setShowAnnouncementModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> New Announcement
              </button>
            </div>

            <div className="space-y-4">
              {announcements.map((a) => (
                <div key={a.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full">
                        {a.category}
                      </span>
                      <span className="text-xs text-slate-400">• Audience: {a.audience}</span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900">{a.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{a.message}</p>
                  </div>
                  <button
                    onClick={() => setAnnouncements(announcements.filter(x => x.id !== a.id))}
                    className="text-xs text-red-500 font-bold self-start sm:self-auto hover:underline"
                  >
                    Archive Notice
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: LEADS & INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Contact Form Submissions</h2>
                <p className="text-xs text-slate-500">Live prospective inquiries submitted through the contact page</p>
              </div>

              <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                {['All', 'New', 'Contacted', 'Enrolled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setInquiryStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      inquiryStatusFilter === st ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inquiries
                .filter(inq => inquiryStatusFilter === 'All' || inq.status === inquiryStatusFilter)
                .map((inq) => (
                <div key={inq.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900">{inq.name}</h4>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        inq.status === 'Enrolled' ? 'bg-green-100 text-green-700' :
                        inq.status === 'Contacted' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {inq.status || 'New'}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-400 mb-2">{inq.email}</p>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl italic">"{inq.message}"</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">{inq.date ? new Date(inq.date).toLocaleDateString() : 'Recent'}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const updated = inquiries.map(item => item.id === inq.id ? { ...item, status: 'Contacted' } : item);
                          setInquiries(updated);
                          try { localStorage.setItem('apex_inquiries', JSON.stringify(updated)); } catch (_e) {}
                        }}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        Mark Contacted
                      </button>
                      <button
                        onClick={() => {
                          const updated = inquiries.map(item => item.id === inq.id ? { ...item, status: 'Enrolled' } : item);
                          setInquiries(updated);
                          try { localStorage.setItem('apex_inquiries', JSON.stringify(updated)); } catch (_e) {}
                        }}
                        className="text-xs font-bold text-green-600 hover:underline"
                      >
                        Mark Enrolled
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Security & Real-Time Audit Log</h2>
              <p className="text-xs text-slate-500">Immutable trace of all financial transactions, doubts, and administrative actions</p>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-mono">
                      {log.category}
                    </span>
                    <span className="font-bold text-slate-900">{log.actor}</span>
                    <span className="text-slate-600">{log.action}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono">{log.time}</span>
                    <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">{log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL: STUDENT REPORT CARD / CERTIFICATE OF ACHIEVEMENT */}
      {certificateStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setCertificateStudent(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Canvas / Card */}
            <div className="p-8 border-4 border-double border-purple-200 rounded-3xl bg-gradient-to-b from-white via-slate-50/50 to-purple-50/30 text-center space-y-6 shadow-inner">
              <div className="inline-flex p-3 bg-purple-600 text-white rounded-2xl shadow-md">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-700">Apex Learning Academic Council</span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">Official Student Performance Transcript</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Record ID: {certificateStudent.id} • Issued {certificateStudent.date ? new Date(certificateStudent.date).toLocaleDateString() : 'Academic Term 2026'}
                </p>
              </div>

              <div className="py-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider">This officially certifies the academic achievement of</p>
                <h3 className="text-3xl font-extrabold text-slate-900 font-serif my-2 text-purple-900">
                  {certificateStudent.studentName}
                </h3>
                <p className="text-xs text-slate-600">
                  for outstanding participation and mastery in <strong className="text-slate-900">{certificateStudent.courseTitle}</strong>.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Academic Grade</span>
                  <span className="text-lg font-black text-purple-700">{certificateStudent.grade || 'A (92%)'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Attendance Score</span>
                  <span className="text-lg font-black text-green-700">{certificateStudent.attendance || '96%'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Curriculum Progress</span>
                  <span className="text-lg font-black text-blue-700">{certificateStudent.progress || '75%'}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 px-6">
                <div className="text-center">
                  <div className="font-serif italic text-sm text-slate-800">Dr. Sarah Jenkins</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Faculty Academic Dean</div>
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-purple-300 flex items-center justify-center text-[10px] font-bold text-purple-700 rotate-[-12deg] bg-purple-50/60">
                  VERIFIED SEAL
                </div>
                <div className="text-center">
                  <div className="font-serif italic text-sm text-slate-800">Administrator</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Director of Academics</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setCertificateStudent(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Transcript / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE COUPON */}
      {showCreateCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-100 relative">
            <button onClick={() => setShowCreateCouponModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Create Promotional Coupon</h2>
            <p className="text-xs text-slate-500 mb-6">Generates an instant discount promo code for checkout.</p>
            <form onSubmit={handleCreateCouponSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Promo Code (e.g. APEX100) *</label>
                <input
                  type="text"
                  required
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  placeholder="APEX50"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono uppercase focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Type</label>
                  <select
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="fixed">Fixed Dollar ($)</option>
                    <option value="percent">Percentage (%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Value *</label>
                  <input
                    type="number"
                    required
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowCreateCouponModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md">Create Promo Code</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SCHEDULE CLASS */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-100 relative">
            <button onClick={() => setShowScheduleModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Schedule Live Batch Slot</h2>
            <p className="text-xs text-slate-500 mb-6">Assign an educator and recurring timetable slot.</p>
            <form onSubmit={handleCreateScheduleSlot} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Program *</label>
                <select
                  value={newScheduleSlot.courseTitle}
                  onChange={(e) => setNewScheduleSlot({ ...newScheduleSlot, courseTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  {allCourses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Day of Week</label>
                  <select
                    value={newScheduleSlot.day}
                    onChange={(e) => setNewScheduleSlot({ ...newScheduleSlot, day: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="text"
                    value={newScheduleSlot.time}
                    onChange={(e) => setNewScheduleSlot({ ...newScheduleSlot, time: e.target.value })}
                    placeholder="6:00 PM EST"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Faculty Member</label>
                <select
                  value={newScheduleSlot.tutor}
                  onChange={(e) => setNewScheduleSlot({ ...newScheduleSlot, tutor: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  {tutors.map(t => <option key={t.id} value={t.name}>{t.name} ({t.subject})</option>)}
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowScheduleModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md">Add to Timetable</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NEW ANNOUNCEMENT */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-100 relative">
            <button onClick={() => setShowAnnouncementModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Create Sitewide Broadcast</h2>
            <p className="text-xs text-slate-500 mb-6">Publish an alert banner across the student and public portal.</p>
            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Announcement Headline *</label>
                <input
                  type="text"
                  required
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  placeholder="e.g. Special Weekend SAT Mock Test"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newAnnouncement.category}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="Exam Alert">Exam Alert</option>
                    <option value="Special Offer">Special Offer</option>
                    <option value="Platform Update">Platform Update</option>
                    <option value="Holiday Notice">Holiday Notice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Audience</label>
                  <input
                    type="text"
                    value={newAnnouncement.audience}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, audience: e.target.value })}
                    placeholder="All Students"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Broadcast Message Body *</label>
                <textarea
                  rows="3"
                  required
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                  placeholder="Details of the announcement..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAnnouncementModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md">Publish Sitewide</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MANUAL STUDENT ADMISSION */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-slate-100 relative">
            <button onClick={() => setShowAddStudentModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Manual Student Admission</h2>
            <p className="text-xs text-slate-500 mb-6">Register an offline or walk-in student directly into the database.</p>
            <form onSubmit={handleAddStudentSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newStudent.studentName}
                    onChange={(e) => setNewStudent({ ...newStudent, studentName: e.target.value })}
                    placeholder="Emma Brown"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Name</label>
                  <input
                    type="text"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                    placeholder="Robert Brown"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="emma@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="(555) 000-1111"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Program *</label>
                <select
                  value={newStudent.courseId}
                  onChange={(e) => setNewStudent({ ...newStudent, courseId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  {allCourses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title} (${c.price})</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddStudentModal(false)} className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/30">Complete Admission</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD COURSE */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-slate-100 relative">
            <button onClick={() => setShowAddCourseModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Publish New Program</h2>
            <p className="text-xs text-slate-500 mb-6">This program will immediately appear in the catalog.</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newCourseObj = {
                id: Date.now(),
                title: newCourse.title,
                level: newCourse.level,
                duration: newCourse.duration,
                price: Number(newCourse.price) || 199,
                description: newCourse.description || 'Curriculum led by expert educators.',
                icon: <BookOpen className="w-6 h-6 text-blue-600" />
              };
              saveCustomCourses([...customCourses, newCourseObj]);
              setShowAddCourseModal(false);
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="e.g. Data Structures & Algorithms"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Level *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                    placeholder="High School"
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
                    placeholder="10 Weeks"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fee ($ USD) *</label>
                <input
                  type="number"
                  required
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddCourseModal(false)} className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md">Publish Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
