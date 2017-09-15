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
  start_lat: "37.856141",
  start_lon: "-122.259725",
  end_lat: "37.878799",
  end_lon: "-122.181606",
  miles: "18",
  climbing_ft: "2,450",
  pros: "Great pavement and scenery",
  cons: "Could be dangerous with some cars going fast",
  city: "Oakland to Orinda"
});

routesList.push({
  route_name: "Orinda Round",
  start_lat: "37.6141",
  start_lon: "-122.9725",
  end_lat: "37.799",
  end_lon: "-122.1606",
  miles: "20",
  climbing_ft: "2,200",
  pros: "Great scenery",
  cons: "Dangerous with some cars going fast",
  city: "Berkeley to Orinda"
});

//add routes to users
usersList.forEach(function(user) {
  user.routes = routesList;
});

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
