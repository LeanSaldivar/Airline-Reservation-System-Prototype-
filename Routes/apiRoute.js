const express = require('express');
const router = express.Router();
const { getPost, getPosts, createPost, updatePost, deletePost, patchPost } = require('../Controller/postController.js');
const { validateFlightCode } = require('../middleware/flightCode.js');


//Req Query
//get all posts
router.get('/',  getPost);

// GET a single user by ID
router.get('/:flightCode', getPosts);

//Create new post
router.post('/', validateFlightCode, createPost);

//Update a current post
router.put('/:flightCode', updatePost);

//Delete Post
router.delete('/:flightCode', validateFlightCode,  deletePost);

router.patch('/:flightCode', validateFlightCode,  patchPost);

module.exports = router;
