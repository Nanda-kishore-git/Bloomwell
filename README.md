# BloomWell

An e-commerce platform for wellness products.

## Project Description

BloomWell is a full-stack e-commerce application designed to provide users with a seamless shopping experience for wellness and health-related products. The platform includes user authentication, product browsing, shopping cart functionality, and order management.

## Project Structure

```
bloomwell/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   │   ├── products.js
│   │   ├── users.js
│   │   └── cart.js
│   └── data/
│       ├── products.json
│       └── users.json
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   └── ProductList.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   └── public/
│   │       └── index.html
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   For development with auto-restart:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Technical Stack

### Backend
- Node.js
- Express.js
- JSON for data storage

### Frontend
- React
- Vite (build tool)
- JSX for component structure

## API Endpoints

- GET /api/products - Retrieve products
- GET /api/users - Retrieve users
- GET /api/cart - Retrieve cart items