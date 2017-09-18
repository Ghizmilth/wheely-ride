//DATABASE
var db = require("../models");

//GET /api/routes
function index(req, res) {
  db.Route.find({}, function(err, allRoutes) {
    console.log(allRoutes);
    res.json(allRoutes);
  });
}

//GET user by ID - api/users/:userId
function show(req, res) {
  db.Route.findById(req.params.routeId, function(err, foundRoute) {
    if (err) {
      console.log("routesControllers.show error", err);
    }
    console.log("routesControllers.show responding with", foundRoute);
    res.json(foundRoute);
  });
}

//POST /api/users/
function create(req, res) {
  console.log("form", req.body);
  //Send data to DB
  db.Route.create(req.body, function(err, route) {
    if (err) {
      console.log("Create ERROR", err);
    }
    console.log("Created this route", route);
    res.json(route);
  });
}

module.exports = {
  index: index,
  show: show,
  create: create
};
