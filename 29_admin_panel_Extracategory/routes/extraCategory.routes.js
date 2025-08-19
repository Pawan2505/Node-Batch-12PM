const express = require('express');
const { extraCategoryPage, extraCategory, deleteExtraCategory, editExtraCategory, viewExtraCategory, updateExtraCategory } = require('../controllers/extraCategory.controller');

const routes = express.Router();

routes.get("/add_extracategory", extraCategoryPage);
routes.post("/add_extracategory", extraCategory);
routes.get("/view_extracategory", viewExtraCategory);
routes.get("/delete_extracategory/:id", deleteExtraCategory);
routes.get("/edit_extracategory/:id", editExtraCategory);
routes.post("/update_extracategory/:id", updateExtraCategory);

module.exports = routes;