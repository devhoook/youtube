'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="w-full border-b bg-card">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            FAQ
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Blog
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          {mounted ? (
            <>
              <span className="text-sm text-muted-foreground">Dark Theme:</span>
              <button onClick={toggleTheme} className="text-sm font-medium text-primary hover:underline">
                {theme === 'dark' ? 'On' : 'Off'}
              </button>
            </>
          ) : (
            <div className="h-5 w-32 animate-pulse rounded-md bg-muted" />
          )}
        </div>
      </div>
    </header>
  );
}
