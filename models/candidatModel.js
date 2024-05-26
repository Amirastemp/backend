const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    professionalExperiences: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProfessionalExperience',
    }],
    academicExperiences: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicExperience',
    }],
    skills: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
    }],
    profileCompletion: {
      type: Number,
      default: 0,
    },
    cvFile: {
      type: String, // Assuming you store the file path as a string 
    },
  
  },
  { timestamps: true }
);

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
