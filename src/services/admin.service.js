const Admin = require('../models/admin.model');

class AdminService {

  async createAdmin(adminData) {
      const { firstName, lastName, email, password } = adminData;
   
       try {
         const existingAdmin = await Admin.findOne({ email });
         if (existingAdmin) {
           throw new Error('Admin with that email already exists');
         }
         const hashedPassword = await bcrypt.hash(password, 10);
         const newAdmin = new Admin({
           firstName,
           lastName,
           email,
           password: hashedPassword,
         });
         await newAdmin.save();
         return newAdmin
       } catch (err) {
           console.log(err);
           throw new Error(err.message);
           
       }
  }

  async loginAdmin(loginAdminInput) {
    const { email, password } = loginAdminInput;
  
    if (!email || !password) {
        throw new Error('email and password are required !');
    }
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new Error('Invalid email or password ');
      }
  
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password ');

      }
  
      const tokenPayload = { adminId: admin._id };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

      return {
        message: 'Login successful',
        token,
        prof: {
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email
        }
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error login in !');
    }
  }

  async getAdminById(adminId) {
    return Admin.findById(adminId);
  }

  async getAdminByUsername(username) {
    return Admin.findOne({ username });
  }

  async getAllAdmins() {
    return Admin.find();
  }

  async updateAdmin(adminId, adminData) {
    return Admin.findByIdAndUpdate(adminId, adminData, { new: true });
  }

  async deleteAdmin(adminId) {
    return Admin.findByIdAndDelete(adminId);
  }
}

module.exports = new AdminService();