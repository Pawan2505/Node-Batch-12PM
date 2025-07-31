const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/admin.js");

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await Admin.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // You need to implement verifyPassword() or compare plain text
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


// Serialize the admin user
passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

// Deserialize the admin user
passport.deserializeUser(async (id, done) => {
  try {
    const adminRecord = await Admin.findById(id);
    if (adminRecord) {
      done(null, adminRecord);
    } else {
      done(new Error("Admin not found"));
    }
  } catch (err) {
    done(err);
  }
});


passport.checkauthentication = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  return res.redirect('/');
};



passport.setAuthenticatedUser = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;