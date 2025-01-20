// UserAccounts.js
export const loggedAccounts = [
    { id: 1, email: '', password: '' },
];

export const unloggedAccounts = [
    {
        id: 1,
        displayName: "Jane Doe",
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'JaneDoe@gmail.com',
        password: 'hello123',
        confirmPassword: 'hello123'
    },

];

export default {unloggedAccounts, loggedAccounts};