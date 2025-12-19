const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const supermarketProducts = [
  // Fruits
  { name: "Fresh Bananas", description: "Ripe yellow bananas - 1kg", price: 60, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500", category: "fruits", stock: 100 },
  { name: "Red Apples", description: "Crisp red apples - 1kg", price: 180, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500", category: "fruits", stock: 80 },
  { name: "Fresh Oranges", description: "Juicy oranges - 1kg", price: 120, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=500", category: "fruits", stock: 90 },
  
  // Vegetables
  { name: "Fresh Tomatoes", description: "Red ripe tomatoes - 1kg", price: 40, image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=500", category: "vegetables", stock: 120 },
  { name: "Green Spinach", description: "Fresh leafy spinach - 500g", price: 30, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500", category: "vegetables", stock: 60 },
  { name: "Onions", description: "Fresh red onions - 1kg", price: 35, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500", category: "vegetables", stock: 150 },
  
  // Dairy
  { name: "Fresh Milk", description: "Full cream milk - 1L", price: 65, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500", category: "dairy", stock: 50 },
  { name: "Cheddar Cheese", description: "Aged cheddar cheese - 200g", price: 180, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500", category: "dairy", stock: 30 },
  { name: "Greek Yogurt", description: "Thick Greek yogurt - 400g", price: 120, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500", category: "dairy", stock: 40 },
  
  // Bakery
  { name: "White Bread", description: "Fresh white bread loaf", price: 45, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500", category: "bakery", stock: 25 },
  { name: "Croissants", description: "Buttery croissants - pack of 6", price: 150, image: "https://images.unsplash.com/photo-1555507036-ab794f4afe5e?w=500", category: "bakery", stock: 20 },
  
  // Beverages
  { name: "Orange Juice", description: "Fresh orange juice - 1L", price: 120, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500", category: "beverages", stock: 35 },
  { name: "Green Tea", description: "Premium green tea bags - 25 count", price: 180, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500", category: "beverages", stock: 45 },
  
  // Snacks
  { name: "Mixed Nuts", description: "Roasted mixed nuts - 250g", price: 320, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500", category: "snacks", stock: 60 },
  { name: "Potato Chips", description: "Crispy potato chips - 150g", price: 45, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500", category: "snacks", stock: 80 },
  
  // Household
  { name: "Dish Soap", description: "Liquid dish washing soap - 500ml", price: 85, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500", category: "household", stock: 40 },
  { name: "Toilet Paper", description: "Soft toilet paper - 8 rolls", price: 180, image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500", category: "household", stock: 30 },
  
  // Personal Care
  { name: "Shampoo", description: "Herbal shampoo - 400ml", price: 220, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500", category: "personal-care", stock: 25 },
  { name: "Toothpaste", description: "Fluoride toothpaste - 100g", price: 65, image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500", category: "personal-care", stock: 50 },
  
  // Stationery
  { name: "Notebook Set", description: "A4 ruled notebooks - pack of 5", price: 180, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500", category: "stationery", stock: 40 },
  { name: "Pen Set", description: "Blue ballpoint pens - pack of 10", price: 120, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500", category: "stationery", stock: 60 },
  
  // Grains
  { name: "Basmati Rice", description: "Premium basmati rice - 5kg", price: 450, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500", category: "grains", stock: 30 },
  { name: "Wheat Flour", description: "Whole wheat flour - 2kg", price: 120, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500", category: "grains", stock: 25 }
];

const seedSupermarket = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(supermarketProducts);
    console.log('Added supermarket products');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedSupermarket();