const Category = require("../models/category");
const SubCategory = require("../models/subCategory.model");

module.exports.viewSubCategory = async (req, res) => {
  try {
    let subCategories = await SubCategory.find().populate("category");

    return res.render("view_subCategory", { subCategories });
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};
exports.addSubCategoryPage = async (req, res) => {
  try {
    let categories = await Category.find();
    return res.render("add_subcategory", { categories });
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    // console.log(req.body);
    const subCate = await SubCategory.create(req.body);
    req.flash("success", "Subcategory Added!!!");
    return res.redirect("/subcategory/add_subcategory");
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let subCategory = await SubCategory.findById(id);

    if (subCategory) {
      await SubCategory.findByIdAndDelete(id);
      // await ExtraCategory.deleteMany({subCategoryId: id})
      req.flash("success", "Delete SubCategory Success...");
      return res.redirect("/subcategory/view_subcategory");
    } else {
      req.flash("error", "SubCategory is not Found...");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};

exports.editSubCategoryPage = async (req, res) => {
  try {
    let id = req.params.id;
    let subCategory = await SubCategory.findById(id);
    if (subCategory) {
      let categories = await Category.find();
      console.log("yaha tak pahuch gya data");
      return res.render("edit_subCategory", { categories, subCategory });
    } else {
      req.flash("error", "SubCategory is not Found...");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let subcategory = await SubCategory.findById(id);
    if(subcategory){
      await SubCategory.findByIdAndUpdate(id, req.body, {new: true});
      req.flash("success", "SubCategory is updated");
      return res.redirect("/subcategory/view_subcategory");
    }else {
      req.flash("error", "SubCategory is not Found...");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
}
