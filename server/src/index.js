require('dotenv').config();

import {
    authenticationController,
    authenticationRoute,
    userController,
    userRoute
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

//we need a reference to mongoose so we save it. After that connect to the database collection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

//Also save a reference to the Usermodel
const UserModel = require(process.env.USER_LOC);

router.get('/health', (req, res) => res.send('OK!'));
app.use('/', router);

var authController = new authenticationController();
var authRoute = authenticationRoute(express.Router(), app, authController);
app.use('/company', authRoute);     

const configPassport  = require('./passport/config');
configPassport(app, express);

//usrController and usrRoute are for connecting in between the database and what is on the server
//it is exactly like the authentication described above
var usrController = new userController();
var usrRoute = userRoute(express.Router(), app, usrController);
app.use('/', usrRoute);

app.listen(port, () => console.log(`Server is listening on port ${port}`));