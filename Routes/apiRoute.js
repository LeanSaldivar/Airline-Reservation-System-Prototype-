const express = require('express');
const router = express.Router();
const { getPost, getPosts, createPost, updatePost, deletePost } = require('../Controller/postController.js');

//Req Query
//get all posts
router.get('/', getPost);

// GET a single user by ID
router.get('/:flightCode', getPosts);

//Create new post
router.post('/', createPost);

//Update a current post
router.put('/:flightCode', updatePost);

//Delete Post
router.delete('/:flightCode', deletePost);

module.exports = router;
