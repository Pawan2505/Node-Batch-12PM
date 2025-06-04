const express = require('express');
const path = require('path')

const port = 8000;

const app = express();

app.set('view engine', 'ejs');

app.use('/',express.static(path.join(__dirname,'/assets')));

// app.use()

app.get('/',function(req,res,next){
    console.log(req);
    req.username = "Pawan";
    req.age = 25;

    if(req.age >=18){
        next();
    }else{
        return res.render('404');
    }
},(req,res)=>{

    return res.render('home',{
        username :req.username,
        age: req.age
    })
})


app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server started at port :- ", port);
})