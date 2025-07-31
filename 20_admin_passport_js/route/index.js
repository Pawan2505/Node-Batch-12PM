const express = require('express');
const router = express.Router();

const admintCtl = require('../controllers/adminController');

router.get('/', admintCtl.login);


router.post('/signup', admintCtl.signup);

module.exports = router