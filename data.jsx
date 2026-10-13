import { BookOpen, Calculator, Atom, Code, Globe, PenTool, Award, Briefcase, Microscope } from 'lucide-react';
import React from 'react';

export const tutors = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    subject: 'Mathematics & Physics',
    credentials: 'Ex-MIT Faculty • Ph.D. Applied Mathematics',
    rating: 4.95,
    studentsTaught: '1,420+',
    bio: 'Former university professor with 15+ years of experience turning abstract math into intuitive, visual concepts.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    activeBatches: 3,
    doubtResponseTime: '< 15 mins'
  },
  {
    id: 2,
    name: 'Mark Davis',
    subject: 'Computer Science & AI',
    credentials: 'Ex-Google Staff Engineer • Stanford M.S.',
    rating: 4.92,
    studentsTaught: '2,100+',
    bio: 'Software engineer and coding mentor passionate about preparing high schoolers and college students for top tech careers.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    activeBatches: 2,
    doubtResponseTime: '< 20 mins'
  },
  {
    id: 3,
    name: 'Emily Chen',
    subject: 'English & Literature',
    credentials: 'Harvard M.A. • Published Author & Essay Coach',
    rating: 4.89,
    studentsTaught: '980+',
    bio: 'Published author helping students master analytical reading, compelling college essays, and persuasive debate.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    activeBatches: 2,
    doubtResponseTime: '< 30 mins'
  },
  {
    id: 4,
    name: 'Robert Sterling',
    subject: 'SAT & ACT Test Prep',
    credentials: '10+ Years Perfect 1600 Scorer Coach',
    rating: 4.98,
    studentsTaught: '3,200+',
    bio: 'Master test strategist whose students consistently achieve 99th percentile SAT/ACT results and Ivy League admissions.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    activeBatches: 4,
    doubtResponseTime: '< 10 mins'
  },
  {
    id: 5,
    name: 'Dr. Aris Thorne',
    subject: 'Biology & Life Sciences',
    credentials: 'Johns Hopkins Research Fellow • MD Candidate',
    rating: 4.91,
    studentsTaught: '850+',
    bio: 'Specialist in AP Biology, cellular genetics, and pre-med foundation courses with interactive digital labs.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    activeBatches: 2,
    doubtResponseTime: '< 25 mins'
  },
  {
    id: 6,
    name: 'Elena Rostova',
    subject: 'Business & Economics',
    credentials: 'Wharton MBA • Former McKinsey Consultant',
    rating: 4.88,
    studentsTaught: '720+',
    bio: 'Demystifying macroeconomics, business leadership, and financial literacy for aspiring entrepreneurs.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
    activeBatches: 1,
    doubtResponseTime: '< 35 mins'
  }
];

