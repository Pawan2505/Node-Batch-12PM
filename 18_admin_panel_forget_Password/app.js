const express = require('express');
const path = require('path')

const db = require('./config/db');

var cookieParser = require('cookie-parser')

const port = 8001;

const app = express();
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.urlencoded());
app.use('/uploads', express.static(path.join(__dirname,"uploads")));


app.use(cookieParser());
app.use('/', require('./routes/index'))


app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server started on port : ",port);
})