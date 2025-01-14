const express = require('express');
const router = express.Router();
const { query, body } = require('express-validator');
const { getAccountById, createAccount, GetAccountByFilter } = require("../Controller/accountController");

router.get('/:id', getAccountById);

//Validation for get request
router.get('/', query('filter')
    .optional()
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage('Must be at least 3-10 characters long'),  GetAccountByFilter);

//Validation for Post request
router.post('/',
    [
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

module.exports = router;