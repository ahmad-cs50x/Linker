'use client';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import {ScrollProgressModule} from "../components/ScrollProgressModule";

const Shorten = () => {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [btnText, setBtnText] = useState('Shorten URL');
  const [errorMsg, setErrorMsg] = useState('');
  const [perfectedLink, setPerfectedLink] = useState(null);
  
  const [historyList, setHistoryList] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [origin, setOrigin] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrModalUrl, setQrModalUrl] = useState('');

  // Custom Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/generate');
      const data = await res.json();
      if (data.success) {
        setHistoryList(data.urls || []);
      }
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    setOrigin(window.location.origin);
    fetchHistory();

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

  const handleShorten = async () => {
    if (url.trim() === '') return;
    
    let targetUrl = url.trim();
    // Prepend https:// if not present
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    setBtnText('Perfecting...');
    setErrorMsg('');
    setPerfectedLink(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: targetUrl,
          shorturl: customSlug.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPerfectedLink(data.data);
        setUrl('');
        setCustomSlug('');
        showToast('URL perfected successfully!', 'success');
        fetchHistory(); // Refresh history
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
        showToast(data.message || 'Failed to perfect URL.', 'error');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to the server. Please check your network connection.');
      showToast('Network error. Failed to connect to server.', 'error');
      console.error(err);
    } finally {
      setBtnText('Shorten URL');
    }
  };

  const copyLinkToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    showToast('Link copied to clipboard!', 'success');
    setTimeout(() => {
      setCopiedText('');
    }, 2000);
  };

  const openQrCodeModal = (link) => {
    setQrModalUrl(link);
    setQrModalOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#fcfcfd]">
      <style jsx global>{`
        .font-heading { font-family: 'Clash Grotesk', sans-serif; letter-spacing: -0.02em; }
        .accent-gradient { background: linear-gradient(135deg, #FF6B35 0%, #E85D04 100%); }
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .three-d { transform-style: preserve-3d; transition: transform 0.4s ease; }
      `}</style>

       <ScrollProgressModule />

      <main>
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto text-center reveal active mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-[#FF6B35] text-xs font-bold uppercase tracking-widest mb-8">
              <Icon icon="lucide:zap" /> Real-time Infrastructure
            </div>
            <h1 className="text-6xl md:text-7xl font-bold font-heading text-[#000000] leading-none tracking-tighter mb-8">Your Links, <span className="text-[#FF6B35]">Perfected</span> in Seconds.</h1>
            <p className="text-xl text-slate-500 leading-relaxed">Paste your long, cluttered URLs and transform them into elegant, branded assets that drive engagement and trust.</p>
          </div>

          <div className="max-w-6xl mx-auto px-6 mb-32 reveal active delay-200">
            <div className="bg-white rounded-[3rem] p-8 lg:p-10 shadow-2xl border border-slate-300 relative group">
              
               <div className="grid lg:grid-cols-12 gap-8 items-center">
             
                <div className="lg:col-span-7 flex flex-col gap-5 w-full">
                  
                  {/* URL Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-slate-600 ml-4">Destination URL</label>
                    <div className="flex items-center border-2 border-slate-300 rounded-[2rem] transition-all bg-slate-50/50 p-2 focus-within:border-orange-400 focus-within:bg-white">
                      <Icon icon="lucide:link-2" className="text-slate-400 ml-4 text-xl flex-shrink-0" />
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste your long URL here (e.g. example.com/page)..."
                        className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-lg text-slate-900 placeholder-slate-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Slug Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-slate-600 ml-4">Custom Slug (Optional)</label>
                    <div className="flex items-center border-2 border-slate-300 rounded-[2rem] transition-all bg-slate-50/50 p-2 focus-within:border-orange-400 focus-within:bg-white">
                      <Icon icon="lucide:edit-3" className="text-slate-400 ml-4 text-xl flex-shrink-0" />
                      <input
                        type="text"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        placeholder="Enter custom slug (e.g. promo-2026)..."
                        className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-lg text-slate-900 placeholder-slate-400 outline-none"
                      />
                      <button
                        onClick={handleShorten}
                        className="accent-gradient text-white font-bold px-10 py-4 rounded-[1.5rem] shadow-xl shadow-orange-500/30 hover:scale-105 transition-transform whitespace-nowrap"
                      >
                        {btnText}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {errorMsg && (
                    <div className="text-red-500 text-sm font-bold px-4 flex items-center gap-2 bg-red-50 py-3 rounded-2xl border border-red-100 transition-all">
                      <Icon icon="lucide:alert-circle" className="text-lg" /> {errorMsg}
                    </div>
                  )}

                  {/* Success Result Box */}
                  {perfectedLink && (
                    <div className="p-6 bg-orange-50/50 border-2 border-orange-100 rounded-[2rem] shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300 mt-4">
                      <div className="text-xs uppercase font-bold text-orange-500 tracking-widest mb-3 flex items-center gap-2">
                        <Icon icon="lucide:check-circle" className="text-base" /> URL Perfected!
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="overflow-hidden min-w-0">
                          <div className="text-2xl font-bold font-heading text-slate-900 break-all select-all">
                            {origin ? origin.replace(/^https?:\/\//, '') : 'linker.io'}/{perfectedLink.shorturl}
                          </div>
                          <p className="text-slate-400 text-sm truncate max-w-sm mt-1" title={perfectedLink.url}>{perfectedLink.url}</p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
                          <button
                            onClick={() => copyLinkToClipboard(`${origin}/${perfectedLink.shorturl}`)}
                            className={`flex-1 sm:flex-none h-12 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                              copiedText === `${origin}/${perfectedLink.shorturl}`
                                ? "bg-green-500 text-white shadow-green-500/20"
                                : "bg-slate-900 text-white hover:bg-orange-600 shadow-slate-950/20"
                            }`}
                          >
                            <Icon icon={copiedText === `${origin}/${perfectedLink.shorturl}` ? "lucide:check" : "lucide:copy"} />
                            {copiedText === `${origin}/${perfectedLink.shorturl}` ? "Copied" : "Copy"}
                          </button>
                          <button
                            onClick={() => openQrCodeModal(`${origin}/${perfectedLink.shorturl}`)}
                            className="h-12 w-12 rounded-xl border border-slate-300 text-slate-600 hover:text-orange-500 hover:border-orange-500 flex items-center justify-center transition-all bg-white shadow-sm"
                            title="View QR Code"
                          >
                            <Icon icon="lucide:qr-code" className="text-lg" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <img 
                    src="Gemini_Generated_Image_uefx6yuefx6yuefx-removebg-preview-removebg-preview.png"  
                    className="max-h-[300px] lg:max-h-[350px] object-contain ml-0 lg:ml-8" 
                    alt="URL illustration"
                  />
                </div>

              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-slate-400 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2"><Icon icon="lucide:shield-check" className="text-orange-400" /> SSL Encrypted</div>
                <div className="flex items-center gap-2"><Icon icon="lucide:bar-chart-2" className="text-orange-400" /> Real-time Stats</div>
                <div className="flex items-center gap-2"><Icon icon="lucide:qr-code" className="text-orange-400" /> QR Auto-Gen</div>
              </div>
            </div>
          </div>
        </section>

        {/* Recently Perfected Section */}
        <section className="max-w-7xl mx-auto px-6 mb-40 reveal">
            <div className="bg-white rounded-[4rem] border border-slate-300 overflow-hidden shadow-sm">
                <div className="p-12 border-b border-slate-300 flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-3xl text-[#000000] font-bold font-heading">Recently Perfected</h3>
                    <button 
                      onClick={fetchHistory}
                      className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1.5"
                    >
                      <Icon icon="lucide:rotate-cw" className={loadingHistory ? "animate-spin" : ""} /> Refresh History
                    </button>
                </div>
                
                <div className="divide-y divide-slate-100">
                  {loadingHistory ? (
                    <div className="p-12 text-center text-slate-500 font-bold flex flex-col items-center justify-center">
                      <Icon icon="lucide:loader" className="animate-spin text-4xl text-orange-500 mb-4" />
                      Loading history from database...
                    </div>
                  ) : historyList.length === 0 ? (
                    <div className="p-16 text-center text-slate-400 font-semibold flex flex-col items-center justify-center">
                      <Icon icon="lucide:link-subtitles" className="text-5xl text-slate-300 mb-4" />
                      No links shortened yet. Try perfecting a link above!
                    </div>
                  ) : (
                    historyList.map((item) => (
                      <div key={item._id} className="p-8 flex flex-col lg:flex-row items-center justify-between gap-8 group hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-center gap-6 flex-1 min-w-0 w-full">
                              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 flex-shrink-0">
                                  <Icon icon="lucide:globe" className="text-2xl" />
                              </div>
                              <div className="overflow-hidden min-w-0 w-full">
                                  <a 
                                    href={`${origin}/${item.shorturl}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="font-bold text-[#000000] font-heading text-lg hover:text-[#FF6B35] transition-colors break-all flex items-center gap-1.5"
                                  >
                                    {origin ? origin.replace(/^https?:\/\//, '') : 'linker.io'}/{item.shorturl}
                                    <Icon icon="lucide:external-link" className="text-sm opacity-50" />
                                  </a>
                                  <p className="text-slate-400 text-sm truncate max-w-sm mt-1" title={item.url}>{item.url}</p>
                              </div>
                          </div>
                          
                          <div className="flex items-center gap-12 justify-between lg:justify-end w-full lg:w-auto flex-wrap lg:flex-nowrap">
                              <div className="text-center">
                                  <div className="text-xl text-[#000000] font-bold font-heading">{item.clicks || 0}</div>
                                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Total Clicks</div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                  <button 
                                    onClick={() => copyLinkToClipboard(`${origin}/${item.shorturl}`)}
                                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all shadow-sm ${
                                      copiedText === `${origin}/${item.shorturl}` 
                                        ? 'border-green-500 text-green-500 bg-green-50' 
                                        : 'border-slate-300 text-slate-400 hover:text-orange-500 hover:border-orange-500 bg-white'
                                    }`}
                                    title="Copy Link"
                                  >
                                    <Icon icon={copiedText === `${origin}/${item.shorturl}` ? "lucide:check" : "lucide:copy"} />
                                  </button>
                                  
                                  <button 
                                    onClick={() => openQrCodeModal(`${origin}/${item.shorturl}`)}
                                    className="w-12 h-12 rounded-xl border border-slate-300 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-500 transition-all bg-white shadow-sm"
                                    title="View QR Code"
                                  >
                                    <Icon icon="lucide:qr-code" />
                                  </button>
                                  
                                  <button 
                                    onClick={() => alert(`Original URL:\n${item.url}\n\nShort URL:\n${origin}/${item.shorturl}\n\nCreated On: ${new Date(item.createdAt).toLocaleString()}\nClicks to date: ${item.clicks || 0}`)}
                                    className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-orange-600 transition-all shadow-lg"
                                    title="View Analytics Info"
                                  >
                                    <Icon icon="lucide:bar-chart-3" />
                                  </button>
                              </div>
                          </div>
                      </div>
                    ))
                  )}
                </div>
            </div>
        </section>

        {/* Premium Capabilities Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-40">
            <div className="text-center mb-24 reveal">
                <h2 className="text-5xl text-[#000000] font-bold font-heading mb-6">Premium Capabilities</h2>
                <p className="text-slate-500 text-lg">Unmatched tools for the world's most demanding link management.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:border-orange-200 transition-all three-d">
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6"><Icon icon="lucide:palette" className="text-2xl" /></div>
                    <h4 className="text-2xl font-bold text-[#000000] font-heading mb-4">Custom Branding</h4>
                    <p className="text-slate-500 text-sm">Use your own custom domain and slugs to maintain 100% brand consistency.</p>
                </div>
                <div className="p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:border-orange-200 transition-all three-d">
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6"><img src="icons8-password-30.png" className="text-2xl" /></div>
                    <h4 className="text-2xl font-bold text-[#000000] font-heading mb-4">Password Protected</h4>
                    <p className="text-slate-500 text-sm">Control access to sensitive content with secure, military-grade password protection.</p>
                </div>
                <div className="p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:border-orange-200 transition-all three-d">
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6"><Icon icon="lucide:clock-4" className="text-2xl" /></div>
                    <h4 className="text-2xl font-bold text-[#000000] font-heading mb-4">Expiry Links</h4>
                    <p className="text-slate-500 text-sm">Set automatic expiration dates for limited-time offers and seasonal campaigns.</p>
                </div>
                <div className="p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:border-orange-200 transition-all three-d">
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6"><Icon icon="lucide:mouse-pointer-2" className="text-2xl" /></div>
                    <h4 className="text-2xl font-bold text-[#000000] font-heading mb-4">Retargeting</h4>
                    <p className="text-slate-500 text-sm">Add tracking pixels to build custom audiences from every click on your links.</p>
                </div>
            </div>
        </section>

        {/* Engagement Analytics and Chart */}
        <section className="max-w-7xl mx-auto px-6 mb-40">
            <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-full h-full pointer-events-none"></div>
                 <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div className="reveal">
                        <h3 className="text-4xl flex flex-col font-bold font-heading text-white mb-8">Insights that <span className="text-orange-400">Drive Growth.</span></h3>
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0"><Icon icon="lucide:map" className="text-white" /></div>
                                <div>
                                    <h5 className="text-white font-bold mb-1">Geographic Distribution</h5>
                                    <p className="text-slate-400 text-sm">See exactly where your traffic is coming from down to the city level.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0"><Icon icon="lucide:monitor" className="text-white" /></div>
                                <div>
                                    <h5 className="text-white font-bold mb-1">Device Breakdown</h5>
                                    <p className="text-slate-400 text-sm">Optimize your content based on the screens your audience uses most.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Live Chart Visualizer */}
                    <div className="reveal delay-200">
                        <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-8 border border-white/10">
                            <div className="flex justify-between items-end mb-10">
                                <div className="text-white">
                                    <div className="text-sm uppercase font-bold text-slate-400 tracking-widest mb-1">Engagement Trend</div>
                                    <div className="text-4xl font-bold font-heading">24,812 <span className="text-green-400 text-sm font-normal">+12%</span></div>
                                </div>
                                <Icon icon="lucide:activity" className="text-3xl text-orange-400 animate-pulse" />
                            </div>
                            
                            <div className="h-48 flex items-end justify-between gap-3 px-2" id="chart-container">
                              <div className="bg-orange-500/20 hover:bg-orange-500 h-[30%] w-full rounded-t-lg transition-all duration-300 group relative cursor-pointer">
                                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded font-mono transition-opacity whitespace-nowrap z-10">1,210 clicks</span>
                              </div>
                              <div className="bg-orange-500/20 hover:bg-orange-500 h-[45%] w-full rounded-t-lg transition-all duration-300 group relative cursor-pointer">
                                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded font-mono transition-opacity whitespace-nowrap z-10">1,824 clicks</span>
                              </div>
                              <div className="bg-orange-500/20 hover:bg-orange-500 h-[35%] w-full rounded-t-lg transition-all duration-300 group relative cursor-pointer">
                                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded font-mono transition-opacity whitespace-nowrap z-10">1,480 clicks</span>
                              </div>
                              <div className="bg-orange-500/20 hover:bg-orange-500 h-[60%] w-full rounded-t-lg transition-all duration-300 group relative cursor-pointer">
                                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded font-mono transition-opacity whitespace-nowrap z-10">2,410 clicks</span>
                              </div>
                              <div className="bg-orange-500/20 hover:bg-orange-500 h-[50%] w-full rounded-t-lg transition-all duration-300 group relative cursor-pointer">
                                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded font-mono transition-opacity whitespace-nowrap z-10">2,050 clicks</span>
                              </div>
                              <div className="bg-orange-500 hover:bg-orange-600 h-[80%] w-full rounded-t-lg transition-all duration-300 group relative cursor-pointer">
                                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded font-mono transition-opacity whitespace-nowrap z-10">3,248 clicks</span>
                              </div>
                              <div className="bg-orange-500/40 hover:bg-orange-500 h-[65%] w-full rounded-t-lg transition-all duration-300 group relative cursor-pointer">
                                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded font-mono transition-opacity whitespace-nowrap z-10">2,612 clicks</span>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Global Statistics */}
        <div className="max-w-6xl mx-auto px-6 mb-40">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center reveal">
              <div className="text-6xl font-bold font-heading text-slate-900 mb-2">125,482</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Links Shortened Today</div>
            </div>
            <div className="text-center reveal delay-100">
              <div className="text-6xl font-bold font-heading text-slate-900 mb-2">2.4M</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Monthly Clicks</div>
            </div>
            <div className="text-center reveal delay-200 lg:col-span-1 col-span-2">
              <div className="text-6xl font-bold font-heading text-slate-900 mb-2">4.82%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Average CTR Increase</div>
            </div>
          </div>
        </div>

        {/* Call to Action (CTA) */}
        <div className="max-w-6xl mx-auto reveal mb-32">
          <div className="accent-gradient rounded-[4rem] p-6 lg:p-24 relative overflow-hidden text-center text-white shadow-2xl shadow-orange-500/30">
            <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-5xl lg:text-6xl font-bold font-heading mb-8">The Gold Standard of Connectivity.</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-12 uppercase tracking-widest font-bold">Join the world's most prestigious brands.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="#" className="w-full sm:w-auto px-12 py-5 bg-white border-2 hover:border-black hover:border-1 text-orange-600 font-bold rounded-full hover:scale-105 transition-transform shadow-2xl shadow-black/10">Start for Free</a>
                <a href="#" className="w-full sm:w-auto px-12 py-5 border-2 hover:border-black hover:border-1 bg-black/10 text-white font-bold rounded-full border border-white/20 hover:bg-black/20 transition-all">View All Features</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* QR Code Popup Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full mx-4 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-orange-500 transition-colors"
              title="Close Modal"
            >
              <Icon icon="lucide:x" className="text-lg" />
            </button>
            
            <div className="text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF6B35] mb-4">
                <Icon icon="lucide:qr-code" className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-1">QR Code</h3>
              <p className="text-slate-400 text-xs mb-6 break-all max-w-[240px]">{qrModalUrl}</p>
              
              <div className="bg-slate-50 p-5 rounded-[2rem] inline-block border border-slate-100 shadow-inner mb-6">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrModalUrl)}`}
                  alt="QR Code"
                  className="w-44 h-44 rounded-xl object-contain bg-white"
                />
              </div>
              
              <div className="w-full flex gap-3">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrModalUrl)}`;
                    link.download = 'qrcode.png';
                    link.target = '_blank';
                    link.click();
                  }}
                  className="w-full py-4 bg-slate-900 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-slate-950/20"
                >
                  Download PNG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border text-white font-bold ${
            toast.type === 'success' 
              ? 'bg-emerald-600 border-emerald-500 shadow-emerald-600/20' 
              : 'bg-rose-600 border-rose-500 shadow-rose-600/20'
          }`}>
            <Icon icon={toast.type === 'success' ? "lucide:check-circle" : "lucide:alert-circle"} className="text-xl flex-shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shorten;
