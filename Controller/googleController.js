
const callbackURL = (req, res) => {
    console.log(req.session);
    console.log('Authenticated User:', req.user);
    res.redirect('/web'); // Redirect to a page after successful login
}

const getGoogleStatus = (req, res) => {
    console.log('inside /auth/local/status endpoint');
    console.log(req.user); // Check if req.user is populated
    console.log(req.session); // Check session contents

    return req.user ? res.send(req.user) : res.sendStatus(401);
};

export { callbackURL, getGoogleStatus};