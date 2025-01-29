import mongoose from "mongoose";


const flightScheduleSchema = new mongoose.Schema({
    flightUserId: {
        type:  mongoose.Schema.Types.String,  // Keep as String if using Google ID format
        required: true,
    },
    flightUser: {
        type: mongoose.Schema.Types.String, // Match the User schema
        ref: 'GoogleUser',
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

        returnDate: {
            type: mongoose.Schema.Types.String,
            required: false, // Optional for one-way flights
        },
        returnTime: {
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
