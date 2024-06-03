const AcademicExperience = require('../models/academicExperienceModel');
const Candidate=require('../models/candidatModel');

exports.getAllAcademicExperiencesbyidcandidat = async (req, res) => {
  try {
    const candidatId = req.params.candidatId; // Assuming the candidatId is passed as a route parameter
    const academicExperiences = await AcademicExperience.find({ candidate:candidatId });
    res.json(academicExperiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new academic experience for a candidate by candidate ID
exports.createAcademicExpbyIdCandidat = async (req, res) => {
  try {
    // Extract candidate ID from the request body
    const candidateId = req.params.candidateId;

    // Create a new academic experience using the request body
    const academicExperience = new AcademicExperience(req.body);

    // Set the candidate ID for the academic experience
    academicExperience.candidate = candidateId;

    // Save the academic experience
    const newAcademicExperience = await academicExperience.save();

    // Return the newly created academic experience
    res.status(201).json(newAcademicExperience);
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// GET all academic experiences
exports.getAllAcademicExperiences = async (req, res) => {
  try {
    const academicExperiences = await AcademicExperience.find();
    res.json(academicExperiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getexpAcaById = async (req, res) => {
  try {
    const id=req.params.id
    const academicExperiences = await AcademicExperience.findById(id);
    res.json(academicExperiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new academic experience
exports.createAcademicExperience = async (req, res) => {
  const academicExperience = new AcademicExperience(req.body);
  try {
    const newAcademicExperience = await academicExperience.save();
    res.status(201).json(newAcademicExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT (update) an academic experience by ID
exports.updateAcademicExperience = async (req, res) => {
  const { id } = req.params;
  try {
    await AcademicExperience.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Academic experience updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE an academic experience by ID
exports.deleteAcademicExperience = async (req, res) => {
 
  try {
    const id= req.params.id;
    await AcademicExperience.findByIdAndDelete(id);
    res.json({ message: 'Academic experience deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
