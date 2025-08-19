const categoryModel = require('../models/category');


module.exports.addCategory = (req, res) => {
  return res.render("add_category", { user: req.user });
};

module.exports.insertCategoryData = async(req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    let image =''
    if(req.file) {
      image = categoryModel.adPath + '/' + req.file.filename;
    }
    req.body.avatar = image;

    let categoryAdd = await categoryModel.create(req.body);
    if(categoryAdd) {
     req.flash("success", "Category Added Successfully");
     return res.redirect('/category/addCategory');
    }else{
      req.flash("error", "Category Not Added");
      return res.redirect('/category/addCategory');
    }

  } catch (err) {
    console.log(err);
    return res.render("back");
  }
};

exports.viewCategory = async (req, res) => {
  try {
    let categories = await categoryModel.find();
    return res.render("view_category", { categories });
  } catch (error) {
    console.log("Somthing Wrong ===> ", error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};