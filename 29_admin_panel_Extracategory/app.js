const express = require('express');
const path = require('path');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./config/passport-loal-strategy');
const flashConnect = require('./config/flashConnect');

const port = 8000;
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// Use session BEFORE flash
app.use(session({
    name: 'testing',
    secret: 'mybatch',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Flash must be after session
app.use(flash());

// flash middleware after flash setup
app.use(flashConnect.setFlash);

// Passport init
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Routes
app.use('/', require('./routes/index'));

// Start server
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("server started on port:", port);
});
