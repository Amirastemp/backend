const mongoose = require('mongoose');

// Définir le schéma de la jobPost
const jobPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },

  salary: {
    type: Number,
    required: true
  },
//   coverPhoto: {
//     type: String, // Vous pouvez stocker l'URL de la photo de couverture
//     default: 'placeholder.jpg' // Remplacer par l'URL par défaut si nécessaire
//   },
  status: {
    type: String,
    enum: ['open', 'closed', 'draft'], // Statut possible de la jobPost
    default: 'draft' // Statut par défaut
  },
  datePosted: {
    type: Date,
    default: Date.now
  }
});

// Créer un modèle basé sur le schéma
const JobPost = mongoose.model('JobPost', jobPostSchema);

module.exports = JobPost;
