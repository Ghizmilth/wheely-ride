const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));

const controllers = require("./controllers");

//BASIC ROUTE

//Index page
app.get("/", function home(req, res) {
  res.sendFile("views/index.html", { root: __dirname });
});

app.get("/login", function login(req, res) {
  res.sendFile("views/login.html", { root: __dirname });
});

//JSON endpoints

//general project info
app.get("/api", controllers.api.index);

//Users server-routes
app.get("/api/users", controllers.users.index);
app.get("/api/users/:userId", controllers.users.show);
app.post("/api/users", controllers.users.create);
app.put("/api/users/:userId", controllers.users.update);
//app.delete("/api/users/:userId", controllers.users.delete);

//Routes server-routes

//LISTENING

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on localhost: 3000/");
});
