const ThemeService = require('../services/theme.service');

class ThemeController {
  async getAllThemes(req, res) {
    try {
      const themes = await ThemeService.getAllThemes();
      res.json(themes);
    } catch (error) {
      console.error('Error fetching themes:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getThemeById(req, res) {
    const { themeId } = req.params;
    try {
      const theme = await ThemeService.getThemeById(themeId);
      if (!theme) {
        return res.status(404).send('Theme not found');
      }
      res.json(theme);
    } catch (error) {
      console.error('Error fetching theme by ID:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async createTheme(req, res) {
    const themeData = req.body;
    try {
      const newTheme = await ThemeService.createTheme(themeData);
      res.status(201).json(newTheme);
    } catch (error) {
      console.error('Error creating theme:', error.message);
      res.status(400).send(error.message);
    }
  }

  async updateTheme(req, res) {
    const { themeId } = req.params;
    const updatedThemeData = req.body;
    try {
      const updatedTheme = await ThemeService.updateTheme(themeId, updatedThemeData);
      if (!updatedTheme) {
        return res.status(404).send('Theme not found');
      }
      res.json(updatedTheme);
    } catch (error) {
      console.error('Error updating theme:', error.message);
      res.status(400).send(error.message);
    }
  }

  async deleteTheme(req, res) {
    const { themeId } = req.params;
    try {
      const deletedTheme = await ThemeService.deleteTheme(themeId);
      if (!deletedTheme) {
        return res.status(404).send('Theme not found');
      }
      res.json(deletedTheme);
    } catch (error) {
      console.error('Error deleting theme:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async approveTheme(req, res) {
    const { chefProfId, themeId } = req.params;

    try {
      const approvedTheme = await ThemeService.approveTheme(chefProfId, themeId);
      res.json(approvedTheme);
    } catch (error) {
      console.error('Error approving theme:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  async declineTheme(req, res) {
    const { chefProfId, themeId } = req.params;

    try {
      const declinedTheme = await ThemeService.declineapproveTheme(chefProfId, themeId);
      res.json(declinedTheme);
    } catch (error) {
      console.error('Error declining theme:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  async reserveTheme(req, res) {
    const { themeId } = req.params;
    const studentId = req.user._id; // Assuming you have the student ID from authentication

    try {
      const reservedTheme = await ThemeService.reserveTheme(themeId, studentId);
      res.json(reservedTheme);
    } catch (error) {
      console.error('Error reserving theme:', error.message);
      res.status(400).send(error.message);
    }
  }

  async cancelReservation(req, res) {
    const { themeId } = req.params;
    const studentId = req.user._id; // Assuming you have the student ID from authentication

    try {
      const canceledReservation = await ThemeService.cancelReservation(themeId, studentId);
      res.json(canceledReservation);
    } catch (error) {
      console.error('Error canceling reservation:', error.message);
      res.status(400).send(error.message);
    }
  }
  
}

module.exports = new ThemeController();
