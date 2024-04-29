const JobPost = require('../models/jobPostModel');

// Contrôleur pour la création d'une nouvelle jobPost
exports.createJobPost = async (req, res) => {
  try {
    // Extraire les données de la requête
    const { title, description, location, company, salary } = req.body;

    // Créer une nouvelle instance de JobPost
    const newJobPost = new JobPost({
      title,
      description,
      location,
      company,
      salary
    });

    // Sauvegarder la nouvelle jobPost dans la base de données
    await newJobPost.save();

    res.status(201).json({ success: true, data: newJobPost });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllJobPosts = async (req, res) => {
    try {
      // Récupérer tous les job posts depuis la base de données
      const jobPosts = await JobPost.find();
  
      res.status(200).json({ success: true, data: jobPosts });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


