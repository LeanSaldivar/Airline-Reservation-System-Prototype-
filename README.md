# Airline Reservation System Prototype

This project is a prototype of an Airline Reservation System (ARS) designed to facilitate flight bookings, cancellations, and schedule management for both users and administrators.

## Features (Currently)
- **Booking Management**: Book and cancel flight reservations with real-time seat availability updates.
  **Viewing Schedules**: View Flight reservations with real time seat availability updates

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
   PORT=3000
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



   
