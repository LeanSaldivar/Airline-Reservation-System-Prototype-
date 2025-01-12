let { loggedAccounts,
    unloggedAccounts }
    = require('../Database/UserAccounts');
const {users} = require("../Database/FlightUsers");
const {validationResult} = require("express-validator");

// Function to get a specific account by ID
const getAccount = (req, res) => {
    const accountId = parseInt(req.params.id); // Parse id from the route parameter

    const account = unloggedAccounts.find(acc => acc.id === accountId); // Find the account by ID

    if (!account) {
        // If no account found, respond with a 404 error
        return res.status(404).json({ msg: 'Account not found' });
    }

    // If account is found, return it
    res.status(200).json(account);
};

const getAllAccounts = (req, res) => {
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
            return res.status(404).json({ msg: 'No accounts found matching the filter' });
        }

        return res.status(200).json(filteredAccounts);
    }

    // If no filter, return all accounts
    res.status(200).json(unloggedAccounts);
};

const createAccount = (req, res) => {
    const newAccount = {
        id: unloggedAccounts.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    if (!newAccount.firstName || !newAccount.lastName || !newAccount.email ||
        !newAccount.password || !newAccount.confirmPassword) {
        return res.status(404).json({msg : 'Incomplete Data'});
    }

    if (newAccount.password !== newAccount.confirmPassword) {
        return res.status(404).json({msg : 'Does not match with password'});
    }

    unloggedAccounts.push(newAccount);
    res.status(201).json(newAccount);
}

module.exports = { getAccount, createAccount, getAllAccounts };

//TBC 2:02:06
//Will implement Validation for POST request