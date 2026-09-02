'use client';
import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { ScrollProgressModule } from './ScrollProgressModule';

const ComingSoon = ({ pageName = 'Coming Soon' }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fcfcfd]">
      <style jsx global>{`
        .font-heading { font-family: 'Clash Grotesk', sans-serif; letter-spacing: -0.02em; }
        .accent-gradient { background: linear-gradient(135deg, #FF6B35 0%, #E85D04 100%); }
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
      `}</style>

            <ScrollProgressModule />
      

      <main className="pt-40 pb-20">
        <section className="max-w-4xl mx-auto px-6 text-center reveal active">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-8">
            <Icon icon="lucide:construction" /> Coming Soon
          </div>
          <h1 className="text-6xl md:text-7xl font-bold font-heading text-[#000000] leading-none tracking-tighter mb-8">
            <span className="text-[#000000]">Legal </span>
            <span className="text-[#FF6B35]">Terms</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
            We're crafting something extraordinary. This page is currently under development and will be available shortly.
          </p>
          <div className="w-20 h-20 mx-auto bg-orange-50 rounded-[2.5rem] flex items-center justify-center mb-12">
            <Icon icon="lucide:clock" className="text-4xl text-[#FF6B35]" />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/" className="px-12 py-5 accent-gradient text-white font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-orange-500/20">
              Back to Home
            </a>
            <a href="/contact" className="px-12 py-5 bg-white text-slate-900 font-bold rounded-full border-2 border-slate-300 hover:border-[#FF6B35] transition-all">
              Notify Me
            </a>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-32">
          <div className="bg-white rounded-[4rem] p-12 lg:p-20 border border-slate-400 shadow-sm reveal">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="w-14 h-14 mx-auto bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF6B35] mb-6">
                  <Icon icon="lucide:sparkles" className="text-2xl" />
                </div>
                <h4 className="text-xl font-bold font-heading text-[#000000] mb-3">Premium Design</h4>
                <p className="text-slate-500 text-sm">Built with the same sophisticated attention to detail you expect from Linker.</p>
              </div>
              <div>
                <div className="w-14 h-14 mx-auto bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF6B35] mb-6">
                  <Icon icon="lucide:zap" className="text-2xl" />
                </div>
                <h4 className="text-xl font-bold font-heading text-[#000000] mb-3">Lightning Fast</h4>
                <p className="text-slate-500 text-sm">Optimized for performance and reliability from day one.</p>
              </div>
              <div>
                <div className="w-14 h-14 mx-auto bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF6B35] mb-6">
                  <Icon icon="lucide:users" className="text-2xl" />
                </div>
                <h4 className="text-xl font-bold font-heading text-[#000000] mb-3">User Focused</h4>
                <p className="text-slate-500 text-sm">Every feature is designed with the creator experience in mind.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 mt-10">
          <div className="max-w-6xl mx-auto reveal">
            <div className="accent-gradient rounded-[4rem] p-12 lg:p-20 relative overflow-hidden text-center text-white shadow-2xl shadow-orange-500/30">
              <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">Want Early Access?</h2>
                <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">Be the first to know when we launch new features and premium tools.</p>
                <a href="/contact" className="inline-block px-12 py-5 bg-white text-[#FF6B35] font-bold rounded-full hover:scale-105 transition-transform shadow-2xl">Get Notified</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ComingSoon;