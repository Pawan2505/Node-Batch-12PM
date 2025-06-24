const adminTbl = require("../models/adminTbl");
const fs = require("fs");
const path = require("path");

// GET: Display all records
const index = (req, res) => {
  adminTbl.find({})
    .then((allRecord) => {
      console.log("Records fetched successfully.");
      res.render("home", { record: allRecord });
    })
    .catch((err) => {
      console.error("Error fetching records:", err);
      res.render("404");
    });
};

// POST: Add a new record
const adddata = (req, res) => {
  const { name, email, phone, gender, hobby, password, city } = req.body;
  const image = req.file ? req.file.path : "";

  adminTbl.create({
    name,
    email,
    phone,
    gender,
    hobby,
    password,
    city,
    image
  })
    .then(() => {
      console.log("Record added successfully.");
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error adding record:", err);
      res.render("404");
    });
};

// GET: Load edit form with data
const editdata = (req, res) => {
  const id = req.query.id;

  adminTbl.findById(id)
    .then((singleData) => {
      res.render("editPage", { singleData });
    })
    .catch((err) => {
      console.error("Error loading edit data:", err);
      res.render("404");
    });
};

// POST: Update a record
const updateData = (req, res) => {
  const id = req.query.id;
  const { name, email, phone, gender, hobby, password, city } = req.body;

  adminTbl.findById(id)
    .then((oldData) => {
      if (req.file && oldData.image) {
        fs.unlinkSync(oldData.image); // delete old image
      }

      const updatedData = {
        name,
        email,
        phone,
        gender,
        hobby,
        password,
        city,
        image: req.file ? req.file.path : oldData.image
      };

      return adminTbl.findByIdAndUpdate(id, updatedData);
    })
    .then(() => {
      console.log("Record updated successfully.");
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error updating record:", err);
      res.render("404");
    });
};

// GET: Delete a record
const delData = (req, res) => {
  const id = req.query.id;

  adminTbl.findByIdAndDelete(id)
    .then((deleted) => {
      if (deleted?.image) {
        fs.unlinkSync(deleted.image);
      }
      console.log("Record deleted successfully.");
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error deleting record:", err);
      res.render("404");
    });
};

module.exports = {
  index,
  adddata,
  editdata,
  updateData,
  delData
};
