import passport from 'passport';
import { Strategy } from 'passport-local';
import { unloggedAccounts, loggedAccounts } from '../Database/UserAccounts.js';

//Stores in session ID to serialized data
passport.serializeUser((user, done) => {
    console.log("Inside Serialize User");
    console.log(user);
    done(null, user.id); //Pass in something unique to search for users
});


passport.deserializeUser((id, done) => {
    console.log("Inside Deserializer");
    console.log(`Deserializing User ID: ${id}`);

    try {
        const findUser = unloggedAccounts.find((user) => user.id === id); // Correctly named variable
        if (!findUser) {
            throw new Error('User not found'); // Handle the case where the user is not found
        }
        console.log("User found:", findUser); // Debug log
        done(null, findUser);
    } catch (err) {
        console.error("Error during deserialization:", err);
        done(err, null); // Pass the error to done
    }
});
//Validates user
passport.use(
    new Strategy(  { usernameField: 'email', passwordField: 'password' },
        (email, password, done) => {
        console.log(`Email: ${email}` );
        console.log(`password: ${password}` );

        try {
            //Finds username
            const findUser = unloggedAccounts.find((user) =>
                user.email === email);
            if (!findUser) {
                throw new Error('Username does not exist');
            }

            if (findUser.password !== password) {
                throw new Error('Invalid Password');
            }
            done (null, findUser);
        } catch (err) {
            done(err, null);
        }
    })
);

export default passport;
