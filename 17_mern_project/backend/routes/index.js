const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');

router.post('/add', controller.createAdmin);
router.get('/show', controller.getAdmins);
router.get('/edit/:id', controller.getAdminById);
router.put('/updatedata/:id', controller.updateAdmin);
router.delete('/removedata/:id', controller.deleteAdmin);

module.exports = router;
