// Importing database
import {users, makeUniqueId} from '../Database/FlightUsers.js';

export const validateFlightCode = (req, res, next) => {
    // Check if it's a POST request (creating a new flight)
    if (req.method === 'POST') {
        const { flightCode } = req.body;  // Get flightCode from the request body

        // Check if the flightCode already exists in the users database
        const userExists = users.some((user) => user.flightCode === flightCode);

        if (userExists) {
            return res.status(400).json({ msg: `Flight with flightCode ${flightCode} already exists` });
        }
    } else {
        // For other methods like GET, PUT, DELETE, check if flightCode exists in the URL
        const flightCode = req.params.flightCode;
        const user = users.find((user) => user.flightCode === flightCode);

        if (!user) {
            return res.status(404).json({ msg: `Flight with flightCode ${flightCode} not found` });
        }

        // Attach the user to the request object for further use in the route handler
        req.user = user;
    }
    // Proceed to the next middleware or route handler
    next();
};


export default {validateFlightCode, users, makeUniqueId, };
