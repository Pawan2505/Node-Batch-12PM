const express = require('express');
const db = require('./config/db')
const adminTbl = require('./models/adminTbl')
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded())

app.post('/insertData',(req,res)=>{

    const {name, email,phone, gender, hobby, password, city} = req.body;

    adminTbl.create({
        name: name,
        email:email,
        phone:phone,
        gender:gender,
        hobby:hobby,
        password:password,
        city:city
    })


    // console.log(req.body);

    return res.redirect('/');
})

app.get('/',(req,res)=>{
    return res.render('home')
})


app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }

    console.log("Server start at port :- ",port);
})