# ZZQ Stores - E-commerce Platform

A full-featured e-commerce platform built with React, Node.js, Express, and PostgreSQL.

## Features

- **Admin Dashboard**: Complete admin panel with order management, product management, analytics, and inventory control
- **Payment Integration**: Secure Stripe payment processing
- **User Authentication**: JWT-based authentication with phone verification
- **Product Management**: Full CRUD operations with inventory tracking
- **Order Management**: Complete order lifecycle from placement to delivery
- **Analytics Dashboard**: Real-time sales analytics and reporting
- **Responsive Design**: Modern UI built with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT, bcrypt
- **Payments**: Stripe
- **Deployment**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zzq-stores
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   ```

3. **Set up the database**
   ```bash
   cd server
   docker-compose up -d
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Configure environment variables**

   Create `.env` file in the server directory:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/zzq_stores"
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   JWT_SECRET=your_jwt_secret_here
   ```

5. **Start the development servers**

   Frontend:
   ```bash
   npm run dev
   ```

   Backend:
   ```bash
   cd server
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - Database Admin: http://localhost:8080 (Adminer)

## API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination, search, filtering)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `POST /api/orders/create-payment-intent` - Create Stripe payment intent

### Analytics
- `GET /api/analytics/overview` - Get overview statistics
- `GET /api/analytics/sales-chart` - Get sales chart data
- `GET /api/analytics/top-products` - Get top products
- `GET /api/analytics/order-status` - Get order status distribution

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-otp` - Verify OTP

## Deployment

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the backend**
   ```bash
   cd server
   npm start
   ```

### Docker Deployment

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   │   ├── admin-dashboard/ # Admin panel pages
│   │   ├── checkout/        # Checkout flow
│   │   └── ...
│   ├── contexts/           # React contexts
│   ├── utils/              # Utility functions
│   └── ...
├── server/
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── prisma.js       # Database client
│   │   └── index.js        # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.js         # Database seeding
│   └── ...
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
