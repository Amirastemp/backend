const ProfessionalExperience = require('../models/professionalExperienceModel');
const Candidate=require('../models/candidatModel');


// Get all professional experiences by candidate ID
exports.getAllProfessionalExperiencesByCandidateId = async (req, res) => {
  try {
    // Extract candidate ID from the request parameters
    const candidateId = req.params.candidateId;
    // Query the database for professional experiences associated with the candidate ID
    const professionalExperiences = await ProfessionalExperience.find({ candidate: candidateId });
    // If professional experiences are found, return them in the response
    res.json(professionalExperiences);
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// POST a new professional experience for a candidate by candidate ID
exports.createProfessionalExpByidCandidat = async (req, res) => {
  try {
    // Extract candidate ID from the route parameters
    const candidateId = req.params.candidateId;

    // Create a new professional experience using the request body
    const professionalExperience = new ProfessionalExperience(req.body);

    // Set the candidate ID for the professional experience
    professionalExperience.candidate = candidateId;

    // Save the professional experience
    const newProfessionalExperience = await professionalExperience.save();

    // Return the newly created professional experience
    res.status(201).json(newProfessionalExperience);
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};




// GET all professional experiences
exports.getAllProfessionalExperiences = async (req, res) => {
  try {
    const professionalExperiences = await ProfessionalExperience.find();
    res.json(professionalExperiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getexpProById = async (req, res) => {
  try {
    const id =req.params.id
    const professionalExperiences = await ProfessionalExperience.findById(id);
    res.json(professionalExperiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// POST a new professional experience
exports.createProfessionalExperience = async (req, res) => {
  const professionalExperience = new ProfessionalExperience(req.body);
  try {
    const newProfessionalExperience = await professionalExperience.save();
    res.status(201).json(newProfessionalExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT (update) a professional experience by ID
exports.updateProfessionalExperience = async (req, res) => {
  const { id } = req.params;
  try {
    await ProfessionalExperience.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Professional experience updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a professional experience by ID
exports.deleteProfessionalExperience = async (req, res) => {
  try {
    const id = req.params.id;
    await ProfessionalExperience.findByIdAndDelete(id);
    res.json({ message: 'Professional experience deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
