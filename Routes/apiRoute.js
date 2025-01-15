const express = require('express');
const router = express.Router();
const { getPostById, getAllFlightSchedule, createPost, getPostByFlightCode,
    updatePost, deletePost, patchPost } =
    require('../Controller/postController.js');

const requireAuth = require('../middleware/getAuth.js'); // Import the middleware function directly
const { validateFlightCode } = require('../middleware/flightCode.js');

///get user by Flight ID
router.get('/flight/:id', getPostById); // Search by flight ID

//GET a single flight by Flight Code
router.get('/flightcode/:flightCode', getPostByFlightCode); // Search by flight code

//GET all flight schedules
router.get('/flights', getAllFlightSchedule);

router.post('/', validateFlightCode, requireAuth, createPost);
router.put('/:flightCode', validateFlightCode, requireAuth, updatePost);
router.delete('/:flightCode', validateFlightCode, requireAuth,  deletePost);
router.patch('/:flightCode', validateFlightCode, requireAuth,  patchPost);

module.exports = router;
