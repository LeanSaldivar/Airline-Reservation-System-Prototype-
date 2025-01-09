//Sample database from payment
let paymentController = [
    {id: 1, firstName: 'john', lastName: 'doe', email: 'customer@john.com', mobile: '09202234243', cardType: 'MasterCard'},
    {id: 2, firstName: 'jane', lastName: 'doe', email: 'customer@jane.com', mobile: '09202234243', cardType: 'MasterCard'},
    {id: 3, firstName: 'jim', lastName: 'doe', email: 'customer@jim.com', mobile: '09202234243', cardType: 'MasterCard'}
];
// Get all posts
const getPost = (req, res) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(paymentController.slice(0, limit));
    }
    res.status(200).json(paymentController);
};

// Get single post
const getPosts = (req, res) => {
    const flightCode = (req.params.flightCode); // Extract ID from params
    const user = paymentController.find((user) => user.flightCode === flightCode); // Find user with matching ID

    if (!user) {
        return res.status(404).json({ msg: `A post with the id of ${flightCode} does not exist` });
    }

    res.status(200).json(user); // Return the user if found
};


// Create new post
const createPost = (req, res) => {
    const newPost = {
        flightCode: makeid(5),
        flyingFrom: req.body.flyingFrom,
        movingTo: req.body.movingTo,
        departureDate: req.body.departureDate,
        returnDate: req.body.returnDate,
        travelClass: req.body.travelClass,
        flightStatus: req.body.flightStatus,
    };

    //if you want to add more conditions, do so with  || operator
    if (!newPost.flyingFrom  || !newPost.movingTo || !newPost.departureDate ||!newPost.returnDate || !newPost.travelClass) {
        return res.status(400).json({ msg: 'Incomplete data' });
    }

    paymentController.push(newPost);
    res.status(201).json(newPost);
};

// Update post
const updatePost = (req, res) => {
    const flightCode = (req.params.flightCode);
    const user = paymentController.find((user) => user.flightCode === flightCode);

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
    const user = paymentController.find((user) => user.flightCode === flightCode);

    if (!user) {
        return res.status(404).json({ msg: `A post with the id of ${flightCode} does not exist` });
    }

    paymentController = paymentController.filter((user) => paymentController.flightCode !== flightCode);
    res.status(200).json({ msg: `User with id ${flightCode} deleted`, paymentController });
};

module.exports = { getPost, getPosts, createPost, updatePost, deletePost };