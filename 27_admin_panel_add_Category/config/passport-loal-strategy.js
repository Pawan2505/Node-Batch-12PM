const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/admin");

// Local Strategy for admin login
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const adminRecord = await Admin.findOne({ email: email });
        if (!adminRecord) {
          console.log("Admin not found with email:", email);
          return done(null, false);
        }

        if (adminRecord.password === password) {
          return done(null, adminRecord);
        } else {
          console.log("Password mismatch");
          return done(null, false);
        }
      } catch (err) {
        console.log("Error in passport strategy:", err.message);
        return done(err);
      }
    }
  )
);

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



passport.setAuthenticatedUser = function (req, res, next) {
  if (req.session) {
    req.session.user = req.user;
  }
  next();
};

module.exports = passport;







// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const Admin = require("../models/admin");

// // Local Strategy for admin login
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//     },
//     async (email, password, done) => {
//       try {
//         const adminRecord = await Admin.findOne({ email: email });
//         if (!adminRecord) {
//           console.log("Admin not found with email:", email);
//           return done(null, false);
//         }

//         if (adminRecord.password === password) {
//           return done(null, adminRecord);
//         } else {
//           console.log("Password mismatch");
//           return done(null, false);
//         }
//       } catch (err) {
//         console.log("Error in passport strategy:", err.message);
//         return done(err);
//       }
//     }
//   )
// );

// // Serialize the admin user
// passport.serializeUser((admin, done) => {
//   done(null, admin.id);
// });

// // Deserialize the admin user
// passport.deserializeUser(async (id, done) => {
//   try {
//     const adminRecord = await Admin.findById(id);
//     if (adminRecord) {
//       done(null, adminRecord);
//     } else {
//       done(new Error("Admin not found"));
//     }
//   } catch (err) {
//     done(err);
//   }
// });

// module.exports = passport;

