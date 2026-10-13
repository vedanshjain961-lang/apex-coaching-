import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Lightbulb, RotateCcw } from 'lucide-react';

const SAMPLE_AI_KNOWLEDGE = {
  limits: {
    title: "Evaluating Limits without L'Hopital's Rule",
    response: `### Step-by-Step Mathematical Resolution:

**Problem:** Evaluate $\\lim_{x \\to 0} \\frac{\\sin(3x)}{5x}$

1. **Fundamental Trigonometric Limit Theorem:**
   Recall the standard identity: $\\lim_{u \\to 0} \\frac{\\sin(u)}{u} = 1$

2. **Algebraic Manipulation:**
   Multiply the numerator and denominator by $3$:
   $$\\frac{\\sin(3x)}{5x} = \\frac{3}{5} \\cdot \\frac{\\sin(3x)}{3x}$$

3. **Applying the Limit:**
   $$\\lim_{x \\to 0} \\left( \\frac{3}{5} \\cdot \\frac{\\sin(3x)}{3x} \\right) = \\frac{3}{5} \\cdot 1 = \\mathbf{\\frac{3}{5}} = 0.6$$

💡 **Key Takeaway:** Always match the inner argument of the sine function ($3x$) with the denominator before taking the limit!`
  },
  physics: {
    title: "Newton's Second Law & Momentum",
    response: `### Concept Breakdown: Newton's 2nd Law ($F = ma$)

1. **Core Principle:**
   The net force acting on an object equals the rate of change of its momentum:
   $$F_{net} = \\frac{dp}{dt} = m \\cdot a$$

2. **Everyday Example:**
   - A $1000\\text{ kg}$ car accelerating at $3\\text{ m/s}^2$ requires:
     $$F = 1000 \\cdot 3 = 3000\\text{ Newtons of force}$$

3. **Common Pitfall to Avoid:**
   Always draw a **Free Body Diagram (FBD)** to calculate *net force* before applying $F = ma$. Normal force and friction must be subtracted from applied forces.`
  },
  code: {
    title: "Python List Efficiency: append vs insert(0)",
    response: `### Algorithmic Comparison: Python Lists

\`\`\`python
# 1. append(x) -> O(1) Amortized Time Complexity
numbers = [1, 2, 3]
numbers.append(4)  # Instantly placed at the end of memory buffer

# 2. insert(0, x) -> O(n) Linear Time Complexity
numbers.insert(0, 99)  # Requires shifting all n existing elements right!
\`\`\`

⚡ **Best Practice:** If you frequently insert elements at the beginning, use \`collections.deque\` which provides $O(1)$ operations on both ends via doubly-linked nodes!`
  },
  lesson: {
    title: "Teacher AI Tool: 1-Week Physics Lesson Outline",
    response: `### 📋 Generated Lesson Plan: Kinematics & Free Fall

**Day 1: Position, Velocity & Acceleration**
- *Lecture (25m):* Difference between speed vs velocity, displacement vectors.
- *Interactive Lab (25m):* Ticker timer & ramp motion measurement.

**Day 2: Kinematic Equations**
- *Formulas Covered:* $v = v_0 + at$, $x = x_0 + v_0t + \\frac{1}{2}at^2$, $v^2 = v_0^2 + 2a\\Delta x$.
- *Practice Problems:* Braking distances of vehicles.

**Day 3: Free Fall Acceleration ($g = 9.8\\text{ m/s}^2$)**
- *Whiteboard Drill:* Ball thrown upward at $20\\text{ m/s}$ -> time to peak and total flight time.
- *Homework Assignment:* 5 conceptual questions + 3 numerical drills.`
  }
};

const AiTutorModal = ({ isOpen, onClose, initialRole = 'student' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Hi! I'm the **Apex AI Study Assistant**. Ask me any question in mathematics, physics, computer science, or SAT prep — or choose a topic below to see an instant solution!",
      time: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [role, setRole] = useState(initialRole); // 'student' | 'teacher'
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (presetQuery = null) => {
    const query = presetQuery || inputQuery.trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!presetQuery) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';

      const lower = query.toLowerCase();
      if (lower.includes('limit') || lower.includes('sin') || lower.includes('math') || lower.includes('calculus')) {
        replyText = SAMPLE_AI_KNOWLEDGE.limits.response;
      } else if (lower.includes('physics') || lower.includes('newton') || lower.includes('force')) {
        replyText = SAMPLE_AI_KNOWLEDGE.physics.response;
      } else if (lower.includes('python') || lower.includes('code') || lower.includes('insert') || lower.includes('complexity')) {
        replyText = SAMPLE_AI_KNOWLEDGE.code.response;
      } else if (lower.includes('lesson') || lower.includes('plan') || lower.includes('outline') || lower.includes('syllabus')) {
        replyText = SAMPLE_AI_KNOWLEDGE.lesson.response;
      } else {
        replyText = `### Apex AI Resolution:
**Question:** *"${query}"*

1. **Key Concept:** This problem belongs to core subject principles. To solve this methodically, we first establish the governing formulas and identify known and unknown variables.
2. **Step-by-Step Procedure:**
   - Define coordinate directions and reference frames.
   - Apply boundary conditions and evaluate initial state parameters.
   - Perform algebra and verify dimensional consistency (units check).
3. **Recommended Next Step:**
   Would you like a full step-by-step mathematical proof or 3 practice drill questions on this topic?`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: replyText,
          time: 'Just now'
        }
      ]);
    }, 900);
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: "Chat cleared! Ask me anything or select a quick topic below.",
        time: 'Just now'
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col h-[640px] max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">Apex AI Study Assistant</h3>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                  24/7 Live
                </span>
              </div>
              <p className="text-xs text-purple-200">Instant doubt solver & smart teacher assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Role switch toggle */}
            <div className="bg-white/10 p-1 rounded-xl flex text-xs">
              <button
                onClick={() => setRole('student')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  role === 'student' ? 'bg-white text-purple-900 shadow-sm' : 'text-purple-200 hover:text-white'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole('teacher')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  role === 'teacher' ? 'bg-white text-purple-900 shadow-sm' : 'text-purple-200 hover:text-white'
                }`}
              >
                Teacher
              </button>
            </div>

            <button
              onClick={handleReset}
              className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="Clear chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap">
          <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Try:
          </span>
          {role === 'student' ? (
            <>
              <button
                onClick={() => handleSend("Evaluate the limit lim(x->0) (sin 3x)/(5x) without L'Hopital's Rule")}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 rounded-full font-medium transition-colors"
              >
                📐 Calculus Limit
              </button>
              <button
                onClick={() => handleSend("Explain Newton's Second Law with F=ma and real-life examples")}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 rounded-full font-medium transition-colors"
              >
                ⚡ Newton's 2nd Law
              </button>
              <button
                onClick={() => handleSend("Compare Python list append vs insert(0) time complexity")}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 rounded-full font-medium transition-colors"
              >
                💻 Python Big-O
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleSend("Generate a 1-week Kinematics lesson outline for high school physics")}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 rounded-full font-medium transition-colors"
              >
                📋 Lesson Plan Outline
              </button>
              <button
                onClick={() => handleSend("Create 3 tricky SAT math practice questions with full answer keys")}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 rounded-full font-medium transition-colors"
              >
                🎯 SAT Practice Questions
              </button>
            </>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 border border-purple-200">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                <span>Formulating step-by-step resolution...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                role === 'student'
                  ? "Type your doubt (e.g. 'Solve quadratic x^2-5x+6=0')..."
                  : "Type instruction (e.g. 'Draft a quiz on photosynthesis')..."
              }
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white p-3 rounded-xl transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AiTutorModal;
