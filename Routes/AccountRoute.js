const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const { getAccount, createAccount, getAllAccounts } = require("../Controller/accountController");

router.get('/:id', getAccount);

router.get('/', query('filter')
    .optional()
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage('Must be at least 3-10 characters long'),  getAllAccounts);

router.post('/', createAccount);

module.exports = router;

