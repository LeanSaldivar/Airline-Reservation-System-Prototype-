import express from 'express';
import { getWebsiteData, getAdmin, getPayment,
        getLogin, getSignin} from '../Controller/webController.js';

const webRouter = express.Router();

webRouter.get('/', getWebsiteData);

webRouter.get('/admin', getAdmin);

webRouter.get('/payment', getPayment);

webRouter.get('/log-in', getLogin);

webRouter.get('/sign-in', getSignin);

export default webRouter;
