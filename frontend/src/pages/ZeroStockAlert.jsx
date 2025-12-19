import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Trash2, Plus } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ZeroStockAlert = () => {
  const [zeroStockProducts, setZeroStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStock, setEditingStock] = useState(null);
  const [newStock, setNewStock] = useState('');

  useEffect(() => {
    fetchZeroStockProducts();
  }, []);

  const fetchZeroStockProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orders/zero-stock', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setZeroStockProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch zero stock products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/orders/zero-stock/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Product deleted successfully');
      fetchZeroStockProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const addStock = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/products/${productId}`, 
        { stock: parseInt(newStock) }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Stock added successfully');
      setEditingStock(null);
      setNewStock('');
      fetchZeroStockProducts();
    } catch (error) {
      toast.error('Failed to add stock');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <AlertTriangle className="text-red-500" />
            Zero Stock Alert
          </h1>
          <p className="text-gray-400">Products that are out of stock</p>
        </motion.div>

        {zeroStockProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-white mb-2">All Good!</h2>
            <p className="text-gray-400">No products are out of stock</p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {zeroStockProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg p-6 border border-red-500/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                      <p className="text-gray-400">{product.category}</p>
                      <p className="text-red-500 font-semibold">Stock: {product.stock}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {editingStock === product._id ? (
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          value={newStock}
                          onChange={(e) => setNewStock(e.target.value)}
                          placeholder="Stock"
                          className="w-20 px-2 py-1 bg-gray-700 text-white rounded"
                        />
                        <button
                          onClick={() => addStock(product._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingStock(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingStock(product._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Plus size={16} />
                          Add Stock
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ZeroStockAlert;