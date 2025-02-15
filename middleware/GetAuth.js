const requireAuth = (req, res, next) => {
    // Check if the user exists in the session
    console.log("Session User:", req.user); // Debugging

    if (req.isAuthenticated()) {
        //Proceed with next step
        next();
    } else {
        res.status(401).json({ authenticated: false });
    }

};

export default requireAuth;
