# Vehicle Rental Backend

A robust backend system for a vehicle rental service, built with Express, TypeScript, and PostgreSQL. It features user authentication, vehicle management, and a booking system.

## Live URL
[https://b6-assignment-2-xi.vercel.app](https://b6-assignment-2-xi.vercel.app)

## Features
- **User Authentication**: Secure signup and signin for customers and admins.
- **Vehicle Management**: Admins can create, update, and delete vehicles. Customers can view available vehicles.
- **Booking System**: Customers can book vehicles. Admins can manage all bookings.
- **User Management**: Admin-only access to view and manage user accounts.
- **Secure APIs**: Protected routes using JWT-based authentication and role-based access control.

## Technology Stack
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (pg)
- **Authentication**: JSON Web Token (JWT) & bcryptjs
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js installed
- PostgreSQL database

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Tamjid388/vehicle-rental-backend.git
   cd vehicle-rental-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (create a `.env` file):
   ```env
   PORT=3000
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/signin` - Login and get JWT token

### Vehicles
- `GET /api/v1/vehicles` - List all vehicles
- `GET /api/v1/vehicles/:vehicleId` - Get vehicle details
- `POST /api/v1/vehicles` - Create a new vehicle (Admin only)
- `PUT /api/v1/vehicles/:vehicleId` - Update vehicle info (Admin/Customer)
- `DELETE /api/v1/vehicles/:vehicleId` - Delete a vehicle (Admin only)

### Bookings
- `GET /api/v1/bookings` - List all bookings (Admin/Customer)
- `POST /api/v1/bookings` - Create a new booking (Admin/Customer)
- `PUT /api/v1/bookings/:bookingId` - Update booking status (Admin/Customer)

### Users
- `GET /api/v1/users` - List all users (Admin only)
- `PUT /api/v1/users/:userId` - Update user account (Admin/Customer)
- `DELETE /api/v1/users/:userId` - Delete a user account (Admin only)

## API Example
**Get Bookings:**
`https://b6-assignment-2-xi.vercel.app/api/v1/bookings`

## License
ISC
