import { users } from '../Database/FlightUsers.js'; // Re-import users and makeUniqueId if needed
import {FlightSchedule} from "../Mongoose/schema/flight-Schedule.js";
import { GoogleUser } from "../Mongoose/schema/google-user.js"
import FlightDataService from "../utils/FlightData.js";

// Function to get a specific flight by ID
const getPostById = (req, res) => {
    const flightId = parseInt(req.params.id); // Parse id from the route parameter

    const flightSchedule = users.find(flight => flight.id === flightId); // Find the account by ID

    if (!flightSchedule) {
        // If no account found, respond with a 404 error
        return res.status(404).json({ msg: 'Flight not found' });
    }

    // If account is found, return it
    res.status(200).json(flightSchedule);
};

// Function to get a specific flight by flightCode
const getPostByFlightCode = (req, res) => {
    const { flightCode } = req.params; // Use flightCode in the route parameter
    const flightSchedule = users.find(flight => flight.flightCode === flightCode); // Find the flight by flightCode

    if (!flightSchedule) {
        // If no flight found, respond with a 404 error
        return res.status(404).json({ msg: 'Flight not found' });
    }

    // If flight is found, return it
    res.status(200).json(flightSchedule);
};

const getAllFlightSchedule = async (req, res) => {
    try {
        const flights = await FlightSchedule.find();
        const customerViewFlights = flights.map(flight =>
            FlightDataService.toCustomerView(flight)
        );
        res.json(customerViewFlights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createTwoWayFlight = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.username) {
            return res.status(401).json({ msg: 'User is not authenticated' });
        }

        // Find the user by username
        const userExists = await GoogleUser.findOne({ username: req.user.username });
        if (!userExists) {
            return res.status(400).json({ msg: 'Invalid user' });
        }

        // Prepare flight data
        const data = {
            ...req.body,
            flightUser: req.user.username, // Reference the authenticated user's username
            flightUserId: req.user._id.toString(), // Keep flightId as string if required
            flightStatus: "Scheduled", // Default status
            flightCode: req.flightCode,
        };

        // Save the flight schedule
        const newFlight = new FlightSchedule(data);
        const savedFlight = await newFlight.save();

        console.log("Flight Successfully Booked: \n", savedFlight);

    } catch (error) {
        console.error('Error creating flight:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const updatePost = (req, res) => {
    const { flyingFrom, movingTo, departureDate, returnDate, travelClass, flightStatus } = req.body;
    const user = req.user; // Middleware ensures user is valid

    if (flyingFrom) user.flyingFrom = flyingFrom;
    if (movingTo) user.movingTo = movingTo;
    if (departureDate) user.departureDate = departureDate;
    if (returnDate) user.returnDate = returnDate;
    if (travelClass) user.travelClass = travelClass;
    if (flightStatus) user.flightStatus = flightStatus;

    res.status(200).json(user);
};

const deletePost = (req, res) => {
    users = users.filter((user) => user.flightCode !== req.user.flightCode); // Middleware ensures req.user is valid
    res.status(200).json({ msg: `User with id ${req.user.flightCode} deleted`, users });
};

const patchPost = (req, res) => {
    try {
        Object.assign(req.user, req.body); // Middleware ensures req.user is valid
        res.status(200).json(req.user);
    } catch (error) {
        res.status(400).json({ msg: 'Incomplete data' });
    }
};

export { getPostById, getPostByFlightCode, getAllFlightSchedule,
    createTwoWayFlight, updatePost, deletePost, patchPost };