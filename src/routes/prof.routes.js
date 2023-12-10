const express = require('express');
const ProfController = require('../controllers/prof.controller');

const router = express.Router();

router.get('/:profId', ProfController.getProfessorById);
router.post('/create', ProfController.createProfessor);
router.post('/login', ProfController.loginProfessor);

router.put('/:profId', ProfController.updateProfessor);

module.exports = router;
