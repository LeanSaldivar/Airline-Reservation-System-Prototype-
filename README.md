# Airline Reservation System Prototype

This project is a prototype of an Airline Reservation System (ARS) designed to facilitate flight bookings, cancellations, and schedule management for both users and administrators.

## Features (Currently)
- **Booking Management**: Book and cancel flight reservations with real-time seat availability updates.
- **Viewing Schedules**: View Flight reservations with real time seat availability updates

## Changelog

#### January 20,2025

- Created a database for users and Google users using MongoDB.
- Created schemas for User and GoogleUser to store user data. 
- Implemented password hashing for secure password storage. 
- Set up session stores using MongoDB to persist session data. 
- Integrated OAuth2 for Google authentication to handle user sign-in.
- Setup Environment variables and gitignore

#### January 17, 2025

- Used passport.js to create local strategies and enhanced authentication
- Implemented Serialization and Deserialization for logging in and signing in
- Implemented Logout feature
- Cleaned up code and removed previous Login and Sign-in feature

#### January 16, 2025

- Switched from commonJS to ES modules
- Started implementing passport.js and authentification

#### January 15, 2025: 7:58PM
- **Login/Sign-in Authorization**
   - Implemented login and sign-in functionality via POSTMAN.
   - Validated user credentials and handled invalid login attempts with appropriate response codes (`401 Unauthorized`, `403 Forbidden`).

- **Middleware for Authentication**
   - Added middleware to restrict access to protected routes.
   - Verified user sessions before granting access to flight APIs.

- **API Security Enhancements**
   - Used signed session cookies to track authenticated users.
   - Configured error handling for invalid or expired sessions.

- **Data Validation Improvements**
   - Checked for missing or incomplete fields during the login process.
   - Ensured robust validation and appropriate error handling for all user inputs.

- **Code Modularization**
   - Separated authentication logic into middleware for cleaner and more maintainable code.
   - Refactored `postController.js` to delegate repetitive tasks to middleware.

#### January 14,2025: 7:51PM
- Added Cookies
- Added Sessions

#### January 12, 2025: 8:19PM
- Added HTML Files for Logging in and Signing in
- Added routing and controller for signing-in
- Added validation for GET request
- Will add validation for POST request body

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Express.js (Node.js framework)
- **Middleware**: Custom middleware for authentication and request handling

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/LeanSaldivar/Airline-Reservation-System-Prototype-.git
   cd Airline-Reservation-System-Prototype-
2. **Install Dependencies:**
   ```bash
   npm install
3. **Configure Environment Variables:**
   ```env
   PORT=1000
## Usage
- Booking: Select a flight and proceed with the booking process.
- View: View Flight Schedules
- Cancel: Cancel Flight Schedules that you booked with your Flight ID

## Project Structure
````bash
Airline-Reservation-System-Prototype-
├── ARS/
│   ├── models/           # Mongoose schemas
│   ├── views/            # HTML templates
│   └── public/           # Static assets (CSS, JS)
├── Controller/
│   ├── authController.js # Authentication logic
│   └── flightController.js # Flight management logic
├── Routes/
│   ├── authRoutes.js     # Authentication routes
│   └── flightRoutes.js   # Flight-related routes
├── middleware/
│   └── authMiddleware.js # Middleware for authentication
├── node_modules/         # Node.js dependencies
├── .env                  # Environment variables
├── package.json          # Project metadata and scripts
└── server.js             # Entry point of the application



   
