import { unloggedAccounts} from '../Database/UserAccounts.js';

import bcrypt from 'bcrypt';
import {validationResult, matchedData} from "express-validator";
import {hashPassword} from "../utils/helpers.js";

import { User } from "../Mongoose/schema/users.js";

// Function to get a specific account by ID
const getAccountById = (req, res) => {
    const accountId = parseInt(req.params.id); // Parse id from the route parameter

    const account = unloggedAccounts.find(acc => acc.id === accountId); // Find the account by ID

    if (!account) {
        // If no account found, respond with a 404 error
        return res.status(404).json({ msg: 'Account not found' });
    }
    // If account is found, return it
    res.status(200).json(account);
};

const GetAccountByFilter = (req, res) => {

    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err, sessionData) =>{

        if (err) {
            console.log(err)
            throw err;
        }

        console.log("Inside Session Store Get");
        console.log(sessionData);
    });

    // Check for validation errors
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const filter = req.query.filter;

    // If a filter is provided, filter the accounts by matching firstName, lastName, or email
    if (filter) {
        const filteredAccounts = unloggedAccounts.filter(acc =>
            acc.firstName.toLowerCase().includes(filter.toLowerCase()) ||
            acc.lastName.toLowerCase().includes(filter.toLowerCase()) ||
            acc.email.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredAccounts.length === 0) {
            return res.status(404).json({ msg: "No accounts found matching the filter" });
        }

        return res.status(200).json(filteredAccounts);
    }

    // If no filter, return all accounts
    res.status(200).json(unloggedAccounts);
};

const Auth = (req, res) => {
    //Logging
    console.log(validationResult);

    res.sendStatus(200);
}

const getLocalAuthStatus = (req, res) => {
    console.log('inside /auth/local/status endpoint');
    console.log(req.user); // Check if req.user is populated
    console.log(req.session); // Check session contents
    if (req.user) {
        return res.send(req.user);
    }
    return res.sendStatus(401);
};

const logout = (req, res) => {
    //Checks if there's any user
    if (!req.user) return res.sendStatus(401);

    req.logout((err) => {
        if (err) return res.sendStatus(400);

        res.sendStatus(200);
    });
}

const CreateAccount = async (req, res) => {
    try {
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract only validated and sanitized data
        const data = matchedData(req);

        // Check if passwords match
        if (data.password !== data.confirmPassword) {
            return res.status(400).json({ msg: 'Passwords do not match' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(data.password);
        const hashedConfPassword = await hashPassword(data.confirmPassword);

        // Create a new user object
        const newUser = new User({
            email: data.email,
            password: hashedPassword, // Store hashed password
            confirmPassword: hashedConfPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            displayName: data.displayName,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send response with saved user details (excluding the password)
        const { password: _, confirmPassword: __, ...userWithoutPassword } = savedUser.toObject();
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ msg: 'Internal server error', error: error.message });
    }
};


export { getAccountById,  GetAccountByFilter, Auth, getLocalAuthStatus, logout, CreateAccount};

// DONE IMPLEMENTING SESSION PASSPORT AUTHENTICATION
//TIS TIME FOR GOOGLE O2
//kil me