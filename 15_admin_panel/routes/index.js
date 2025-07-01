const express = require('express');
const admin = require('../models/admin')

const routes = express.Router();

console.log("Routing...")



const adminCtl = require('../controllers/adminController')

routes.get('/',adminCtl.dashbord);
routes.get('/add_admin',adminCtl.add_admin);
routes.get('/view_admin',adminCtl.view_admin);


routes.post('/insertAdminData',admin.upload, adminCtl.insertData)

module.exports = routes;