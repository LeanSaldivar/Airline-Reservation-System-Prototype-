import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Installed middlewares
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

// Routing
import webRouter from './routes/WebRoute.js';
import posts from './routes/apiRoute.js';
import accountRoute from './routes/AccountRoute.js';
// const paymentRoute = require('./routes/paymentRoute'); // Convert this to an ES module if needed

// Custom Middleware
import logger from './middleware/logger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 1000;

// Middleware setup
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);
app.use(cookieParser('helloworld'));
app.use(session({
    secret: 'lean the dev',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 }
}));

app.use(passport.initialize());
app.use(passport.session());

// Static folders
app.use(express.static(path.join(__dirname, 'ARS')));
app.use(express.static(path.join(__dirname, 'public')));

// Setting up routes
app.use('/web', webRouter);
app.use('/web/api/users', posts);
app.use('/web/api/account', accountRoute);

// Catch all
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
