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
        return findUser ? done(null, findUser) : done(null, null);
    } catch (err) {
        console.error("Error during deserialization:", err);
        return done(err, null);
    }
});

passport.use(new Strategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:1000/auth/google/redirect', // This should match your registered URI
        scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/gmail.send',
            'https://www.googleapis.com/auth/gmail.readonly',
        ],
        prompt: 'consent',    // Ensure the consent screen is displayed to the user
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log("Inside Passport Strategy");
        console.log("AccessToken:", accessToken);
        console.log("RefreshToken:", refreshToken);
        console.log("Profile:", profile);

        try {
            // Find user by Google ID
            let findUser = await GoogleUser.findOne({ googleId: profile.id });

            // Token logic
            const tokenExpiry = new Date();
            tokenExpiry.setSeconds(tokenExpiry.getSeconds() + 3600); // Assume 1-hour expiry for the access token

            if (!findUser) {
                // If user does not exist, create a new user
                const newUser = new GoogleUser({
                    username: profile.displayName || profile.emails[0].value.split('@')[0], // Fallback for username
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    firstName: profile.name?.givenName || '',
                    lastName: profile.name?.familyName || '',
                    picture: profile.photos?.[0]?.value || '',
                    tokens: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        expiresAt: tokenExpiry,
                    },
                    createdAt: new Date(),
                    lastLogin: new Date(),
                });

                // Save the new user
                const newSavedUser = await newUser.save();
                console.log("New User Saved:", newSavedUser);
                return done(null, newSavedUser);
            } else {
                // Update existing user with latest tokens and profile info
                findUser.tokens.accessToken = accessToken;
                findUser.tokens.refreshToken = refreshToken;
                findUser.tokens.expiresAt = tokenExpiry;
                findUser.email = profile.emails[0].value;
                findUser.picture = profile.photos?.[0]?.value || '';
                findUser.firstName = profile.name?.givenName || '';
                findUser.lastName = profile.name?.familyName || '';
                findUser.lastLogin = new Date();

                // Save the updates
                const updatedUser = await findUser.save();
                console.log("Existing User Updated:", updatedUser);
                return done(null, updatedUser);
            }
        } catch (err) {
            console.error("Error during authentication:", err);
            return done(err, null);
        }
    }
    )
);

export default passport;

//fs