
module.exports.checkAdminAuth = (req, res, next) => {
  if (req.cookies && req.cookies.adminId) {
    return next(); 
  } else {
    return res.redirect("/signin");
  }
};