const Admin = require("../models/admin");
const path = require("path");
const fs = require("fs");

module.exports.dashbord = (req, res) => {
  return res.render("dashboard");
};

module.exports.add_admin = (req, res) => {
  return res.render("add_admin");
};

module.exports.view_admin = async (req, res) => {
  try {
    const admins = await Admin.find({});
    return res.render("view_admin", { adminRecord: admins });
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

module.exports.deleteData = async (req, res) => {
  try {
    let id = req.params.id;
    console.log("ID to delete:", id);

    let adminData = await Admin.findById(id);

    if (adminData) {
      // Delete avatar file
      let imgPath = path.join(__dirname, "..", adminData.avatar);
      console.log("Deleting file:", imgPath);

      try {
        fs.unlinkSync(imgPath);
      } catch (err) {
        console.log("Image delete failed or already removed:", err.message);
      }

      // Delete admin record
      await Admin.findByIdAndDelete(id);
      console.log("Admin deleted successfully");
      return res.redirect("/view_admin");
    } else {
      console.log("Admin not found");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error in deleting admin: ", error.message);
    return res.redirect("back");
  }
};

module.exports.editData = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);

    let editRecord = await Admin.findById(id);
    console.log(editRecord);

    return res.render("edit_admin", { adminData: editRecord });
  } catch (error) {
    console.log(error);
    return res.redirect("/editData");
  }
};


module.exports.updateData = async (req, res) => {
  try {
    const id = req.params.id;
    let oldAdmin = await Admin.findById(id);

    if (!oldAdmin) {
      console.log("Admin not found");
      return res.redirect("back");
    }

    // Update name from fname and lname
    req.body.name = req.body.fname + " " + req.body.lname;

    // If new file uploaded, replace avatar
    if (req.file) {
      // Delete old avatar file
      let oldPath = path.join(__dirname, "..", oldAdmin.avatar);
      try {
        fs.unlinkSync(oldPath);
        console.log("Old image deleted");
      } catch (err) {
        console.log("Image delete error:", err.message);
      }

      // Update with new avatar path
      req.body.avatar = Admin.adPath + "/" + req.file.filename;
    } else {
      // Keep the old avatar
      req.body.avatar = oldAdmin.avatar;
    }

    await Admin.findByIdAndUpdate(id, req.body);

    console.log("Admin updated successfully");
    return res.redirect("/view_admin");
  } catch (error) {
    console.log("Error updating admin:", error.message);
    return res.redirect("back");
  }
};

