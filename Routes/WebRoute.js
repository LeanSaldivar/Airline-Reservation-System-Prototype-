const express = require('express');
const webRouter = express.Router();
const { getWebsiteData, getAdmin, getPayment } = require('../Controller/webController.js');

webRouter.get('/', getWebsiteData);

webRouter.get('/admin', getAdmin);

webRouter.get('/payment', getPayment);

module.exports = webRouter;
