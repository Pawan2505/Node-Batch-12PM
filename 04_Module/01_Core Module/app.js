// const fs = require('fs');

// fs.readFile('test.txt','utf8', (err,result)=>{
//     if(err){
//         console.log('File does not exist!');
//         return false;
//     }

//     console.log(result);
// })


const http = require('http');

const port = 8080;

const requestHandle = (req, res)=>{
        res.write("<h1>This is http server</h1>");
        res.end();

        console.log(req.url);
}

const server = http.createServer(requestHandle);

server.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }

    console.log("Server started at port :- ",port);
})