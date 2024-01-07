const StudentService = require('../services/student.service');
const studentService = require('../services/student.service');

class StudentController {

  async createStudent(req, res) {
    const studentData = req.body;
    try {
      const newStudent = await StudentService.createStudent(studentData);
      res.status(201).json(newStudent);
    } catch (error) {
      console.error('Error creating student:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async loginStudent (req, res)  {
    const studentData = req.body;
    try {
      const result = await studentService.loginStudent(studentData);
      return res.status(201).json({ message: 'User loged in successfully', result: result });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
    };
    
  async getAllPendingStudents(req, res) {
    try {
      const pendingStudents = await StudentService.getAllPendingStudents();
      console.log(pendingStudents)
      res.json(pendingStudents);
    } catch (error) {
      console.error('Error fetching pending students:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getAllApprovedStudents(req, res) {
    try {
      const approvedStudents = await StudentService.getAllApprovedStudents();
      console.log(approvedStudents)
      res.json(approvedStudents);
    } catch (error) {
      console.error('Error fetching appproved students:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async approveStudent(req, res) {
    const { studentId } = req.params;
    try {
      const approvedStudent = await StudentService.approveStudent(studentId);
      if (!approvedStudent) {
        return res.status(404).send('Student not found');
      }
      console.log('student approved successfully !');
      res.json(approvedStudent);
    } catch (error) {
      console.error('Error approving student:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getAllStudents(req, res) {
    try {
      const students = await StudentService.getAllStudents();
      res.json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getStudentById(req, res) {
    const { studentId } = req.params;
    try {
      const student = await StudentService.getStudentById(studentId);
      if (!student) {
        return res.status(404).send('Student not found');
      }
      res.json(student);
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  

  async updateStudent(req, res) {
    const { studentId } = req.params;
    const studentData = req.body;
    try {
      const updatedStudent = await StudentService.updateStudent(studentId, studentData);
      if (!updatedStudent) {
        return res.status(404).send('Student not found');
      }
      res.json(updatedStudent);
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteStudent(req, res) {
    const { studentId } = req.params;
    try {
      const deletedStudent = await StudentService.deleteStudent(studentId);
      if (!deletedStudent) {
        return res.status(404).send('Student not found');
      }
      res.json(deletedStudent);
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).send('Internal Server Error');
    }
  }

    
  
}

module.exports = new StudentController();
