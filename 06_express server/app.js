const express = require('express');

const fs = require('fs');

const port = 8001;

const app = express();


app.get('/',(req,res)=>{
    // res.end("This is express server!");
    fs.readFile('./views/home.html',(err,result)=>{
        if(err){
            console.log(err);
            return false;
        }

        res.end(result);
    })
})

app.get('/about',(req,res)=>{
    // res.end("This is About Page!");

    fs.readFile('./views/about.html',(err,result)=>{
         if(err){
            console.log(err);
            return false;
        }

        res.end(result);
    })
})

app.get('/*"*"',(req,res)=>{
    // res.end("Page not found");
     fs.readFile('./views/error.html',(err,result)=>{
         if(err){
            console.log(err);
            return false;
        }

        res.end(result);
    })
})


app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }

    console.log("Server started at port :- ",port);
})