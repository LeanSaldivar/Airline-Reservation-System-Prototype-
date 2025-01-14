let { users, makeUniqueId } = require('../Database/FlightUsers'); // Re-import users and makeUniqueId if needed


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

const getAllFlightSchedule = (req, res) => {
    console.log(req.session);
    console.log(req.session.id);

    req.session.visited = true;

    res.cookie('hello', 'worlds', { maxAge: 60000, signed: true });

    res.status(200).json(users); // Return all flight schedules directly
    }

const createPost = (req, res) => {
    const newPost = {
        id: users.length + 1,
        flightCode: makeUniqueId(5),
        flyingFrom: req.body.flyingFrom,
        movingTo: req.body.movingTo,
        departureDate: req.body.departureDate,
        returnDate: req.body.returnDate,
        travelClass: req.body.travelClass,
        flightStatus: 'TBA',
    };

    if (!newPost.flyingFrom || !newPost.movingTo || !newPost.departureDate ||
        !newPost.returnDate || !newPost.travelClass) {
        return res.status(400).json({ msg: 'Incomplete data' });
    }

    users.push(newPost);
    res.status(201).json(newPost);
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

module.exports = { getPostById, getPostByFlightCode, getAllFlightSchedule,
                    createPost, updatePost, deletePost, patchPost };
