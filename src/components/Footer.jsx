import { useTheme } from '../contexts/ThemeContext';

function Footer() {
  const currentYear = new Date().getFullYear();
  const { darkMode } = useTheme();
  
  return (
    <footer className={`relative ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'} py-12 mt-auto border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-70"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="font-playfair font-bold italic text-2xl mb-2">
              <span className="gradient-text">Aman Aziz</span>
            </h3>
            <p className={`font-montserrat text-sm tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Designer & Developer crafting digital experiences
            </p>
            <p className={`font-lato text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-6`}>
              Based in <span className="font-medium">India</span>
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="flex space-x-5">
              <a href="https://github.com/tutankhAman" target="_blank" rel="noopener noreferrer" 
                className="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="https://linkedin.com/in/aman-aziz" target="_blank" rel="noopener noreferrer" 
                className="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
            <div className={`font-mono text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} text-right`}>
              <a href="mailto:amanaziz2020@gmail.com" className={`${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-800'} transition duration-300`}>
                amanaziz2020@gmail.com
              </a>
            </div>
          </div>
        </div>
        
        <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} text-center`}>
          <p className={`font-montserrat text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>&copy; {currentYear} <span className="font-medium">Aman Aziz</span>. All rights reserved.</p>
        </div>
      </div>

      {/* Custom styles for gradient text and social links */}
      <style dangerouslySetInnerHTML={{ __html: `
        .gradient-text {
          background: linear-gradient(45deg, #FF3366, #854DFF, #5B7FFF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .social-link {
          color: ${darkMode ? '#9CA3AF' : '#6B7280'};
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
        }
        .social-link:hover {
          color: ${darkMode ? '#F3F4F6' : '#1F2937'};
          background: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.07)'};
          transform: translateY(-2px);
        }
      `}} />
    </footer>
  );
}

export default Footer;
