const Admin = require('../models/admin')
const path = require("path");
const fs = require("fs");

module.exports.dashbord = (req,res)=>{
    return res.render('dashboard')
}

module.exports.add_admin = (req,res)=>{
    return res.render('add_admin')
}
module.exports.view_admin = (req,res)=>{
    return res.render('view_admin')
}
module.exports.insertData = async(req,res)=>{
    
    // req.body.name = req.body.fname + " " + req.body.lname;
    // console.log(req.body);
    // return res.redirect("/add_admin");
    try{
 
    req.body.name = req.body.fname + " " + req.body.lname;

    // req.body.avatar = "";

    // if (req.file) {
    //   req.body.avatar = Admin.adPath + "/" + req.file.filename;
    // }

    let adminRecord = await Admin.create(req.body);
    if(adminRecord){
        console.log("Admin Record Inserted Successfully");
        return res.redirect("/add_admin");
    }else{
        console.log("error")
    return res.redirect("back");
    }
    }catch(err){
        console.log(err);
    }
}
