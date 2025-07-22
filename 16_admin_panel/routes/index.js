const express = require('express');
const admin = require('../models/admin')
const {checkAdminAuth} = require('../middleware/auth')

const routes = express.Router();

console.log("Routing...")



const adminCtl = require('../controllers/adminController')



// forget password routing


routes.get("/verifyEmail", adminCtl.verifyEmail)
routes.post("/checkemailforget", adminCtl.checkemailforget)
routes.get("/otp_page", adminCtl.otp_page)
routes.post("/verifyOTP", adminCtl.verifyOTP)
routes.get("/addNewPassword", adminCtl.addNewPassword)
routes.post("/updatePassword", adminCtl.updatePassword) 




routes.post('/checkChangePassword',checkAdminAuth,adminCtl.checkChangePassword)

routes.get('/changePassword',checkAdminAuth,adminCtl.changePassword)

routes.get('/logout', adminCtl.logout)

routes.post("/checkLogin",adminCtl.checkLogin)

routes.get('/',adminCtl.SignIn);




routes.get('/dashboard',checkAdminAuth,adminCtl.dashboard);
routes.get('/add_admin',checkAdminAuth,adminCtl.add_admin);
routes.get('/view_admin',checkAdminAuth,adminCtl.view_admin);


routes.post('/insertAdminData',checkAdminAuth,admin.upload, adminCtl.insertData)
routes.get('/deleteAdmin/:id',checkAdminAuth,adminCtl.deleteData);
routes.get('/editAdmin/:id',checkAdminAuth, adminCtl.editData);
routes.post('/updateAdminData/:id',checkAdminAuth,admin.upload, adminCtl.updateData);
module.exports = routes;