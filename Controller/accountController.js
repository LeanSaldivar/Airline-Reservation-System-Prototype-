import { unloggedAccounts,  loggedAccounts} from '../Database/UserAccounts.js';

import {validationResult, matchedData} from "express-validator";

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

const createAccount = (req, res) => {
    const errors = validationResult(req);

    // Check if there are validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract only the validated and sanitized data
    const data = matchedData(req);

    // Create the new account using the validated data
    const newAccount = {
        id: unloggedAccounts.length + 1, // Generate a unique ID
        ...data, // Use validated and sanitized fields directly
    };

    // Server-side additional validation for passwords
    if (newAccount.password !== newAccount.confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    // Add the new account to the database
    unloggedAccounts.push(newAccount);

    // Respond with the newly created account
    res.status(201).json(newAccount);
};


//get sample auth
const getAuth = (req, res) => {
    // Check if session already exists
    if (req.session.user) {
        console.log("Session already exists:", req.session.id);
        return res.status(200).json({ msg: "Session already active" });
    }

    // Extract and validate credentials
    const { displayName, password } = req.body;

    const findUser = unloggedAccounts.find(user => user.displayName === displayName);
    const checkPass = unloggedAccounts.find(user => user.password === password);

    if (!findUser) {
        return res.status(401).json({ msg: "Username does not exist" });
    }

    if (!checkPass) {
        return res.status(401).json({ msg: "Invalid Password" });
    }

    // Create session for authenticated user
    req.session.user = findUser;
    req.session.visited = true;

    // Sending signed cookie into the browser
    res.cookie("hello", "world", { maxAge: 60000, signed: true });

    console.log("New session created:", req.session.id);

    return res.status(200).json(findUser);
};

//Checks Authentication Status
const getAuthStatus = (req,res) => {
    req.sessionStore.get(req.sessionID, (err, data) => {
        if (err) {
            console.log(err);
        }

        console.log(data);
    })
    return req.session.user ? res.status(200).send(req.session.user)
        : res.status(401).json({ msg: 'Not Authenticated' });
};

export { getAccountById, createAccount,  GetAccountByFilter, getAuth, getAuthStatus };

// DONE IMPLEMENTING SESSION ID'S
//TIS TIME FOR PASSPORT AUTHORIZATION