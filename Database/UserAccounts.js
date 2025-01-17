// UserAccounts.js

import flightCode from "../middleware/flightCode.js";

export const loggedAccounts = [
    { id: 1, email: '', password: '' },
];

export const unloggedAccounts = [
    {
        id: 1,
        displayName: "Emman",
        firstName: 'lean',
        email: 'hello@gmail.com',
        lastName: 'saldivar',
        password: 'hello123',
        confirmPassword: 'hello123'
    },
    {
        id: 2,
        displayName: "Riotard",
        firstName: 'Rohann',
        email: 'rohann@gmail.com',
        lastName: 'Glino',
        password: 'rohansux123',
        confirmPassword: 'rohansux123'
    }
];

export default {unloggedAccounts, loggedAccounts};