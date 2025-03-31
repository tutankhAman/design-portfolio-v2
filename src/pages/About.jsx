import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';
// Import necessary icons - using the correct exports
import { 
  FaPalette, FaCode, FaSearch, FaMobile, 
  FaPencilAlt, FaLayerGroup, FaUsers, FaCubes, 
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaServer
} from 'react-icons/fa';
import { BiLogoTailwindCss, BiLogoTypescript } from 'react-icons/bi';
import { TbBrandNextjs } from 'react-icons/tb';
import { MdDesignServices } from 'react-icons/md';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function About() {
  const { darkMode } = useTheme();
  const headerRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const canvasRef = useRef(null);
  const profileImgRef = useRef(null);
  const bioSectionRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const educationSectionRef = useRef(null);
  
  // State to manage which skills tab is active
  const [activeSkillsTab, setActiveSkillsTab] = useState('design');

  // Canvas background effect - similar to home page
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight * 0.8; // Limit height to top section

    const config = {
      gridSize: 25,
      lineWidth: 0.4,
      lineColor: darkMode ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
      waveSpeed: 0.003,
      waveHeight: 4,
      noiseScale: 0.004
    };

    const cols = Math.floor(width / config.gridSize) + 2;
    const rows = Math.floor(height / config.gridSize) + 2;
    const points = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        points.push({
          x: x * config.gridSize,
          y: y * config.gridSize,
          originX: x * config.gridSize,
          originY: y * config.gridSize
        });
      }
    }

    const noise = (x, y) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      return Math.sin(X * 0.1 + Y * 0.1) * Math.cos(X * 0.11 + Y * 0.09) * 0.5 + 0.5;
    };

    let animationTime = 0;
    let animationFrameId;

    function animate() {
      ctx.clearRect(0, 0, width, height);
      animationTime += config.waveSpeed;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const noiseX = noise(point.originX * config.noiseScale, point.originY * config.noiseScale + animationTime);
        const noiseY = noise(point.originX * config.noiseScale + animationTime, point.originY * config.noiseScale);
        point.x = point.originX + (noiseX * 2 - 1) * config.waveHeight;
        point.y = point.originY + (noiseY * 2 - 1) * config.waveHeight;
      }

      ctx.beginPath();
      ctx.strokeStyle = config.lineColor;
      ctx.lineWidth = config.lineWidth;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const index = y * cols + x;
          const point = points[index];
          const nextPoint = points[index + 1];
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
        }
      }

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows - 1; y++) {
          const index = y * cols + x;
          const point = points[index];
          const nextPoint = points[index + cols];
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
        }
      }

      ctx.stroke();
      animationFrameId = requestAnimationFrame(animate);
    }

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight * 0.8;
      const newCols = Math.floor(width / config.gridSize) + 2;
      const newRows = Math.floor(height / config.gridSize) + 2;
      points.length = 0;

      for (let y = 0; y < newRows; y++) {
        for (let x = 0; x < newCols; x++) {
          points.push({
            x: x * config.gridSize,
            y: y * config.gridSize,
            originX: x * config.gridSize,
            originY: y * config.gridSize
          });
        }
      }
    }

    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  // GSAP animations
  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline();
    
    tl.fromTo(headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
    
    tl.fromTo(profileImgRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    );
    
    tl.fromTo(bioSectionRef.current.querySelectorAll('h2, p'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      "-=0.9"
    );

    // Skills section animation
    ScrollTrigger.create({
      trigger: skillsSectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(skillsSectionRef.current.querySelectorAll('.skill-item'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
        );
      },
      once: true
    });

    // Education & Experience section animation
    ScrollTrigger.create({
      trigger: educationSectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(educationSectionRef.current.querySelectorAll('.timeline-item'),
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
        );
      },
      once: true
    });

    return () => {
      // Clean up animations
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      {/* Hero section with canvas background */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
        ></canvas>
        
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 
            ref={headerRef}
            className="font-playfair font-bold text-5xl md:text-7xl lg:text-8xl"
          >
            About <span className="font-playfair font-bold italic gradient-text">Me</span>
          </h1>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-[20vh] opacity-20 pointer-events-none" 
          style={{
            background: darkMode
              ? 'linear-gradient(to top, rgba(50,50,50,0.3), rgba(50,50,50,0))'
              : 'linear-gradient(to top, rgba(200,200,200,0.3), rgba(255,255,255,0))',
            zIndex: 1
          }}>
        </div>
      </section>

      {/* About me section with profile and bio */}
      <section 
        ref={aboutSectionRef}
        className={`container mx-auto px-4 py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div 
            ref={profileImgRef}
            className="relative h-[400px] mx-auto md:mx-0 w-full max-w-md"
          >
            {/* Postcard style overlapping images */}
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-10 blur-xl"></div>
            
            {/* First image - back left */}
            <div 
              className="absolute left-[10%] top-[10%] w-[70%] h-auto z-10 transform -rotate-6 hover:-rotate-8 transition-all duration-300 hover:z-30"
              style={{ transformOrigin: 'center bottom', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }}
            >
              <div className="relative overflow-hidden rounded-lg border-4 border-white dark:border-gray-800">
                <img 
                  src="/pfp-3.jpg" 
                  alt="Profile 1" 
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '3/4' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
            
            {/* Second image - middle */}
            <div 
              className="absolute left-[20%] top-[5%] w-[70%] h-auto z-20 transform rotate-2 hover:rotate-0 transition-all duration-300 hover:z-30"
              style={{ transformOrigin: 'center bottom', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.25))' }}
            >
              <div className="relative overflow-hidden rounded-lg border-4 border-white dark:border-gray-800">
                <img 
                  src="/pfp.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '3/4' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
            
            {/* Third image - front right */}
            <div 
              className="absolute left-[30%] top-[0%] w-[70%] h-auto z-30 transform rotate-8 hover:rotate-12 transition-all duration-300 hover:z-20"
              style={{ transformOrigin: 'center bottom', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}
            >
              <div className="relative overflow-hidden rounded-lg border-4 border-white dark:border-gray-800">
                <img 
                  src="/pfp-2.jpg" 
                  alt="Profile 3" 
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '3/4' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
            
            {/* Subtle reflection under the images */}
            <div className="absolute bottom-[-15px] left-[15%] w-[80%] h-[15px] bg-black/20 dark:bg-white/10 blur-md rounded-full"></div>
          </div>
          
          <div ref={bioSectionRef}>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">Hi, I'm <span className="font-playfair font-bold italic gradient-text">Aman</span></h2>
            <p className={`text-lg md:text-xl leading-relaxed mb-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Designer by eye, developer by logic—basically, the <span className="font-medium relative px-1">
                <span className="relative z-10">Swiss Army knife</span>
                <span className={`absolute inset-0 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded opacity-30 transform -skew-x-3`}></span>
              </span> of the web. I craft <span className="italic">sleek, intuitive UIs</span> and back them up with <span className="font-mono font-medium">clean, efficient code</span>. If bad design hurts your soul and buggy code makes you cringe, we're already on the same page. Let's build something <span className="font-medium text-pink-500 dark:text-pink-400">beautiful</span> and <span className="font-medium text-purple-500 dark:text-purple-400">functional</span>—because why settle for less?
            </p>
            <div className="mt-8 mb-2 relative">
              <p className={`text-lg md:text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                My one motto - <span className="font-playfair font-bold italic text-xl md:text-2xl xl:text-3xl gradient-text" style={{ letterSpacing: "-0.02em", textShadow: "0 2px 5px rgba(0, 0, 0, 0.12)" }}>Design what makes people give a damn</span>
              </p>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 rounded-lg blur-md -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills section */}
      <section 
        ref={skillsSectionRef}
        className={`py-24 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-16 text-center">
            My <span className="font-playfair font-bold italic gradient-text">Skills</span>
          </h2>
          
          {/* Skill Type Toggle Switch */}
          <div className="max-w-md mx-auto mb-16">
            <div className={`p-1 rounded-full flex items-center relative ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              {/* Active tab background slider - darkened */}
              <div 
                className={`absolute top-1 bottom-1 w-1/2 ${activeSkillsTab === 'design' ? 'left-1' : 'left-[calc(50%)]'} 
                  rounded-full transition-all duration-300 ease-in-out z-0 
                  ${darkMode ? 'bg-gray-800' : 'bg-gray-400'}`}
              ></div>
              
              {/* Design Tab */}
              <button 
                onClick={() => setActiveSkillsTab('design')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-medium text-sm z-10 transition-colors duration-300 ${
                  activeSkillsTab === 'design' ? 'text-white' : `${darkMode ? 'text-gray-400' : 'text-gray-600'}`
                }`}
              >
                <FaPalette className="text-lg" />
                <span>Design Skills</span>
              </button>
              
              {/* Development Tab */}
              <button 
                onClick={() => setActiveSkillsTab('development')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-medium text-sm z-10 transition-colors duration-300 ${
                  activeSkillsTab === 'development' ? 'text-white' : `${darkMode ? 'text-gray-400' : 'text-gray-600'}`
                }`}
              >
                <FaCode className="text-lg" />
                <span>Development Skills</span>
              </button>
            </div>
          </div>
          
          {/* Design Skills */}
          <div className={`transition-all duration-500 ease-in-out ${activeSkillsTab === 'design' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 absolute -z-10'}`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaPalette className="text-xl" />
                  </div>
                  <div className="font-normal text-center">UI Design</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaSearch className="text-xl" />
                  </div>
                  <div className="font-normal text-center">UX Research</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaMobile className="text-xl" />
                  </div>
                  <div className="font-normal text-center">Prototyping</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaPencilAlt className="text-xl" />
                  </div>
                  <div className="font-normal text-center">Visual Design</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <MdDesignServices className="text-xl" />
                  </div>
                  <div className="font-normal text-center">Brand Identity</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaUsers className="text-xl" />
                  </div>
                  <div className="font-normal text-center">User Testing</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3"></path>
                      <path d="M21 14v3a2 2 0 0 1-2 2h-3m0-18v18"></path>
                      <path d="M3 14v3a2 2 0 0 0 2 2h3M8 21h8"></path>
                      <path d="M12 18v3"></path>
                    </svg>
                  </div>
                  <div className="font-normal text-center">Interaction Design</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaLayerGroup className="text-xl" />
                  </div>
                  <div className="font-normal text-center">Design Systems</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Development Skills */}
          <div className={`transition-all duration-500 ease-in-out ${activeSkillsTab === 'development' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 absolute -z-10'}`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaReact className="text-xl" />
                  </div>
                  <div className="font-normal text-center">React</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaJs className="text-xl" />
                  </div>
                  <div className="font-normal text-center">JavaScript</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <BiLogoTypescript className="text-xl" />
                  </div>
                  <div className="font-normal text-center">TypeScript</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <div className="flex">
                      <FaHtml5 className="text-xl mr-1" />
                      <FaCss3Alt className="text-xl" />
                    </div>
                  </div>
                  <div className="font-normal text-center">HTML/CSS</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <BiLogoTailwindCss className="text-xl" />
                  </div>
                  <div className="font-normal text-center">Tailwind CSS</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <TbBrandNextjs className="text-xl" />
                  </div>
                  <div className="font-normal text-center">Next.js</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaNodeJs className="text-xl" />
                  </div>
                  <div className="font-normal text-center">Node.js</div>
                </div>
              </div>
              
              <div className={`skill-item p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white mb-4">
                    <FaServer className="text-xl" />
                  </div>
                  <div className="font-normal text-center">REST APIs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Education & Experience Section */}
      <section 
        ref={educationSectionRef}
        className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-16 text-center">
            Education & <span className="font-playfair font-bold italic gradient-text">Experience</span>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-10">
            <div className={`timeline-item relative pl-10 pb-10 ${darkMode ? 'border-l-2 border-gray-700' : 'border-l-2 border-gray-300'}`}>
              <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-pink-500' : 'bg-purple-500'}`}></div>
              <h3 className="font-montserrat font-bold text-2xl mb-2">Freelance Design & Development</h3>
              <p className={`mb-3 font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2024 - Present</p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Working on client projects while pursuing my degree. Creating responsive websites, UI/UX designs, and brand identities for small businesses and startups.
              </p>
            </div>
            
            <div className={`timeline-item relative pl-10 pb-10 ${darkMode ? 'border-l-2 border-gray-700' : 'border-l-2 border-gray-300'}`}>
              <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-purple-500' : 'bg-pink-500'}`}></div>
              <h3 className="font-montserrat font-bold text-2xl mb-2">Design Lead, Lead Developer - University Project</h3>
              <p className={`mb-3 font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2024</p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Led a team of 5 students to design and develop a Food Delvery Platform (Delivo). Responsible for UI/UX design system, user research, and frontend implementation.
              </p>
            </div>
            
            <div className={`timeline-item relative pl-10 ${darkMode ? 'border-l-2 border-gray-700' : 'border-l-2 border-gray-300'}`}>
              <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
              <h3 className="font-montserrat font-bold text-2xl mb-2">Bachelor of Design & Computer Science</h3>
              <p className={`mb-3 font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vellore Institute of Technology, 2023 - Present</p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Pursuing Computer Science and Engineering.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Style for gradient text and motto */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(45deg, #FF3366, #854DFF, #5B7FFF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .motto-text {
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
      `}</style>
    </div>
  );
}

export default About;
