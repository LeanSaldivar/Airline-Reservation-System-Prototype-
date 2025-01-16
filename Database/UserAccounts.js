// UserAccounts.js

import flightCode from "../middleware/flightCode.js";

export const loggedAccounts = [
    { id: 1, email: '', password: '' },
];

export const unloggedAccounts = [
    {
        id: 1,
        displayName: "Emman Saldi",
        firstName: 'lean',
        lastName: 'saldivar',
        email: 'hello@gmail.com',
        password: 'hello123',
        confirmPassword: 'hello123'
    }
];

export default {unloggedAccounts, loggedAccounts};