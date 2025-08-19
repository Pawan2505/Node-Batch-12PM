const express = require('express');
const { addSubCategoryPage, addSubCategory, viewSubCategory, deleteSubCategory, editSubCategoryPage, updateSubCategory } = require('../controllers/subCategory.controller');

const routes = express.Router();

routes.get("/add_subcategory", addSubCategoryPage);
routes.post("/add_subcategory", addSubCategory);
routes.get("/view_subcategory", viewSubCategory);

routes.get("/delete_subcategory/:id", deleteSubCategory);
routes.get("/edit_subcategory/:id", editSubCategoryPage);
routes.post("/update_subcategory/:id", updateSubCategory);


module.exports = routes;