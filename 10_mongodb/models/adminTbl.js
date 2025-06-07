const mongoose = require('mongoose');

const adminTbl=  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    hobby:{
        type:Array,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
})


let admin = mongoose.model('admin',adminTbl);

module.exports = admin;



