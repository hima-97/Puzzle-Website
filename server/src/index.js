require('dotenv').config();

import {
    authenticationController,
    authenticationRoute
} from "./api";

const cors = require('cors');

const express = require('express'),
    app = express(),
    port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
const router = express.Router();

router.get('/health', (req, res) => res.send('OK!'));
require('./config/swagger').default(router, '/web');
app.use('/', router);

var authController = new authenticationController();
var authRoute = authenticationRoute(express.Router(), app, authController);
app.use('/company', authRoute);

const configPassport  = require('./passport/config');
configPassport(app, express);

app.listen(port, () => console.log(`Server is listening on port ${port}`));