const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var User = require("./users");

let UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  bike_style: String,
  age: integer
  routes: [Route.schema]
});

let User = mongoose.model("User", UserSchemea);

module.exports = City;
