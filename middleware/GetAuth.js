const requireAuth = (req, res, next) => {
    // Check if the user exists in the session
    console.log("Session User:", req.user); // Debugging

    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
    } else {
        res.status(401).json({ authenticated: false });
    }

    next();
};

export default requireAuth;
