//ES Modules
import express from 'express';
import passport from 'passport';
const googleRoute = express.Router();

//custom imports
import {callbackURL, getGoogleStatus} from "../Controller/googleController.js";

//Strategy
import '../Strategy/google-strategy.js';

//localhost:1000/auth/google

googleRoute.get('/', passport.authenticate('google'));

googleRoute.get('/redirect', passport.authenticate('google'), callbackURL);

googleRoute.get('/status', getGoogleStatus)

export default googleRoute;