const express = require('express');
const AdminController = require('../controllers/admin.controller');

const router = express.Router();

router.get('/', AdminController.getAllAdmins);
router.get('/:adminId', AdminController.getAdminById);
router.post('/create', AdminController.createAdmin);
router.post('/login', AdminController.loginAdmin);
router.put('/:adminId', AdminController.updateAdmin);
router.delete('/:adminId', AdminController.deleteAdmin);

const profRoutes = require('./prof.routes');
router.use('/professors', profRoutes);

const studentRoutes = require('./student.routes')
router.use('/students', studentRoutes);

module.exports = router;