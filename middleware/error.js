const errorHandler = (err, req, res) => {
    const statusCode = err.status || 500; // Default to 500 if no status is set
    res.status(statusCode).json({ msg: err.message || 'Server Error' });
};

module.exports = errorHandler;
