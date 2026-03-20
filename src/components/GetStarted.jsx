import React from 'react';

export default function GetStarted() {
  return (
    <section className="py-40 px-6 md:px-16 bg-primary text-dark flex flex-col items-center justify-center text-center relative z-10">
      <h2 className="font-heading font-bold text-5xl md:text-7xl uppercase tracking-tighter mb-8 max-w-4xl text-dark">
        Ready to bypass the markups?
      </h2>
      <p className="font-data uppercase tracking-widest text-dark/70 mb-12 max-w-xl text-sm leading-relaxed">
        Join the definitive network for custom branded products. Factory direct sourcing without the friction.
      </p>
      <a href="tel:2533921818" className="relative inline-block overflow-hidden group px-10 py-5 rounded-full bg-accent text-primary font-heading font-bold text-xl hover:shadow-[0_0_40px_rgba(230,59,46,0.4)] magnetic">
        <span className="relative z-10">Call for a Quote</span>
        <span className="absolute inset-0 bg-dark transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
      </a>
    </section>
  );
}
