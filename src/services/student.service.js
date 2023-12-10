const Student = require('../models/student.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class StudentService {
  async getAllPendingStudents() {
    return Student.find({ approved: false });
  }

  async approveStudent(studentId) {
    return Student.findByIdAndUpdate(studentId, { approved: true }, { new: true });
  }

  async getAllStudents() {
    return Student.find();
  }

  async getStudentById(studentId) {
    return Student.findById(studentId);
  }

  async createStudent(studentData) {
   const { firstName, lastName, email, password, year, rate } = studentData;

    try {
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        throw new Error('Student with that email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newStudent = new Student({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        year,
        rate
      });
      await newStudent.save();
      return newStudent
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
        
    }
  }

   async loginStudent(loginStudentInput) {
    const { email, password } = loginStudentInput;
  
    // Validate request body
    if (!email || !password) {
        throw new Error('email and password are required !');
    }
  
    try {
      // Check if student exists
      const student = await Student.findOne({ email });
      if (!student) {
        throw new Error('Invalid email or password ');
      }
      if (!student.approved) {
        throw new Error('Your account is not approved yet. Please wait for approval.');
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, student.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password ');

      }
  
      // Create JWT
      const tokenPayload = { studentId: student._id };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Return success response
      return {
        message: 'Login successful',
        token,
        student: {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email
        }
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error login in !');
    }
  }

  async updateStudent(studentId, studentData) {
    return Student.findByIdAndUpdate(studentId, studentData, { new: true });
  }

  async deleteStudent(studentId) {
    return Student.findByIdAndDelete(studentId);
  }
}

module.exports = new StudentService();
