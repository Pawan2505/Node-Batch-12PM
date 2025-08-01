const Admin = require("../models/admin");
const path = require("path");
const fs = require("fs");

const nodemailer = require("nodemailer");
const e = require("express");

const flash = require("connect-flash");

module.exports.profile = async (req, res) => {
  try {
    return res.render("profile");
  } catch (error) {
    console.log("Error in profile:", error.message);
    return res.redirect("back");
  }
};

module.exports.changePassword = (req, res) => {
  try {
    return res.render("changePassword", { user: req.user });
  } catch (error) {
    console.log("Error in changePassword:", error.message);
    return res.redirect("back");
  }
};

module.exports.checkChangePassword = async (req, res) => {
  try {
    const adminData = await Admin.findById(req.user._id);
    if (adminData.password === req.body.currentPass) {
      if (req.body.currentPass !== req.body.newPass) {
        if (req.body.newPass === req.body.confirmPass) {
          await Admin.findByIdAndUpdate(req.user._id, {
            password: req.body.newPass,
          });
          return res.redirect("/");
        } else {
          console.log("New password and confirm password do not match");
          return res.redirect("/changePassword");
        }
      } else {
        console.log("Current and new passwords cannot be the same");
        return res.redirect("back");
      }
    } else {
      console.log("Current password is incorrect");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error in checkChangePassword:", error.message);
    return res.redirect("back");
  }
};


module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash("error", "Error during logout");
      console.log("Logout error:", err.message);
    }
    req.flash("success", "You have been logged out");
    return res.render("SignIn");
  });
};

module.exports.SignIn = (req, res) => {
  try{
    if (req.isAuthenticated()) {
      req.flash("info", "You are already logged in");
      return res.redirect("/dashboard");
    }
    else {
      return res.render("SignIn");
    }
  }catch (error) {
    console.log("Error in SignIn:", error.message);
    req.flash("error", "Something went wrong while loading SignIn page");
    return res.render("SignIn");
  }
};

module.exports.checkLogin = async (req, res) => {
  try {
    console.log("Checking login credentials...");
    // check krna hai ki passport ne user ko authenticate kiya hai ya nahi
    req.flash("success", "Login successful");
    // console.log("User authenticated:", req.user);
    return res.redirect("/dashboard");
  } catch (error) {
    console.log("Error in checkLogin:", error.message);
    return res.redirect("back");
  }
};

module.exports.dashboard = async (req, res) => {
  try {
    return res.render("dashboard", {
      user: req.user, // Pass the authenticated user to the view
    });
  } catch (error) {
    console.log("Error:", error.message);
     req.flash("error", "Unable to load dashboard");
    return res.redirect("back");
  }
};

module.exports.add_admin = async (req, res) => {
  try {
    // req.flash("success", "You can add new admin here");
    return res.render("add_admin", {
      user: req.user,
    });
  } catch (error) {
    console.log("Error in add_admin:", error.message);
    req.flash("error", "Failed to load Add Admin page");
    return res.redirect("back");
  }
};

module.exports.view_admin = async (req, res) => {
  try {
    const admins = await Admin.find({});
    // req.flash("success", "Here are the admin records");
    return res.render("view_admin", {
      adminRecord: admins,
      user: req.user,
    });
  } catch (err) {
    console.log("Error fetching admins:", err.message);
    req.flash("error", "Failed to fetch admin records");
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
      req.flash("success", "Admin added successfully");
      return res.redirect("/add_admin");
    } else {
      console.log("Error in Inserting Admin Record!");
      req.flash("error", "Error in adding admin");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in Inserting Admin Record: ", err);
    req.flash('error','Something worng!')
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
      req.flash("success", "Admin deleted successfully");
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
    res.cookie("adminId", req.body);
    await Admin.findByIdAndUpdate(id, req.body);

    console.log("Admin updated successfully");
    return res.redirect("/view_admin");
  } catch (error) {
    console.log("Error updating admin:", error.message);
    return res.redirect("back");
  }
};

module.exports.verifyEmail = (req, res) => {
  try {
    return res.render("forget_password/verifyEmail");
  } catch (error) {
    console.log("Error rendering verifyEmail:", error.message);
    return res.redirect("back");
  }
};

module.exports.checkemailforget = async (req, res) => {
  try {
    // console.log(req.body);
    let checkEmail = await Admin.findOne({ email: req.body.email });
    if (checkEmail) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "pawanaktu@gmail.com",
          pass: "tgxcbsrywypdamcl",
        },
      });

      let OTP = Math.floor(100000 + Math.random() * 900000);
      console.log("Generated OTP:", OTP);
      res.cookie("adminOtp", OTP, { maxAge: 5 * 60 * 1000 }); // Store OTP in cookie for 5 minutes
      res.cookie("adminEmail", req.body.email, { maxAge: 5 * 60 * 1000 }); // Store email in cookie for 5 minutes
      const info = await transporter.sendMail({
        from: "<pawanaktu@gmail.com>",
        to: req.body.email,
        subject: "OTP for Password Reset",
        text: "Your OTP", // plain‑text body
        html: `<b>Your OTP is Below : ${OTP}</b>
        <p>This is your OTP for password reset</p>`, // HTML body
      });

      if (info.messageId) {
        console.log("Email sent successfully:", info.messageId);
        return res.redirect("/otp_page");
      } else {
        console.log("Failed to send email");
        return res.redirect("back");
      }
    }
  } catch (error) {
    console.log("Error in checkemailforget:", error.message);
    return res.redirect("back");
  }
};

module.exports.otp_page = async (req, res) => {
  try {
    return res.render("forget_password/otp_page");
  } catch (error) {
    console.log("Error in otp_page:", error.message);
    return res.redirect("back");
  }
};

module.exports.verifyOTP = async (req, res) => {
  try {
    console.log("Verifying OTP:", req.body.adminOtp);
    console.log("Stored OTP:", req.cookies.adminOtp);
    if (req.body.adminOtp === req.cookies.adminOtp) {
      console.log("OTP verified successfully");
      return res.redirect("/addNewPassword");
    } else {
      console.log("Invalid OTP");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error in verifyOTP:", error.message);
    return res.redirect("back");
  }
};

module.exports.addNewPassword = async (req, res) => {
  try {
    return res.render("forget_password/addNewPassword");
  } catch (error) {
    console.log("Error in addNewPassword:", error.message);
    return res.redirect("back");
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.npass === req.body.cpass) {
      let email = req.cookies.adminEmail;
      console.log("Updating password for email:", email);
      await Admin.findOneAndUpdate(
        { email: email },
        { password: req.body.npass }
      );
      console.log("Password updated successfully");
      res.clearCookie("adminOtp");
      res.clearCookie("adminEmail");
      return res.redirect("/");
    }
  } catch (error) {
    console.log("Error in updatePassword:", error.message);
    return res.redirect("back");
  }
};
