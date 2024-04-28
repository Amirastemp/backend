const mongoose = require('mongoose');

const academicExperienceSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    
      status:{
        enum:["incomplet","complet"]
      }
    
  },
  { timestamps: true }
);

const AcademicExperience = mongoose.model('AcademicExperience', academicExperienceSchema);

module.exports = AcademicExperience;
