import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // SplitText style reveal by line/word staggered fade up
      gsap.fromTo('.phil-text', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%'
          }
        }
      );
      
      // Parallax bg
      gsap.fromTo('.phil-bg', 
        { y: '-10%' },
        {
          y: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="relative w-full py-40 px-6 md:px-16 bg-dark text-primary overflow-hidden flex items-center justify-center min-h-[90dvh]">
      {/* Background Parallax Texture */}
      <div 
        className="phil-bg absolute -top-[20%] -left-[20%] w-[140%] h-[140%] z-0 bg-cover bg-center opacity-10 mix-blend-overlay"
        style={{ backgroundImage: "url('/philosophy_promo.png')" }}
      ></div>
      
      <div className="relative z-10 max-w-5xl w-full flex flex-col gap-16">
        <p className="phil-text font-heading text-lg md:text-2xl text-primary/60 uppercase tracking-wide max-w-2xl leading-relaxed">
          Most promotional companies focus on: middleman markups and generic catalogs.
        </p>
        
        <h2 className="flex flex-col text-primary uppercase">
          <span className="phil-text font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tighter mb-2">
            We focus on:
          </span>
          <span className="phil-text font-drama italic text-5xl md:text-7xl lg:text-8xl lowercase tracking-normal text-primary">
            factory direct <span className="text-accent">precision.</span>
          </span>
        </h2>
      </div>
    </section>
  );
}
