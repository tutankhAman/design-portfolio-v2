import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const nameRef = useRef(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const subtitleRef = useRef(null);
  const glowEffectRef = useRef(null);
  
  // Canvas background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const config = {
      gridSize: 20,
      lineWidth: 0.4,
      lineColor: 'rgba(0, 0, 0, 0.08)',
      waveSpeed: 0.004,
      waveHeight: 5,
      noiseScale: 0.005
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
      const xf = x - Math.floor(x);
      const yf = y - Math.floor(y);
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
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
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

    const tl = gsap.timeline();

    tl.fromTo(sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    tl.fromTo(nameRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.7"
    );

    tl.fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    );

    gsap.to(nameRef.current, {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5
    });

    gsap.fromTo(glowEffectRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        delay: 0.5
      }
    );

    gsap.to(glowEffectRef.current, {
      scale: 1.1,
      opacity: 0.8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.5
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      gsap.killTweensOf([nameRef.current, sectionRef.current, subtitleRef.current, glowEffectRef.current]);
      tl.kill();
    };
  }, []);

  return (
    <div className="relative">
      {/* First section with name and background */}
      <section 
        ref={sectionRef} 
        className="relative h-screen flex flex-col justify-center items-center overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
        ></canvas>

        <div
          ref={glowEffectRef}
          className="absolute bottom-4 left-0 right-0 flex justify-center items-center pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <div className="w-[90vw] h-[35vh] rounded-full" 
            style={{ 
              background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(128,128,128,0.1) 40%, rgba(0,0,0,0) 70%)',
              transform: 'translateY(25%)',
              filter: 'blur(50px)',
              opacity: 0.7
            }}>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[45vh] opacity-20 pointer-events-none" 
          style={{
            background: 'linear-gradient(to top, rgba(200,200,200,0.2), rgba(255,255,255,0))',
            zIndex: 1
          }}>
        </div>

        <div
          ref={subtitleRef}
          className="absolute top-1/4 left-0 right-0 text-center overflow-hidden"
        >
          <p className="font-montserrat text-sm md:text-base tracking-widest uppercase text-gray-400 px-4">
            Designer & Developer
          </p>
        </div>

        <div className="absolute bottom-4 left-0 right-0 text-center overflow-hidden">
          <h1
            ref={nameRef}
            className="font-raleway font-medium text-[25vw] leading-none tracking-tighter text-gray-800 relative z-10"
          >
            aman
          </h1>
        </div>
      </section>

      {/* Second section - introduction text */}
      <section className="bg-gray-50 min-h-screen flex items-center justify-center py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-7xl mb-12 text-gray-900 leading-tight">
            Hey I'm <span className="font-playfair font-bold italic">Aman</span> - I make <span className="font-playfair font-bold italic gradient-text">pixels</span> meet <span className="font-mono font-thin">code</span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed mx-auto">
            I <span className="font-lato italic">design with intent</span> and <span className="font-mono font-thin">code</span> with efficiency—crafting sleek, intuitive experiences that are as smooth to use as they are to look at. No guesswork, no mess—just <span className="font-lato italic">clean design, seamless functionality</span>, and a developer's touch to bring it all to life.
          </p>
        </div>
      </section>
      
      {/* Scrolling Text Strap Section */}
      <section className="bg-black py-4 overflow-hidden">
        <div className="scroll-text-container" style={{ display: 'inline-flex', whiteSpace: 'nowrap' }} ref={el => {
          if (el && !el.hasLocoScroll) {
            el.hasLocoScroll = true;
            const text = el.querySelector('.scroll-text');
            const textWidth = text.offsetWidth;
            
            const clone = text.cloneNode(true);
            el.appendChild(clone);
            
            gsap.set(clone, { x: textWidth });
            
            gsap.to([text, clone], {
              x: `-=${textWidth}`,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                scrub: 0.3,
                start: "top bottom",
                end: "bottom top",
              }
            });
          }
        }}>
          <div className="scroll-text">
            <h2 className="text-white font-playfair font-bold italic text-4xl md:text-5xl lg:text-6xl">
              design that makes people give a damn • design that makes people give a damn • design that makes people give a damn • design that makes people give a damn • design that makes people give a damn •
            </h2>
          </div>
        </div>
      </section>
      
      {/* White Scrolling Text Strap for Code */}
      <section className="bg-white py-4 overflow-hidden relative border-t border-b border-gray-800">
        <div className="scroll-text-container" style={{ display: 'inline-flex', whiteSpace: 'nowrap' }} ref={el => {
          if (el && !el.hasLocoScroll) {
            el.hasLocoScroll = true;
            const text = el.querySelector('.scroll-text');
            const textWidth = text.offsetWidth;
            
            const clone = text.cloneNode(true);
            el.appendChild(clone);
            
            gsap.set(text, { x: -textWidth });
            gsap.set(clone, { x: 0 });
            
            gsap.to([text, clone], {
              x: `+=${textWidth}`,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                scrub: 0.3,
                start: "top bottom",
                end: "bottom top",
              }
            });
          }
        }}>
          <div className="scroll-text">
            <h2 className="text-black font-playfair font- italic  text-4xl md:text-5xl lg:text-6xl">
              code that brings it to life ; code that brings it to life ; code that brings it to life ; code that brings it to life ; code that brings it to life ; code that brings it to life ; code that brings it to life ; code that brings it to life ;
            </h2>
          </div>
        </div>
      </section>
      
      {/* Footer space */}
      <div className="bg-white h-[20vh]"></div>
    </div>
  );
}

export default Home;
