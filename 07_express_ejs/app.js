const express = require('express');
const path = require('path');

const port = 8001;

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
// console.log(__dirname);
// console.log(path.join(__dirname,'views'))

app.use(express.urlencoded());

let num = 100;

let data =[
    {
    username:'Pawan',
    age:25
},
    {
    username:'Manish',
    age:22
}
]

app.get('/',(re,res)=>{
    // res.end("<h1>This is express!</h1>");

    return res.render('home',{num,data});
})

app.listen(port, (err)=>{
    if(err){
        console.log(err)
        return false;
    }

    console.log("Server started at port :- ",port);
})