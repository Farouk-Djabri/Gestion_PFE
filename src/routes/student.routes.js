const express = require('express');
const StudentController = require('../controllers/student.controller');
const ThemeController = require('../controllers/theme.controller');

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getStudentById);

router.get('/register', (req, res) => {
    res.render('registerStudent');
  });
router.post('register', StudentController.createStudent);

router.get('/pending', StudentController.getAllPendingStudents);
router.get('/approved', StudentController.getAllApprovedStudents);
router.patch('/approve/:studentId', StudentController.approveStudent);
router.put('/:studentId', StudentController.updateStudent);
router.delete(':studentId', StudentController.deleteStudent);

const themeRoutes = require('./theme.routes');
router.use('/theme', themeRoutes);



module.exports = router;