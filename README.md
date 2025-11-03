# 🍱 AnikeTiffin - Multivendor Tiffin Service Platform

A modern, beautiful tiffin delivery platform connecting customers with multiple home-based tiffin vendors. Built with React, featuring stunning red and yellow color scheme designed to increase hunger and enhance user experience.

![AnikeTiffin](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.18-38bdf8)

---

## ✨ Features

### 🔐 Authentication System
- **User Authentication** - Secure login and registration
- **Vendor Authentication** - Separate vendor onboarding
- **Admin Portal** - Secure admin access with special code
- **JWT Integration Ready** - Token-based authentication
- **Protected Routes** - Role-based access control

### 🎨 Beautiful UI/UX
- **Zomato-inspired Design** - Red and yellow color scheme
- **Smooth Animations** - Framer Motion powered
- **Responsive Design** - Works on all devices
- **Form Validation** - Real-time validation with helpful messages
- **Loading States** - Beautiful loading indicators

### 📱 Pages Included
- ✅ Home/Landing Page
- ✅ User Login Page
- ✅ User Signup Page
- ✅ Admin Login Page
- 🔄 Vendor Dashboard (Coming soon)
- 🔄 Menu Listing (Coming soon)
- 🔄 Cart & Checkout (Coming soon)
- 🔄 Order Tracking (Coming soon)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd aniketiffin
```

2. **Install dependencies**
```bash
npm install react-router-dom react-icons axios react-hook-form yup @hookform/resolvers framer-motion
```

3. **Start development server**
```bash
npm start
```

4. **Open browser**
Navigate to `http://localhost:3000`

---

## 📦 Tech Stack

### Frontend
- **React 19.2.0** - UI Library
- **React Router v6** - Routing
- **Tailwind CSS 3.4** - Styling
- **Framer Motion** - Animations
- **React Hook Form + Yup** - Form handling & validation
- **React Icons** - Icon library
- **Axios** - HTTP client
- **Context API** - State management

### Backend (Specification Provided)
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Razorpay Payment Gateway
- bcryptjs for password hashing

---

## 📁 Project Structure

```
aniketiffin/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Button.js
│   │   └── Input.js
│   ├── context/            # React Context
│   │   └── AuthContext.js
│   ├── pages/              # Page components
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── AdminLogin.js
│   ├── App.js              # Main app with routing
│   ├── index.js
│   └── index.css
├── public/
├── BACKEND_API_SPECIFICATION.md  # Complete API docs
├── INSTALLATION_GUIDE.md         # Detailed setup guide
├── package.json
└── tailwind.config.js
```

---

## 🎨 Color Palette

```css
/* Primary Orange */
--primary-500: #f97316

/* Secondary Yellow */
--secondary-400: #facc15

/* Accent Red */
--accent-500: #ef4444

/* Gradients */
background: linear-gradient(to right, #f97316, #ef4444);
background: linear-gradient(to right, #facc15, #f97316);
```

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_RAZORPAY_KEY_ID=your_key_here
REACT_APP_CLOUDINARY_CLOUD_NAME=defgskoxv
REACT_APP_CLOUDINARY_API_KEY=224233591747451
REACT_APP_CLOUDINARY_API_SECRET=mNB4UwZzCFoCKTqAIHUajGeECmA
REACT_APP_CLOUDINARY_UPLOAD_PRESET=x01b8cid
```

---

## 📱 Screenshots

### User Login
- Beautiful gradient background
- Animated logo
- Social login options
- Form validation

### User Signup
- Multi-field registration
- Real-time validation
- Password strength check
- Terms agreement

### Admin Login
- Dark theme for security
- Admin code verification
- Security badge animation
- Separate authentication flow

---

## 🛣 Roadmap

### Phase 1: Authentication ✅ (Completed)
- [x] User login/signup
- [x] Admin login
- [x] Protected routes
- [x] Context API setup

### Phase 2: Core Features (In Progress)
- [ ] Vendor listing page
- [ ] Menu display
- [ ] Cart functionality
- [ ] Checkout flow
- [ ] Order placement

### Phase 3: Advanced Features
- [ ] Payment integration (Razorpay)
- [ ] Order tracking
- [ ] Review system
- [ ] Vendor dashboard
- [ ] Admin dashboard

### Phase 4: Polish & Launch
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] PWA features
- [ ] Deployment
- [ ] Testing & bug fixes

---

## 📝 API Integration

Complete API specification is available in `BACKEND_API_SPECIFICATION.md`

### Quick Example:

```javascript
import axios from 'axios';

// Login API call
const response = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/auth/login`,
  { email, password }
);

// Store token
localStorage.setItem('token', response.data.token);
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

---

## 🏗 Build for Production

```bash
# Create production build
npm run build

# The build folder is ready to be deployed
```

---

## 🚀 Deployment

### Netlify
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Add environment variables

### Vercel
1. Import project
2. Framework preset: Create React App
3. Add environment variables
4. Deploy

---

## 👥 Team Roles

### Frontend Developer
- React components
- UI/UX implementation
- State management
- API integration

### Backend Developer
- RESTful API development
- Database design
- Authentication
- Payment integration

---

## 📚 Documentation

- **Installation Guide**: See `INSTALLATION_GUIDE.md`
- **API Specification**: See `BACKEND_API_SPECIFICATION.md`
- **Component Docs**: See `/src/components/README.md` (coming soon)

---

## 🐛 Known Issues

- Backend APIs not yet implemented (using mock data)
- Social login buttons are placeholders
- Payment integration pending

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Contact

**Project Lead**: Your Name
**Email**: contact@aniketiffin.com
**Website**: www.aniketiffin.com (coming soon)

---

## 🙏 Acknowledgments

- Inspired by Zomato's design language
- Built with Create React App
- Tailwind CSS for styling
- Framer Motion for animations

---

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Check for updates
npm outdated
```

---

**Made with ❤️ for food lovers by the AnikeTiffin team**

🍱 **Delicious food, delivered hot!**
