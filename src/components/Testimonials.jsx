import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BorderBeam from "@/components/ui/border-beam";
import { useTheme } from '../contexts/ThemeContext';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const testimonialData = [
  {
    id: 1,
    text: "Aman took the vision I had in mind and turned it into reality. He was always aware of the deadlines and delivered on time.",
    name: "Koustubh Pande",
    position: "Full Stack Developer, Delivo",
    initials: "KP",
    gradientFrom: "from-purple-400",
    gradientTo: "to-pink-500"
  },
  {
    id: 2,
    text: "Aman spent significant amount of time understanding our needs and goals for the project. The result was a stunning design that exceeded our expectations.",
    name: "Masoom Raza",
    position: "Founder, Amayra Ethnic Collections",
    initials: "MR",
    gradientFrom: "from-blue-400",
    gradientTo: "to-teal-500"
  },
  {
    id: 3,
    text: "The end product is good and Aman has done a very good job. Just like a professional. It's a privilege to work with him. The designing level is outstanding and attention to detail is seamless",
    name: "MD Shaheem",
    position: "Owner, Taxify Global",
    initials: "MS",
    gradientFrom: "from-yellow-400",
    gradientTo: "to-orange-500"
  },
//   {
//     id: 4,
//     text: "Aman bridges the gap between design and development perfectly. No more back-and-forth between teams—he handles both sides with expertise and precision.",
//     name: "David Wilson",
//     position: "CTO, Elemental Tech",
//     initials: "DW",
//     gradientFrom: "from-green-400",
//     gradientTo: "to-blue-500"
//   },
//   {
//     id: 5,
//     text: "Working with Aman was refreshingly straightforward. He listens, delivers on time, and creates interfaces that genuinely enhance the user experience.",
//     name: "Sophia Lee",
//     position: "UI/UX Lead, Prism Studio",
//     initials: "SL",
//     gradientFrom: "from-pink-400",
//     gradientTo: "to-purple-500"
//   },
//   {
//     id: 6,
//     text: "We needed someone who could translate our vision into reality without losing its essence. Aman not only preserved it but enhanced it in ways we hadn't even considered.",
//     name: "Robert Martin",
//     position: "Creative Director, Visionary Media",
//     initials: "RM",
//     gradientFrom: "from-red-400",
//     gradientTo: "to-yellow-500"
//   }
];

