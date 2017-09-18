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

    foundRoute.route_name = req.body.routeName;
    foundRoute.start_lat = req.body.startLat;
    foundRoute.start_lon = req.body.startLon;
    foundRoute.end_lat = req.body.endLat;
    foundRoute.end_lon = req.body.endLon;
    foundRoute.miles = req.body.miles;
    foundRoute.climbing_ft = req.body.climbingFt;
    foundRoute.pros = req.body.pros;
    foundRoute.cons = req.body.cons;
    foundRoute.city = req.body.city;

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
