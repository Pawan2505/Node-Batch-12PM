const express = require('express');
const admin = require('../models/admin')
const {checkAdminAuth} = require('../middleware/auth')

const routes = express.Router();

console.log("Routing...")



const adminCtl = require('../controllers/adminController')

routes.post("/checkLogin",adminCtl.checkLogin)

routes.get('/',adminCtl.SignIn);


routes.get('/dashbord',checkAdminAuth,adminCtl.dashbord);
routes.get('/add_admin',checkAdminAuth,adminCtl.add_admin);
routes.get('/view_admin',checkAdminAuth,adminCtl.view_admin);


routes.post('/insertAdminData',checkAdminAuth,admin.upload, adminCtl.insertData)
routes.get('/deleteAdmin/:id',checkAdminAuth,adminCtl.deleteData);
routes.get('/editAdmin/:id',checkAdminAuth, adminCtl.editData);
routes.post('/updateAdminData/:id',checkAdminAuth,admin.upload, adminCtl.updateData);
module.exports = routes;