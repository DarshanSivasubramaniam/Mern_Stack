# DarkStore - MERN E-commerce Application

A modern, dark-themed e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring Vite for fast development.

## Features

### User Features
- 🌙 Dark theme with smooth animations
- 🛒 Shopping cart functionality
- 💳 Multiple payment methods (COD, GPay, Card)
- 📱 Responsive design
- 🔐 JWT authentication
- ✨ Framer Motion animations
- 📜 Scroll to top on page changes

### Admin Features
- 📊 Admin dashboard with order management
- 📦 Product CRUD operations
- 📈 Sales statistics
- 🎯 Order status management
- 👥 Role-based access control

## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API calls
- React Hot Toast for notifications
- Lucide React for icons

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- MongoDB Compass (optional, for GUI)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Update the `.env` file with your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

### Default Admin Account
To create an admin account, register with role set to "admin" during registration.

### Sample Product Data
You can add products through the admin panel at `/admin/products` after logging in as an admin.

### Payment Methods
- **COD**: Cash on Delivery
- **GPay**: Google Pay (dummy implementation)
- **Card**: Credit/Debit Card (dummy implementation)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

## Project Structure

```
darma/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── orders.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ScrollToTop.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Products.jsx
    │   │   ├── Cart.jsx
    │   │   ├── AdminProducts.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.