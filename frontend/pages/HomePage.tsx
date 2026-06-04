import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogoIcon, LoadingSpinner, AlertTriangleIcon } from '../components/Icons';

type AuthMode = 'login' | 'register';

interface FAQProps { q: string; a: string; index: number; }
const FAQItem: React.FC<FAQProps> = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-panel rounded-2xl overflow-hidden transform hover:scale-102 transition-all duration-300">
      <button onClick={() => setOpen(o=>!o)} className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-white/5 transition-colors">
        <span className="text-base font-semibold text-slate-100">{q}</span>
        <span className="text-lg text-slate-300 transition-transform duration-300" style={{transform: open ? 'rotate(45deg)' : 'none'}}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed animate-fade-in">{a}</div>
      )}
    </div>
  );
};

const HomePage: React.FC = () => {
  const { login, register, currentUser } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const toggleMode = () => setMode(m => m === 'login' ? 'register' : 'login');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      if (mode === 'login') await login(email, password); else await register(name, email, password);
    } catch (e: any) {
      setError(e?.message || 'Unexpected error');
    } finally { setLoading(false); }
  };

  if (currentUser) return null;

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden font-sans">
      {/* Animated plasma background */}
      <div className="plasma-wrapper pointer-events-none" aria-hidden="true">
        <div className="gradient gradient-1" />
        <div className="gradient gradient-2" />
        <div className="gradient gradient-3" />
      </div>

      {/* Site Header */}
      <header className="relative z-30 flex items-center justify-between px-6 py-4 md:px-12 animate-fade-in">
        <div className="flex items-center gap-3">
            <LogoIcon className="h-9 w-9 animate-pulse-slow" />
            <span className="font-display tracking-wider text-xl">MoodMatrix AI</span>
        </div>
        
        {/* Partner Logos - Centered */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-6">
          {/* Acropolis Logo */}
          <div className="px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 bg-white/95">
            <img 
              src="/acropolis-logo.jpeg" 
              alt="Acropolis - Enlightening Wisdom" 
              className="h-8 object-contain"
            />
          </div>

          {/* AiML Logo */}
          <div className="glass-panel px-3 py-1.5 rounded-lg hover:scale-105 transition-transform duration-300">
            <div className="text-lg font-bold tracking-tight">
              <span className="text-blue-400">Ai</span>
              <span className="text-orange-400">ML</span>
            </div>
          </div>

          {/* MLH Logo */}
          <div className="glass-panel px-3 py-1.5 rounded-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <div className="text-base font-bold tracking-tight flex items-center gap-0.5">
                <span className="text-red-500">m</span>
                <span className="text-blue-500">L</span>
                <span className="text-yellow-500">H</span>
              </div>
              <span className="text-[7px] text-slate-400 font-medium tracking-wider">MLH</span>
            </div>
          </div>

          {/* AI Nexus Logo */}
          <div className="glass-panel px-3 py-1.5 rounded-lg hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-1">
              <div className="text-base font-bold text-blue-400 tracking-tight">AI</div>
              <div className="text-base font-bold text-slate-300">NEXUS</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => { setMode('login'); setAuthOpen(true); }} className="px-4 py-2 rounded-lg text-sm font-medium backdrop-blur bg-white/10 hover:bg-white/20 transition-all duration-200 transform hover:scale-105">Log In</button>
          <button onClick={() => { setMode('register'); setAuthOpen(true); }} className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-brand-500 via-brand-400 to-pink-500 hover:from-brand-600 hover:via-brand-500 hover:to-pink-600 shadow-md transition-all duration-200 transform hover:scale-105">Sign Up</button>
        </div>
      </header>

      <main className="relative z-10 px-6 md:px-12 pt-10 md:pt-24 pb-44 max-w-7xl mx-auto space-y-40">
        {/* Hero */}
        <section className="max-w-4xl animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight drop-shadow-sm animate-slide-up">
            Turn Daily Reflections into <span className="text-shimmer">Actionable Clarity</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed animate-fade-in" style={{animationDelay: '200ms'}}>
            An AI-powered mental wellness journal that helps you capture emotions, surface hidden patterns, and receive personalized insights for healthier mental habits.
          </p>
          <div className="mt-12 flex flex-wrap gap-5 animate-fade-in" style={{animationDelay: '400ms'}}>
            <button onClick={() => { setMode('register'); setAuthOpen(true); }} className="btn-glass-enhanced button-press relative px-8 py-4 rounded-2xl text-base font-semibold bg-gradient-to-r from-brand-600 via-brand-500 to-pink-500 hover:from-brand-700 hover:via-brand-600 hover:to-pink-600 shadow-2xl transform hover:scale-105 transition-all duration-300">Get Started</button>
            <button onClick={() => { setMode('login'); setAuthOpen(true); }} className="btn-glass-enhanced button-press px-8 py-4 rounded-2xl text-base font-medium transform hover:scale-105 transition-all duration-300">I already have an account</button>
          </div>
        </section>

        {/* Why Section */}
        <section id="why" className="space-y-14">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">Why Choose Us</h2>
            <p className="mt-4 text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">Traditional journals capture words. Our AI companion decodes emotional context, trends, and subtle shifts—helping you understand yourself better and build healthier mental habits.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Emotional Intelligence', body: 'Track your emotions, sentiment patterns, and mood over time. Get insights into what affects your mental well-being.' },
              { title: 'Privacy-First Design', body: 'End-to-end encryption keeps your personal reflections secure. Your data belongs to you, always.' },
              { title: 'Crisis Support', body: 'Automatic crisis detection with immediate access to mental health resources and professional helplines.' }
            ].map((card, i) => (
              <div key={card.title} className={`glass-panel card-hover-glow relative rounded-3xl p-8 shadow-2xl animate-fade-in stagger-${i + 1}`}>
                <h3 className="font-display text-xl mb-3 tracking-wide text-glow">{card.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="space-y-16">
          <h2 className="font-display text-3xl md:text-4xl">Features</h2>
          <div className="grid lg:grid-cols-2 gap-14">
            {[
              { h: 'Smart Journal Entries', d: 'Create structured diary entries with rich text editing. Your emotional journey, beautifully captured.' },
              { h: 'Sentiment Analysis', d: 'Get detailed emotional insights including sentiment scores, detected emotions, and personalized self-care suggestions.' },
              { h: 'Offline Support', d: 'Write anywhere—entries sync automatically when you reconnect. Your thoughts are never lost.' },
              { h: 'Privacy-First Design', d: 'End-to-end encryption keeps your personal reflections secure. Your data belongs to you, always.' },
              { h: 'Multi-Language Support', d: 'Express yourself in your preferred language—English, Hindi, Bengali, Tamil, Telugu, or Malayalam.' },
              { h: 'Mood Tracking', d: 'Visualize your emotional patterns over time with beautiful charts and insights to help you understand yourself better.' }
            ].map((f, i) => (
              <div key={f.h} className={`glass-panel card-hover-glow relative rounded-3xl p-8 backdrop-blur-md transform transition-all duration-300 animate-fade-in stagger-${i % 3 + 1}`}>
                <h3 className="font-display text-xl mb-3 tracking-wide text-slate-100">{f.h}</h3>
                <p className="text-base text-slate-300 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="space-y-14">
          <h2 className="font-display text-3xl md:text-4xl">How It Works</h2>
          <ol className="relative border-l border-white/10 ml-3 space-y-10 pl-8">
            {[
              { t: 'Create a Journal Entry', d: 'Open the journal and write about your day. No structure required—just express your thoughts freely.' },
              { t: 'AI Analysis', d: 'Our AI analyzes your emotional tone, detects sentiment, and provides insights about your mental well-being.' },
              { t: 'Receive Insights', d: 'Get personalized emotional insights, mood patterns, and self-care suggestions based on your entries.' },
              { t: 'Track Your Progress', d: 'View your emotional journey over time with charts, calendar views, and detailed analytics.' },
              { t: 'Build Healthy Habits', d: 'Review insights, identify patterns, and celebrate progress. Grow intentionally with AI guidance.' }
            ].map((step, i) => (
              <li key={step.t} className="relative animate-fade-in" style={{animationDelay: `${i * 150}ms`}}>
                <span className="absolute -left-[37px] top-0 w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center text-[11px] font-semibold shadow-md animate-pulse-slow">{i+1}</span>
                <h3 className="font-display text-lg mb-1">{step.t}</h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl">{step.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="space-y-14">
          <h2 className="font-display text-3xl md:text-4xl">What Students Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n:'Sarah M.', r:'College Student', q:'This app helps me notice stress patterns before they overwhelm me. The emotional insights are incredibly helpful.' },
                { n:'Alex T.', r:'Developer', q:'The sentiment analysis and mood tracking help me process my thoughts in a healthier way.' },
                { n:'Priya K.', r:'Graduate Student', q:'Crisis detection gave me access to help when I needed it most. This app genuinely cares about mental health.' },
                { n:'James L.', r:'Engineering Student', q:'The structured journal entries help me reflect on my emotional journey in a meaningful way.' },
                { n:'Emma R.', r:'Design Student', q:'The sentiment analysis helps me track mood patterns and understand what triggers my anxiety. Game changer.' },
                { n:'Ryan P.', r:'CS Student', q:'I journal more consistently now because the interface is beautiful and the insights are genuinely useful.' }
              ].map((t, i) => (
                <figure key={t.n} className={`glass-panel card-hover-glow relative flex flex-col rounded-3xl p-7 backdrop-blur-md transform transition-all duration-300 animate-fade-in stagger-${i % 3 + 1}`}>
                  <blockquote className="text-base text-slate-200 leading-relaxed flex-1 italic">"{t.q}"</blockquote>
                  <figcaption className="mt-5 text-sm font-medium text-slate-300">{t.n} • <span className="text-slate-400">{t.r}</span></figcaption>
                </figure>
              ))}
            </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-10">
          <h2 className="font-display text-3xl md:text-4xl">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q:'Is my data private and secure?', a:'Yes. All diary entries are encrypted end-to-end. Your personal reflections are stored securely and never shared with third parties or used for advertising.' },
              { q:'How does the AI analysis work?', a:'Our AI uses Google Gemini 2.5 Flash to analyze your journal entries for emotional context, sentiment, and patterns. It detects crisis keywords and provides personalized insights.' },
              { q:'Can I use this offline?', a:'Absolutely. Entries are saved locally on your device and automatically sync when you reconnect. No data loss, ever.' },
              { q:'Is this a replacement for professional therapy?', a:'No. While our AI provides support and insights, it\'s not a substitute for professional mental health care. We encourage seeking help from licensed therapists for clinical needs.' },
              { q:'What languages are supported?', a:'We support English, Hindi, Bengali, Tamil, Telugu, and Malayalam. You can switch languages anytime from the settings.' }
            ].map((f,i) => (
              <FAQItem key={i} index={i} {...f} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-16 border-t border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LogoIcon className="h-7 w-7" />
              <span className="font-display tracking-wide text-lg">MoodMatrix AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">AI-powered mental wellness journaling to cultivate emotional clarity, resilience, and healthier self-care habits.</p>
          </div>
          <div>
            <h4 className="font-display text-sm mb-3 tracking-wide">Product</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-slate-200 transition">Features</a></li>
              <li><a href="#how" className="hover:text-slate-200 transition">How It Works</a></li>
              <li><button onClick={() => { setMode('register'); setAuthOpen(true); }} className="hover:text-slate-200 transition">Sign Up Free</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm mb-3 tracking-wide">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#faq" className="hover:text-slate-200 transition">FAQ</a></li>
              <li><a href="#why" className="hover:text-slate-200 transition">Why Us</a></li>
              <li><a href="#testimonials" className="hover:text-slate-200 transition">Testimonials</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-[10px] text-slate-500">© {new Date().getFullYear()} MoodMatrix AI. Built for IntelliAI Arena 2026. All rights reserved.</div>
      </footer>

      {/* Auth Modal */}
      {authOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4 animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setAuthOpen(false)} />
          <div className="glass-panel relative z-50 w-full max-w-md rounded-3xl p-10 shadow-2xl animate-scale-in">
            <button onClick={() => setAuthOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 text-xl transition">×</button>
            <h2 className="text-3xl font-display font-bold mb-8 text-glow">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            {error && (
              <div className="mb-6 text-sm flex items-center glass-panel border-red-500/40 text-red-300 px-4 py-3 rounded-xl animate-shake">
                <AlertTriangleIcon className="h-5 w-5 mr-2" /> {error}
              </div>
            )}
            <form onSubmit={submit} className="space-y-5">
              {mode === 'register' && (
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" required className="w-full px-5 py-3 glass-panel rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder-slate-400 transition text-slate-100" />
              )}
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required className="w-full px-5 py-3 glass-panel rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder-slate-400 transition text-slate-100" />
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode === 'register' ? 'Password (8+ characters)' : 'Password'} required minLength={mode === 'register' ? 8 : 6} className="w-full px-5 py-3 glass-panel rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder-slate-400 transition text-slate-100" />
              <button disabled={loading} className="btn-glass-enhanced button-press w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-pink-500 hover:from-brand-700 hover:via-brand-600 hover:to-pink-600 font-semibold text-lg disabled:opacity-50 transition transform hover:scale-105">
                {loading && <LoadingSpinner className="!text-white" />} {mode==='login' ? 'Log In' : 'Sign Up'}
              </button>
            </form>
            <p className="mt-6 text-sm text-slate-400 text-center">
              {mode === 'login' ? 'No account yet?' : 'Already have an account?'}{' '}
              <button onClick={toggleMode} className="text-brand-300 hover:text-brand-200 font-medium transition">
                {mode === 'login' ? 'Sign up free' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
