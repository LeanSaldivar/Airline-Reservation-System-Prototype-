

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

//sample database
let users = [
    { flightCode: makeid(5), flyingFrom: 'New York', movingTo: 'Paris', departureDate: '12/29/2024', returnDate: '12/30/2024', travelClass: 'Business', flightStatus: 'TBA'},
    { flightCode: makeid(5), flyingFrom: 'Tokyo', movingTo: 'Sydney', departureDate: '12/31/2024', returnDate: '1/25/2025', travelClass: 'Economy',  flightStatus: 'TBA'},
    { flightCode: makeid(5), flyingFrom: 'London', movingTo: 'Paris', departureDate: '12/29/2024', returnDate: '12/30/2024', travelClass: 'FirstClass', flightStatus: 'TBA'},
];

function makeUniqueId(length) {
    let id;
    do {
        id = makeid(length);
    } while (users.some((user) => user.flightCode === id));
    return id;
}

// Get all posts
const getPost = (req, res) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(users.slice(0, limit));
    }
    res.status(200).json(users);
};

// Get single post
const getPosts = (req, res) => {
    const flightCode = (req.params.flightCode); // Extract ID from params
    const user = users.find((user) => user.flightCode === flightCode); // Find user with matching ID

    if (!user) {
        return res.status(404).json({ msg: `A post with the id of ${flightCode} does not exist` });
    }

    res.status(200).json(user); // Return the user if found
};


// Create new post
const createPost = (req, res) => {
    const newPost = {
        flightCode: makeUniqueId(5),
        flyingFrom: req.body.flyingFrom,
        movingTo: req.body.movingTo,
        departureDate: req.body.departureDate,
        returnDate: req.body.returnDate,
        travelClass: req.body.travelClass,
        flightStatus: 'TBA'
    };

    //if you want to add more conditions, do so with  || operator
    if (!newPost.flyingFrom  || !newPost.movingTo || !newPost.departureDate ||!newPost.returnDate || !newPost.travelClass) {
        return res.status(400).json({ msg: 'Incomplete data' });
    }

    users.push(newPost);
    res.status(201).json(newPost);
};

// Update post
const updatePost = (req, res) => {
    const flightCode = (req.params.flightCode);
    const user = users.find((user) => user.flightCode === flightCode);

    if (!user) {
        return res.status(404).json({ msg: `A post with the id of ${flightCode} does not exist` });
    }

    // add ,description to update another item
    const { flyingFrom, movingTo, departureDate, returnDate, travelClass, flightStatus } = req.body;
    if (flyingFrom) user.flyingFrom = flyingFrom;
    if (movingTo) user.movingTo = movingTo;
    if (departureDate) user.departureDate = departureDate;
    if (returnDate) user.returnDate = returnDate;
    if (travelClass) user.travelClass = travelClass;
    if (flightStatus) user.flightStatus = flightStatus;
    //Commenting this code because we only want title
    //if (description) user.description = description;

    res.status(200).json(user);
};

// Delete post
const deletePost = (req, res) => {
    const flightCode = (req.params.flightCode);
    const user = users.find((user) => user.flightCode === flightCode);

    if (!user) {
        return res.status(404).json({ msg: `A post with the id of ${flightCode} does not exist` });
    }

    users = users.filter((user) => user.flightCode !== flightCode);
    res.status(200).json({ msg: `User with id ${flightCode} deleted`, users });
};

// Patch Request
const patchPost = (req, res) => {
    try {
        const {
            body, // Data to update
            params: { flightCode }, // Flight code to identify the user
        } = req;

        // Find the user by flightCode
        const user = users.find((user) => user.flightCode === flightCode);

        // If user is not found, return a 404 error
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update only the fields provided in the body
        Object.assign(user, body);

        // Send back the updated user
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ msg: 'Incomplete data' });
    }
};


module.exports = { getPost, getPosts, createPost, updatePost, deletePost, patchPost };
