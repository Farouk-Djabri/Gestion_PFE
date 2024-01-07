const express = require('express');
const ProfController = require('../controllers/prof.controller');

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
  });
router.get('/', ProfController.getAllProfessors);
router.get('/:profId', ProfController.getProfessorById);

router.post('/register', ProfController.createProfessor);


router.put('/:profId', ProfController.updateProfessor);
router.patch('/approve/:profId', ProfController.approveProfessor);
router.delete('/:profId', ProfController.deleteProfessor);


  

module.exports = router;
