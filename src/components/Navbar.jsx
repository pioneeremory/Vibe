import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          setIsScrolled(self.scroll() > 50);
        }
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <nav 
        ref={navRef}
        className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-[2rem] transition-all duration-500 ease-in-out w-full max-w-5xl ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border border-dark/10 shadow-lg text-dark' 
            : 'bg-transparent text-primary/90'
        }`}
      >
        <div className="font-heading font-bold tracking-tight text-lg">
          Pacific Coast
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-data text-sm tracking-widest uppercase">
          <a href="#features" className="hover:text-accent transition-colors lift">Features</a>
          <a href="#philosophy" className="hover:text-accent transition-colors lift">Philosophy</a>
          <a href="#protocol" className="hover:text-accent transition-colors lift">Protocol</a>
          <a href="#shop" className="hover:text-accent transition-colors lift">Shop</a>
        </div>
        
        <a href="tel:2533921818" className={`relative inline-block overflow-hidden group px-6 py-2 rounded-full font-heading font-semibold text-sm transition-colors magnetic ${
          isScrolled ? 'bg-accent text-primary' : 'bg-primary text-dark'
        }`}>
          <span className="relative z-10">Get Quote</span>
          <span className="absolute inset-0 bg-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 mix-blend-overlay"></span>
        </a>
      </nav>
    </div>
  );
}
