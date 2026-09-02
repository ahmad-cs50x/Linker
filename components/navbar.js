'use client';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white/85 w-[98%] top-[2vh] ml-4 fixed absolute flex border-2 border-amber-600 shadow-md rounded-t-4xl text-gray-500 items-center gap-40 py-3 ">
      <a href="/" className="flex items-center gap-3 ml-4 group">
        <div className="w-40 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-1">
          <img src="/Gemini_Generated_Image_yjw9fhyjw9fhyjw9-removebg-preview.png" alt="Linker logo" />
        </div>
      </a>

      <div className="hidden lg:flex items-center gap-10 ml-12 text-sm font-semibold tracking-wide uppercase text-gray-500">
        <a href="/" className="hover:underline hover:text-orange-600 duration-300 transition-colors">Home</a>
        <a href="/about" className="hover:underline hover:text-orange-600 duration-300 transition-colors">About</a>
        <a href="/contact" className="hover:underline hover:text-orange-600 duration-300 transition-colors">Contact</a>
        <a href="/URLshortner" className="hover:underline hover:text-orange-600 duration-300 transition-colors">URL shortner</a>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <a href="https://github.com/ahmad-cs50x" className="text-sm font-bold border-2 px-4 py-2 rounded-2xl hover:border-white text-gray-500">Github</a>
        <a href="/URLshortner" className="bg-gradient-to-br from-orange-400 to-orange-700 text-white text-sm font-bold px-8 py-3 rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all">Get Started</a>
      </div>
    </nav>
  );
};

export default Navbar;
