const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  static async registerUser({ firstName, lastName, email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'student') {
      
      const student = await StudentService.createStudent({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      return student;
    } else if (role === 'professor') {
      
      const professor = await ProfessorService.createProfessor({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      return professor;
    } else {
      throw new Error('Invalid role');
    }
  }

  static async loginUser({ email, password, role }) {
    // Validate user credentials based on the provided role
    let user;
    if (role === 'student') {
      user = await StudentService.loginStudent(email);
    } else if (role === 'professor') {
      user = await ProfessorService.loginProfessor(email);
    } else {
      throw new Error('Invalid role');
    }

   return user;
  }
}

module.exports = AuthService;