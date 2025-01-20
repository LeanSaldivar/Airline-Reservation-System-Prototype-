//ES Modules
import express from 'express';
import passport from 'passport';
const googleRoute = express.Router();

//custom imports
import {callbackURL} from "../Controller/googleController.js";

//Strategy
import '../Strategy/google-strategy.js';

//localhost:1000/auth/google

googleRoute.get('/', passport.authenticate('google'));

googleRoute.get('/redirect', passport.authenticate('google'), callbackURL);



export default googleRoute;
