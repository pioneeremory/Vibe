import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.08, 
          duration: 1.2, 
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] flex items-end pb-24 px-6 md:px-16 overflow-hidden bg-dark">
      {/* Background Image: Brutalist/Concrete */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero_promo.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start gap-6">
        <h1 className="flex flex-col leading-none text-primary uppercase">
          <span className="hero-anim font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter w-full max-w-3xl">
            Bypass the
          </span>
          <span className="hero-anim font-drama italic text-7xl md:text-[10rem] lg:text-[12rem] lowercase tracking-normal text-primary pr-4">
            markups.
          </span>
        </h1>
        
        <p className="hero-anim max-w-xl text-primary/80 font-data text-sm md:text-base leading-relaxed uppercase tracking-widest">
          Custom Branded Products. Factory Direct Sourcing. Zero Middleman Margin.
        </p>
        
        <div className="hero-anim pt-4">
          <a href="mailto:logan@pacificcoastpromo.com" className="relative inline-block overflow-hidden group px-8 py-4 rounded-full bg-accent text-primary font-heading font-semibold text-lg hover:shadow-[0_0_30px_rgba(230,59,46,0.3)] magnetic">
            <span className="relative z-10 flex items-center gap-2">
              Start Your Quote
            </span>
            <span className="absolute inset-0 bg-white/20 transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
