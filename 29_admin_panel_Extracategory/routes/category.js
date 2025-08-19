const express = require('express');

const routes = express.Router();

const categoryController = require('../controllers/categoryController');
const categoryModel = require('../models/category');

routes.get('/addCategory', categoryController.addCategory);
routes.post('/insertCategoryData', categoryModel.uploadCategoryImage, categoryController.insertCategoryData);
routes.get('/viewCategory', categoryController.viewCategory);

module.exports = routes;