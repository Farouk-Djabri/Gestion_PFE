const Prof = require('../models/prof.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class ProfService {
  async getAllProfessors() {
    return Prof.find();
  }

  async getProfessorById(profId) {
    return Prof.findById(profId);
  }

  async createProfessor(profData) {
    const { firstName, lastName, email, password, role } = profData;
 
     try {
       const existingProf = await Prof.findOne({ email });
       if (existingProf) {
         throw new Error('Prof with that email already exists');
       }
       const hashedPassword = await bcrypt.hash(password, 10);
       const newProf = new Prof({
         firstName,
         lastName,
         email,
         password: hashedPassword,
         role,
       });
       await newProf.save();
       return newProf
     } catch (err) {
         console.log(err);
         throw new Error(err.message);
         
     }
   }
   
   async loginProfessor(loginProfInput) {
    const { email, password } = loginProfInput;
  
    if (!email || !password) {
        throw new Error('email and password are required !');
    }
  
    try {
      // Check if student exists
      const prof = await Prof.findOne({ email });
      if (!prof) {
        throw new Error('Invalid email or password ');
      }
      if (!prof.approved) {
        throw new Error('Your account is not approved yet. Please wait for approval.');
      }
  
      const passwordMatch = await bcrypt.compare(password, prof.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password ');

      }
  
      
      const tokenPayload = { profId: prof._id };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      
      return {
        message: 'Login successful',
        token,
        prof: {
          firstName: prof.firstName,
          lastName: prof.lastName,
          email: prof.email
        }
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error login in !');
    }
  }

  async updateProfessor(profId, profData) {
    return Prof.findByIdAndUpdate(profId, profData, { new: true });
  }

  async getAllPendingProfessors() {
    return Prof.find({ approved: false });
  }

  async approveProfessor(profId) {
    return Prof.findByIdAndUpdate(profId, { approved: true }, { new: true });
  }

  async deleteProfessor(profId) {
    return Prof.findByIdAndDelete(profId);
  }
}

module.exports = new ProfService();
