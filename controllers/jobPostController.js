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
  
      res.status(200).json({data: jobPosts });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
exports.getoneJobPost= async(req, res) => {
  try{
    const id=req.params.id;
    const jobpost=await JobPost.findById(id);
    res.status(200).json({data: jobpost });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
exports.updateoneJobPost= async(req, res) => {
  try{
    const id=req.params.id;
    const job =req.body;
   await JobPost.findByIdAndUpdate(id,job);
    res.status(200).json({message:'updated successfully!'});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
exports.deleteoneJobPost = async (req, res) => {
  try {
    const id = req.params.id;
    await JobPost.findByIdAndDelete(id);
    res.json({ message: 'Job Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getAllOpenJobPosts = async (req, res) => {
  try {
    // Récupérer tous les job posts avec le statut ouvert depuis la base de données
    const openJobPosts = await JobPost.find({ status: 'open' });

    res.status(200).json({ data: openJobPosts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


