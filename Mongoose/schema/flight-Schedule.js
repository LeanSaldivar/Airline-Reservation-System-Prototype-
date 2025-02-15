import mongoose from "mongoose";

const flightScheduleSchema = new mongoose.Schema({
    flightCode: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    flightUserId: {
        type:  mongoose.Schema.Types.String,  // Keep as String if using Google ID format
        required: true,
    },
    flightUser: {
        type: mongoose.Schema.Types.String, // Match the User schema
        ref: 'GoogleUser',
        required: true,
    },

    flightItinerary: {
        type: mongoose.Schema.Types.String,
        required: true,
    },

    flyingFrom: {
        type: String,
        required: true,
    },
    flyingTo: {
        type: String,
        required: true,
    },
        departureDate: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        departureTime: {
            type: mongoose.Schema.Types.String,
            required: true,
        },

        returnDate: { //Flight Duration
            type: mongoose.Schema.Types.String,
            required: false, // Optional for one-way flights
        },
        returnTime: { //Estimated Time of Arrival
            type: mongoose.Schema.Types.String,
            required: false, // Optional for one-way flights
        },

    travelClass: {
        type: String, // E.g., Economy, Business, First
        required: true,
    },
    flightStatus: {
        type: String, // E.g., Scheduled, Delayed, Canceled
        required: true,
    },
});

export const FlightSchedule = mongoose.model('FlightSchedule', flightScheduleSchema);

/*
Payment stuff
Economy - 400
First - 1000
Business - 1200
Budget - 150

Privilege Card

System
Reference
Proof of payment for Customer Side
QR Code

Notif to:
Primary (1 client Notifications for flight)
Secondary (2 client notifications for flight)

*/