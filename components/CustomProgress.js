'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { Progress, ProgressLabel, ProgressValue, ProgressTrack } from '@animate-ui/components-base-progress';

// 1. Create a context to share the progress value
const ProgressContext = createContext(null);

export const CustomProgress = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ProgressContext.Provider value={scrollProgress}>
      <div className="fixed top-0 left-0 w-full z-50">
        {children}
      </div>
    </ProgressContext.Provider>
  );
};

// 2. Attach sub-components to the parent for easy access
CustomProgress.Label = ProgressLabel;
CustomProgress.Value = ProgressValue;
CustomProgress.Track = ProgressTrack;