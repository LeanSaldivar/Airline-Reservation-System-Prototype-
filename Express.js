//ES modules
const express = require('express');
const path = require('path');

//npm installations
const cors = require('cors');

//Routing
const webRouter = require("./routes/WebRoute");
const posts = require('./routes/apiRoute');
//const payment = require('./routes/paymentRoute');


//Middleware
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const errorHandler = require('./middleware/error');

const app = express();
const PORT = process.env.PORT || 1000;

app.use(cors());

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Logger middleware
app.use(logger);

// setup static folder for our html folder
app.use(express.static(path.join(__dirname, 'ARS')));

//Setting up HTML route
app.use('/web', webRouter);

//Setting up API route
app.use('/web/api/users', posts);

//Catch all
app.use(notFound);

//Error handler
app.use(errorHandler);

app.listen(PORT,() => console.log(`Server running on http://localhost:${PORT}`));