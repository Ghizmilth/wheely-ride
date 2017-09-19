const db = require("./models");

var usersList = [];

usersList.push({
  first_name: "Hidaner",
  last_name: "Ferrer",
  username: "Ghiz",
  bike_style: "Road Bike",
  age: 35
});
usersList.push({
  first_name: "Cory",
  last_name: "Fauver",
  username: "Corf",
  bike_style: "Road Bike",
  age: 27
});
var routesList = [];

routesList.push({
  route_name: "Orinda Loop",
  start_point: "661 65th St. Oakland, CA",
  end_point: "661 65th St. Oakland, CA",
  waypointOne: "St. Marys Gardens. Moraga, CA",
  waypointTwo: "2 Orinda Theatre Square. Orinda, CA",
  pros: "Great scenery",
  cons: "Dangerous with some cars going fast"
});

routesList.push({
  route_name: "Jim and Ray's",
  start_point: "661 65th St. Oakland, CA",
  end_point: "1790 8th St. Oakland, CA",
  waypointOne: "957 63rd St. Oakland, CA",
  waypointTwo: "5974 Marshall St. Oakland, CA",
  pros: "Good times with friends",
  cons: "Risk of getting drunk out their house"
});

//add routes to users
// usersList.forEach(function(user) {
//   user.routes = routesList;
// });

//remove all hardcoded data and add new one
db.User.remove({}, function(err, users) {
  console.log("all data removed");
  db.User.create(usersList, function(err, users) {
    if (err) {
      return console.log("ERROR", err);
    }
    console.log("all users", users);
    console.log("created", users.length, "users");
  });
});

db.Route.remove({}, function(err, routes) {
  console.log("all data removed");
  db.Route.create(routesList, function(err, routes) {
    if (err) {
      return console.log("ERROR", err);
    }
    console.log("all users", routes);
    console.log("created", routes.length, "routes");
  });
});
