let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let passportLocalMongoose = require("passport-local-mongoose");

//let Route = require("./routes");

let UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  password: String,
  bike_style: String,
  age: Number
  //routes: [Route.schema]
});

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", UserSchema);
module.exports = User;
