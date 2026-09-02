'use client';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { ScrollProgressModule } from './ScrollProgressModule';

const Contactus = () => {
  const [faqOpen, setFaqOpen] = useState(null);
  const [formStatus, setFormStatus] = useState('Send Message');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const cards = document.querySelectorAll('.three-d');
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      card.style.transform = `perspective(1000px) rotateX(${-(y - yc) / 25}deg) rotateY(${(x - xc) / 25}deg) scale(1.02)`;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    setTimeout(() => {
      alert('Message sent successfully! Our team will reach out within 24 hours.');
      e.target.reset();
      setFormStatus('Send Message');
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#fcfcfd]">
      <style jsx global>{`
        .font-heading { font-family: 'Clash Grotesk', sans-serif; letter-spacing: -0.02em; }
        .accent-gradient { background: linear-gradient(135deg, #FF6B35 0%, #E85D04 100%); }
        .gradient-luxury { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); }
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .three-d { transform-style: preserve-3d; transition: transform 0.4s ease; }
        .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .faq-item.active .faq-answer { max-height: 200px; }
        .faq-item.active .faq-icon { transform: rotate(180deg); }
      `}</style>

      <ScrollProgressModule />

      <main>
        {/* Hero */}
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-6xl mx-auto text-center reveal active">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-8">
              <Icon icon="lucide:headphones" /> Always at Your Service
            </div>
            <h1 className="text-7xl lg:text-7xl font-bold text-[#000000] font-heading leading-none tracking-tighter mb-8">Let's Perfect <span className="text-[#FF6B35]">Your Connection.</span></h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">Whether you're looking for enterprise solutions or need a hand with your account, our specialist team is here to help.</p>
          </div>
        </section>

        {/* Form + Info */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="bg-white rounded-[3.5rem] p-10 lg:p-16 shadow-2xl border border-slate-300 border-2 reveal active">
              <h3 className="text-3xl text-[#050505]  font-bold font-heading mb-10">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-2 border-slate-300 text-gray-900 rounded-2xl px-6 py-4 focus:border-orange-500 focus:ring-0 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border-2 border-slate-300 text-gray-900 rounded-2xl px-6 py-4 focus:border-orange-500 focus:ring-0 outline-none transition-all" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Company</label>
                    <input type="text" placeholder="Acme Corp" className="w-full bg-slate-50 border-2 border-slate-300 text-gray-900 rounded-2xl px-6 py-4 focus:border-orange-500 focus:ring-0 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Subject</label>
                    <select className="w-full bg-slate-50 border-2 border-slate-300 text-gray-900 rounded-2xl px-6 py-4 focus:border-orange-500 focus:ring-0 outline-none transition-all appearance-none">
                      <option>General Inquiry</option>
                      <option>Support</option>
                      <option>Sales</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Your Message</label>
                  <textarea rows={4} placeholder="Tell us how we can help..." className="w-full bg-slate-50 border-2 border-slate-300 text-gray-900 rounded-2xl px-6 py-4 focus:border-orange-500 focus:ring-0 outline-none transition-all"></textarea>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="newsletter" className="w-5 h-5 rounded border-slate-200 text-orange-500 focus:ring-orange-500" />
                  <label htmlFor="newsletter" className="text-sm text-slate-500">Subscribe to our weekly premium digest</label>
                </div>
                <button type="submit" className="w-full accent-gradient text-white font-bold py-5 rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-transform">{formStatus}</button>
              </form>
            </div>

            <div className="space-y-8 reveal active delay-200">
              <div className="p-12 bg-slate-900 rounded-[3rem] text-white shadow-2xl">
                <h4 className="text-2xl font-bold font-heading mb-8">Contact Information</h4>
                <div className="space-y-8">
                  {[
                    { icon: 'lucide:mail', label: 'Email Us', value: 'support@linker.io' },
                    { icon: 'lucide:phone', label: 'Call Us', value: '+1 (555) 123-4567' },
                    { icon: 'lucide:map-pin', label: 'Office', value: 'San Francisco, CA, USA' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 group cursor-pointer">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                        <Icon icon={item.icon} className="text-2xl" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</div>
                        <div className="text-lg font-bold">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12 pt-12 border-t border-white/10 flex gap-6">
                  <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all"><Icon icon="mdi:twitter" /></a>
                  <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all"><Icon icon="mdi:linkedin" /></a>
                  <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all"><Icon icon="mdi:github" /></a>
                </div>
              </div>
              <div className="p-10 bg-white border border-slate-300 text-gray-900 rounded-[3rem] flex items-center gap-8">
                <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center flex-shrink-0">
                  <Icon icon="lucide:clock" className="text-3xl text-orange-500" />
                </div>
                <div>
                  <h5 className="text-lg font-bold font-heading mb-1">Typical Response Time</h5>
                  <p className="text-slate-500 text-sm">Our specialists typically respond to all inquiries within <span className="text-orange-600 font-bold">24 hours</span>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20 reveal">
              <h2 className="text-5xl text-[#000000] font-bold font-heading mb-6">Frequently Asked Questions</h2>
              <p className="text-slate-500 text-lg">Quick answers to our most common inquiries.</p>
            </div>
            <div className="space-y-4">
              {[
                { q: 'How long does it take to set up Linker?', a: 'Linker is designed for instant setup. You can shorten your first link in less than 30 seconds after landing on our portal.' },
                { q: 'Can I customize my shortened URLs?', a: 'Absolutely. Premium users can use custom domains and bespoke slugs to maintain 100% brand consistency across all platforms.' },
                { q: 'Do you offer API access for developers?', a: 'Yes, we provide a robust REST API with comprehensive documentation for seamless integration into your existing workflows.' },
              ].map((faq, i) => (
                <div
                  key={i}
                  className={`faq-item p-8 bg-white rounded-3xl border border-slate-300 text-gray-900 cursor-pointer reveal hover:border-orange-200 transition-colors ${faqOpen === i ? 'active' : ''}`}
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold font-heading">{faq.q}</h4>
                    <Icon icon="lucide:chevron-down" className="faq-icon text-2xl transition-transform" />
                  </div>
                  <div className="faq-answer">
                    <p className="pt-6 text-slate-500">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

                    <section className="max-w-7xl mx-auto px-6 py-32">
                <div className="text-center mb-20 reveal">
                    <h2 className="text-5xl text-[#000000] font-bold font-heading mb-6">Immediate Solutions</h2>
                    <p className="text-slate-500 text-lg">Can't wait? Try our self-service support channels.</p>
                </div>
                <div className="grid md:grid-cols-2  lg:grid-cols-4 gap-8">
                    <div className="p-10 bg-white border border-slate-300 rounded-[2.5rem] shadow-sm hover:border-orange-200 transition-all three-d reveal">
                        <iconify-icon icon="lucide:book-open" className="text-4xl text-orange-500 mb-6"></iconify-icon>
                        <h4 className="text-2xl font-bold text-[#000000] font-heading mb-4">Help Center</h4>
                        <p className="text-slate-500 text-sm mb-6">Extensive documentation and guides for every feature.</p>
                        <a href="#" className="text-sm font-bold text-orange-600 flex items-center gap-2 hover:gap-3 transition-all">Explore Docs <iconify-icon icon="lucide:arrow-right"></iconify-icon></a>
                    </div>
                    <div className="p-10 bg-white border border-slate-300 rounded-[2.5rem] shadow-sm hover:border-orange-200 transition-all three-d reveal delay-100">
                        <iconify-icon icon="lucide:messages-square" className="text-4xl text-orange-500 mb-6"></iconify-icon>
                        <h4 className="text-2xl text-[#000000] font-bold font-heading mb-4">Live Chat</h4>
                        <p className="text-slate-500 text-sm mb-6">Instant support with our product specialists on standby.</p>
                        <a href="#" className="text-sm font-bold text-orange-600 flex items-center gap-2 hover:gap-3 transition-all">Start Chat <iconify-icon icon="lucide:arrow-right"></iconify-icon></a>
                    </div>
                    <div className="p-10 bg-white border border-slate-300 rounded-[2.5rem] shadow-sm hover:border-orange-200 transition-all three-d reveal delay-200">
                        <iconify-icon icon="lucide:users-2" className="text-4xl text-orange-500 mb-6"></iconify-icon>
                        <h4 className="text-2xl text-[#000000] font-bold font-heading mb-4">Community</h4>
                        <p className="text-slate-500 text-sm mb-6">Join the discussion with other high-level creators.</p>
                        <a href="#" className="text-sm font-bold text-orange-600 flex items-center gap-2 hover:gap-3 transition-all">Join Forum <iconify-icon icon="lucide:arrow-right"></iconify-icon></a>
                    </div>
                    <div className="p-10 bg-white border border-slate-300 rounded-[2.5rem] shadow-sm hover:border-orange-200 transition-all three-d reveal delay-300">
                        <iconify-icon icon="lucide:code-2" className="text-4xl text-orange-500 mb-6"></iconify-icon>
                        <h4 className="text-2xl text-[#000000] font-bold font-heading mb-4">API Docs</h4>
                        <p className="text-slate-500 text-sm mb-6">For technical integrations and developer support.</p>
                        <a href="#" className="text-sm font-bold text-orange-600 flex items-center gap-2 hover:gap-3 transition-all">API Portal <iconify-icon icon="lucide:arrow-right"></iconify-icon></a>
                    </div>
                </div>
            </section>


        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto reveal">
            <div className="gradient-luxury rounded-[4rem] p-16 lg:p-24 relative overflow-hidden text-center text-white shadow-2xl">
              <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.15),transparent)] pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-5xl lg:text-6xl font-bold font-heading mb-8">Can't Find Your Solution?</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 uppercase tracking-widest font-bold">Browse our documentation or start a chat.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a href="#" className="w-full sm:w-auto px-12 py-5 accent-gradient text-white font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-orange-500/20">View Help Center</a>
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

export default Contactus;
