import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { AuroraCard } from './ui/aurora-card';

// Import project images
import project1 from '/projects/prject-1.png';
import project2 from '/projects/prject-2.png';
import project3 from '/projects/prject-3.png';
import project4 from '/projects/prject-4.png';
import project5 from '/projects/prject-5.png';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const projectsRef = useRef([]);

  // Project data with updated image paths
  const projects = [
    {
      id: 1,
      title: "AbstractVidya Blogs",
      image: project1,
    },
    {
      id: 2,
      title: "Amayra Ethnic Collections",
      image: project2,
    },
    {
      id: 3,
      title: "The Drinks App",
      image: project3,
    },
    {
      id: 4,
      title: "The Delivo Project",
      image: project4,
    },
    {
      id: 5,
      title: "The pdhAI Project",
      image: project5,
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const projectElements = projectsRef.current;

    // Reset any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id?.includes('project-')) {
        trigger.kill();
      }
    });

    // Initial setup
    gsap.set(heading, {
      opacity: 0,
      y: 30
    });

    gsap.set(projectElements, {
      opacity: 0,
      y: 50
    });

    // Animate heading
    gsap.to(heading, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        id: "project-heading",
        trigger: heading,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Animate projects with staggered timing
    gsap.to(projectElements, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        id: "project-items",
        trigger: section,
        start: "top 60%",
        toggleActions: "play none none none"
      }
    });

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id?.includes('project-')) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading with added subheading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-3">
            my <span className="font-playfair font-bold italic gradient-text">creations</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            A collection of carefully crafted digital experiences
          </p>
        </div>

        {/* Improved Project Cards Grid Layout with Aurora Card effect */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 max-w-6xl mx-auto">
          {/* Featured project - spans 8 columns on larger screens */}
          <div 
            ref={el => projectsRef.current[0] = el}
            className="col-span-12 md:col-span-8 row-span-2"
          >
            <AuroraCard 
              containerClassName="h-full"
              glowClassName="from-purple-500/60 via-pink-400/60 to-blue-500/60"
            >
              <div className="relative h-[32rem] w-full">
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={projects[0].image} 
                    alt={projects[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-3">
                    {projects[0].title}
                  </h3>
                  <div className="h-0.5 w-16 bg-white/80 group-hover:w-24 transition-all duration-300"></div>
                </div>
              </div>
            </AuroraCard>
          </div>

          {/* Second project - spans 4 columns on larger screens */}
          <div 
            ref={el => projectsRef.current[1] = el}
            className="col-span-12 md:col-span-4"
          >
            <AuroraCard 
              containerClassName="h-full"
              glowClassName="from-blue-500/60 via-cyan-400/60 to-emerald-500/60"
            >
              <div className="relative h-[15rem] w-full">
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={projects[1].image} 
                    alt={projects[1].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-montserrat font-semibold text-xl text-white mb-2">
                    {projects[1].title}
                  </h3>
                  <div className="h-0.5 w-12 bg-white/80 group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            </AuroraCard>
          </div>

          {/* Third project - spans 4 columns on larger screens */}
          <div 
            ref={el => projectsRef.current[2] = el}
            className="col-span-12 md:col-span-4"
          >
            <AuroraCard 
              containerClassName="h-full"
              glowClassName="from-emerald-500/60 via-teal-400/60 to-cyan-500/60"
            >
              <div className="relative h-[15rem] w-full">
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={projects[2].image} 
                    alt={projects[2].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-montserrat font-semibold text-xl text-white mb-2">
                    {projects[2].title}
                  </h3>
                  <div className="h-0.5 w-12 bg-white/80 group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            </AuroraCard>
          </div>

          {/* Fourth & Fifth projects - each spans 6 columns on larger screens */}
          {projects.slice(3, 5).map((project, index) => (
            <div 
              key={project.id}
              ref={el => projectsRef.current[index + 3] = el}
              className="col-span-12 md:col-span-6"
            >
              <AuroraCard 
                containerClassName="h-full"
                glowClassName={index === 0 
                  ? "from-amber-500/60 via-orange-400/60 to-pink-500/60" 
                  : "from-indigo-500/60 via-purple-400/60 to-pink-500/60"
                }
              >
                <div className="relative h-[18rem] w-full">
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-montserrat font-semibold text-xl md:text-2xl text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="h-0.5 w-12 bg-white/80 group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>
              </AuroraCard>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(45deg, #FF3366, #854DFF, #5B7FFF);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-animation 6s ease infinite;
        }
        
        @keyframes gradient-animation {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </section>
  );
};

export default ProjectShowcase;
