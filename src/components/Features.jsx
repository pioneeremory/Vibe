import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-32 px-6 md:px-16 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-4 text-dark">Functional Artifacts</h2>
          <p className="font-data text-dark/70 uppercase tracking-widest text-sm max-w-xl">
            Precision instrumentation designed to eliminate the middleman and accelerate delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Diagnostic Shuffler */}
          <div className="feature-card h-[400px] bg-white rounded-[2rem] shadow-xl border border-dark/10 p-8 flex flex-col relative overflow-hidden group">
            <h3 className="font-heading font-bold text-xl uppercase mb-2 text-dark">Diagnostic Shuffler</h3>
            <p className="font-data text-xs text-dark/60 uppercase tracking-wider mb-8">Factory Direct Sourcing</p>
            <div className="flex-1 relative flex items-center justify-center">
              <DiagnosticShuffler />
            </div>
          </div>

          {/* Card 2: Telemetry Typewriter */}
          <div className="feature-card h-[400px] bg-dark text-primary rounded-[2rem] shadow-xl p-8 flex flex-col relative overflow-hidden border border-dark/5">
            <h3 className="font-heading font-bold text-xl uppercase mb-2 text-primary">Telemetry Typewriter</h3>
            <p className="font-data text-xs text-primary/60 uppercase tracking-wider mb-8">Transparent Wholesale Pricing</p>
            <div className="flex-1 bg-black/40 rounded-2xl p-6 font-data text-sm flex flex-col justify-end border border-primary/10">
              <TelemetryTypewriter />
            </div>
          </div>

          {/* Card 3: Cursor Protocol Scheduler */}
          <div className="feature-card h-[400px] bg-white rounded-[2rem] shadow-xl border border-dark/10 p-8 flex flex-col relative overflow-hidden group">
            <h3 className="font-heading font-bold text-xl uppercase mb-2 text-dark">Protocol Scheduler</h3>
            <p className="font-data text-xs text-dark/60 uppercase tracking-wider mb-8">Fast Track Fulfillment</p>
            <div className="flex-1 relative flex items-center justify-center w-[90%] mx-auto">
              <CursorScheduler />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    { id: 1, label: 'Supply Chain', color: 'bg-primary border-dark/20 text-dark' },
    { id: 2, label: 'Vetted Factories', color: 'bg-dark text-primary border-transparent' },
    { id: 3, label: 'Raw Materials', color: 'bg-accent text-primary border-transparent' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        if(last) newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[200px] h-[160px]">
      {cards.map((card, idx) => {
        const scale = 1 - Math.max(0, idx - 0) * 0.1;
        const translateY = idx * 20;
        const opacity = 1 - idx * 0.2;
        
        return (
          <div 
            key={card.id}
            className={`absolute top-0 left-0 w-full p-4 rounded-2xl border flex items-center justify-center shadow-lg uppercase font-heading font-semibold text-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${card.color}`}
            style={{ 
              transform: `translateY(${translateY}px) scale(${scale})`, 
              opacity,
              zIndex: 10 - idx 
            }}
          >
            {card.label}
          </div>
        );
      })}
    </div>
  );
}

function TelemetryTypewriter() {
  const messages = [
    "INITIATING SOURCING PROTOCOL...",
    "FETCHING TRUE COST DATA...",
    "ZERO MARKUP VERIFIED.",
    "PRICE AUTOMATICALLY LOCKED."
  ];
  
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (msgIndex >= messages.length) {
      const reset = setTimeout(() => {
        setText('');
        setIndex(0);
        setMsgIndex(0);
      }, 3000);
      return () => clearTimeout(reset);
    }

    const currentMsg = messages[msgIndex];
    if (index < currentMsg.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + currentMsg[index]);
        setIndex(index + 1);
      }, Math.random() * 50 + 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText(prev => prev + '\\n');
        setIndex(0);
        setMsgIndex(msgIndex + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [index, msgIndex]);

  return (
    <div className="w-full text-left text-primary whitespace-pre-wrap flex flex-col items-start gap-1">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
        <span className="text-[10px] uppercase text-primary/50 tracking-widest">Live Feed</span>
      </div>
      <div className="min-h-[100px] w-full break-words">
        {text.split('\\n').map((line, i) => <div key={i}>{line}</div>)}
        <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
      </div>
    </div>
  );
}

function CursorScheduler() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // Reset
      tl.set(cursorRef.current, { x: 50, y: 120, opacity: 0 });
      
      // Enter
      tl.to(cursorRef.current, { x: 100, y: 30, opacity: 1, duration: 1, ease: 'power2.out' });
      
      // Click
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.call(() => setActiveDay(3));
      tl.to(cursorRef.current, { scale: 1, duration: 0.2 });
      
      // Move to Save
      tl.to(cursorRef.current, { x: 150, y: 110, duration: 0.8, ease: 'power2.inOut', delay: 0.2 });
      
      // Click Save
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.to(cursorRef.current, { scale: 1, duration: 0.2 });
      tl.to(cursorRef.current, { opacity: 0, duration: 0.3 });
      tl.call(() => setActiveDay(null));
      
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 relative">
      <div className="grid grid-cols-7 gap-1 w-full relative z-0">
        {days.map((day, i) => (
          <div 
            key={i} 
            className={`flex items-center justify-center aspect-square rounded-lg border text-xs font-data transition-colors duration-300 ${
              activeDay === i ? 'bg-accent border-accent text-primary' : 'border-dark/10 text-dark/40 bg-background'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="flex justify-end relative z-0">
        <div className="px-6 py-2 rounded-full border border-dark/20 text-xs font-heading font-bold uppercase text-dark/70 bg-white">
          Save
        </div>
      </div>
      
      <div ref={cursorRef} className="absolute top-0 left-0 pointer-events-none drop-shadow-xl z-10 w-8 h-8">
        <MousePointer2 className="w-full h-full text-dark fill-white" strokeWidth={1.5} />
      </div>
    </div>
  );
}
