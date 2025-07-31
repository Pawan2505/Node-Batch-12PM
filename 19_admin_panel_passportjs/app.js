const express = require('express');
const path = require('path')

const db = require('./config/db');

var cookieParser = require('cookie-parser')

const port = 5000;

const app = express();
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.urlencoded());
app.use('/uploads', express.static(path.join(__dirname,"uploads")));


app.use(cookieParser());


const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./config/passport-loal-strategy');
app.use(session({
    name: 'testing',
    secret: 'mybatch',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes/index'))


app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server started on port : ",port);
})