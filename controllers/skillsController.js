const Skill = require('../models/skillsModel');



exports.getAllSkillsByIdCandidat = async (req, res) => {
  try {
    const candidatId = req.params.candidatId; // Assuming the candidatId is passed as a route parameter
    const skills = await Skill.find({candidate:candidatId});
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// POST a new skill for a candidate by candidate ID
exports.createSkillByCandidateId = async (req, res) => {
  try {
    // Extract candidate ID from the route parameters
    const candidateId = req.params.candidateId;

    // Create a new skill using the request body
    const skill = new Skill(req.body);

    // Set the candidate ID for the skill
    skill.candidate = candidateId;

    // Save the skill
    const newSkill = await skill.save();

    // Return the newly created skill
    res.status(201).json(newSkill);
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};


// GET all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSkillById = async (req, res) => {
  try {
    const id=req.params.id
    const skill = await Skill.findById(id);
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// POST a new skill
exports.createSkill = async (req, res) => {
  const skill = new Skill(req.body);
  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT (update) a skill by ID
exports.updateSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await Skill.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Skill updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a skill by ID
exports.deleteSkill = async (req, res) => {
  
  try {
    const id = req.params.id;
    await Skill.findByIdAndDelete(id);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
