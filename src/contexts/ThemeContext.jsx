import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user has a preferred theme already stored or use system preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update theme in localStorage and on html element when darkMode changes
  useEffect(() => {
    const root = window.document.documentElement;
    const theme = darkMode ? 'dark' : 'light';
    
    localStorage.setItem('theme', theme);
    
    // Add or remove dark class from html element
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Function to toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy theme access
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
