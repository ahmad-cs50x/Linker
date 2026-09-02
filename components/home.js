'use client';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { ScrollProgressModule } from './ScrollProgressModule';
import ElectricBorder, {Elecrticborder} from "./Electricborder";


const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {

    // 1. Reveal Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. 3D Card Effect
    const cards = document.querySelectorAll('.three-d');
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      card.style.transform = `perspective(1000px) rotateX(${- (y - yc) / 25}deg) rotateY(${(x - xc) / 25}deg) scale(1.02)`;
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
    <div className="min-h-screen relative overflow-x-hidden bg-[#fcfcfd] text-[#0f172a]">
      <style jsx global>{`
        .font-heading { font-family: 'Clash Grotesk', sans-serif; letter-spacing: -0.02em; }
        .gradient-luxury { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); }
        .accent-gradient { background: linear-gradient(135deg, #FF6B35 0%, #E85D04 100%); }
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .three-d { transform-style: preserve-3d; transition: transform 0.4s ease; }
      `}</style>

             <ScrollProgressModule />

       
      
          <main>

        {/* Hero Section */}
        <section className="relative pt-48 pb-32 px-12 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-100 rounded-full blur-[100px] opacity-60"></div>
          <div className="absolute top-1/2 -left-24 w-64 h-64 bg-slate-200 rounded-full blur-[100px] opacity-40"></div>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal active">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-8">
                <Icon icon="lucide:sparkles" /> The Gold Standard of Links
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold font-heading leading-[1.05] mb-8 tracking-tighter">Your Brand, <br /><span className="text-[#FF6B35]">Refined</span> in a Click.</h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg mb-12">Linker transforms cluttered URLs into elegant, branded connections that drive engagement and trust for the world's most prestigious creators.</p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="#shorten" className="w-full sm:w-auto px-10 py-5 accent-gradient text-white font-bold rounded-full shadow-2xl shadow-orange-500/40 hover:scale-105 transition-transform text-center">Shorten Your URL Now</a>
              </div>
            </div>
            <div className="relative reveal active delay-200">

                <div className="relative z-10 p-1 rounded-[3rem] bg-slate-200 shadow-2xl">
          <ElectricBorder className="w-full max-w-2xl  mx-auto" color="#FF6B35" 
  speed={1.5} 
  chaos={0.15} 
  borderRadius={32} >
                <div className="bg-white rounded-[2.8rem] p-8 lg:p-12 overflow-hidden three-d shadow-inner">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-400 font-mono text-sm">https://very-long-and-cluttered-url.com/tracker...</span>
                      <Icon icon="lucide:lock" className="text-slate-300 text-xl" />
                    </div>
                    <div className="flex justify-center">
                      <Icon icon="lucide:arrow-down" className="text-3xl text-orange-400 animate-bounce" />
                    </div>
                    <div className="p-6 accent-gradient rounded-3xl shadow-xl shadow-orange-500/20 flex items-center justify-between">
                      <span className="text-white font-bold text-lg">linker.io/prestige</span>
                      <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                          <Icon icon="lucide:copy" className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 pt-12 border-t border-slate-100 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <div className="text-2xl font-bold font-heading">1,248</div>
                      <div className="text-xs uppercase font-bold text-slate-400">Clicks Today</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <div className="text-2xl font-bold font-heading text-green-500">+42%</div>
                      <div className="text-xs uppercase font-bold text-slate-400">Growth</div>
                    </div>
                  </div>
                </div>
          </ElectricBorder>
              </div>
          
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32 px-12 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 reveal">
              <h2 className="text-5xl font-bold font-heading mb-6">The Art of Simplification</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg">Four steps to transform your digital footprint into an asset of unparalleled value.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: 'lucide:link', title: '01. Paste URL', desc: 'Drop your long, messy link into our intelligent shortener.' },
                { icon: 'lucide:edit-3', title: '02. Customize', desc: 'Choose a bespoke slug that reflects your brand identity.' },
                { icon: 'lucide:share-2', title: '03. Share Wide', desc: 'Distribute across platforms with automated QR generation.' },
                { icon: 'lucide:bar-chart-3', title: '04. Track Growth', desc: 'Gain deep insights into audience behavior and performance.' },
              ].map((item, i) => (
                <div key={i} className={`relative group reveal ${i > 0 ? `delay-${i * 100}` : ''}`}>
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-8 group-hover:bg-[#FF6B35] group-hover:text-white transition-all">
                    <Icon icon={item.icon} className="text-3xl" />
                  </div>
                  <h4 className="text-2xl font-bold font-heading mb-4">{item.title}</h4>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-32 px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-20 reveal">
              <div className="max-w-2xl">
                <h2 className="text-5xl font-bold font-heading mb-6">Praised by the <br />Industry's Best</h2>
                <p className="text-slate-500 text-lg">Join 100,000+ creators who have elevated their brand with Linker.</p>
              </div>
              <div className="flex gap-4 mt-8 lg:mt-0">
                <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-all">
                  <Icon icon="lucide:chevron-left" className="text-2xl" />
                </button>
                <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-all">
                  <Icon icon="lucide:chevron-right" className="text-2xl" />
                </button>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Elena Rose', role: 'Creative Director, Bloom', quote: '"Linker isn\'t just a tool; it\'s part of our brand identity now. The analytics are unmatched in precision and depth."', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80' },
                { name: 'Marcus Chen', role: 'Founder, TechFlow', quote: '"The 99.9% uptime guarantee is real. We\'ve never had a link fail during our biggest product launches."', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80' },
                { name: 'Sarah Jenkins', role: 'Marketing VP, Aurora', quote: '"Everything about Linker screams premium. It\'s the only shortener we trust for our high-net-worth clientele."', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=64&h=64&q=80' },
              ].map((review, i) => (
                <div key={i} className={`p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm reveal three-d ${i > 0 ? `delay-${i * 100}` : ''}`}>
                  <div className="flex gap-1 text-orange-400 mb-8">
                    {[...Array(5)].map((_, j) => <Icon key={j} icon="mdi:star" />)}
                  </div>
                  <p className="text-xl text-slate-700 leading-relaxed mb-10 italic">{review.quote}</p>
                  <div className="flex items-center gap-4">
                    <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover shadow-md" />
                    <div className="text-sm">
                      <div className="font-bold font-heading">{review.name}</div>
                      <div className="text-slate-400 uppercase font-bold text-[10px] tracking-widest">{review.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto reveal">
            <div className="gradient-luxury rounded-[4rem] p-16 lg:p-24 relative overflow-hidden text-center text-white shadow-2xl">
              <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.15),transparent)] pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-5xl lg:text-6xl font-bold font-heading mb-8">Ready to Claim <br />Your Digital Legacy?</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">Experience the ultimate in link management. Premium features, unmatched reliability, and absolute security.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a href="#" className="w-full sm:w-auto px-12 py-5 accent-gradient text-white font-bold rounded-full hover:scale-105 transition-transform">Start Free</a>
                  <a href="#" className="w-full sm:w-auto px-12 py-5 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all">Contact Enterprise Sales</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
