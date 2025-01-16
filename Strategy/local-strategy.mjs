import Passport from 'passport';
import Strategy from 'passport-local';
import unloggedAccounts from '../Database/UserAccounts.js';

//Validates user
export default Passport.use(
    new Strategy( (displayName, password, done) => {
        try {
            //Finds username
            const findUser = unloggedAccounts.find((user) => user.displayName === displayName);
            if (!findUser) {
                throw new Error('Username does not exist');
            }

            if (findUser.password !== password) {
                throw new Error('Password does not exist');
            }
            done (null, findUser);
        } catch (err) {
            done(err, null);
        }
    })
);