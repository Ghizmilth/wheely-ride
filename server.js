const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const controllers = require("./controllers");
const db = require("./models");
const User = db.User;

// set view engine to hbs (handlebars)
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));

// to config API to use body body-parser and look for JSON in req.body
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// middleware for auth
app.use(cookieParser());
app.use(
  session({
    secret: "pizzarocks", // change this!
    cookie: { maxAge: 60000 },
    rolling: true,
    resave: true,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//
//Index page
// app.get("/", function home(req, res) {
//   res.sendFile("/index.html", { root: __dirname });
// });
app.get("/", function(req, res) {
  res.render("index", { user: JSON.stringify(req.user) + " || null" });
});

//JSON endpoints

//general project info
app.get("/api", controllers.api.index);

//Users server-routes
app.get("/api/users", controllers.users.index);
app.get("/api/users/:userId", controllers.users.show);
app.post("/api/users", controllers.users.create);
app.put("/api/users/:userId", controllers.users.update);
app.delete("/api/users/:userId", controllers.users.destroy);

//Routes server-routes
app.get("/api/routes", controllers.routes.index);
app.get("/api/routes/:routeId"), controllers.routes.show;
app.post("/api/routes", controllers.routes.create);

// show signup view
app.get("/signup", function(req, res) {
  res.sendFile("/views/sign_up.html"); // you can also use res.sendFile
});

// hashes and salts password, saves new user to db
app.post("/signup", function(req, res) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, newUser) {
      passport.authenticate("local")(req, res, function() {
        //res.send("signed up!!!");
        res.redirect("/u");
      });
    }
  );
});
// show login view
app.get("/login", function(req, res) {
  res.sendFile("views/login.html"); // you can also use res.sendFile
});
// log in user
app.post("/login", passport.authenticate("local"), function(req, res) {
  console.log(req.user);
  //res.send("logged in!!!"); // sanity check
  res.redirect("/"); // preferred!
});

//LISTENING

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on localhost: 3000/");
});
