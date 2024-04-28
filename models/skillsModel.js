const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    proficiency: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    status:{
      enum:["incomplet","complet"]
    }
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
