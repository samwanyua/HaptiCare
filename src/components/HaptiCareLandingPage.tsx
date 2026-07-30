import React, { useState, useEffect } from 'react';
import {
  PlayCircle,
  ShieldCheck,
  Volume2,
  Accessibility,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Users,
  Target,
  Clock,
  Sparkles,
  Activity,
  Layers,
  Heart,
  Sun,
  Moon
} from 'lucide-react';

export const HaptiCareLandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('hapticare_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('hapticare_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('hapticare_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setWaitlistSuccess(true);
      setEmail('');
      setTimeout(() => setWaitlistSuccess(false), 5000);
    }
  };

  const kpiStats = [
    {
      id: 'stat-1',
      stat: '2.75M',
      label: 'Deaf Kenyans',
      subtext: 'Citizens currently living with profound or moderate hearing loss.',
      tag: 'National Census',
      icon: Users,
      iconBg: 'bg-[#00a396]/10 text-[#006a62]',
      tagBg: 'bg-[#eaedff] text-[#006a62] border-[#bcc9c6]/50',
    },
    {
      id: 'stat-2',
      stat: '5.5%',
      label: 'Annual Growth Rate',
      subtext: 'Year-over-year increase in recorded hearing diagnoses nationwide.',
      tag: '+0.4% YoY',
      icon: TrendingUp,
      iconBg: 'bg-[#006a62]/10 text-[#006a62]',
      tagBg: 'bg-[#e6f7f5] text-[#006a62] border-[#00a396]/30',
    },
    {
      id: 'stat-3',
      stat: '3.6M',
      label: 'Projected by 2030',
      subtext: 'Estimated population requiring tactile sound awareness solutions.',
      tag: 'Vision 2030',
      icon: Target,
      iconBg: 'bg-[#855300]/10 text-[#855300]',
      tagBg: 'bg-[#fff3e0] text-[#855300] border-[#855300]/20',
    },
    {
      id: 'stat-4',
      stat: '1.85M',
      label: 'Later-life Loss',
      subtext: 'Adults acquiring hearing loss due to industrial noise or age.',
      tag: 'Acquired Loss',
      icon: Clock,
      iconBg: 'bg-[#505f76]/10 text-[#505f76]',
      tagBg: 'bg-[#f2f3ff] text-[#505f76] border-[#bcc9c6]/50',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#090d16] text-[#131b2e] dark:text-[#f1f5f9] flex flex-col font-sans transition-colors duration-300">
      {/* Main Navbar */}
      <nav className="bg-[#faf8ff]/90 dark:bg-[#090d16]/90 backdrop-blur-md border-b border-[#bcc9c6] dark:border-[#1e293b] sticky top-0 z-40 transition-colors duration-300">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center space-x-2.5">
            <img
              src="/Hapticare-logo.png"
              alt="HaptiCare logomark"
              className="w-9 h-9 object-contain"
            />
            <div className="text-xl font-bold text-[#006a62] dark:text-[#7cf6e7] tracking-tight">HaptiCare Labs</div>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-[#505f76] dark:text-[#94a3b8]">
            <a href="#product" className="hover:text-[#006a62] dark:hover:text-[#7cf6e7] transition">Product</a>
            <a href="#impact" className="hover:text-[#006a62] dark:hover:text-[#7cf6e7] transition">Why It Matters</a>
            <a href="#stats" className="hover:text-[#006a62] dark:hover:text-[#7cf6e7] transition">Statistics</a>
            <a href="#how" className="hover:text-[#006a62] dark:hover:text-[#7cf6e7] transition">How It Works</a>
            <a href="#about" className="hover:text-[#006a62] dark:hover:text-[#7cf6e7] transition">About</a>
          </div>
          <div className="flex items-center space-x-3">
            {/* Dark/Light Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2.5 rounded-full border border-[#bcc9c6] dark:border-[#334155] bg-white dark:bg-[#1e293b] text-[#505f76] dark:text-[#94a3b8] hover:text-[#006a62] dark:hover:text-[#7cf6e7] transition shadow-xs flex items-center justify-center active:scale-95"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
            <a
              href="#waitlist"
              className="bg-[#006a62] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00302c] dark:hover:bg-[#00524c] transition active:scale-95 shadow-xs"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden py-16">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-[#131b2e] dark:text-white leading-tight tracking-tight">
                Restoring awareness through vibration.
              </h1>
              <p className="text-lg md:text-xl text-[#3d4947] dark:text-[#94a3b8] max-w-xl mx-auto md:mx-0 font-normal leading-relaxed">
                Experience instant haptic alerts that translate environmental sound into tactile clarity, keeping you safe and connected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                <a
                  href="#waitlist"
                  className="bg-[#006a62] text-white px-8 py-4 rounded-full font-semibold text-base shadow-lg hover:bg-[#00302c] dark:hover:bg-[#00524c] transition text-center"
                >
                  Join the Waitlist
                </a>
                <a
                  href="#product"
                  className="border border-[#6c7a77] dark:border-[#475569] text-[#006a62] dark:text-[#7cf6e7] px-8 py-4 rounded-full font-semibold text-base hover:bg-[#f2f3ff] dark:hover:bg-[#1e293b] transition flex items-center justify-center space-x-2"
                >
                  <PlayCircle className="w-5 h-5 text-[#006a62] dark:text-[#7cf6e7]" />
                  <span>Learn More</span>
                </a>
              </div>
            </div>

            {/* Product Hero Image & Pulse Effect */}
            <div className="relative w-full aspect-square flex items-center justify-center">
              <div className="absolute w-[80%] h-[80%] bg-[#00a396]/10 dark:bg-[#00a396]/20 rounded-full haptic-pulse"></div>
              <div
                className="absolute w-[60%] h-[60%] bg-[#00a396]/20 dark:bg-[#00a396]/30 rounded-full haptic-pulse"
                style={{ animationDelay: '1s' }}
              ></div>
              <img
                src="/Image_01.png"
                alt="HaptiCare wristband device preview"
                className="relative z-20 w-4/5 h-auto drop-shadow-2xl object-contain rounded-3xl"
              />
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-white dark:bg-[#0d1526] transition-colors duration-300" id="impact">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="p-8 rounded-3xl bg-white dark:bg-[#131f33] border border-[#bcc9c6]/40 dark:border-[#1e293b] flex flex-col items-center text-center space-y-4 hover:shadow-md dark:hover:border-[#00a396]/50 transition">
                <div className="w-16 h-16 bg-[#00a396]/10 dark:bg-[#00a396]/20 rounded-full flex items-center justify-center text-[#006a62] dark:text-[#7cf6e7]">
                  <span className="material-symbols-outlined text-3xl">spatial_audio</span>
                </div>
                <h3 className="text-xl font-bold dark:text-white">Environmental Awareness</h3>
                <p className="text-sm text-[#3d4947] dark:text-[#94a3b8] leading-relaxed">
                  Detect emergency sirens, doorbells, and approaching vehicles through intelligent haptic patterns.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white dark:bg-[#131f33] border border-[#bcc9c6]/40 dark:border-[#1e293b] flex flex-col items-center text-center space-y-4 hover:shadow-md dark:hover:border-[#00a396]/50 transition">
                <div className="w-16 h-16 bg-[#00a396]/10 dark:bg-[#00a396]/20 rounded-full flex items-center justify-center text-[#006a62] dark:text-[#7cf6e7]">
                  <span className="material-symbols-outlined text-3xl">safety_check</span>
                </div>
                <h3 className="text-xl font-bold dark:text-white">Safety First</h3>
                <p className="text-sm text-[#3d4947] dark:text-[#94a3b8] leading-relaxed">
                  Mitigate risks in traffic and public spaces with real-time vibrational warnings designed for safety.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white dark:bg-[#131f33] border border-[#bcc9c6]/40 dark:border-[#1e293b] flex flex-col items-center text-center space-y-4 hover:shadow-md dark:hover:border-[#00a396]/50 transition">
                <div className="w-16 h-16 bg-[#00a396]/10 dark:bg-[#00a396]/20 rounded-full flex items-center justify-center text-[#006a62] dark:text-[#7cf6e7]">
                  <span className="material-symbols-outlined text-3xl">accessibility_new</span>
                </div>
                <h3 className="text-xl font-bold dark:text-white">Pure Independence</h3>
                <p className="text-sm text-[#3d4947] dark:text-[#94a3b8] leading-relaxed">
                  Navigate your world confidently without relying on constant visual or third-party assistance.
                </p>
              </div>
            </div>

            {/* Critical Research Banner */}
            <div className="bg-[#006a62] dark:bg-[#004d47] rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="space-y-2 max-w-xl">
                <h4 className="text-xs font-bold opacity-80 uppercase tracking-widest text-[#7cf6e7]">Critical Research</h4>
                <p className="text-xl md:text-2xl font-bold leading-snug">
                  The Deaf and hard-of-hearing community faces a significantly higher risk of traffic-related injuries due to auditory gaps.
                </p>
                <p className="text-xs opacity-75">— Source: Sage Journals</p>
              </div>
              <div>
                <a
                  href="#product"
                  className="bg-white dark:bg-[#0b1320] text-[#006a62] dark:text-[#7cf6e7] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#7cf6e7] dark:hover:bg-[#006a62] dark:hover:text-white transition shadow-md whitespace-nowrap inline-block"
                >
                  Explore Solution
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Kenya Statistics Section */}
        <section className="py-24 bg-[#faf8ff] dark:bg-[#090d16] relative overflow-hidden transition-colors duration-300" id="stats">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 space-y-3">
              <div className="inline-flex items-center space-x-2 bg-[#eaedff] dark:bg-[#131f33] border border-[#bcc9c6]/60 dark:border-[#1e293b] rounded-full px-4 py-1.5 text-xs font-bold text-[#006a62] dark:text-[#7cf6e7] uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-[#00a396]" />
                <span>Demographic Insight & Impact</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#131b2e] dark:text-white tracking-tight">
                The Reality in Kenya
              </h2>
              <p className="text-[#3d4947] dark:text-[#94a3b8] text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                Understanding the scale of accessibility needs as our community grows, driving the urgency for assistive tactile technology.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiStats.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-[#131f33] border border-[#bcc9c6] dark:border-[#1e293b] rounded-3xl p-7 flex flex-col justify-between hover:border-[#006a62] dark:hover:border-[#00a396] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 group relative overflow-hidden"
                  >
                    {/* Top Row: Icon Badge + Tag */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-13 h-13 ${item.iconBg} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs`}>
                          <IconComp className="w-6 h-6 stroke-[2.2]" />
                        </div>
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${item.tagBg}`}>
                          {item.tag}
                        </span>
                      </div>

                      {/* Stat Value */}
                      <div className="space-y-1 mb-3">
                        <span className="block text-4xl lg:text-5xl font-extrabold text-[#131b2e] dark:text-white group-hover:text-[#006a62] dark:group-hover:text-[#7cf6e7] transition-colors tracking-tight font-sans">
                          {item.stat}
                        </span>
                        <h3 className="text-base font-bold text-[#131b2e] dark:text-white">{item.label}</h3>
                      </div>

                      {/* Subtext */}
                      <p className="text-xs text-[#505f76] dark:text-[#94a3b8] leading-relaxed font-normal">
                        {item.subtext}
                      </p>
                    </div>

                    {/* Subtle bottom hover accent bar */}
                    <div className="w-full h-1 bg-[#eaedff] dark:bg-[#1e293b] group-hover:bg-[#00a396] rounded-full mt-6 transition-colors duration-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow Section: The Path to Perception */}
        <section className="py-20 bg-[#f2f3ff] dark:bg-[#0f172a] transition-colors duration-300" id="how">
          <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
            <h2 className="text-3xl font-bold text-[#131b2e] dark:text-white">The Path to Perception</h2>
          </div>

          {/* Mobile / tablet: 3-column grid (2 rows of 3) */}
          <div className="lg:hidden grid grid-cols-3 gap-6 px-6 max-w-2xl mx-auto">
            {[
              { icon: 'waves', label: 'Sound world', sub: 'Ambient environment' },
              { icon: 'mic', label: 'Capture', sub: 'High-fidelity mics' },
              { icon: 'neurology', label: 'AI Processing', sub: 'On-device neural engine' },
              { icon: 'rule', label: 'Alert Decision', sub: 'Contextual filtering' },
              { icon: 'vibration', label: 'Haptic Feedback', sub: 'Distinct vibration patterns' },
              { icon: 'person_celebrate', label: 'User Awareness', sub: 'Instant mental map' },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#1e293b] flex items-center justify-center text-[#006a62] dark:text-[#7cf6e7] shadow-sm">
                  <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                </div>
                <div className="text-center space-y-0.5">
                  <h4 className="text-xs font-bold text-[#131b2e] dark:text-white leading-tight">{step.label}</h4>
                  <p className="text-[10px] text-[#3d4947] dark:text-[#94a3b8] leading-tight">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: single row with arrows */}
          <div className="hidden lg:flex px-6 gap-4 justify-center">
            {[
              { icon: 'waves', label: 'Sound world', sub: 'Ambient environment' },
              { icon: 'mic', label: 'Capture', sub: 'High-fidelity mics' },
              { icon: 'neurology', label: 'AI Processing', sub: 'On-device neural engine' },
              { icon: 'rule', label: 'Alert Decision', sub: 'Contextual filtering' },
              { icon: 'vibration', label: 'Haptic Feedback', sub: 'Distinct vibration patterns' },
              { icon: 'person_celebrate', label: 'User Awareness', sub: 'Instant mental map' },
            ].map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center space-y-4 w-44">
                  <div className="w-18 h-18 rounded-2xl bg-white dark:bg-[#1e293b] flex items-center justify-center text-[#006a62] dark:text-[#7cf6e7] shadow-sm">
                    <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className="text-sm font-bold text-[#131b2e] dark:text-white">{step.label}</h4>
                    <p className="text-xs text-[#3d4947] dark:text-[#94a3b8]">{step.sub}</p>
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <div className="flex items-center text-[#bcc9c6] dark:text-[#475569] px-2">
                    <span className="material-symbols-outlined">trending_flat</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>


        {/* Product Showcase */}
        <section className="py-20 bg-[#dae2fd] dark:bg-[#111c33] transition-colors duration-300" id="product">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/Image_02.png"
                alt="HaptiCare wristband macro shot"
                className="w-full h-auto rounded-3xl shadow-xl object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#131b2e] dark:text-white">The HaptiCare One</h2>
              <p className="text-base text-[#3d4947] dark:text-[#94a3b8] leading-relaxed">
                A masterpiece of inclusive engineering. Designed in Africa, built for the world.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="flex items-start space-x-3">
                  <span className="material-symbols-outlined text-[#006a62] dark:text-[#7cf6e7]">sign_language</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#131b2e] dark:text-white">Deaf-friendly</h4>
                    <p className="text-xs text-[#3d4947] dark:text-[#94a3b8]">Interface optimized for visual-first users.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="material-symbols-outlined text-[#006a62] dark:text-[#7cf6e7]">battery_very_low</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#131b2e] dark:text-white">Long battery</h4>
                    <p className="text-xs text-[#3d4947] dark:text-[#94a3b8]">48-hour continuous monitoring.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="material-symbols-outlined text-[#006a62] dark:text-[#7cf6e7]">clock_loader_40</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#131b2e] dark:text-white">Lightweight</h4>
                    <p className="text-xs text-[#3d4947] dark:text-[#94a3b8]">Barely-there weight of just 28g.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="material-symbols-outlined text-[#006a62] dark:text-[#7cf6e7]">settings_input_component</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#131b2e] dark:text-white">Customizable</h4>
                    <p className="text-xs text-[#3d4947] dark:text-[#94a3b8]">Assign unique pulses to sounds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement & Privacy */}
        <section className="py-20 bg-white dark:bg-[#0d1526] transition-colors duration-300" id="about">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl font-bold text-[#131b2e] dark:text-white">Our Mission</h2>
            <p className="text-lg text-[#3d4947] dark:text-[#94a3b8] leading-relaxed">
              HaptiCare Labs was founded on the belief that safety and awareness are fundamental human rights. We are a team of Kenyan engineers and disability advocates building Africa-first technology that empowers the global Deaf community through tactile clarity and human-centered design.
            </p>
          </div>
        </section>

        {/* Waitlist Section */}
        <section className="py-20 bg-[#006a62] dark:bg-[#004d47] text-white" id="waitlist">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">Be the first to know.</h2>
            <p className="text-base text-white/90">Join our exclusive waitlist for early access and launch updates.</p>

            {waitlistSuccess ? (
              <div className="bg-white/10 border border-white/30 rounded-2xl p-6 flex items-center justify-center space-x-2 text-sm font-semibold max-w-xl mx-auto">
                <CheckCircle2 className="w-6 h-6 text-[#7cf6e7]" />
                <span>Thank you! You have been added to the HaptiCare launch waitlist.</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto pt-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#7cf6e7]"
                />
                <button
                  type="submit"
                  className="bg-white text-[#006a62] dark:text-[#004d47] font-bold px-8 py-4 rounded-full hover:bg-[#7cf6e7] transition whitespace-nowrap active:scale-95"
                >
                  Join the Waitlist
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f2f3ff] dark:bg-[#090d16] border-t border-[#bcc9c6] dark:border-[#1e293b] py-10 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-lg text-[#131b2e] dark:text-white">HaptiCare Labs</div>
            <p className="text-xs text-[#3d4947] dark:text-[#94a3b8]">Empowering through tactile clarity. Built in Nairobi for the world.</p>
          </div>
          <div className="flex gap-6 text-xs font-medium text-[#3d4947] dark:text-[#94a3b8]">
            <a href="#product" className="hover:text-[#006a62] dark:hover:text-[#7cf6e7]">Product</a>
            <a href="#impact" className="hover:text-[#006a62] dark:hover:text-[#7cf6e7]">Why It Matters</a>
            <a href="#how" className="hover:text-[#006a62] dark:hover:text-[#7cf6e7]">How It Works</a>
            <a href="#about" className="hover:text-[#006a62] dark:hover:text-[#7cf6e7]">About</a>
          </div>
          <div className="text-xs text-[#3d4947] dark:text-[#94a3b8]">
            © 2026 HaptiCare Labs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
