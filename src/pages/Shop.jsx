import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../App';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Shop() {
  const products = useContext(ProductContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-dark flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tight text-dark mb-4 drop-shadow-sm">Complete Inventory</h1>
            <p className="font-drama italic text-2xl text-dark/60 lowercase">sage database manifest.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p, idx) => {
              const image = p['Image URL'] || p['Image Url'] || p['Image'] || p['Picture'] || p['Image 1'] || '/hero_promo.png';
              // Check various QTY columns for pricing to display the lowest bound visually
              const price = p['P1'] || p['Price 1'] || p['Price '] || p['Price'] || p['Catalog Price'] || p['QTY 500'] || p['QTY 1'] || 'Request Quote';

              return (
                <Link to={`/shop/${encodeURIComponent(p._id)}`} key={idx} className="group flex flex-col bg-white rounded-[2rem] border border-dark/10 overflow-hidden shadow-lg hover:shadow-2xl hover:border-accent/40 transition-all duration-300 lift magnetic">
                  <div className="aspect-square bg-dark/5 p-6 flex items-center justify-center overflow-hidden">
                     <img src={image} alt={p._name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.src = '/hero_promo.png'; }} />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-data text-[10px] uppercase tracking-widest text-dark/40 mb-2">SKU: {p._id}</span>
                    <h3 className="font-heading font-bold text-lg uppercase leading-tight mb-4 flex-1 line-clamp-3">{p._name}</h3>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark/10">
                      <span className="font-data text-sm font-bold px-3 py-1 bg-dark/5 rounded-full">{price}</span>
                      <span className="text-accent underline text-xs font-data uppercase tracking-widest group-hover:text-primary group-hover:bg-accent group-hover:no-underline px-3 py-1 rounded-full transition-colors">View Spec</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
