import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      // Default to dark for stronger visuals; user preference in localStorage overrides this
      return localStorage.getItem('site-theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('site-theme', theme);
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggle = () => {
    setIsTransitioning(true);
    // brief delay for overlay transition
    setTimeout(() => {
      setTheme((t) => (t === 'light' ? 'dark' : 'light'));
      setTimeout(() => setIsTransitioning(false), 300);
    }, 80);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
