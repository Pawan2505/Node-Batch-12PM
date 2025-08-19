const express = require("express");
const path = require("path");
const db = require("./config/db");
const port = 8000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// passport configuration start

const session = require("express-session");
const passport = require("passport");
const localStrategy = require("./config/passport-local-strategy");
app.use(
  session({
    name: "testing",
    secret: "mybatch",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// passport configuration end

app.use("/", require("./route/index"));

app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
    return false;
  }
  console.log(`Server is running on http://localhost:${port}`);
});
