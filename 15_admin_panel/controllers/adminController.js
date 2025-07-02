const Admin = require('../models/admin');
const path = require('path');

module.exports.dashbord = (req, res) => {
  return res.render('dashboard');
};

module.exports.add_admin = (req, res) => {
  return res.render('add_admin');
};

module.exports.view_admin = async (req, res) => {
  try {
    const admins = await Admin.find({});
    return res.render('view_admin', { admins });
  } catch (err) {
    console.log("Error fetching admins:", err);
    return res.redirect("back");
  }
};

module.exports.insertData = async (req, res) => {
  try {
    req.body.name = req.body.fname + " " + req.body.lname;
    req.body.avatar = "";

    if (req.file) {
      req.body.avatar = Admin.adPath + "/" + req.file.filename;
    }

    let adminRecord = await Admin.create(req.body);

    if (adminRecord) {
      console.log("Admin Record Inserted");
      return res.redirect("/add_admin");
    } else {
      console.log("Error in Inserting Admin Record!");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in Inserting Admin Record: ", err);
    return res.redirect("back");
  }
};
