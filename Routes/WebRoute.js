const express = require('express');
const webRouter = express.Router();
const { getWebsiteData, getAdmin, getPayment,
        getLogin, getSignin} = require('../Controller/webController.js');

webRouter.get('/', getWebsiteData);

webRouter.get('/admin', getAdmin);

webRouter.get('/payment', getPayment);

webRouter.get('/log-in', getLogin);

webRouter.get('/sign-in', getSignin);

module.exports = webRouter;
