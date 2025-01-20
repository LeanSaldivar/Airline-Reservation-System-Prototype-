import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from 'dotenv';
import {GoogleUser} from "../Mongoose/schema/google-user.js";


// Async function to load environment variables
const loadEnvVariables = async () => {
    const result = dotenv.config({ path: './config/.env' });

    if (result.error) {
        console.error("Error loading .env file", result.error);
        process.exit(1); // Stop the process if environment variables fail to load
    }
};

await loadEnvVariables(); // Ensure the .env variables are loaded before using them


//Stores in session ID to serialized data
passport.serializeUser((user, done) => {
    console.log("Inside Serialize User");
    console.log(user);
    done(null, user.id); //Pass in something unique to search for users
});

passport.deserializeUser(async (id, done) => {
    console.log(`Deserializing User ID: ${id}`);
    try {
        const findUser = await GoogleUser.findById(id);
        return findUser ? done(null, findUser) : done (null, null);
    } catch (err) {
        console.error("Error during deserialization:", err);
        return done(err, null);
    }
});

passport.use(new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:1000/auth/google/redirect', // This should match your registered URI
        scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/gmail.send',
        ],
    },
    async (accessToken, refreshToken, profile, done) => {
        let findUser;

        try {
            findUser = await GoogleUser.findOne({ googleId: profile.id });
        } catch (err) {
            console.log(err);
            return done(err, null);
        }

        try {
            if (!findUser) {
                // If profile.username doesn't exist, fall back to profile.displayName
                const username = profile.username || profile.displayName;

                const newUser = new GoogleUser({
                    username: username, // Use a fallback value for username
                    googleId: profile.id,
                });

                const newSavedUser = await newUser.save();
                return done(null, newSavedUser);
            }
            return done(null, findUser); // if findUser is defined
        } catch (err) {
            console.log(err);
            return done(err, null);
        }
    }));




export default passport;
