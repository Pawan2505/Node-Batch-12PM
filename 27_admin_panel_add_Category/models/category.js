const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imagePath = '/uploads/CategoryImage';


const CategorySchema = mongoose.Schema({
    category:{
        type:String,
        required:true
    },

    avatar:{
        type:String,
        required:true
    }
});

const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"..",imagePath))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

CategorySchema.statics.uploadCategoryImage = multer({ storage: categoryStorage }).single('avatar');
CategorySchema.statics.adPath = imagePath;

const Category = mongoose.model('Category',CategorySchema);

module.exports = Category;