function Testimonials() {
  const { darkMode } = useTheme();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const testimonialRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Navigate to next testimonial
  const handleNext = () => {
    // Create a fade out and in transition
    if (testimonialRef.current) {
      gsap.to(testimonialRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
          gsap.to(testimonialRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1
          });
        }
      });
    }
  };

  // Navigate to previous testimonial
  const handlePrev = () => {
    // Create a fade out and in transition
    if (testimonialRef.current) {
      gsap.to(testimonialRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          setCurrentIndex((prev) => 
            prev === 0 ? testimonialData.length - 1 : prev - 1
          );
          gsap.to(testimonialRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1
          });
        }
      });
    }
  };

  // Setup simple scroll animations 
  useEffect(() => {
    if (!sectionRef.current) return;

    // Clear any existing ScrollTrigger instances
    ScrollTrigger.getAll()
      .filter(trigger => trigger.vars.id?.includes('testimonial'))
      .forEach(trigger => trigger.kill());
    
    // Update background color based on theme
    gsap.fromTo(sectionRef.current,
      { 
        backgroundColor: darkMode 
          ? "rgba(17, 24, 39, 0.5)" // dark gray
          : "rgba(245, 247, 250, 0.5)" // light gray
      },
      { 
        backgroundColor: darkMode 
          ? "rgba(17, 24, 39, 1)" 
          : "rgba(245, 247, 250, 1)",
        duration: 1,
        scrollTrigger: {
          id: "testimonial-section",
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true
        }
      }
    );
    
    // Simple heading animation
    if (headingRef.current) {
      gsap.fromTo(headingRef.current, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            id: "testimonial-heading",
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Initial testimonial reveal
    if (testimonialRef.current) {
      gsap.fromTo(testimonialRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            id: "testimonial-content",
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll()
        .filter(trigger => trigger.vars.id?.includes('testimonial'))
        .forEach(trigger => trigger.kill());
    };
  }, [darkMode]);

  return (
    <section 
      ref={sectionRef}
      className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} relative transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <h2 
          ref={headingRef}
          className={`font-montserrat font-bold text-4xl md:text-5xl mb-4 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
        >
          What <span className="font-playfair font-bold italic">People</span> Say
        </h2>
        
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-16 max-w-2xl mx-auto text-lg`}>
          Don't just take my word for it—here's what clients have to say about working together.
        </p>
        
        <div className="max-w-3xl mx-auto relative">
          {/* Current testimonial with BorderBeam and soft gradient */}
          <div
            ref={testimonialRef}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-10 rounded-lg shadow-md text-center mx-auto relative overflow-hidden`}
            style={{
              background: darkMode
                ? `radial-gradient(circle at top right, ${getGradientColors(currentIndex).darkLight}, #1f2937 70%)`
                : `radial-gradient(circle at top right, ${getGradientColors(currentIndex).light}, white 70%)`,
            }}
          >
            {/* Add BorderBeam component */}
            <BorderBeam 
              size={300} 
              duration={12} 
              borderWidth={1.5} 
              colorFrom={getGradientColors(currentIndex).from} 
              colorTo={getGradientColors(currentIndex).to} 
              delay={1}
            />
            
            {/* Subtle background gradient */}
            <div className="absolute inset-0 opacity-10 rounded-lg" 
              style={{ 
                background: `linear-gradient(135deg, ${getGradientColors(currentIndex).from}40, ${getGradientColors(currentIndex).to}20)`,
              }}
            ></div>
            
            <div className={`text-7xl ${darkMode ? 'text-gray-700' : 'text-gray-200'} font-serif leading-none mb-8 mx-auto w-max relative z-10`}>
              "
            </div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-xl mb-10 font-light leading-relaxed relative z-10`}>
              {testimonialData[currentIndex].text}
            </p>
            <div className="flex items-center justify-center relative z-10">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${testimonialData[currentIndex].gradientFrom} ${testimonialData[currentIndex].gradientTo} mr-4 flex items-center justify-center text-white font-bold text-xl`}>
                {testimonialData[currentIndex].initials}
              </div>
              <div className="text-left">
                <h4 className={`font-semibold text-lg ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{testimonialData[currentIndex].name}</h4>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonialData[currentIndex].position}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-between mt-8 max-w-xs mx-auto">
            <button 
              onClick={handlePrev}
              className={`h-12 w-12 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-md flex items-center justify-center hover:shadow-lg transition-shadow`}
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {testimonialData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    gsap.to(testimonialRef.current, {
                      opacity: 0,
                      duration: 0.3,
                      onComplete: () => {
                        setCurrentIndex(index);
                        gsap.to(testimonialRef.current, {
                          opacity: 1,
                          duration: 0.5
                        });
                      }
                    });
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? `w-6 ${darkMode ? 'bg-gray-200' : 'bg-gray-800'}` 
                      : `w-2 ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className={`h-12 w-12 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-md flex items-center justify-center hover:shadow-lg transition-shadow`}
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Simple accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-50"></div>
    </section>
  );
}

// Updated helper function to get gradient colors for current testimonial
function getGradientColors(index) {
  const gradients = {
    0: { from: '#a855f7', to: '#ec4899', light: 'rgba(236, 72, 153, 0.05)', darkLight: 'rgba(236, 72, 153, 0.1)' }, // purple to pink
    1: { from: '#3b82f6', to: '#14b8a6', light: 'rgba(20, 184, 166, 0.05)', darkLight: 'rgba(20, 184, 166, 0.1)' }, // blue to teal
    2: { from: '#facc15', to: '#f97316', light: 'rgba(249, 115, 22, 0.05)', darkLight: 'rgba(249, 115, 22, 0.1)' }, // yellow to orange 
    3: { from: '#22c55e', to: '#3b82f6', light: 'rgba(59, 130, 246, 0.05)', darkLight: 'rgba(59, 130, 246, 0.1)' }, // green to blue
    4: { from: '#ec4899', to: '#a855f7', light: 'rgba(168, 85, 247, 0.05)', darkLight: 'rgba(168, 85, 247, 0.1)' }, // pink to purple
    5: { from: '#ef4444', to: '#facc15', light: 'rgba(250, 204, 21, 0.05)', darkLight: 'rgba(250, 204, 21, 0.1)' }, // red to yellow
  };
  
  return gradients[index];
}

export default Testimonials;
