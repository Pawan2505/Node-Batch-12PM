const http = require('http');

const fs = require('fs');

const port = 8080;

const requesthandle = (req,res)=>{
    // res.write("<h1>Hello Class</h1>")
    // res.end();

    // console.log(req.url);

    let fileName = "";

    switch(req.url){

        case '/':
            fileName = 'home.html';
            break;
        case '/about':
            fileName = 'about.html';
            break;
        default :
            fileName = 'errors.html';
    }

    fs.readFile(`./views/${fileName}`, (err,result)=>{
        if(!err){
           res.end(result);
        }
       
    })



}

const server = http.createServer(requesthandle);

server.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }

    console.log("Server started at port :- ", port);
})