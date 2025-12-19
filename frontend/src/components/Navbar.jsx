import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, LogOut, Package, BarChart3, Truck, MoreVertical, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-dark-card/95 backdrop-blur-md border-b border-dark-accent z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-r from-dark-text to-purple-500 rounded-lg"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-dark-text to-purple-400 bg-clip-text text-transparent">
              Darmar Store
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-4 lg:space-x-8">
            {user?.role !== 'admin' && (
              <Link to="/products" className="hover:text-dark-text transition-colors">
                Products
              </Link>
            )}
            
            {user ? (
              <>
                {user.role !== 'admin' && (
                  <>
                    <Link to="/cart" className="relative hover:text-dark-text transition-colors">
                      <ShoppingCart size={20} />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-dark-text text-dark-bg text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </Link>
                    <Link to="/orders" className="hover:text-dark-text transition-colors">
                      <Truck size={20} />
                    </Link>
                  </>
                )}

                {user.role === 'admin' && (
                  <>
                    <Link to="/admin/products" className="hover:text-dark-text transition-colors">
                      <Package size={20} />
                    </Link>
                    <Link to="/admin/dashboard" className="hover:text-dark-text transition-colors">
                      <BarChart3 size={20} />
                    </Link>
                    <Link to="/admin/zero-stock" className="hover:text-red-400 transition-colors">
                      <AlertTriangle size={20} />
                    </Link>
                  </>
                )}

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User size={20} />
                    <span>{user.name}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 hover:text-dark-text transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-dark-text text-dark-bg px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-dark-text transition-colors"
            >
              <MoreVertical size={24} />
            </button>
            
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-4 top-16 w-48 bg-dark-card border border-dark-accent rounded-lg shadow-lg z-50"
              >
                {user?.role !== 'admin' && (
                  <>
                    <Link to="/products" className="block px-4 py-3 hover:bg-dark-accent transition-colors">
                      Products
                    </Link>
                    <Link to="/cart" className="flex items-center justify-between px-4 py-3 hover:bg-dark-accent transition-colors">
                      <span>Cart</span>
                      {cartItems.length > 0 && (
                        <span className="bg-dark-text text-dark-bg text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </Link>
                    <Link to="/orders" className="block px-4 py-3 hover:bg-dark-accent transition-colors">
                      My Orders
                    </Link>
                  </>
                )}
                
                {user?.role === 'admin' && (
                  <>
                    <Link to="/admin/products" className="block px-4 py-3 hover:bg-dark-accent transition-colors">
                      Manage Products
                    </Link>
                    <Link to="/admin/dashboard" className="block px-4 py-3 hover:bg-dark-accent transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/admin/zero-stock" className="block px-4 py-3 hover:bg-dark-accent transition-colors text-red-400">
                      Zero Stock Alert
                    </Link>
                  </>
                )}
                
                {user ? (
                  <>
                    <div className="px-4 py-3 border-t border-dark-accent">
                      <div className="flex items-center space-x-2 mb-2">
                        <User size={16} />
                        <span className="text-sm">{user.name}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-3 bg-dark-text text-dark-bg text-center rounded-b-lg hover:bg-opacity-90 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;