const express = require('express');


const routes = express.Router();

console.log("Routing...")



const adminCtl = require('../controllers/adminController')

routes.get('/',adminCtl.dashbord);

module.exports = routes;