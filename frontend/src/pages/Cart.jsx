import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, CreditCard, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from '../config/api';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [address, setAddress] = useState({
    street: '', city: '', state: '', zipCode: ''
  });

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to checkout');
      return;
    }

    try {
      const orderData = {
        items: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: cartTotal,
        paymentMethod,
        shippingAddress: address
      };

      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Order placed successfully!');
      clearCart();
      setShowCheckout(false);
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-400">Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-card p-6 rounded-2xl border border-dark-accent"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-dark-accent rounded-lg flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-dark-text font-bold">₹{item.price}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 bg-dark-accent rounded-full flex items-center justify-center hover:bg-dark-text hover:text-dark-bg transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="w-8 text-center">{item.quantity}</span>
                    
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 bg-dark-accent rounded-full flex items-center justify-center hover:bg-dark-text hover:text-dark-bg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                    
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="ml-4 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-dark-card p-6 rounded-2xl border border-dark-accent sticky top-24"
            >
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-dark-accent pt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-dark-text">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCheckout(true)}
                className="w-full bg-dark-text text-dark-bg py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Proceed to Checkout
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-dark-card p-6 rounded-2xl border border-dark-accent max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4">Checkout</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Method</label>
                  <div className="space-y-2">
                    {[
                      { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
                      { value: 'gpay', label: 'Google Pay', icon: <Smartphone size={16} /> },
                      { value: 'card', label: 'Credit/Debit Card', icon: <CreditCard size={16} /> }
                    ].map(method => (
                      <label key={method.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value={method.value}
                          checked={paymentMethod === method.value}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-dark-text"
                        />
                        <span className="flex items-center space-x-2">
                          {method.icon}
                          <span>{method.label}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium">Shipping Address</label>
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-accent rounded-lg"
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      className="px-3 py-2 bg-dark-bg border border-dark-accent rounded-lg"
                      value={address.city}
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="px-3 py-2 bg-dark-bg border border-dark-accent rounded-lg"
                      value={address.state}
                      onChange={(e) => setAddress({...address, state: e.target.value})}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-accent rounded-lg"
                    value={address.zipCode}
                    onChange={(e) => setAddress({...address, zipCode: e.target.value})}
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 py-2 border border-dark-accent rounded-lg hover:bg-dark-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 py-2 bg-dark-text text-dark-bg rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;