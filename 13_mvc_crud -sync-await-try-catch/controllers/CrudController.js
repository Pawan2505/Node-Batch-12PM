const adminTbl = require("../models/adminTbl");
const fs = require("fs");
const path = require("path");

// GET: Display all records
const index = async (req, res) => {
  try {
    let allRecord = await adminTbl.find({});
    res.render("home", { record: allRecord });
  } catch (err) {
    console.error("Error fetching records:", err);
    res.render("404");
  }
};

// POST: Add a new record
const adddata = async (req, res) => {
  const { name, email, phone, gender, hobby, password, city } = req.body;
  const image = req.file ? req.file.path : "";

  try {
    await adminTbl.create({
      name,
      email,
      phone,
      gender,
      hobby,
      password,
      city,
      image,
    });
    console.log("Record added successfully.");
    res.redirect("/");
  } catch (err) {
    console.error("Error adding record:", err);
    res.render("404");
  }
};

// GET: Load edit form with data
const editdata = async (req, res) => {
  const id = req.query.id;

  try {
    const singleData = await adminTbl.findById(id);
    res.render("editPage", { singleData });
  } catch (err) {
    console.error("Error loading edit data:", err);
    res.render("404");
  }
};

// POST: Update a record
const updateData = async (req, res) => {
  const id = req.query.id;
  const { name, email, phone, gender, hobby, password, city } = req.body;

  try {
    let oldData = await adminTbl.findById(id);

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
      image: req.file ? req.file.path : oldData.image,
    };

    await adminTbl.findByIdAndUpdate(id, updatedData);
    console.log("Record updated successfully.");
    return res.redirect("/");
  } catch (err) {
    console.error("Error updating record:", err);
    res.render("404");
  }
};

// GET: Delete a record
const delData = async (req, res) => {
  const id = req.query.id;

  try {
    let deleted = await adminTbl.findByIdAndDelete(id);
    if (deleted?.image) {
      fs.unlinkSync(deleted.image);
    }
    console.log("Record deleted successfully.");
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting record:", err);
    res.render("404");
  }
};

module.exports = {
  index,
  adddata,
  editdata,
  updateData,
  delData,
};
