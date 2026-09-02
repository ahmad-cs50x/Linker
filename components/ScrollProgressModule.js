'use client';

import React, { useState, useEffect } from 'react';
// Ensure the import path below points to your actual Progress component
import { Progress } from '@/components/ui/progress'; 

export const ScrollProgressModule = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up to prevent memory leaks when navigating away
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <div className="fixed ml-4 w-[98%] top-[13vh] left-0 z-50">
      <Progress 
        value={scrollProgress} 
        className="h-1.5 w-full bg-transparent [&>div]:bg-[#FF6B35]" 
      />
    </div>
  );
};