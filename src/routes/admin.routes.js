const express = require('express');
const AdminController = require('../controllers/admin.controller');
const profController = require('../controllers/prof.controller');
const studentController = require('../controllers/student.controller');


const router = express.Router();

router.get('/', AdminController.getAllAdmins);
router.get('/:adminId', AdminController.getAdminById);
router.post('/create', AdminController.createAdmin);
router.post('/login', AdminController.loginAdmin);

router.put('/:adminId', AdminController.updateAdmin);
router.delete('/:adminId', AdminController.deleteAdmin);

router.get('/professors', profController.getAllProfessors);
router.get('/professor/:profId', profController.getProfessorById);
router.post('/professor/createProfessor', profController.createProfessor);
router.put('/professor/:profId', profController.updateProfessor);
router.patch('/Professor/approve/:profId', profController.approveProfessor);
router.delete('/professor/:profId', profController.deleteProfessor);

router.get('/students', studentController.getAllStudents);
router.get('/student/:studentId', studentController.getStudentById);
router.post('/student/createStudent', studentController.createStudent);
router.get('/students/pending', studentController.getAllPendingStudents);
router.patch('/student/approve/:studentId', studentController.approveStudent);
router.put('/student/:studentId', studentController.updateStudent);
router.delete('/student/:studentId', studentController.deleteStudent);

module.exports = router;