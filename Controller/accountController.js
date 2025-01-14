let { loggedAccounts,
    unloggedAccounts }
    = require('../Database/UserAccounts');
const {validationResult, matchedData} = require("express-validator");



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

    console.log(req.session);
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(data);
    });

    req.session.visited = true;


    //Sending cookies into the browser
    res.cookie('hello', 'world', { maxAge: 60000, signed: true });

    //Prints cookies in the console
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies.hello); //how to reference hello here

    // Check if the 'hello' cookie exists and has the correct value
    if (!req.signedCookies.hello || req.signedCookies.hello !== "world") {
        return res.status(403).json({ msg: "Invalid cookies" }); // Return an error if cookies are invalid
    }

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

module.exports = { getAccountById, createAccount,  GetAccountByFilter };

// DONE IMPLEMENTING SAMPLE COOKIES
//TIS TIME FOR SESSIONS PT2 BABY