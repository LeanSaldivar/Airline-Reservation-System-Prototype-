const createCookies = (req, res, next) => {
    res.cookie("hello", "world", { maxAge: 60000, signed: true });
    next();
};

export default createCookies;