export const courses = [
  {
    id: 1,
    title: 'Advanced Mathematics',
    description: 'Master calculus, algebra, and geometry with interactive whiteboard sessions and live problem solving.',
    icon: <Calculator className="w-6 h-6 text-blue-600" />,
    level: 'High School / College Prep',
    duration: '12 Weeks',
    price: 299,
    isLive: true,
    liveSchedule: 'Mon, Wed & Fri • 6:30 PM EST',
    nextClass: 'Today, 6:30 PM (Starts in 45m)',
    batchSize: 'Max 12 Students • Small Group',
    rating: 4.95,
    enrolledCount: 142,
    instructor: tutors[0], // Dr. Sarah Jenkins
    syllabus: [
      'Limits, Continuity & Derivative Foundations',
      'Integration Techniques & Area Under Curves',
      'Multivariable Calculus & Real-World Modeling',
      'Exam Practice & 1-on-1 Doubt Sessions'
    ]
  },
  {
    id: 2,
    title: 'Physics & Chemistry',
    description: 'Explore Newtonian mechanics, electromagnetism, and chemical stoichiometry with visual simulations.',
    icon: <Atom className="w-6 h-6 text-blue-600" />,
    level: 'High School',
    duration: '10 Weeks',
    price: 249,
    isLive: true,
    liveSchedule: 'Tue & Thu • 5:00 PM EST',
    nextClass: 'Tomorrow, 5:00 PM',
    batchSize: 'Max 15 Students',
    rating: 4.91,
    enrolledCount: 98,
    instructor: tutors[0], // Dr. Sarah Jenkins
    syllabus: [
      'Kinematics, Forces & Energy Conservation',
      'Thermodynamics & Fluid Dynamics',
      'Atomic Structure & Chemical Bonding',
      'Acids, Bases & Reaction Equilibrium'
    ]
  },
  {
    id: 3,
    title: 'Computer Science & Python',
    description: 'Learn modern programming, algorithmic problem-solving, and web development using Python and JavaScript.',
    icon: <Code className="w-6 h-6 text-blue-600" />,
    level: 'Beginner to Advanced',
    duration: '16 Weeks',
    price: 349,
    isLive: true,
    liveSchedule: 'Mon & Thu • 7:00 PM EST',
    nextClass: 'Today, 7:00 PM (Live Soon)',
    batchSize: 'Max 10 Students • Coding Lab',
    rating: 4.98,
    enrolledCount: 185,
    instructor: tutors[1], // Mark Davis
    syllabus: [
      'Core Python Syntax & Object-Oriented Principles',
      'Data Structures: Trees, Graphs & Hash Maps',
      'Full-Stack Web Development Basics',
      'Building Capstone AI & Web Projects'
    ]
  },
  {
    id: 4,
    title: 'SAT & ACT Comprehensive Prep',
    description: 'Target 1500+ with proprietary test-taking frameworks, speed strategies, and 8 full-length simulated exams.',
    icon: <Award className="w-6 h-6 text-blue-600" />,
    level: 'High School Seniors',
    duration: '8 Weeks',
    price: 399,
    isLive: true,
    liveSchedule: 'Sat & Sun • 11:00 AM EST',
    nextClass: 'Saturday, 11:00 AM',
    batchSize: 'Max 12 Students • Intensive',
    rating: 4.99,
    enrolledCount: 310,
    instructor: tutors[3], // Robert Sterling
    syllabus: [
      'SAT Math Grid-In Tricks & Geometry Hacks',
      'Reading Comprehension: Speed & Accuracy',
      'Grammar & Rhetorical Skills Mastery',
      'Full Practice Exam Diagnostic & Scoring'
    ]
  },
  {
    id: 5,
    title: 'Biology & Life Sciences',
    description: 'Deep dive into cell biology, genetic inheritance, molecular biochemistry, and physiological systems.',
    icon: <Microscope className="w-6 h-6 text-blue-600" />,
    level: 'Middle & High School',
    duration: '12 Weeks',
    price: 279,
    isLive: true,
    liveSchedule: 'Wed & Sat • 4:00 PM EST',
    nextClass: 'Wednesday, 4:00 PM',
    batchSize: 'Max 15 Students',
    rating: 4.88,
    enrolledCount: 76,
    instructor: tutors[4], // Dr. Aris Thorne
    syllabus: [
      'Cellular Metabolism & Photosynthesis',
      'DNA Replication, Transcription & Translation',
      'Mendelian Genetics & Gene Editing (CRISPR)',
      'Organ Systems & Homeostasis'
    ]
  },
  {
    id: 6,
    title: 'Business & Economics',
    description: 'Introduction to micro/macro economics, financial accounting, and modern enterprise leadership.',
    icon: <Briefcase className="w-6 h-6 text-blue-600" />,
    level: 'High School / College Prep',
    duration: '10 Weeks',
    price: 229,
    isLive: false,
    liveSchedule: 'Self-Paced with Weekly Q&A',
    nextClass: 'Every Friday • Office Hours',
    batchSize: 'Flexible Enrollment',
    rating: 4.86,
    enrolledCount: 64,
    instructor: tutors[5], // Elena Rostova
    syllabus: [
      'Supply, Demand & Market Equilibrium',
      'Fiscal Policy, Inflation & Central Banking',
      'Startup Financial Modeling & Valuation',
      'Case Studies: Modern Tech Unicorns'
    ]
  },
  {
    id: 7,
    title: 'English Literature & Composition',
    description: 'Enhance your analytical reading, essay crafting, and literary arguments with classic and contemporary texts.',
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    level: 'Middle & High School',
    duration: '8 Weeks',
    price: 199,
    isLive: true,
    liveSchedule: 'Tue & Fri • 6:00 PM EST',
    nextClass: 'Friday, 6:00 PM',
    batchSize: 'Max 12 Students',
    rating: 4.93,
    enrolledCount: 112,
    instructor: tutors[2], // Emily Chen
    syllabus: [
      'Thesis Statement Construction & Evidence Synthesis',
      'Rhetorical Analysis & Persuasive Devices',
      'Creative Narrative & Voice Workshop',
      'College Admission Essay Polishing'
    ]
  },
  {
    id: 8,
    title: 'Global Languages & Fluency',
    description: 'Conversational fluency programs in Spanish, French, and Mandarin taught by native certified educators.',
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    level: 'All Levels',
    duration: 'Ongoing',
    price: 149,
    isLive: false,
    liveSchedule: 'Flexible Practice Sessions',
    nextClass: 'Weekly Group Conversation Labs',
    batchSize: 'Small Groups',
    rating: 4.85,
    enrolledCount: 52,
    instructor: tutors[2], // Emily Chen
    syllabus: [
      'Phonetics & Everyday Conversation Basics',
      'Grammar Essentials & Sentence Structure',
      'Cultural Immersion & Media Analysis',
      'Professional & Academic Fluency Drills'
    ]
  },
  {
    id: 9,
    title: 'Creative Writing & Storytelling',
    description: 'Unleash your creative voice and master storytelling mechanics, poetry, and narrative architecture.',
    icon: <PenTool className="w-6 h-6 text-blue-600" />,
    level: 'Middle School',
    duration: '6 Weeks',
    price: 179,
    isLive: false,
    liveSchedule: 'Self-Paced with Peer Review',
    nextClass: 'Weekly Feedback Sessions',
    batchSize: 'Open Enrollment',
    rating: 4.9,
    enrolledCount: 44,
    instructor: tutors[2], // Emily Chen
    syllabus: [
      'Character Development & World Building',
      'Plot Arcs, Pacing & Suspense Techniques',
      'Poetic Forms, Imagery & Metaphor',
      'Publishing Your First Short Story'
    ]
  }
];

