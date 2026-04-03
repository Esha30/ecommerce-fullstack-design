# Fullstack eCommerce Marketplace

A completely responsive, dynamic, full-stack eCommerce marketplace built using the MERN stack (MongoDB, Express, React, Node.js). This application fulfills all milestone requirements for the **Ecommerce Web Design Project** and includes several advanced extra features built for production-readiness.

[Live Demo](https://brand-e-commerce.up.railway.app/) 

## 🚀 Features & Deliverables Checklist

### Week 1: Frontend & UI
- [x] **Responsive Pages:** Home, Product Listing, Product Details, and Cart pages all built precisely to Figma specifications using TailwindCSS & DaisyUI. Fully responsive for Desktop and Mobile.
- [x] **Modular Component Structure:** Isolated components for dynamic loading.

### Week 2: Backend & Dynamic Data
- [x] **Database:** Successfully integrated MongoDB for storing products, users, inquiries, and messages.
- [x] **CRUD APIs:** Powerful Express/Node.js API endpoints for complete product manipulation.
- [x] **Dynamic Search & Filtering:** Custom filtering and live search directly integrated into the Header and Product listing.
- [x] **Grid Rendering:** Automatically fetches live product data and renders them flawlessly.

### Week 3: Authentication, Admin & Deployment
- [x] **User Authentication:** Encrypted JWT-based authentication system with Role-based access constraints (**Admin vs User**).
- [x] **Cart & State Management:** Robust cart and favorite systems powered by `Zustand`. Data persists securely.
- [x] **Admin Dashboard:** Fully protected routing. Admins can seamlessly Edit, Create, Delete products, and view Inquiries/Messages.

### 🌟 Bonus Features (Exceeding Requirements)
- **AI Chatbot:** Deep Gemini API integration allowing users to chat with a robust AI assistant directly on the storefront.
- **Save For Later (Favorites):** Persistent wishlist system linked closely with the cart logic.
- **Custom Support Pipeline:** Working Contact Us form connected securely via `Nodemailer` to deliver messages straight to an Admin's Gmail Account.
- **Premium UI Systems:** Features breadcrumbs, custom empty-states, smooth micro-interactions, loading spinners, and error Toasters.

---

## 🛠️ Tech Stack
- **Database:** MongoDB
- **Backend:** Node.js, Express.js
- **Frontend:** React.js, Tailwind CSS, DaisyUI
- **State Management:** Zustand
- **Media Hosting:** Cloudinary
- **AI Service:** Google Gemini
- **Emails:** Nodemailer (SMTP)

---

## ⚙️ Environment Variables

Create a `/backend/.env` file in the root directory and add the following:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret

# Cloudinary (Images)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Nodemailer SMTP (Support Emails)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
EMAIL_RECEIVER=admin_receiving_address
```

---

## 💻 Run this app locally

**1. Start the Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**2. Start the Backend:**
```bash
cd backend
npm install
npm run dev
```
