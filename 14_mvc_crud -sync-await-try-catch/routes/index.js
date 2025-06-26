const express = require("express");
const multer = require("multer");
const crudcontroller = require("../controllers/CrudController");

const routes = express.Router();

// Multer configuration for file upload
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const uploadImage = multer({ storage: fileStorage }).single("image");

// Logging route init
console.log("Routing initialized...");

// CRUD Routes
routes.get("/", crudcontroller.index);
routes.post("/insertData", uploadImage, crudcontroller.adddata);
routes.post("/updateData", uploadImage, crudcontroller.updateData); 
routes.get("/editData", crudcontroller.editdata);
routes.get("/deleteData", crudcontroller.delData);

module.exports = routes;
