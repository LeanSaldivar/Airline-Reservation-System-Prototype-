const callbackURL = (req, res) => {
    console.log(req.session);
    console.log(req.user);
    res.sendStatus(200)
}

export { callbackURL };