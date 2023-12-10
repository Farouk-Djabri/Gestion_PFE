const ProfService = require('../services/prof.service')
const AdminService = require('../services/admin.service')
const StudentService = require('../services/student.service')

class AdminController {

  //Admin Functions

  async getAllAdmins(req, res) {
    try {
      const admins = await AdminService.getAllAdmins();
      res.json(admins);
    } catch (error) {
      console.error('Error fetching professors:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getAdminById(req, res) {
    const { adminId } = req.params;
    try {
      const admin = await AdminService.getAdminById(adminId);
      if (!admin) {
        return res.status(404).send('Admin not found');
      }
      res.json(admin);
    } catch (error) {
      console.error('Error fetching professor:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async createAdmin(req, res) {
    const adminData = req.body;
    try {
      const newAdmin = await AdminService.createAdmin(adminData);
      res.status(201).json(newAdmin);
      console.log('admin created !');
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async loginAdmin (req, res)  {
    const adminData = req.body;
    try {
      const result = await AdminService.loginAdmin(adminData);
      return res.status(201).json({ message: 'admin loged in successfully', result: result });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
    };

  async updateAdmin(req, res) {
    const { adminId } = req.params;
    const adminData = req.body;
    try {
      const updatedAdmin = await AdminService.updateAdmin(adminId, adminData);
      if (!updatedAdmin) {
        return res.status(404).send('Admin not found');
      }
      res.json(updatedAdmin);
    } catch (error) {
      console.error('Error updating admin:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteAdmin(req, res) {
    const { adminId } = req.params;
    try {
        await AdminService.deleteAdmin(adminId);
     
      res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
      console.error('Error deleting admin:', error);
      res.status(500).send('Internal Server Error');
    }
  }

}

module.exports = new AdminController();