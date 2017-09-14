//DATABASE
var db = require("../models");

//GET /api/routes
function index(req, res) {
  db.Route.find({}, function(err, allRoutes) {
    console.log(allRoutes);
    res.json(allRoutes);
  });
}

module.exports = {
  index: index
};
