//ES modules
const express = require('express');
const path = require('path');

//Installed middlewares
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Routing
const webRouter = require("./routes/WebRoute");
const posts = require('./routes/apiRoute');
const accountRoute = require("./routes/accountRoute");
//const payment = require('./routes/paymentRoute');

//Custom Middleware
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

app.use(cookieParser("helloworld")); // Parses cookies attached to client requests
app.use(session({
    secret: 'lean the dev', //Should be something harder
    saveUninitialized: false, //set false to avoid saving unmodified session data to the session store
    resave: false,
    cookie: {
        maxAge: 60000 * 60,//sets time to milliseconds
    }
}));

// setup static folder for our html folder
app.use(express.static(path.join(__dirname, 'ARS')));
app.use(express.static(path.join(__dirname, 'public')));


//Setting up Routes
app.use('/web', webRouter);
app.use('/web/api/users', posts);
app.use('/web/api/account', accountRoute);



//Catch all
app.use(notFound);

//Error handler
app.use(errorHandler);

app.listen(PORT,() => console.log(`Server running on http://localhost:${PORT}`));