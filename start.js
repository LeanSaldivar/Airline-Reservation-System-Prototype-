import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Installed middlewares
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

// Routing
import webRouter from './routes/WebRoute.js';
import posts from './routes/apiRoute.js';
import accountRoute from './routes/AccountRoute.js';
import googleRoute from "./routes/googleRoute.js";
// const paymentRoute = require('./routes/paymentRoute'); // Convert this to an ES module if needed

// Custom Middleware
import logger from './middleware/logger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 1000;

//Database
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";

dotenv.config();  // Load variables from .env file

// Middleware setup
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/userAccount', {
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection failed:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);
app.use(cookieParser('helloworld'));
app.use(session({
        secret: process.env.SESSION_SECRET || 'default_secret',
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 60000 * 60,
            signed: true
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        })
    })
);

app.use(passport.initialize());
app.use(passport.session(undefined));

// Static folders
app.use(express.static(path.join(__dirname, 'ARS')));
app.use(express.static(path.join(__dirname, 'public')));

// Setting up routes
app.use('/web', webRouter);
app.use('/web/api/users', posts);
app.use('/web/api/account', accountRoute);
app.use('/auth/google', googleRoute);

// Catch all
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
