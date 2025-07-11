const Admin = require("../models/admin");
const path = require("path");
const fs = require("fs");


module.exports.changePassword = (req, res) => {
  try {
    console.log("Rendering change password page...");
    let singleAdmin = req.cookies.adminId;
    if (!singleAdmin) {
      return res.redirect("/");
    }

    return res.render("changePassword", { singleAdmin });
  } catch (error) {
    console.log("Error in changePassword:", error.message);
    return res.redirect("back");
  }
};

module.exports.checkChangePassword = async (req, res) => {
  try {
    let oldPass = req.cookies.adminId.password;

    if (oldPass == req.body.currentPass) {
      if (req.body.currentPass != req.body.newPass) {
        if (req.body.newPass == req.body.confirmPass) {
          let adminId = req.cookies.adminId._id;
          await Admin.findByIdAndUpdate(adminId, {
            password: req.body.newPass,
          });
          res.clearCookie("adminId");
          return res.redirect("/");
        } else {
          console.log("New password and confirm password do not match");
          return res.redirect("/changePassword");
        }
      } else {
        console.log("current password cannot be the same as old password");
        return res.redirect("back");
      }
    }
  } catch (error) {
    console.log("Error in checkChangePassword:", error.message);
    return res.redirect("back");
  }
};


module.exports.logout = (req,res)=>{
  res.clearCookie("adminId");
  return res.render('SignIn');
}

module.exports.checkLogin = async(req,res)=>{
     try{
      console.log("Checking login credentials...");
      let checkEmail = await Admin.findOne({ email: req.body.email });
      console.log(checkEmail);
      if(!checkEmail) {
        console.log("Email not found");
        return res.redirect("back");
      } else {  
        console.log("Email found:", checkEmail.email);
        // Check if password matches
        if (checkEmail.password === req.body.password) {
          console.log("Password matched");
          // Set cookie with admin ID
          res.cookie("adminId", checkEmail, { maxAge: 24 * 60 * 60 * 1000 }); // 1 day expiry
          return res.redirect("/dashboard");
        }
        else {
          console.log("Password did not match");
          return res.redirect("back");
        }
      }

    }catch(error){
      console.log("Error in checkLogin:", error.message);
      return res.redirect("back");
    }
}


module.exports.SignIn = (req, res)=>{

  return res.render("SignIn")
}

module.exports.dashboard = (req, res) => {
  // res.cookie('data','Pawan')
   let singleAdmin = req.cookies.adminId;
  return res.render("dashboard",{singleAdmin});
};

module.exports.add_admin = (req, res) => {
  console.log(req.cookies);
    let singleAdmin = req.cookies.adminId;
  return res.render("add_admin",{singleAdmin});
};

module.exports.view_admin = async (req, res) => {
  try {
    const admins = await Admin.find({});
      let singleAdmin = req.cookies.adminId;
    return res.render("view_admin", { adminRecord: admins,singleAdmin });
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
      req.body.avatar = Admin.adPath + "/" + req.file.filen;
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

