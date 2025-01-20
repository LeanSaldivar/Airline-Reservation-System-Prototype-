function isUserLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401).send({msg: 'User logged in'});
}

export default isUserLoggedIn;

import mongoose from "mongoose";

