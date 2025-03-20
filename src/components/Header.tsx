'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { MoonIcon, SunIcon } from './Icons';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-dark-blue/95 backdrop-blur-sm transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-md'
      }`}
    >
      <div className="container-custom py-4 md:py-6 flex justify-between items-center">
        <Link href="/" className="font-extrabold text-lg md:text-2xl">
          Where in the world?
        </Link>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 font-semibold"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <>
              <MoonIcon className="w-4 h-4" />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <SunIcon className="w-4 h-4" />
              <span>Light Mode</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
