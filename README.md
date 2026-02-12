# E-Action - Real-Time Auction Platform

A full-stack auction platform built with the MERN stack, featuring real-time bidding, secure authentication, and automated financial management.

---

## 🚀 Features

### Core Functionality
- **Real-time Bidding System** - Place and update bids with automatic validation
- **Secure Authentication** - JWT-based authentication with role-based access control
- **Financial Management** - Automated balance deduction, refunds, and transaction tracking
- **Product Management** - Create, update, and manage auction products with image uploads
- **User Roles** - Admin, Seller, and Buyer roles with different permissions

### Key Highlights
- ✅ Automatic refunds for losing bidders
- ✅ Complete transaction audit trail
- ✅ 5% minimum bid increment for fair competition
- ✅ Multi-image product uploads
- ✅ Real-time balance updates
- ✅ Commission tracking for admins

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
DATABASE_CLOUD=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd my-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

---

## 📁 Project Structure

```
E-Action/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication & error handling
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
│
├── my-project/          # Frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── app/         # App logic
│   │   └── utils/       # Utilities
│   └── public/          # Static assets
│
└── README.md
```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/loggedin` - Check login status
- `POST /api/users/logout` - User logout

### Products
- `GET /api/product` - Get all products
- `POST /api/product` - Create product (Seller only)
- `PUT /api/product/:id` - Update product (Seller only)
- `DELETE /api/product/:id` - Delete product (Seller only)
- `GET /api/product/:id` - Get product by ID

### Bidding
- `POST /api/bidding` - Place or update bid
- `GET /api/bidding/history/:productId` - Get bidding history
- `POST /api/bidding/sell` - Sell product (Seller only)

### User Management
- `GET /api/users/getuser` - Get current user
- `GET /api/users/sell-amount` - Get user balance
- `POST /api/users/deposit` - Deposit funds
- `POST /api/users/withdraw` - Withdraw funds

---

## 💰 Bidding Rules

- **First Bid:** Must be at least 5% higher than the base price
- **Subsequent Bids:** Must be at least 5% higher than the current highest bid
- **Balance Required:** Users must have sufficient balance to place bids
- **Automatic Refunds:** Losing bidders receive automatic refunds when product is sold

---

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Role-based access control
- Input validation
- Error handling

---

## 📊 Database Schema

### User Model
- Name, Email, Password (hashed)
- Role (admin/seller/buyer)
- Balance & Commission Balance
- Transaction History

### Product Model
- Title, Description, Base Price
- Category, Images
- Bid End Date
- Sold Status, Sold Price, Sold At

### Bidding Model
- User Reference
- Product Reference
- Bid Price
- Timestamps

---

## 🧪 Testing

Run the backend tests:
```bash
cd backend
npm test
```

Run the frontend tests:
```bash
cd my-project
npm test
```

---

## 🚀 Deployment

### Backend Deployment (Example: Heroku)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Example: Vercel)
```bash
cd my-project
vercel deploy
```

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
DATABASE_CLOUD=mongodb+srv://...
JWT_SECRET=your_secret_key
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Authors

- **Your Name** - Initial work

---

## 🙏 Acknowledgments

- MERN Stack Community
- MongoDB Documentation
- Express.js Documentation
- React Documentation

---

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Built with ❤️ using the MERN Stack**
