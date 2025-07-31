const express = require('express');
const adminCtl = require('../controller/adminController');
const passport = require('passport');

const routes = express.Router();

console.log('Admin routes loaded');
routes.get('/', adminCtl.signupPage);
routes.post('/signup', adminCtl.signup);

routes.get('/loginPage', adminCtl.loginPage);
routes.post('/checkLogin',  passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/loginPage',
  failureFlash: true
}), adminCtl.checkLogin);

routes.get('/home', passport.checkauthentication, adminCtl.home);
routes.get('/logout', adminCtl.logout);

// product routes
routes.get('/addProduct', passport.checkauthentication, adminCtl.addProductPage);
routes.post('/addDetails', passport.checkauthentication, adminCtl.addProduct);
routes.get('/edit-product/:id', passport.checkauthentication, adminCtl.editProductPage);
routes.post('/edit-product/:id', passport.checkauthentication, adminCtl.editProduct);
routes.get('/delete-product/:id', passport.checkauthentication, adminCtl.deleteProduct);

module.exports = routes;