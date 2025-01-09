const path = require("path");

//tbc
const ARS_PATH = path.join(__dirname, '../ARS');

const getWebsiteData = function (req, res) {
    try {
        res.sendFile(path.join(ARS_PATH, 'myWebsite.html'));
    } catch (e) {
        res.status(500).json('Error loading website data');
    }
};

const getAdmin = function (req, res) {
    try {
        res.sendFile(path.join(ARS_PATH, 'admin.html'));
    } catch (e) {
        res.status(500).json('Error loading website data');
    }
};

const getPayment = function(req, res) {
    try {
        res.sendFile(path.join(ARS_PATH, 'payment.html'));
    } catch (e) {
        res.status(500).json('Error loading website data');
    }
}

module.exports = { getWebsiteData, getAdmin, getPayment };