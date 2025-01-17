const requireAuth = (req, res, next) => {
    // Check if the user exists in the session
    if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized: Please log in" });
    }
    next();
};

export default requireAuth;
