import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewport, setViewport] = useState('desktop');
  const { darkMode, toggleTheme } = useTheme();
  
  // Check viewport size and track scroll position
  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewport('mobile');
      } else if (width < 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };
    
    const handleScroll = () => {
      if (viewport === 'desktop') {
        const isScrolled = window.scrollY > 800; 
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
      }
    };
    
    checkViewport();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkViewport);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkViewport);
    };
  }, [scrolled, viewport]);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Mobile menu component
  const MobileMenu = () => (
    <div className={`absolute top-[70px] right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg shadow-lg p-4 transition-all duration-300 border border-gray-200 dark:border-gray-700 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
      <ul className="flex flex-col space-y-3 font-montserrat font-semibold text-sm">
        <li>
          <Link 
            to="/" 
            className={`block px-4 py-2 rounded-full transition-colors duration-300 ${
              isActive('/') 
                ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-gray-100' 
                : 'text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        {/* <li>
          <Link 
            to="/about" 
            className={`block px-4 py-2 rounded-full transition-colors duration-300 ${
              isActive('/about') 
                ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-gray-100' 
                : 'text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            About Me
          </Link>
        </li>
        <li>
          <Link 
            to="/approach" 
            className={`block px-4 py-2 rounded-full transition-colors duration-300 ${
              isActive('/approach') 
                ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-gray-100' 
                : 'text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </Link>
        </li> */}
        <li>
          <Link 
            to="/contact" 
            className={`block px-4 py-2 rounded-full transition-colors duration-300 ${
              isActive('/contact') 
                ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-gray-100' 
                : 'text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Contact Me
          </Link>
        </li>
        <li>
          <button 
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="w-full flex items-center justify-start px-4 py-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
            <span className="ml-2">
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </span>
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full mt-4 transition-all duration-500 ease-in-out">
      <nav className={`flex items-center px-4 h-[60px] transition-all duration-500 ease-in-out relative
        ${viewport !== 'desktop'
          ? 'w-[90vw] bg-black/10 dark:bg-white/10 backdrop-blur-md rounded-full shadow-sm border border-gray-200 dark:border-gray-700 justify-between' 
          : scrolled 
            ? 'w-[50vw] bg-black/10 dark:bg-white/10 backdrop-blur-md rounded-full shadow-sm border border-gray-200 dark:border-gray-700 justify-between' 
            : 'w-[80vw] bg-transparent justify-between'
        }`}>
        {/* Left section - Name and title */}
        <div className="flex flex-col justify-center">
          <h1 className="font-lato font-bold text-md text-gray-900 dark:text-gray-100">Aman Aziz</h1>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-montserrat font-light">Developer / UI-UX Designer</p>
        </div>
        
        {/* Middle section - Navigation pills - Centered with absolute positioning */}
        {viewport !== 'mobile' && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="bg-black/10 dark:bg-white/10 backdrop-blur-md rounded-full shadow-sm inline-flex items-center border border-gray-300 dark:border-gray-700 p-0.5">
              <ul className="flex font-montserrat font-semibold text-xs items-center">
                <li className="flex items-center">
                  <Link 
                    to="/" 
                    className={`inline-block px-4 py-2 rounded-full transition-colors duration-300 ${
                      isActive('/') 
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 backdrop-blur-md' 
                        : 'text-gray-800 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-gray-800/70'
                    }`}
                  >
                    Home
                  </Link>
                </li>
                {/* <li className="flex items-center">
                  <Link 
                    to="/about" 
                    className={`inline-block px-4 py-2 rounded-full transition-colors duration-300 ${
                      isActive('/about') 
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 backdrop-blur-sm' 
                        : 'text-gray-800 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-gray-800/70'
                    }`}
                  >
                    About Me
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link 
                    to="/approach" 
                    className={`inline-block px-4 py-2 rounded-full transition-colors duration-300 ${
                      isActive('/approach') 
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 backdrop-blur-sm' 
                        : 'text-gray-800 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-gray-800/70'
                    }`}
                  >
                    Projects
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        )}
        
        {/* Right section - Contact button and theme toggle on larger screens, Menu button on mobile */}
        <div className="flex items-center gap-2">
          {viewport !== 'mobile' && (
            <button 
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-900 dark:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          )}
          
          {viewport === 'mobile' ? (
            <>
              <button 
                onClick={toggleMenu}
                className="px-3 py-2 text-gray-900 dark:text-gray-100 rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
              <MobileMenu />
            </>
          ) : (
            <Link 
              to="/contact" 
              className="px-5 py-2 text-sm text-gray-900 dark:text-gray-100 rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm transition-colors duration-300 font-montserrat"
            >
              Contact Me
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
