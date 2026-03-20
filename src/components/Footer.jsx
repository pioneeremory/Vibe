import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-primary w-full rounded-t-[4rem] px-6 md:px-16 pt-24 pb-12 overflow-hidden -mt-16 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="md:col-span-2 flex flex-col items-start bg-dark">
          <h3 className="font-heading font-bold text-3xl uppercase tracking-tighter mb-4 text-primary">Pacific Coast Promo</h3>
          <p className="font-data text-sm tracking-widest text-primary/60 uppercase max-w-xs leading-relaxed">
            Get Custom Branded Products Without the High Markups at the Best Wholesale Prices.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 font-data text-xs tracking-widest uppercase bg-dark">
          <span className="text-accent mb-2">Navigation</span>
          <a href="#features" className="text-primary/70 hover:text-primary transition-colors lift">Features</a>
          <a href="#philosophy" className="text-primary/70 hover:text-primary transition-colors lift">Philosophy</a>
          <a href="#protocol" className="text-primary/70 hover:text-primary transition-colors lift">Protocol</a>
        </div>
        
        <div className="flex flex-col gap-4 font-data text-xs tracking-widest uppercase bg-dark">
          <span className="text-accent mb-2">Legal</span>
          <a href="#" className="text-primary/70 hover:text-primary transition-colors lift">Privacy Policy</a>
          <a href="#" className="text-primary/70 hover:text-primary transition-colors lift">Terms of Service</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-dark">
        <div className="font-data text-xs text-primary/40 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Pacific Coast Promo
        </div>
        
        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-primary/10 bg-black/40">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
          <span className="font-data text-[10px] tracking-widest uppercase text-primary/80 pt-[2px]">System Operational</span>
        </div>
      </div>
    </footer>
  );
}
