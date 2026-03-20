import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import { parseCSV } from './utils/csvParser';

import rawCSV from '../sage_product_upload.csv?raw';

export const ProductContext = React.createContext([]);

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const parsed = parseCSV(rawCSV);
      const processed = parsed.map((p, idx) => ({
        ...p,
        _id: p['Item #'] || p['SKU'] || p['Item Number'] || `item-${idx}`,
        _name: p['Item Name'] || p['Product Name'] || p['Name'] || Object.values(p)[0],
      }));
      setProducts(processed);
    } catch (err) {
      console.error('Failed to init CSV manifest', err);
    }
  }, []);

  return (
    <ProductContext.Provider value={products}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </ProductContext.Provider>
  );
}

export default App;
