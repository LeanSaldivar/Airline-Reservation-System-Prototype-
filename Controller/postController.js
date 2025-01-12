let { users, makeUniqueId } = require('../Database/FlightUsers'); // Re-import users and makeUniqueId if needed

const getPost = (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(users.slice(0, limit));
    }
    res.status(200).json(users);
};

const getPosts = (req, res) => {
    res.status(200).json(req.user); // Middleware already ensures req.user is valid
};

const createPost = (req, res) => {
    const newPost = {
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

module.exports = { getPost, getPosts, createPost, updatePost, deletePost, patchPost };
