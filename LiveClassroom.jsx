import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Mic, MicOff, Video, VideoOff, Hand, MessageSquare, Users, 
  PhoneOff, Send, Download, ArrowLeft, PenTool 
} from 'lucide-react';
import { getStoredCourses } from '../data';

const DEFAULT_CHAT_MESSAGES = [
  { id: 1, sender: 'Alex Johnson', text: 'Good evening Dr. Jenkins! Ready for calculus.', time: '6:30 PM', isTeacher: false },
  { id: 2, sender: 'Dr. Sarah Jenkins', text: 'Welcome everyone! Today we will master limits with trigonometric substitutions.', time: '6:31 PM', isTeacher: true },
  { id: 3, sender: 'Emma Watson', text: 'Question: Will we cover limits tending to infinity as well?', time: '6:32 PM', isTeacher: false },
  { id: 4, sender: 'Dr. Sarah Jenkins', text: 'Yes Emma, right after the fundamental sin(x)/x identity proof.', time: '6:33 PM', isTeacher: true }
];

const LiveClassroom = () => {
  const { courseId } = useParams();
  const allCourses = getStoredCourses();
  const course = allCourses.find(c => String(c.id) === String(courseId)) || allCourses[0];

  // Classroom States
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [handNotification, setHandNotification] = useState(false);
  const [activeView, setActiveView] = useState('camera'); // 'camera' | 'whiteboard' | 'slides'
  const [activeSidebarTab, setActiveSidebarTab] = useState('chat'); // 'chat' | 'participants' | 'notes'
  const [slideIndex, setSlideIndex] = useState(0);

  // Chat State
  const [messages, setMessages] = useState(DEFAULT_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState('');
  const [reactions, setReactions] = useState([]);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTeacher: false
    };

    setMessages(prev => [...prev, newMsg]);
    setChatInput('');

    // Simulated Teacher reply after 2 seconds
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: course.instructor?.name || 'Instructor',
          text: `Great point! Let's examine that directly on the board.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isTeacher: true
        }
      ]);
    }, 2000);
  };

  const handleToggleHand = () => {
    const nextState = !isHandRaised;
    setIsHandRaised(nextState);
    if (nextState) {
      setHandNotification(true);
      setTimeout(() => setHandNotification(false), 4000);
    }
  };

  const triggerReaction = (emoji) => {
    const id = Date.now();
    setReactions(prev => [...prev, { id, emoji }]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== id));
    }, 2500);
  };

  const slides = [
    { title: "Fundamental Theorem of Limits", formula: "lim (x->0) [sin(x) / x] = 1", notes: "Core theorem for all trigonometric derivative proofs." },
    { title: "Substitution Rule Application", formula: "lim (x->0) [sin(kx) / kx] = 1", notes: "Scale numerator and denominator by constant k." },
    { title: "Practice Problem Drill", formula: "Evaluate lim (x->0) [tan(4x) / 7x]", notes: "Recall tan(u) = sin(u)/cos(u) and separate factors." }
  ];

  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col overflow-hidden select-none">
      
      {/* Top Header */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            to="/courses"
            className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold py-1.5 px-2.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Exit Room
          </Link>
          <div className="h-4 w-px bg-slate-800"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <h1 className="font-bold text-sm sm:text-base text-slate-100 truncate max-w-xs sm:max-w-md">
                {course.title}
              </h1>
              <span className="text-[10px] bg-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded-full border border-red-500/30 uppercase tracking-wider">
                LIVE SESSION
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/50">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>14 Students Online</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveView('camera')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors ${
                activeView === 'camera' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Teacher
            </button>
            <button
              onClick={() => setActiveView('whiteboard')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors ${
                activeView === 'whiteboard' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Whiteboard
            </button>
            <button
              onClick={() => setActiveView('slides')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors ${
                activeView === 'slides' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Slides
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace (Stage + Sidebar) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Floating Hand Raise Toast Notification */}
        {handNotification && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
            <Hand className="w-4 h-4 fill-current" />
            <span>You raised your hand! The instructor has been alerted.</span>
          </div>
        )}

        {/* Floating Reactions Emojis */}
        <div className="absolute bottom-20 left-10 z-40 pointer-events-none space-y-2">
          {reactions.map(r => (
            <div key={r.id} className="text-3xl animate-float-up opacity-90">
              {r.emoji}
            </div>
          ))}
        </div>

        {/* Center Presentation Stage */}
        <div className="flex-1 bg-slate-950 flex flex-col relative overflow-hidden">
          
          {/* STAGE: 1. TEACHER CAMERA VIEW */}
          {activeView === 'camera' && (
            <div className="flex-1 relative flex items-center justify-center p-4">
              <div className="w-full h-full max-w-5xl rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative flex items-center justify-center">
                <img
                  src={course.instructor?.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"}
                  alt={course.instructor?.name}
                  className="w-full h-full object-cover brightness-95"
                />

                {/* Teacher Name Tag Badge */}
                <div className="absolute bottom-6 left-6 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/80 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <div>
                    <p className="font-bold text-sm text-white">{course.instructor?.name || 'Dr. Sarah Jenkins'}</p>
                    <p className="text-[10px] text-purple-300 font-medium">{course.instructor?.credentials || 'Lead Instructor'}</p>
                  </div>
                </div>

                {/* Live HD Streaming Overlay Badge */}
                <div className="absolute top-6 right-6 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> 1080p 60fps Live Stream
                </div>
              </div>
            </div>
          )}

          {/* STAGE: 2. INTERACTIVE WHITEBOARD VIEW */}
          {activeView === 'whiteboard' && (
            <div className="flex-1 p-4 flex items-center justify-center">
              <div className="w-full h-full max-w-5xl bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-purple-400" />
                    <h3 className="font-bold text-base text-slate-200">Live Mathematical Canvas</h3>
                  </div>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-mono">
                    Real-time Teacher Pen
                  </span>
                </div>

                <div className="py-8 space-y-6 font-mono text-center">
                  <p className="text-slate-400 text-sm">Theorem 3.2: Trigonometric Limit Derivation</p>
                  <div className="bg-slate-950 p-6 rounded-2xl border border-purple-500/30 max-w-lg mx-auto shadow-inner text-purple-300 text-xl font-bold">
                    lim (x → 0) [ sin(3x) / 5x ] = 3/5
                  </div>
                  <div className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                    "Notice that we multiply numerator and denominator by 3 so that sin(u)/u equals 1 as u approaches 0."
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs text-slate-500">
                  <span>Teacher is annotating step 4...</span>
                  <span className="text-purple-400 font-semibold">Whiteboard Auto-Saved</span>
                </div>
              </div>
            </div>
          )}

          {/* STAGE: 3. PRESENTATION SLIDES VIEW */}
          {activeView === 'slides' && (
            <div className="flex-1 p-4 flex items-center justify-center">
              <div className="w-full h-full max-w-5xl bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl flex flex-col justify-between">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Slide {slideIndex + 1} of {slides.length}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSlideIndex(prev => Math.max(0, prev - 1))}
                      disabled={slideIndex === 0}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
                      disabled={slideIndex === slides.length - 1}
                      className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-xs font-semibold"
                    >
                      Next Slide
                    </button>
                  </div>
                </div>

                <div className="my-auto text-center space-y-4 p-6">
                  <h2 className="text-2xl font-bold text-white">{slides[slideIndex].title}</h2>
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 max-w-md mx-auto font-mono text-lg text-purple-300">
                    {slides[slideIndex].formula}
                  </div>
                  <p className="text-sm text-slate-400 max-w-lg mx-auto">{slides[slideIndex].notes}</p>
                </div>

                <div className="text-center text-xs text-slate-500">
                  Curriculum aligned to AP & College Board Standard
                </div>
              </div>
            </div>
          )}

          {/* Bottom Interactive Control Toolbar */}
          <div className="h-20 bg-slate-900/90 backdrop-blur-md border-t border-slate-800/80 px-6 flex items-center justify-between shrink-0">
            {/* Quick Reactions Bar */}
            <div className="flex items-center gap-1.5 bg-slate-800/60 p-1.5 rounded-2xl border border-slate-700/40">
              {['👏', '💡', '❤️', '🔥', '✋'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => triggerReaction(emoji)}
                  className="hover:scale-125 transition-transform p-1 text-base"
                  title="Send reaction"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Core Conference Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3.5 rounded-2xl transition-all shadow-md ${
                  isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
                title={isMuted ? "Unmute Mic" : "Mute Mic"}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3.5 rounded-2xl transition-all shadow-md ${
                  !isVideoOn ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
                title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={handleToggleHand}
                className={`px-4 py-3 rounded-2xl font-semibold text-xs flex items-center gap-2 transition-all shadow-md ${
                  isHandRaised
                    ? 'bg-amber-500 text-slate-950 font-bold scale-105'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <Hand className={`w-4 h-4 ${isHandRaised ? 'fill-current' : ''}`} />
                <span>{isHandRaised ? 'Hand Raised' : 'Raise Hand'}</span>
              </button>
            </div>

            {/* Leave / Exit */}
            <Link
              to="/courses"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-red-900/30 transition-colors"
            >
              <PhoneOff className="w-4 h-4" /> Leave Session
            </Link>
          </div>
        </div>

        {/* Right Interactive Sidebar */}
        <div className="w-80 sm:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0">
          {/* Sidebar Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/60 p-2 gap-1">
            <button
              onClick={() => setActiveSidebarTab('chat')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
                activeSidebarTab === 'chat' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Live Chat
            </button>
            <button
              onClick={() => setActiveSidebarTab('participants')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
                activeSidebarTab === 'participants' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Students (14)
            </button>
            <button
              onClick={() => setActiveSidebarTab('notes')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
                activeSidebarTab === 'notes' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Download className="w-3.5 h-3.5" /> Notes
            </button>
          </div>

          {/* TAB 1: LIVE CHAT */}
          {activeSidebarTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-bold ${m.isTeacher ? 'text-purple-400' : 'text-slate-300'}`}>
                        {m.sender} {m.isTeacher && <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-normal">Host</span>}
                      </span>
                      <span className="text-[10px] text-slate-500">{m.time}</span>
                    </div>
                    <div className={`p-2.5 rounded-xl ${
                      m.isTeacher ? 'bg-purple-950/40 border border-purple-800/40 text-purple-100' : 'bg-slate-800/70 text-slate-200'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Send Bar */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900/80 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question in class..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-xl transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: PARTICIPANTS */}
          {activeSidebarTab === 'participants' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Host & Tutors</div>
              <div className="flex items-center justify-between p-2.5 bg-purple-950/30 rounded-xl border border-purple-800/40">
                <div className="flex items-center gap-2.5">
                  <img
                    src={course.instructor?.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"}
                    alt="Instructor"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{course.instructor?.name || 'Dr. Sarah Jenkins'}</p>
                    <p className="text-[10px] text-purple-400">Main Speaker</p>
                  </div>
                </div>
                <Mic className="w-4 h-4 text-green-400" />
              </div>

              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-4 mb-2">Enrolled Learners (14)</div>
              {['Jessica Taylor', 'Alex Johnson', 'Emma Watson', 'Michael Brown', 'Sophia Martinez', 'Daniel Kim'].map((student, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/50 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs">
                      {student[0]}
                    </div>
                    <span className="text-slate-300">{student}</span>
                  </div>
                  <MicOff className="w-3.5 h-3.5 text-slate-600" />
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: NOTES & STUDY MATERIALS */}
          {activeSidebarTab === 'notes' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <h4 className="font-bold text-xs text-white mb-1">Today's Class Handout</h4>
                <p className="text-[11px] text-slate-400 mb-3">Limits & Trigonometric Substitutions Cheat-sheet (PDF)</p>
                <button
                  onClick={() => alert("Downloaded 'Limits_CheatSheet_Apex.pdf'")}
                  className="w-full bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download Handout (2.4 MB)
                </button>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <h4 className="font-bold text-xs text-white mb-1">Homework Problem Set #4</h4>
                <p className="text-[11px] text-slate-400 mb-3">Due by Thursday before session #5 starts.</p>
                <button
                  onClick={() => alert("Downloaded 'Calculus_Homework_4.pdf'")}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download Homework (1.1 MB)
                </button>
              </div>

              <div className="bg-purple-950/40 p-4 rounded-2xl border border-purple-800/50">
                <h4 className="font-bold text-xs text-purple-200 mb-1">Have an Unresolved Doubt?</h4>
                <p className="text-[11px] text-purple-300 mb-3">Post questions to the official course Q&A board for step-by-step teacher solutions.</p>
                <Link
                  to={`/doubts?courseId=${course.id}`}
                  target="_blank"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Open Course Q&A Board
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default LiveClassroom;
