const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Route = require("./routes");

let UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  bike_style: String,
  age: Number,
  routes: [Route.schema]
});

let User = mongoose.model("User", UserSchema);

module.exports = User;
