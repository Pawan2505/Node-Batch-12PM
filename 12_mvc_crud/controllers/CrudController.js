const adminTbl = require("../models/adminTbl");
const fs = require("fs");
const path = require("path");

const index = (req, res) => {
  adminTbl.find({}).then((allRecord) => {
    console.log("record created successfully...");
    return res.render("home", {
      record: allRecord,
    });
  });
};

const updateData = (req, res) => {
  let id = req.query.id;
  const { name, email, phone, gender, hobby, password, city } = req.body;
  let image = "";
  adminTbl
    .findById(id)
    .then((oldImage) => {
      fs.unlinkSync(oldImage.image);
      image = req.file.path;

      adminTbl
        .findByIdAndUpdate(id, {
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
          console.log("data updated successfully...");
          return res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
          return res.render("404");
        });
    })
    .catch((err) => {
      console.log(err);
      return res.render("404");
    });
};

const editdata = (req, res) => {
  let id = req.query.id;

  adminTbl.findById(id).then((singleData) => {
    return res.render("editPage", { singleData });
  });
};

const adddata = (req, res) => {
  const { name, email, phone, gender, hobby, password, city } = req.body;

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
};

module.exports = {
  index,
  adddata,
  editdata,
  updateData,
};
