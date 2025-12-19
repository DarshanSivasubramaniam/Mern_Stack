import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import API_BASE_URL from '../config/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? `${API_BASE_URL}/api/auth/login` : `${API_BASE_URL}/api/auth/register`;
      const { data } = await axios.post(endpoint, formData);
      
      login(data.token, data.user);
      toast.success(`${isLogin ? 'Login' : 'Registration'} successful!`);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-dark-card p-8 rounded-2xl border border-dark-accent">
          <h2 className="text-3xl font-bold text-center mb-8">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-accent rounded-lg focus:border-dark-text outline-none transition-colors"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-dark-bg border border-dark-accent rounded-lg focus:border-dark-text outline-none transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-accent rounded-lg focus:border-dark-text outline-none transition-colors pr-12"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <select
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-accent rounded-lg focus:border-dark-text outline-none transition-colors"
                    value={formData.role || 'user'}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {formData.role === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Root Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Enter root password for admin access"
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-accent rounded-lg focus:border-dark-text outline-none transition-colors"
                      value={formData.rootPassword || ''}
                      onChange={(e) => setFormData({...formData, rootPassword: e.target.value})}
                    />
                  </div>
                )}
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-dark-text text-dark-bg py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              {isLogin ? 'Login' : 'Register'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-dark-text hover:underline"
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;