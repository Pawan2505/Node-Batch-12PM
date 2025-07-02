const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path');


const imgPath = "/uploads/AdminImage";


const AdminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    Gender:{
        type:String,
        required:true
    },
    hobby:{
        type:Array,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:false,
    }
})


const Filestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"..",imgPath))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

AdminSchema.statics.upload = multer({ storage: Filestorage }).single("avatar");

AdminSchema.statics.adPath = imgPath;

const admin = mongoose.model('admin',AdminSchema)

module.exports = admin;