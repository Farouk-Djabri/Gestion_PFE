const Theme = require('../models/theme.model');
const Prof = require('../models/prof.model');

class ThemeService {
  async getAllThemes() {
    return Theme.find();
  }

  async getThemeById(themeId) {
    return Theme.findById(themeId);
  }

  async createTheme(themeData) {
    const newTheme = new Theme(themeData);
    await newTheme.save();
    return newTheme;
  }

  async updateTheme(themeId, updatedThemeData) {
    return Theme.findByIdAndUpdate(themeId, updatedThemeData, { new: true });
  }

  async deleteTheme(themeId) {
    return Theme.findByIdAndDelete(themeId);
  }

  async approveTheme(ProfId, themeId) {
    
    const Prof = await Prof.findById(ProfId);
    if (!chefProf) {
      throw new Error('Chef professor not found');
    }

    if (Prof.role !== 'chef') {
      throw new Error('Only chef professors can approve themes');
    }

    
    const theme = await Theme.findById(themeId);
    if (!theme) {
      throw new Error('Theme not found');
    }

    
    theme.status = 'approved';
    await theme.save();

    return theme;
  }

  async declineTheme(ProfId, themeId) {
    
    const Prof = await Prof.findById(ProfId);
    if (!chefProf) {
      throw new Error('Chef professor not found');
    }

    if (Prof.role !== 'chef') {
      throw new Error('Only chef professors can decline themes');
    }

    
    const theme = await Theme.findById(themeId);
    if (!theme) {
      throw new Error('Theme not found');
    }

    
    theme.status = 'declined';
    await theme.save();

    return theme;
  }

  async reserveTheme(themeId, studentId) {
    const theme = await Theme.findById(themeId);
    if (!theme) {
      throw new Error('Theme not found');
    }

    
    const existingReservation = theme.reservations.find(
      (reservation) => reservation.student.toString() === studentId
    );

    if (existingReservation) {
      throw new Error('You have already reserved this theme');
    }

    theme.reservations.push({ student: studentId });
    await theme.save();

    return theme;
  }

  async cancelReservation(themeId, studentId) {
    const theme = await Theme.findById(themeId);
    if (!theme) {
      throw new Error('Theme not found');
    }

    theme.reservations = theme.reservations.filter(
      (reservation) => reservation.student.toString() !== studentId
    );

    await theme.save();

    return theme;
  }
}

module.exports = ThemeService;
