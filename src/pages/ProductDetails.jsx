import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../App';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProductDetails() {
  const { id } = useParams();
  const products = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (products.length > 0) {
      const found = products.find(p => p._id === decodeURIComponent(id));
      setProduct(found);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-dark flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-32"><p className="font-data animate-pulse uppercase tracking-widest">Compiling Asset Manifest...</p></main>
        <Footer />
      </div>
    );
  }

  const desc = product['Description'] || product['Item Description'] || product['Short Description'] || 'Additional specifications available upon direct query.';
  const category = product['Category'] || product['Categories'] || 'Catalog';
  
  const attributesRows = [];
  const pricingTiers = [];

  // Parse generic attributes aggressively
  Object.keys(product).forEach(key => {
    // Skip internally processed keys, descriptions, names, headers, and pricing/quantity tier data
    const k = key.toLowerCase();
    if (key.startsWith('_') || k === 'description' || k === 'item name' || k === 'item #' || k === 'image url' || k === 'image url' || k === 'product name' || k === 'sku' || k === 'name' || /^[qp]\d+$/.test(k) || /price/.test(k) || /qty/.test(k)) {
      return;
    }
    if (product[key] && product[key].trim() !== '') {
      attributesRows.push({ label: key, value: product[key] });
    }
  });

  // Extract Q1, Q2, P1, P2...
  for(let i=1; i<=20; i++) {
    const qLabel = product[`Q${i}`] || product[`QTY ${i}`] || product[`Qty ${i}`];
    const pVal = product[`P${i}`] || product[`Price ${i}`] || product[`Price ${qLabel}`];
    if (qLabel && pVal) {
      const formattedQty = qLabel.toUpperCase().includes('QTY') ? qLabel : `QTY ${qLabel}`;
      pricingTiers.push({ qty: formattedQty, price: pVal });
    }
  }

  const images = [];
  for(let i=1; i<=10; i++) {
     const imgKey = `Image ${i}`;
     const urlKey = `Image URL`;
     const urlKey2 = `Image Url`;
     if (product[imgKey] && product[imgKey].trim() !== '') images.push(product[imgKey]);
     if (i === 1 && product[urlKey] && product[urlKey].trim() !== '') images.push(product[urlKey]);
     if (i === 1 && product[urlKey2] && product[urlKey2].trim() !== '') images.push(product[urlKey2]);
  }
  if (images.length === 0) images.push('/hero_promo.png');

  return (
    <div className="min-h-screen bg-background text-dark flex flex-col md:h-screen md:overflow-hidden relative z-10">
      <Navbar className="flex-shrink-0" />
      
      <main className="flex-1 pt-24 pb-8 px-4 md:px-12 flex flex-col md:overflow-y-hidden overflow-y-auto">
        <div className="w-full max-w-[1500px] mx-auto h-full flex flex-col gap-4">
          
          {/* Top Info Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
            <div className="flex flex-col">
              <div className="mb-2 font-data text-[10px] md:text-xs uppercase tracking-widest text-dark/40 flex items-center flex-wrap gap-2">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <span className="opacity-50">/</span>
                <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
                <span className="opacity-50">/</span>
                <span className="text-dark/80 whitespace-nowrap">{category}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight text-dark leading-none">{product._name}</h1>
            </div>
            
            <div className="text-[10px] md:text-sm font-data uppercase tracking-widest text-dark/50 bg-white px-4 py-2 border border-dark/10 rounded-full shadow-sm">
              SKU: <span className="text-dark font-bold">{product._id}</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0 bg-white rounded-[2rem] border border-dark/10 shadow-lg p-6 md:p-8 overflow-y-auto md:overflow-hidden">
            
            {/* Left: Compact Images Column */}
            <div className="lg:col-span-4 flex flex-col gap-4 min-h-0 md:border-r md:border-dark/10 md:pr-8">
              <div className="flex-1 bg-background/50 rounded-[1.5rem] flex items-center justify-center relative overflow-hidden group min-h-[300px] md:min-h-0">
                <img src={images[0]} alt={product._name} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105 p-4" onError={(e) => { e.target.src = '/hero_promo.png'; }} />
              </div>
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 flex-shrink-0 hide-scrollbar justify-center">
                   {images.slice(1).map((img, i) => (
                      <div key={i} className="w-16 h-16 md:w-20 md:h-20 bg-background/50 rounded-xl flex items-center justify-center flex-shrink-0 p-2 cursor-pointer hover:border-accent hover:bg-white border border-transparent hover:border-accent transition-all shadow-sm">
                        <img src={img} className="w-full h-full object-contain mix-blend-multiply" onError={(e) => { e.target.src = '/hero_promo.png'; }} />
                      </div>
                   ))}
                </div>
              )}
            </div>

            {/* Middle: Description & Specs */}
            <div className="lg:col-span-5 flex flex-col gap-6 min-h-0 md:overflow-y-auto custom-scrollbar md:pr-4">
              <div className="prose prose-sm font-data text-dark/80 leading-relaxed max-w-none">
                {desc}
              </div>
              
              {attributesRows.length > 0 && (
                <div className="bg-background/80 rounded-[1.5rem] p-5 border border-dark/5">
                  <h3 className="font-heading font-bold text-sm uppercase tracking-tighter mb-4 text-dark flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-dark/40"></span>
                    Properties
                  </h3>
                  <div className="flex flex-col text-xs font-data">
                    {attributesRows.map((attr, idx) => (
                        <div key={idx} className={`grid grid-cols-12 gap-2 py-2.5 px-3 rounded-md ${idx % 2 === 0 ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
                          <div className="col-span-5 font-bold uppercase tracking-widest opacity-60 flex items-center text-dark">{attr.label}</div>
                          <div className="col-span-7 font-medium text-dark/90 leading-tight">{attr.value}</div>
                        </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Pricing Engine & Actions */}
            <div className="lg:col-span-3 flex flex-col gap-6 min-h-0 md:border-l md:border-dark/10 md:pl-8">
              {pricingTiers.length > 0 && (
                <div className="bg-background/80 border border-dark/10 rounded-[1.5rem] overflow-hidden flex flex-col pt-1 relative shadow-inner">
                   <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
                   
                   <div className="p-4 border-b border-dark/5 bg-white">
                      <span className="font-heading font-bold text-sm uppercase tracking-widest text-dark/60">Volume Pricing</span>
                   </div>

                   <div className="flex flex-col p-2 w-full">
                     {pricingTiers.map((tier, idx) => (
                        <div key={idx} className={`flex items-center justify-between py-3 px-4 font-data text-sm tracking-wider rounded-lg ${idx % 2 === 0 ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
                          <div className="font-bold text-dark">{tier.qty}</div>
                          <div className="text-dark/90 font-medium">{tier.price}</div>
                        </div>
                     ))}
                   </div>
                </div>
              )}
              
              <div className="mt-auto text-center w-full">
                <a href="mailto:logan@pacificcoastpromo.com" className="w-full inline-flex text-center group px-6 py-4 rounded-xl bg-accent text-primary font-heading font-bold text-sm hover:shadow-[0_0_20px_rgba(230,59,46,0.3)] magnetic justify-center items-center transition-all border border-accent">
                  Request Custom Quote
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
