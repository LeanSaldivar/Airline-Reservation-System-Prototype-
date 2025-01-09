const express = require('express');
const router = express.Router();
const { getPost, getPosts, createPost, updatePost, deletePost } = require('../Controller/paymentController');

//Req Query
//get all posts
router.get('/', getPost);

// GET a single user by ID
router.get('/:id', getPosts);

//Create new post
router.post('/', createPost);

//Update a current post
router.put('/:id', updatePost);

//Delete Post
router.delete('/:id', deletePost);

module.exports = router;