export const defaultDoubts = [
  {
    id: 'DBT-501',
    studentName: 'Jessica Taylor',
    studentEmail: 'jessica@student.demo',
    courseId: 1,
    courseTitle: 'Advanced Mathematics',
    instructorId: 1,
    instructorName: 'Dr. Sarah Jenkins',
    question: 'How do I evaluate the limit lim(x->0) (sin 3x) / (5x) without using L\'Hopital\'s Rule?',
    topic: 'Calculus Limits',
    status: 'Pending',
    date: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 mins ago
    solution: null
  },
  {
    id: 'DBT-498',
    studentName: 'Alex Johnson',
    studentEmail: 'alex.j@example.com',
    courseId: 1,
    courseTitle: 'Advanced Mathematics',
    instructorId: 1,
    instructorName: 'Dr. Sarah Jenkins',
    question: 'When finding the inflection points of f(x) = x^4 - 4x^3, why is f\'\'(x) = 0 not sufficient by itself?',
    topic: 'Second Derivatives & Concavity',
    status: 'Resolved',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    solution: 'Great question Alex! f\'\'(x) = 0 is a candidate point, but for an actual inflection point to exist, the concavity must strictly CHANGE sign across that point (from positive to negative or vice versa). For f(x) = x^4 - 4x^3: f\'(x) = 4x^3 - 12x^2, and f\'\'(x) = 12x^2 - 24x = 12x(x - 2). Setting to 0 gives x = 0 and x = 2. Checking intervals: for x < 0: f\'\' > 0; 0 < x < 2: f\'\' < 0; x > 2: f\'\' > 0. Since sign changes at both x=0 and x=2, both are true inflection points!'
  },
  {
    id: 'DBT-495',
    studentName: 'Michael Brown',
    studentEmail: 'michael.b@example.com',
    courseId: 3,
    courseTitle: 'Computer Science & Python',
    instructorId: 2,
    instructorName: 'Mark Davis',
    question: 'What is the time complexity difference between a Python list append vs insert(0, item)?',
    topic: 'Data Structures & Big-O',
    status: 'Pending',
    date: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    solution: null
  }
];

export const testimonials = [
  {
    id: 1,
    text: "My son's math grades improved dramatically after just one month at Apex Learning. Dr. Sarah Jenkins is incredibly patient and explains complex calculus visually.",
    author: "Rachel M.",
    role: "Parent of High School Senior"
  },
  {
    id: 2,
    text: "The Computer Science live batch with Mark Davis helped me ace my AP exam and build my first machine learning project. The doubt solving speed was amazing!",
    author: "James T.",
    role: "Computer Science Student"
  },
  {
    id: 3,
    text: "Robert Sterling's SAT test prep boosted my score by 210 points! The live small-group sessions gave me the confidence I needed to get into my dream college.",
    author: "Sophia L.",
    role: "SAT Test Prep Graduate"
  }
];

export const getStoredCourses = () => {
  try {
    const custom = JSON.parse(localStorage.getItem('apex_custom_courses') || '[]');
    if (Array.isArray(custom) && custom.length > 0) {
      const hydratedCustom = custom.map(c => ({
        ...c,
        icon: c.icon || <BookOpen className="w-6 h-6 text-blue-600" />,
        instructor: c.instructor || tutors[0],
        rating: c.rating || 4.9,
        enrolledCount: c.enrolledCount || 12,
        isLive: c.isLive ?? true
      }));
      return [...courses, ...hydratedCustom];
    }
  } catch (err) {
    console.error('Error reading custom courses:', err);
  }
  return courses;
};

export const getStoredDoubts = () => {
  try {
    const stored = localStorage.getItem('apex_doubts');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    localStorage.setItem('apex_doubts', JSON.stringify(defaultDoubts));
  } catch (err) {
    console.error('Error reading doubts:', err);
  }
  return defaultDoubts;
};

export const saveStoredDoubts = (doubts) => {
  try {
    localStorage.setItem('apex_doubts', JSON.stringify(doubts));
  } catch (err) {
    console.error('Error saving doubts:', err);
  }
};
