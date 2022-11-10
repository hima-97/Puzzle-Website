const passport = require("passport");
const UserModel = require("../models/Users");

// The "userController" class defines the methods a user can perform: 
export default class userController {
  //class that will have the different methods that are in regards to users in the db
  constructor() {}

  // This will display all users in the model:
  // This returns a JSON file with all users or, if there is no user, a JSON file with an error
  async getUsers(req, res, next) {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
  }


  //will display the items within the database that match the user's query
  //keep in mind that for testing it will be the name in the db.
  //in the actual implementation it will be the name of the puzzle in the db.
  async findUsers(req, res, next) {
    
    //userQuery will be what the user has input to be searched
    //selection will be which field to be searched. eg: username or age
    //uQuery will be the query combining the above information into a query to be input into the "find" function seen later

    let userQuery = "realadmin";
    let selection = "username"; //will need to be based off of user choice of search.
    let uQuery;

    //basic query example for looking for users with the username "fakeadmin"
    //let uQuery = {"username": "fakeadmin"};

    //will switch the field to be searched within the database based on selection
    switch (selection) {
      case "firstname":
        uQuery = {"firstname" : userQuery};
        break;
      case "lastname":
        uQuery = {"lastname" : userQuery};
        break;
      case "username":
        uQuery = {"username" : userQuery};
        break;
      case "age":
        uQuery = {"age" : userQuery};
        break;
      default:
        uQuery = "Error Invalid selection";
    }

    UserModel.find(uQuery, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }

  //will create a new User
  async createUser(req, res, next) {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    //returns json of the user
    res.json(user);

    //this will be used for hashing the user's inputted password

    //the line below grabs the hashed version of the input text "test"
    //var hash = md5("test");

    //I (Isaiah) will update this code when the frontend exists and grabs the fields from the user.
    //as of now it will be grabbed in a single json file
    // This returns JSON file for the specific user:
    res.json(user);
  }
}
