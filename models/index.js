//REQUIRE

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wheely_ride");

module.exports.User = require("./users");
module.exports.Route = require("./routes");
