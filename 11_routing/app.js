const express = require('express')

const port = 8080

const app = express()

app.set('view engine', 'ejs')

app.use('/', require('./routers/index'))


app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server start on port : ",port)
})