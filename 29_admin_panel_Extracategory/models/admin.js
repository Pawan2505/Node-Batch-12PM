const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imagePath = '/uploads/AdminImage';


const AdminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    hobby:{
        type:Array,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:true
    }
});

const Filestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"..",imagePath))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

AdminSchema.statics.upload = multer({ storage: Filestorage }).single('avatar');
AdminSchema.statics.adPath = imagePath;

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;