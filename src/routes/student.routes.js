const express = require('express');
const StudentController = require('../controllers/student.controller');

const router = express.Router();

router.get('/:studentId', StudentController.getStudentById);
router.post('/create', StudentController.createStudent);
router.post('/login', StudentController.loginStudent);

router.put('/:profId', StudentController.updateStudent);

module.exports = router;