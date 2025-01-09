const colors = require("colors");

const logger = (req, res, next) => {
    const methodColors = {
        GET: 'blue',
        POST: 'green',
        PUT: 'yellow',
        DELETE: 'red'
    };

    const color = methodColors[req.method] || white;

    console.log(`
    ${req.method} 
    ${req.protocol}://
    ${req.get('host')} 
    ${req.originalUrl}`[
        color
        ]
    );
    next();
};

module.exports = logger;