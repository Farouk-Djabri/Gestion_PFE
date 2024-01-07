const AuthService = require('../services/auth.service');

class AuthController {
  static async registerUser(req, res) {
    const { firstName, lastName, email, password, role } = req.body;

    try {
      const newUser = await AuthService.registerUser({ firstName, lastName, email, password, role });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  static async loginUser(req, res) {
    const { email, password, role } = req.body;

    try {
      const authResult = await AuthService.loginUser({ email, password, role });
      res.json(authResult);
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(401).send('Invalid email or password');
    }
  }
}

module.exports = AuthController;