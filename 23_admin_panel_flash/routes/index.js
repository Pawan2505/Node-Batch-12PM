const express = require('express');
const admin = require('../models/admin');
const adminCtl = require('../controllers/adminController');


// Correctly importing customized passport with checkauthentication
const passport = require('passport');

const routes = express.Router();
console.log("Routing...");

// Public Routes
routes.get('/', adminCtl.SignIn);
routes.post('/checkLogin', passport.authenticate('local', {
  failureRedirect: '/', 
  failureFlash: true
}), adminCtl.checkLogin);
routes.get('/changePassword', adminCtl.changePassword);
routes.post('/checkChangePassword', adminCtl.checkChangePassword);
routes.get('/profile', passport.checkauthentication, adminCtl.profile);

// Forget password routes
routes.get("/verifyEmail", adminCtl.verifyEmail);
routes.post("/checkemailforget", adminCtl.checkemailforget);
routes.get("/otp_page", adminCtl.otp_page);
routes.post("/verifyOTP", adminCtl.verifyOTP);
routes.get("/addNewPassword", adminCtl.addNewPassword);
routes.post("/updatePassword", adminCtl.updatePassword);

// Protected Routes (admin only)
routes.get('/dashboard', passport.checkauthentication, adminCtl.dashboard);
routes.get('/add_admin', passport.checkauthentication, adminCtl.add_admin);
routes.get('/view_admin', passport.checkauthentication, adminCtl.view_admin);
routes.post('/insertAdminData', passport.checkauthentication, admin.upload, adminCtl.insertData);
routes.get('/deleteAdmin/:id', passport.checkauthentication, adminCtl.deleteData);
routes.get('/editAdmin/:id', passport.checkauthentication, adminCtl.editData);
routes.post('/updateAdminData/:id', passport.checkauthentication, admin.upload, adminCtl.updateData);

// Logout
routes.get('/logout', adminCtl.logout);

module.exports = routes;
