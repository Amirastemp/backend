const mongoose = require('mongoose');

const professionalExperienceSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    company: {
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

const ProfessionalExperience = mongoose.model('ProfessionalExperience', professionalExperienceSchema);

module.exports = ProfessionalExperience;
