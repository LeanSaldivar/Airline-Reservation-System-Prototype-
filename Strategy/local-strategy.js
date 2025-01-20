import passport from 'passport';
import { Strategy } from 'passport-local';
import { comparePassword} from "../utils/helpers.js";
import { User } from "../Mongoose/schema/users.js";

//Stores in session ID to serialized data
passport.serializeUser((user, done) => {
    console.log("Inside Serialize User");
    console.log(user);
    done(null, user.id); //Pass in something unique to search for users
});

passport.deserializeUser(async (id, done) => {
    console.log(`Deserializing User ID: ${id}`);
    try {
        const findUser = await User.findById(id);
        if (!findUser) {
            return done(null, false, { message: 'User not found' });
        }
        return done(null, findUser);
    } catch (err) {
        console.error("Error during deserialization:", err);
        return done(err, null);
    }
});

passport.use(new Strategy({ usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Invalid credentials' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));


export default passport;