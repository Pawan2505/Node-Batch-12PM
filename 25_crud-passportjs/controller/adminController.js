const Admin = require('../models/admin');

// Render signup page
module.exports.signupPage = (req, res) => {
    res.render('signup');
};

// Handle signup
module.exports.signup = async (req, res) => {
    try {
        console.log(req.body);
        const newAdmin = await Admin.create(req.body); 
        return res.redirect('/loginPage');
    } catch (err) {
        console.error(err);
        return res.redirect('/signup');
    }
};

// Render login page
module.exports.loginPage = (req, res) => {
    res.render('login');
};

// Handle login
module.exports.checkLogin = (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Login successful for:", req.user.username);
    return res.redirect("home");
  } else {
    console.log("Login failed.");
    return res.redirect("/loginPage");
  }
};

module.exports.home = async (req, res) => {
  try {
    return res.render("home", {
      user: req.user, // Pass the authenticated user to the view
    });
  } catch (error) {
    console.log("Error:", error.message);
    return res.redirect("back");
  }
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("Logout error:", err.message);
    }
    return res.render("login");
  });
};
