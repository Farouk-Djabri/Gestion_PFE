
const ProfService = require('../services/prof.service');

class ProfController {

  async getAllPendingProfessors(req, res) {
    try {
      const pendingProfessors = await ProfService.getAllPendingProfessors();
      res.json(pendingProfessors);
    } catch (error) {
      console.error('Error fetching pending professors:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async approveProfessor(req, res) {
    const { profId } = req.params;
    try {
      const approvedProf = await ProfService.approveProfessor(profId);
      if (!approvedProf) {
        return res.status(404).send('Professor not found');
      }
      console.log('professor approved successfully !');
      res.json(approvedProf);
    } catch (error) {
      console.error('Error approving professor:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getAllProfessors(req, res) {
    try {
      const professors = await ProfService.getAllProfessors();
      res.json(professors);
    } catch (error) {
      console.error('Error fetching professors:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  async getProfessorById(req, res) {
    const { profId } = req.params;
    try {
      const professor = await ProfService.getProfessorById(profId);
      if (!professor) {
        return res.status(404).send('Professor not found');
      }
      res.json(professor);
    } catch (error) {
      console.error('Error fetching professor:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async createProfessor(req, res) {
    const profData = req.body;
    try {
      const newProf = await ProfService.createProfessor(profData);
      res.status(201).json(newProf);
    } catch (error) {
      console.error('Error creating professor:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async loginProfessor (req, res)  {
    const professorData = req.body;
    try {
      const result = await ProfService.loginProfessor(professorData);
      return res.status(201).json({ message: 'professor loged in successfully', result: result });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
    };

  async updateProfessor(req, res) {
    const { profId } = req.params;
    const profData = req.body;
    try {
      const updatedProf = await ProfService.updateProfessor(profId, profData);
      if (!updatedProf) {
        return res.status(404).send('Professor not found');
      }
      res.json(updatedProf);
    } catch (error) {
      console.error('Error updating professor:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteProfessor(req, res) {
    const { profId } = req.params;
    try {
      await ProfService.deleteProfessor(profId);
     
      res.json(deletedProf);
    } catch (error) {
      console.error('Error deleting professor:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new ProfController();
