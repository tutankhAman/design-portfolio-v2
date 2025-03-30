import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';

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
            className="relative"
          >
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-20 blur-xl"></div>
            <img 
              src="https://placehold.co/600x600" 
              alt="Profile" 
              className="rounded-xl shadow-2xl w-full h-auto relative z-10 border-4 border-white dark:border-gray-800"
            />
          </div>
          
          <div ref={bioSectionRef}>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">Hi, I'm <span className="font-playfair font-bold italic gradient-text">Aman</span></h2>
            <p className={`text-lg md:text-xl leading-relaxed mb-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I'm a passionate designer with experience in creating intuitive and visually appealing digital 
              experiences. My journey in design began over 5 years ago, and I've been crafting meaningful 
              solutions for clients ever since.
            </p>
            <p className={`text-lg md:text-xl leading-relaxed mb-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              My background spans across UI/UX design, graphic design, and brand identity. I believe that 
              great design not only looks good but solves real problems and improves people's lives.
            </p>
            <p className={`text-lg md:text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              When I'm not designing, you can find me exploring photography and hiking, which helps me bring fresh 
              perspectives to my creative work.
            </p>
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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className={`skill-item p-6 rounded-xl text-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-medium">UI Design</div>
            </div>
            
            <div className={`skill-item p-6 rounded-xl text-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-medium">UX Research</div>
            </div>
            
            <div className={`skill-item p-6 rounded-xl text-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
              <div className="text-2xl mb-2">📱</div>
              <div className="font-medium">Prototyping</div>
            </div>
            
            <div className={`skill-item p-6 rounded-xl text-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
              <div className="text-2xl mb-2">✨</div>
              <div className="font-medium">Visual Design</div>
            </div>
            
            <div className={`skill-item p-6 rounded-xl text-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
              <div className="text-2xl mb-2">🏷️</div>
              <div className="font-medium">Brand Identity</div>
            </div>
            
            <div className={`skill-item p-6 rounded-xl text-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium">User Testing</div>
            </div>
            
            <div className={`skill-item p-6 rounded-xl text-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
              <div className="text-2xl mb-2">💫</div>
              <div className="font-medium">Interaction Design</div>
            </div>
            
            <div className={`skill-item p-6 rounded-xl text-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
              <div className="text-2xl mb-2">🧩</div>
              <div className="font-medium">Design Systems</div>
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
              <h3 className="font-montserrat font-bold text-2xl mb-2">Senior Designer at Company Name</h3>
              <p className={`mb-3 font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2020 - Present</p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Leading design initiatives and collaborating with cross-functional teams to create cohesive, user-centered design solutions.
                Responsible for mentoring junior designers and establishing design standards.
              </p>
            </div>
            
            <div className={`timeline-item relative pl-10 pb-10 ${darkMode ? 'border-l-2 border-gray-700' : 'border-l-2 border-gray-300'}`}>
              <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-purple-500' : 'bg-pink-500'}`}></div>
              <h3 className="font-montserrat font-bold text-2xl mb-2">Designer at Previous Company</h3>
              <p className={`mb-3 font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2017 - 2020</p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Created user interfaces and improved product experiences through iterative design processes.
                Collaborated with engineers and product managers to deliver high-quality digital products.
              </p>
            </div>
            
            <div className={`timeline-item relative pl-10 ${darkMode ? 'border-l-2 border-gray-700' : 'border-l-2 border-gray-300'}`}>
              <div className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
              <h3 className="font-montserrat font-bold text-2xl mb-2">Bachelor of Design</h3>
              <p className={`mb-3 font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>University Name, 2013 - 2017</p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Specialized in interaction design and visual communication. Received honors for outstanding design thesis project focusing on inclusive design principles.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Style for gradient text */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(45deg, #FF3366, #854DFF, #5B7FFF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
}

export default About;
