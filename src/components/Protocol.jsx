import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Protocol() {
  const containerRef = useRef(null);

  const steps = [
    {
      id: '01',
      title: 'Sourcing',
      desc: 'Direct factory alignment. No brokers.',
      visual: <RotatingMotif />
    },
    {
      id: '02',
      title: 'Customization',
      desc: 'High-fidelity brand application on raw goods.',
      visual: <ScanningLaser />
    },
    {
      id: '03',
      title: 'Logistics',
      desc: 'Streamlined fulfillment from factory to your dock.',
      visual: <PulsingWaveform />
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Last card doesn't pin/fade under
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: '.protocol-container',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
        });

        const nextCard = cards[index + 1];
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(20px)',
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" className="protocol-container relative w-full bg-background" ref={containerRef}>
      {steps.map((step, idx) => (
        <div 
          key={step.id} 
          className="protocol-card w-full h-[100dvh] sticky top-0 flex items-center justify-center p-6 md:p-16 bg-background"
          style={{ zIndex: idx }}
        >
          <div className="w-full max-w-6xl h-[80%] bg-white rounded-[2rem] shadow-2xl border border-dark/10 flex flex-col md:flex-row overflow-hidden flex-shrink-0">
            {/* Left Content */}
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-white">
              <span className="font-data text-accent text-2xl mb-6">{step.id}</span>
              <h3 className="font-heading font-bold text-5xl md:text-7xl uppercase mb-6 tracking-tight text-dark">{step.title}</h3>
              <p className="font-data text-dark/70 uppercase tracking-widest leading-relaxed max-w-md">
                {step.desc}
              </p>
            </div>
            
            {/* Right Visual */}
            <div className="w-full md:w-1/2 bg-dark flex items-center justify-center relative overflow-hidden h-64 md:h-auto border-l border-dark/10">
              {step.visual}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

// Visuals
function RotatingMotif() {
  const svgRef = useRef(null);
  useEffect(() => {
    gsap.to(svgRef.current, { rotation: 360, duration: 20, ease: 'none', repeat: -1 });
  }, []);
  return (
    <svg ref={svgRef} viewBox="0 0 100 100" className="w-[60%] h-[60%] opacity-80 stroke-primary fill-none" strokeWidth="2">
      <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
      <polygon points="50,15 85,85 15,85" strokeWidth="1" />
      <polygon points="50,85 15,15 85,15" strokeWidth="1" />
      <circle cx="50" cy="50" r="10" className="fill-accent stroke-none" />
    </svg>
  );
}

function ScanningLaser() {
  const lineRef = useRef(null);
  useEffect(() => {
    gsap.to(lineRef.current, { y: 200, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: -1 });
  }, []);
  return (
    <div className="relative w-[80%] h-[80%] border border-primary/20 bg-[linear-gradient(to_right,#F5F3EE1A_1px,transparent_1px),linear-gradient(to_bottom,#F5F3EE1A_1px,transparent_1px)] bg-[size:20px_20px]">
      <div ref={lineRef} className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_rgba(230,59,46,0.8)] z-10"></div>
    </div>
  );
}

function PulsingWaveform() {
  const pathRef = useRef(null);
  useEffect(() => {
    const length = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 2, ease: 'power1.inOut', repeat: -1 });
  }, []);
  return (
    <svg viewBox="0 0 200 100" className="w-[80%] h-auto fill-none stroke-accent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path ref={pathRef} d="M0,50 L50,50 L65,20 L80,80 L95,10 L110,90 L125,50 L200,50" />
    </svg>
  );
}
