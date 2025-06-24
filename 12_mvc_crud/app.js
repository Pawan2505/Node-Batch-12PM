const express = require("express");
const db = require('./config/db')
const path = require('path');
const port = 8000;


const app = express();

app.set('view engine','ejs')
app.use(express.urlencoded())

app.use('/',require('./routes/index'))

app.use('/uploads',express.static(path.join(__dirname,'uploads')))




app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }

  console.log("Server start at port :- ", port);
});