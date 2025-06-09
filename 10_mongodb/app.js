const express = require('express');
const db = require('./config/db')
const adminTbl = require('./models/adminTbl')
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded())


app.get('/deleteData', (req,res)=>{
    const id = req.query.id;
    // console.log(id)

    adminTbl.findByIdAndDelete(id).then((delData)=>{
        console.log("Data deleted successfully...",delData);
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return res.render('404');
    })
})

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

    adminTbl.find({}).then((allData)=>{
        return res.render('home',{
            record:allData
        })
    }).catch((err)=>{
        console.log(err);
        return res.render('404');
    })
   
})


app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }

    console.log("Server start at port :- ",port);
})