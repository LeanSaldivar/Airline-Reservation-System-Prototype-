import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARS_PATH = path.join(__dirname, '../ARS');

// Define handlers
const getWebsiteData = (req, res) => {
    try {
        res.sendFile(path.join(ARS_PATH, 'myWebsite.html'));
    } catch (e) {
        res.status(500).json('Error loading website data');
    }
};

const getAdmin = (req, res) => {
    try {
        res.sendFile(path.join(ARS_PATH, 'admin.html'));
    } catch (e) {
        res.status(500).json('Error loading website data');
    }
};

const getPayment = (req, res) => {
    try {
        res.sendFile(path.join(ARS_PATH, 'payment.html'));
    } catch (e) {
        res.status(500).json('Error loading website data');
    }
};

const getLogin = (req, res) => {
    try {
        res.sendFile(path.join(ARS_PATH, 'users/Login.html'));
    } catch (e) {
        res.status(500).json('Error loading website data');
    }
};

const getSignin = (req, res) => {
    try {
        res.sendFile(path.join(ARS_PATH, 'users/Sign-in.html'));
    } catch (e) {
        res.status(500).json('Error loading website data');
    }
};

// Export handlers using ES module syntax
export { getWebsiteData, getAdmin, getPayment, getLogin, getSignin };
