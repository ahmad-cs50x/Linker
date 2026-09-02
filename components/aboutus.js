'use client';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { ScrollProgressModule } from './ScrollProgressModule';



const Aboutus = () => {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const cards = document.querySelectorAll('.three-d');
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = x - xc;
      const dy = y - yc;
      card.style.transform = `perspective(1000px) rotateX(${-dy / 25}deg) rotateY(${dx / 25}deg) scale(1.02)`;
    };
    const handleMouseLeave = (e) => {
      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    };
    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fcfcfd]">
      <style jsx global>{`
        .font-heading { font-family: 'Clash Grotesk', sans-serif; letter-spacing: -0.02em; }
        .accent-gradient { background: linear-gradient(135deg, #FF6B35 0%, #E85D04 100%); }
        .gradient-luxury { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); }
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .three-d { transform-style: preserve-3d; transition: transform 0.4s ease; }
      `}</style>

            <ScrollProgressModule />

      <main className="pt-40">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 mb-32 reveal active text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-8">
            <Icon icon="lucide:info" /> The Story of Linker
          </div>
          <h1 className="text-7xl lg:text-7xl font-bold font-heading text-[#000000] leading-none tracking-tighter mb-8">Crafting Digital <span className="text-[#FF6B35]">Legacies</span> for Creators.</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">We believe that every link is an opportunity to build trust, brand identity, and lasting connections across the web.</p>
        </section>

        {/* Heritage */}
        <section className="max-w-6xl mx-auto px-6 mb-40">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <h2 className="text-5xl text-[#050505]  font-bold font-heading mb-8">Our Heritage of Simplicity</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">Founded in 2020, Linker began as a response to the chaotic nature of the social web. We saw creators struggling with long, unbranded links that failed to convey the premium nature of their work.</p>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">Our mission became clear: to build the world's most sophisticated link management infrastructure. We don't just shorten links; we refine them into assets that represent your professional standard.</p>
              <div className="flex items-center gap-10">
                <div className="text-center">
                  <div className="text-4xl font-bold font-heading text-[#FF6B35] mb-1">2020</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Inception</div>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold font-heading text-[#FF6B35] mb-1">500M+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Links Served</div>
                </div>
              </div>
            </div>
            <div className="reveal delay-200 relative">
              <div className="absolute -inset-4 bg-orange-100/50 rounded-[4rem] -rotate-3 -z-10"></div>
              <img
                src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/247b7308-8dd1-4e77-9bfb-3c5f80974ae8/1781874684966-a2ad1dcf/Gemini_Generated_Image_uctb53uctb53uctb-removebg-preview.png"
                alt="Linker Brand Asset"
                className="w-full rounded-[3.5rem] shadow-2xl transition-transform hover:scale-[1.02] duration-700"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-slate-900 py-32 mb-40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="reveal p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:border-orange-500/30 transition-all group">
                <div className="w-16 h-16 accent-gradient rounded-2xl flex items-center justify-center mb-8">
                  <Icon icon="lucide:target" className="text-3xl text-white" />
                </div>
                <h3 className="text-3xl font-bold font-heading text-white mb-6">The Mission</h3>
                <p className="text-slate-400 text-lg leading-relaxed">To empower the digital elite with infrastructure that transforms every interaction into a moment of brand excellence and data-driven insight.</p>
              </div>
              <div className="reveal delay-200 p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:border-orange-500/30 transition-all group">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white transition-all">
                  <Icon icon="lucide:eye" className="text-3xl text-white group-hover:text-slate-900 transition-colors" />
                </div>
                <h3 className="text-3xl font-bold font-heading text-white mb-6">The Vision</h3>
                <p className="text-slate-400 text-lg leading-relaxed">A web where every shared connection carries the weight of authority and the beauty of deliberate design, making the internet simpler for everyone.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="max-w-6xl mx-auto px-6 mb-40">
          <div className="text-center mb-24 reveal">
            <h2 className="text-5xl font-bold text-[#000000] font-heading mb-6">Our Core Values</h2>
            <p className="text-slate-500 text-lg">The pillars that support the Linker experience.</p>
          </div>
          <div className="grid  text-[#FF6B35]  md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'lucide:shield-check', title: 'Absolute Trust', desc: 'Security isn\'t a feature; it\'s our foundation. We protect your data with bank-grade encryption.' },
              { icon: 'lucide:zap', title: 'Innovation', desc: 'We constantly push the boundaries of what a URL shortener can do for your business.' },
              { icon: 'lucide:gem', title: 'Excellence', desc: 'Every pixel and every line of code is polished to perfection for a premium feel.' },
              { icon: 'lucide:heart', title: 'Transparency', desc: 'We believe in open communication and delivering on every promise we make to you.' },
            ].map((v, i) => (
              <div key={i} className={`reveal p-10 bg-white border border-slate-300 rounded-[2.5rem] shadow-sm hover:border-orange-200 transition-all three-d`}>
                <Icon icon={v.icon} className="text-4xl text-orange-400 mb-6" />
                <h4 className="text-2xl font-bold font-heading mb-4">{v.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="max-w-6xl mx-auto px-6 mb-40">
          <div className="text-center mb-20 reveal">
            <h2 className="text-5xl font-bold text-[#000000]  font-heading mb-6">Meet the Visionaries</h2>
            <p className="text-slate-500 text-lg">The minds behind the gold standard of links.</p>
          </div>
          <div className="grid text-[#050505]  md:grid-cols-3 gap-12">
            {[
              { name: 'Alexander Sterling', role: 'CEO & Co-Founder', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', quote: '"We\'re not just building a tool; we\'re defining the future of digital connectivity."' },
              { name: 'Sophia Valen', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', quote: '"Beauty and function must exist in perfect harmony for the modern creator."' },
              { name: 'Julian Thorne', role: 'CTO', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', quote: '"Scalability and security are the two non-negotiables of the Linker engine."' },
            ].map((m, i) => (
              <div key={i} className={`reveal ${i > 0 ? `delay-${i * 100}` : ''} group`}>
                <div className="relative mb-8 overflow-hidden rounded-[3rem] aspect-square shadow-xl three-d">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h4 className="text-2xl font-bold font-heading mb-1">{m.name}</h4>
                <div className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4">{m.role}</div>
                <p className="text-slate-500 text-sm italic leading-relaxed">{m.quote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="max-w-6xl mx-auto px-6 mb-40">
          <div className="bg-white rounded-[4rem] p-16 border border-slate-300 flex flex-col md:flex-row items-center justify-around gap-12 reveal shadow-sm">
            <div className="text-center">
              <div className="text-5xl font-bold font-heading text-[#040404] mb-2">SOC 2</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Type II Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold font-heading text-[#000000] mb-2">ISO</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">27001 Certified</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold font-heading text-[#040404] mb-2">99.99%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Historical Uptime</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto reveal">
            <div className="gradient-luxury rounded-[4rem] p-16 lg:p-24 relative overflow-hidden text-center text-white shadow-2xl">
              <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.15),transparent)] pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-5xl lg:text-6xl font-bold font-heading mb-8">Your Brand Deserves a Better Link.</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">Join the ranks of the world's most elite creators. Start your premium journey today.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a href="#" className="w-full sm:w-auto px-12 py-5 accent-gradient text-white font-bold rounded-full hover:scale-105 transition-transform shadow-xl border-2 hover:border-black hover:border-1 shadow-orange-500/20">Start Free Trial</a>
                  <a href="#" className="w-full sm:w-auto px-12 py-5 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 border-2 hover:border-black hover:border-1 transition-all">Schedule a Demo</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Aboutus;
