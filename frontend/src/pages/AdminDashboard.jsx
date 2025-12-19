import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Users, DollarSign, TrendingUp } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from '../config/api';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    shippedOrders: 0,
    completedOrders: 0
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_BASE_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(data);
      setFilteredOrders(data);
      
      // Calculate stats
      const totalOrders = data.length;
      const totalRevenue = data.reduce((sum, order) => sum + order.totalAmount, 0);
      const pendingOrders = data.filter(order => order.status === 'pending').length;
      const confirmedOrders = data.filter(order => order.status === 'confirmed').length;
      const shippedOrders = data.filter(order => order.status === 'shipped').length;
      const completedOrders = data.filter(order => order.status === 'delivered').length;
      
      setStats({ totalOrders, totalRevenue, pendingOrders, confirmedOrders, shippedOrders, completedOrders });
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/api/orders/${orderId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const filterOrders = (status) => {
    setActiveFilter(status);
    if (status === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === status));
    }
  };

  const statCards = [
    { title: 'Total Orders', value: stats.totalOrders, icon: <Package />, color: 'text-blue-400', filter: 'all' },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: <TrendingUp />, color: 'text-yellow-400', filter: 'pending' },
    { title: 'Confirmed Orders', value: stats.confirmedOrders, icon: <Package />, color: 'text-blue-400', filter: 'confirmed' },
    { title: 'Shipped Orders', value: stats.shippedOrders, icon: <Package />, color: 'text-purple-400', filter: 'shipped' },
    { title: 'Completed Orders', value: stats.completedOrders, icon: <Users />, color: 'text-green-400', filter: 'delivered' },
    { title: 'Total Revenue', value: `₹${stats.totalRevenue.toFixed(2)}`, icon: <DollarSign />, color: 'text-green-400', filter: null }
  ];

  const statusColors = {
    pending: 'bg-yellow-600',
    confirmed: 'bg-blue-600',
    shipped: 'bg-purple-600',
    delivered: 'bg-green-600'
  };

  return (
    <div className="min-h-screen pt-16 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Admin Dashboard
        </motion.h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-dark-card p-4 rounded-2xl border border-dark-accent ${
                stat.filter ? 'cursor-pointer hover:border-dark-text transition-colors' : ''
              } ${activeFilter === stat.filter ? 'border-dark-text' : ''}`}
              onClick={() => stat.filter && filterOrders(stat.filter)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs">{stat.title}</p>
                  <p className="text-lg font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-xl`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-card rounded-2xl border border-dark-accent overflow-hidden"
        >
          <div className="p-6 border-b border-dark-accent">
            <h2 className="text-xl font-bold">
              {activeFilter === 'all' ? 'All Orders' : 
               activeFilter === 'pending' ? 'Pending Orders' :
               activeFilter === 'confirmed' ? 'Confirmed Orders' :
               activeFilter === 'shipped' ? 'Shipped Orders' :
               activeFilter === 'delivered' ? 'Completed Orders' : 'Orders'}
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-accent">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-accent">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-dark-accent/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {order._id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium">{order.user?.name}</div>
                        <div className="text-sm text-gray-400">{order.user?.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-dark-text">
                      ₹{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                      {order.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="bg-dark-bg border border-dark-accent rounded px-2 py-1 text-sm focus:border-dark-text outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No orders found</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;