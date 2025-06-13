const express = require("express");
const db = require("./config/db");
const adminTbl = require("./models/adminTbl");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// file upload start

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const Imageupload = multer({ storage: fileStorage }).single("image")


// file upload end


app.get("/editData", (req, res) => {
  const id = req.query.id;
  adminTbl
    .findById(id)
    .then((singleData) => {
      console.log(singleData);

      return res.render("editPage", { singleData });
    })
    .catch((err) => {
      console.log(err);
      return res.render("404");
    });
});

app.get("/deleteData", (req, res) => {
  const id = req.query.id;
  // console.log(id)
  adminTbl
    .findByIdAndDelete(id)
    .then((delData) => {
      console.log("Data deleted successfully...", delData);
      fs.unlinkSync(delData.image); 
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      return res.render("404");
    });
});
app.post("/insertData", Imageupload, (req, res) => {
  let editedId = req.query.id;
  // console.log(editedId)

  const { name, email, phone, gender, hobby, password, city } = req.body;

  if (editedId) {
    console.log(req.file);
    if (req.file){
      adminTbl.findById(editedId).then((oldImage) => {
        fs.unlinkSync(oldImage.image);
        let image = req.file.path; 

          adminTbl.findByIdAndUpdate(editedId, {
              name: name,
              email: email,
              phone: phone,
              gender: gender,
              hobby: hobby,
              password: password,
              city: city,
              image: image,
            })
            .then((success) => {
              console.log("Record edited successfully...");
              return res.redirect("/");
            })
            .catch((err) => {
              console.log(err);
              return false;
            });
        }).catch((err)=>{
            console.log(err);
            return false;
        })
        
    } else {
      console.log("old image");
    }
  } else {
    // console.log(req.file)

    let image = "";
    if (req.file) {
      image = req.file.path;
    }

    adminTbl.create({
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      hobby: hobby,
      password: password,
      city: city,
      image: image,
    });
    return res.redirect("/");
  }
});

app.get("/", (req, res) => {
  adminTbl
    .find({})
    .then((allData) => {
      return res.render("home", {
        record: allData,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("404");
    });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }

  console.log("Server start at port :- ", port);
});
