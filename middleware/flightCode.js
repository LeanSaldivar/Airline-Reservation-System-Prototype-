// Importing database
let {users, makeUniqueId} = require ('../Database/FlightUsers');


// flightCodeMiddleware.js
const { Request, Response, NextFunction } = require('express');

// Middleware to validate if the flightCode exists
const validateFlightCode = (req, res, next) => {
    const flightCode = req.params.flightCode;

    // Check if flightCode is provided and if it exists in the users database
    const user = users.find((user) => user.flightCode === flightCode);

    if (!user) {
        return res.status(404).json({ msg: `Flight with flightCode ${flightCode} not found` });
    }

    // Attach the user to the request object so it's available in the route handler
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
};

module.exports = {users, makeUniqueId, validateFlightCode};
