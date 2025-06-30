const express = require('express');


const routes = express.Router();

console.log("Routing...")



const adminCtl = require('../controllers/adminController')

routes.get('/',adminCtl.dashbord);
routes.get('/add_admin',adminCtl.add_admin);
routes.get('/view_admin',adminCtl.view_admin);

module.exports = routes;