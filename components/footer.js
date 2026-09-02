'use client';
import React, { useCallback } from 'react';
import { Icon } from '@iconify/react';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const FooterLink = ({ href, children, className }) => {
  const handleClick = useCallback((e) => {
    if (!href.startsWith('http') && !href.startsWith('#')) {
      e.preventDefault();
      scrollToTop();
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    }
  }, [href]);

  if (!className) {
    className = 'hover:text-[#FF6B35] transition-colors';
  }

  return (
    <a href={href} onClick={!href.startsWith('http') && !href.startsWith('#') ? handleClick : undefined} className={className}>
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-32 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="col-span-2">
            <FooterLink href="/" className="flex items-center gap-3 mb-8">
              <div className="w-40 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-105">
                <img src="/Gemini_Generated_Image_yjw9fhyjw9fhyjw9-removebg-preview.png" alt="Linker logo" />
              </div>
            </FooterLink>

            <p className="text-slate-500 max-w-sm mb-10 leading-relaxed">Elevating digital connections through premium infrastructure and sophisticated link management solutions.</p>
            <div className="flex gap-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-orange-300 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#FF6B35] hover:text-white transition-all"><Icon icon="mdi:twitter" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-orange-300 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#FF6B35] hover:text-white transition-all"><Icon icon="mdi:linkedin" /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-orange-300 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#FF6B35] hover:text-white transition-all"><Icon icon="mdi:github" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border-2 border-orange-300 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#FF6B35] hover:text-white transition-all"><Icon icon="mdi:instagram" /></a>
            </div>
          </div>
          <div>
            <h5 className="font-bold font-heading uppercase  tracking-widest text-slate-600 mb-8">Product</h5>
            <ul className="space-y-4 text-sm font-bold text-slate-600">
              <li><FooterLink href="/URLshortner">URL Shortner</FooterLink></li>
              <li><FooterLink href="/premium-features">Premium Features</FooterLink></li>
              <li><FooterLink href="/branded-links">Branded Links</FooterLink></li>
              <li><FooterLink href="/qr-codes">QR Codes</FooterLink></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold font-heading uppercase  tracking-widest text-slate-600 mb-8">Company</h5>
            <ul className="space-y-4 text-sm font-bold text-slate-600">
              <li><FooterLink href="/about">About</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
              <li><FooterLink href="/legal-term">Legal Terms</FooterLink></li>
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold font-heading uppercase  tracking-widest text-slate-600 mb-8">Support</h5>
            <ul className="space-y-4 text-sm font-bold text-slate-600">
              <li><FooterLink href="/docs">Documentation</FooterLink></li>
              <li><FooterLink href="/api-status">API Status</FooterLink></li>
              <li><FooterLink href="/help">Help Center</FooterLink></li>
              <li><FooterLink href="/whitepaper">Whitepaper</FooterLink></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-slate-50 text-xs text-slate-400 font-bold uppercase tracking-widest">
          <p>© 2024 Linker Technologies. A Premium Experience.</p>
          <div className="flex gap-8">
            <FooterLink href="/privacy" className="hover:text-slate-900">Privacy</FooterLink>
            <FooterLink href="/legal-term" className="hover:text-slate-900">Legal Terms</FooterLink>
            <FooterLink href="/security" className="hover:text-slate-900">Security</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
