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

function update(req, res) {
  db.Route.findById(req.params.routeId, function(err, foundRoute) {
    if (err) {
      console.log("routeControllers.update ERROR", err);
    }

    foundRoute.route_name = req.body.route_name;
    foundRoute.start_point = req.body.start_point;
    foundRoute.end_point = req.body.end_point;
    foundRoute.waypointOne = req.body.waypointOne;
    foundRoute.waypointTwo = req.body.waypointTwo;
    foundRoute.pros = req.body.pros;
    foundRoute.cons = req.body.cons;

    foundRoute.save(function(err, savedRoute) {
      if (err) {
        console.log("Saving updated route has failed");
      }
      res.json(savedRoute);
    });
  });
}

function destroy(req, res) {
  db.Route.findOneAndRemove({ _id: req.params.routeId }, function(
    err,
    foundRoute
  ) {
    if (err) {
      console.log("ERROR deleting route by id:", err);
    }
    res.json(foundRoute);
  });
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};
