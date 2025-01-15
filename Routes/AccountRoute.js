const express = require('express');
const router = express.Router();
const { query, body } = require('express-validator');
const { getAccountById, createAccount, GetAccountByFilter, getAuth, getAuthStatus } = require("../Controller/accountController");

router.get('/:id', getAccountById);

//Validation for get request
router.get('/', query('filter')
    .optional()
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage('Must be at least 3-10 characters long'),  GetAccountByFilter);

//Checks if Authentication is valid
router.get('/auth/status', getAuthStatus);

//Signing in
router.post('/',
    [
        body('displayName')
            .notEmpty().withMessage('Display Name cannot be empty')
            .isLength({ min: 5, max: 32 }).withMessage('Display Name must be 5-32 characters long')
            .isString().withMessage('Display Name must be a string'),
        body('firstName')
            .notEmpty().withMessage('First Name cannot be empty')
            .isLength({ min: 5, max: 32 }).withMessage('First Name must be 5-32 characters long')
            .isString().withMessage('First Name must be a string'),
        body('lastName')
            .notEmpty().withMessage('Last Name cannot be empty')
            .isLength({ min: 5, max: 32 }).withMessage('Last Name must be 5-32 characters long')
            .isString().withMessage('Last Name must be a string'),
        body('email')
            .notEmpty().withMessage('Email cannot be empty')
            .isEmail().withMessage('Invalid email address'),
        body('password')
            .notEmpty().withMessage('Password cannot be empty')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('confirmPassword')
            .notEmpty().withMessage('Confirm Password cannot be empty')
    ],
    createAccount);

//Authentication or Logging in
router.post('/auth', [
        body('displayName')
            .notEmpty().withMessage('Display Name cannot be empty')
            .isLength({ min: 5, max: 32 }).withMessage('Display Name must be 5-32 characters long')
            .isString().withMessage('Display Name must be a string'),
        body('password')
            .notEmpty().withMessage('Password cannot be empty')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], getAuth);



module.exports = router;