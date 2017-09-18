const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RouteSchema = new Schema({
  route_name: String,
  start_point: String,
  end_point: String,
  waypointOne: String,
  waypointTwo: String,
  pros: String,
  cons: String
});

let Route = mongoose.model("Route", RouteSchema);

module.exports = Route;
