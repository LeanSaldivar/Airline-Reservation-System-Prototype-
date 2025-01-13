const express = require('express');
const router = express.Router();
const { getPostById, getAllFlightSchedule, createPost, getPostByFlightCode,
    updatePost, deletePost, patchPost } =
    require('../Controller/postController.js');

const { validateFlightCode } = require('../middleware/flightCode.js');

///get user by Flight ID
router.get('/flight/:id', getPostById); // Search by flight ID

//GET a single flight by Flight Code
router.get('/flightcode/:flightCode', getPostByFlightCode); // Search by flight code

//GET all flight schedules
router.get('/flights', getAllFlightSchedule);

//Create new post
router.post('/', validateFlightCode, createPost);

//Update a current post
router.put('/:flightCode', validateFlightCode, updatePost);

//Delete Post
router.delete('/:flightCode', validateFlightCode,  deletePost);

router.patch('/:flightCode', validateFlightCode,  patchPost);

module.exports = router;
