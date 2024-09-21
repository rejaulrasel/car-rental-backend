# Instructions on how to run the application locally

# Step 1 :

At first clone the above git repository using git clone command.
example: git clone https://github.com/rejaulrasel/car-rental-backend.git

# Step 2 :

After cloning git repository open folder location in cmd

# Step 3 :

To install all dependencies use : npm i

# Step 4 :

Open folder in vs code use : code .

# Step 5 :

Add a .env file in the root directory of project and add port number and database url by the following format
Example:

```bash
PORT: 3000
NODE_ENV=development
DATABASE_URL=your_mongodb_connection_string
BCRYPT_SALT_ROUND=<= 10
JWT_ACCESS_SECRET=your_jwt_access_secret
```

# Step 6 :

To run project use this command: npm run start:dev
If all are working well you see Car Rental app listening on port 3000 in your console.

# Project Name : Car Rental Reservation System

# Live Link : https://car-rental-backend-01.vercel.app

# Features:

# User Features

1. Register new user accounts
2. User roles: user or admin
3. Authenticate users and provide JWT token

# Admin Feature

# Car Management:

1. Create Cars with details: name, description, color, isElectric, status, priceHour
2. Update Car details
3. Soft delete Cars

# Booking Management

1. View all bookings made by users
2. Return bookings from user

# General Features

# Get Car Details:

1. Retrieve details of a specific Car by its ID

# Get All Cars

1. Retrieve details of all Cars

# User Booking Features

# Create Booking

1. Book multiple Car on a specific date
2. Calculate total amount based on number of hours and price per hour

# Get All Bookings

1. Admins can view all bookings made by users

# Validation and Error Handling

1. Provide specific message with any kind of user and admin errors.
2. Provide informative error messages for booking conflicts and validation errors

# Technology Used:

1. Node.js
2. Express.js
3. Mongoose
4. TypeScript
5. JWT
6. Bcrypt
7. Zod Validation
