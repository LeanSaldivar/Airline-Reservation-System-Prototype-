import express  from 'express';
import requireAuth from '../middleware/getAuth.js'; // Import the middleware function directly
import { validateFlightCode } from '../middleware/flightCode.js'; // Named import
import { getPostById, getAllFlightSchedule, createPost, getPostByFlightCode,
    updatePost, deletePost, patchPost } from '../Controller/postController.js';

const router = express.Router();

///get user by Flight ID
router.get('/flight/:id', getPostById); // Search by flight ID

//GET a single flight by Flight Code
router.get('/flightcode/:flightCode', getPostByFlightCode); // Search by flight code

//GET all flight schedules
router.get('/flights', getAllFlightSchedule);

//Authentication for protected routes
router.post('/', validateFlightCode, requireAuth, createPost);
router.put('/:flightCode', validateFlightCode, requireAuth, updatePost);
router.delete('/:flightCode', validateFlightCode, requireAuth,  deletePost);
router.patch('/:flightCode', validateFlightCode, requireAuth,  patchPost);

export default router;
