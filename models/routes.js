const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RouteSchema = new Schema({
  route_name: String,
  start_lat: String,
  end_point: String,
  miles: String,
  climbing_ft: String,
  pros: String,
  cons: String,
  city: String
});

let Route = mongoose.model("Route", RouteSchema);

module.exports = Route;
