const express = require('express');
const router = express.Router();
const ThemeController = require('../controllers/theme.controller');

router.get('/', ThemeController.getAllThemes);
router.get('/:themeId', ThemeController.getThemeById);
router.post('/create', ThemeController.createTheme);
router.put('/:themeId', ThemeController.updateTheme);
router.delete('/:themeId', ThemeController.deleteTheme);

router.post('/reserve/:themeId', ThemeController.reserveTheme);
router.delete('/cancel-reservation/:themeId', ThemeController.cancelReservation);


module.exports = router;
