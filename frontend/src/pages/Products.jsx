import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Filter } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from '../config/api';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [products, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product, quantity = 1) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
    setQuantities(prev => ({...prev, [product._id]: 1}));
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-dark-text border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our <span className="text-dark-text">Products</span>
        </motion.h1>

        <div className="mb-8 flex items-center space-x-4">
          <Filter className="text-dark-text" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-dark-card border border-dark-accent rounded-lg px-4 py-2 focus:border-dark-text outline-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-dark-card rounded-2xl overflow-hidden border border-dark-accent hover:border-dark-text transition-all duration-300"
              >
                <div className="aspect-square bg-dark-accent flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 text-4xl">📦</div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-dark-text">₹{product.price}</span>
                    <span className="text-sm text-gray-400">Stock: {product.stock}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <button
                      onClick={() => setQuantities(prev => ({...prev, [product._id]: Math.max(1, (prev[product._id] || 1) - 1)}))}
                      className="w-8 h-8 bg-dark-accent rounded-full flex items-center justify-center hover:bg-dark-text hover:text-dark-bg transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{quantities[product._id] || 1}</span>
                    <button
                      onClick={() => setQuantities(prev => ({...prev, [product._id]: Math.min(product.stock, (prev[product._id] || 1) + 1)}))}
                      className="w-8 h-8 bg-dark-accent rounded-full flex items-center justify-center hover:bg-dark-text hover:text-dark-bg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(product, quantities[product._id] || 1)}
                    disabled={product.stock === 0}
                    className="w-full bg-dark-text text-dark-bg py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={18} />
                    <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;