const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Unauthorized: Please log in" });
    }
    next();
};

export default requireAuth;