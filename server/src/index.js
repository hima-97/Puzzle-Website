// "index.js" file for server

// This gets value in .env file:
require('dotenv').config();

// Importing controllers and routers you want to use:
import {
    authenticationController,
    authenticationRoute,
    userController,
    userRoute
} from "./api";

const cors = require('cors');

// Creating Express server:
const express = require('express'),
// Port that the server will be on:
app = express(),
port = process.env.PORT;

// Body parser:
// This is the cors middleware, which allows us to parse JSON when server is sending and receiving
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
const router = express.Router();

// Connecting to MongoDB:
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

// A reference to "UserModel":
const UserModel = require(process.env.USER_LOC);

router.get('/health', (req, res) => res.send('OK!'));
app.use('/', router);

const configPassport  = require('./passport/config');
configPassport(app, express);

// Controllers and Routers are for connecting data on server to the database:
var authController = new authenticationController();
var authRoute = authenticationRoute(express.Router(), app, authController);
app.use('/auth', authRoute);

var usrController = new userController();
var usrRoute = userRoute(express.Router(), app, usrController);
app.use('/', usrRoute);

// Starting the server:
app.listen(port, () => console.log(`Server is listening on port ${port}`));