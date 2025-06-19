const express = require('express')
const multer = require('multer')

const routes = express.Router();

const crudcontroller = require('../controllers/CrudController')

console.log("Routing...")

// file start

const filestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const Imageupload = multer({ storage: filestorage }).single('image')


// file end




routes.get('/',crudcontroller.index)
routes.post('/insertData', Imageupload, crudcontroller.adddata)
routes.post('/updatedData', Imageupload, crudcontroller.updateData)
routes.get('/editData', crudcontroller.editdata)

module.exports = routes;