import express  from 'express';
import requireAuth from '../middleware/getAuth.js'; // Import the middleware function directly
import { getPostById, getAllFlightSchedule, createTwoWayFlight, getPostByFlightCode,
    updatePost, deletePost, patchPost } from '../Controller/postController.js';
import { flightValidationRules }  from "../utils/flightValidation.js";

const router = express.Router();

///get user by Flight ID
router.get('/flight/:id', getPostById); // Search by flight ID

//GET a single flight by Flight Code
router.get('/flightcode/:flightCode', getPostByFlightCode); // Search by flight code

//GET all flight schedules
router.get('/flights', getAllFlightSchedule);

//Authentication for protected routes
router.post('/',  requireAuth, flightValidationRules, createTwoWayFlight);
router.put('/:flightCode', requireAuth, flightValidationRules, updatePost);
router.delete('/:flightCode',  requireAuth, flightValidationRules, deletePost);
router.patch('/:flightCode',  requireAuth, flightValidationRules, patchPost);

export default router;
