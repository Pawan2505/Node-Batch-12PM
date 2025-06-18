const express = require('express');

const routes = express.Router();

console.log("Routing...")

const aboutcontroller = require('../controllers/AboutController')
const admincontroller = require('../controllers/AdminController')
const homecontroller = require('../controllers/HomeController')
const productcontroller = require('../controllers/ProductController')


routes.get('/',homecontroller.index)
routes.get('/about', aboutcontroller.index)
routes.get('/admin',admincontroller.index)
routes.get('/product',productcontroller.index)

module.exports = routes;