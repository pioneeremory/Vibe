import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const productData = [
  { id: '001', name: '15L Foldable Backpack', price: '$4.45 - $7.00', category: 'APP-BAG', desc: 'Water/tear resistant Nylon. Lightweight day-to-day use.' },
  { id: '002', name: '15L Packable Travel Bag', price: '$6.53 - $9.00', category: 'APP-BAG', desc: 'Foldable travel backpack. Ideal for hikes and camping.' },
  { id: '003', name: '16 Ft Locking Tape', price: '$1.27 - $4.19', category: 'TL-MSR', desc: 'Electrician ruler tape. Impact resistant, rust proof.' },
  { id: '004', name: '16" Laptop Backpack', price: '$15.00 - $28.00', category: 'APP-BAG', desc: 'Crosshatch fabric, magnetic closure. Fits 15in laptops.' },
  { id: '005', name: '16oz SS Pint Cup', price: '$3.19 - $5.00', category: 'DRK-SS', desc: 'Single-wall stainless steel pint cup. Powder-coated.' },
  { id: '006', name: '16oz Double Wall Tumbler', price: '$5.30 - $6.80', category: 'DRK-DBL', desc: 'Double-wall construction. Polypropylene inner.' },
  { id: '007', name: '16oz SS Party Solo Cup', price: '$2.89 - $5.00', category: 'DRK-SS', desc: 'Stackable 16oz stainless steel cups. High durability.' },
  { id: '008', name: '16oz Double Layer Straw', price: '$3.85 - $4.75', category: 'DRK-ACR', desc: 'Acrylic straw cup. Double layer prevents condensation.' },
  { id: '009', name: '17oz Vacuum SS Bottle', price: '$5.24 - $11.55', category: 'DRK-VAC', desc: '18/8 stainless steel double-wall. 12hr temp retention.' },
  { id: '010', name: '17oz Bamboo SS Tumbler', price: '$7.68 - $14.00', category: 'DRK-ECO', desc: 'Eco-friendly bamboo shell with stainless steel inner.' },
];

export default function Products() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-row', {
        y: 20,
        opacity: 0,
        filter: 'blur(10px)',
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="shop" ref={containerRef} className="py-32 px-6 md:px-16 bg-background relative z-10 border-t border-dark/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-2 text-dark">Data Manifest</h2>
            <p className="font-drama italic text-3xl text-dark/50 lowercase">active inventory.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-data uppercase tracking-widest text-dark/40">
            <span>Filter: // ALL</span>
            <span>Sort: // ID-ASC</span>
          </div>
        </div>

        {/* Dense Brutalist Data Table */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] flex flex-col border-y border-dark">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 py-4 px-4 font-data text-xs font-bold uppercase tracking-widest text-dark/50 border-b border-dark/20">
              <div className="col-span-1">ID</div>
              <div className="col-span-3">Designation</div>
              <div className="col-span-4">Specification</div>
              <div className="col-span-1">Class</div>
              <div className="col-span-2">Unit Cost</div>
              <div className="col-span-1 text-right">Action</div>
            </div>
            
            {/* Rows */}
            {productData.map((item) => (
              <div 
                key={item.id} 
                className="product-row grid grid-cols-12 gap-4 py-6 px-4 items-center border-b border-dark/10 transition-colors duration-200 hover:bg-dark hover:text-primary group"
              >
                <div className="col-span-1 font-data text-xs opacity-50 group-hover:opacity-100">{item.id}</div>
                <div className="col-span-3 font-heading font-bold text-sm uppercase tracking-wide">{item.name}</div>
                <div className="col-span-4 font-data text-xs leading-relaxed opacity-80">{item.desc}</div>
                <div className="col-span-1 font-data text-[10px] tracking-widest">
                  <span className="px-2 py-1 border border-current rounded-full opacity-60 group-hover:opacity-100">{item.category}</span>
                </div>
                <div className="col-span-2 font-data text-sm tracking-wider">{item.price}</div>
                <div className="col-span-1 flex justify-end">
                  <a href="mailto:logan@pacificcoastpromo.com" className="w-8 h-8 rounded-full border border-current flex items-center justify-center opacity-40 group-hover:opacity-100 hover:bg-accent hover:border-accent hover:text-primary transition-all magnetic">
                    +
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
