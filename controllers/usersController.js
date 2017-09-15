//DATABASE
var db = require("../models");

//GET all users - api/users
function index(req, res) {
  db.User.find({}, function(err, allUsers) {
    console.log(allUsers);
    res.json(allUsers);
  });
}

//GET user by ID - api/users/:userId
function show(req, res) {
  db.User.findById(req.params.userId, function(err, foundUser) {
    if (err) {
      console.log("usersControllers.show error", err);
    }
    console.log("usersControllers.show responding with", foundUser);
    res.json(foundUser);
  });
}

//POST /api/users/
function create(req, res) {
  console.log("form", req.body);
  //Send data to DB
  db.User.create(req.body, function(err, user) {
    if (err) {
      console.log("Create ERROR", err);
    }
    console.log("Created this user", user);
    res.json(user);
  });
}

function update(req, res) {
  db.User.findById(req.params.userId, function(err, foundUser) {
    if (err) {
      console.log("userControllers.update ERROR", err);
    }

    foundUser.first_name = req.body.first_name;
    foundUser.last_name = req.body.last_name;
    foundUser.username = req.body.username;
    foundUser.bike_style = req.body.bike_style;
    foundUser.age = req.body.age;

    foundUser.save(function(err, savedUser) {
      if (err) {
        console.log("Saving updated user has failed");
      }
      res.json(savedUser);
    });
  });
}

module.exports = {
  index: index,
  show: show,
  create: create.
  update: update
};
