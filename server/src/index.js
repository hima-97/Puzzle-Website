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
require('./config/swagger').default(router, '/web');
app.use('/', router);

var authController = new authenticationController();
var authRoute = authenticationRoute(express.Router(), app, authController);
app.use('/company', authRoute);     

const configPassport  = require('./passport/config');
configPassport(app, express);

////
var usrController = new userController();
var usrRoute = userRoute(express.Router(), app, usrController);
app.use('/getUsers', usrRoute);



/*

//app.get is used for getting the desired ending for webpage. 
//i.e. http://localhost/getUsers does the function described below
app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/createUser", async (req,res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});
*/

app.listen(port, () => console.log(`Server is listening on port ${port}`));