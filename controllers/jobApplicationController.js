const JobApplication = require('../models/jobApplicationModel');

// Méthode de contrôleur pour créer une candidature à un poste
exports.createJobApplication = async (req, res) => {
  try {
    const { jobPostId, candidateId, coverLetter } = req.body;

    // Vérifier si les champs requis sont présents
    if (!jobPostId || !candidateId || !coverLetter) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Créer une nouvelle candidature
    const jobApplication = new JobApplication({
      jobPost: jobPostId,
      candidate: candidateId,
      coverLetter: coverLetter
    });

    // Enregistrer la candidature dans la base de données
    const newJobApplication = await jobApplication.save();

    res.status(201).json(newJobApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllJobApplications = async (req, res) => {
    try {
      // Récupérer tous les job posts depuis la base de données
      const jobApplication = await JobApplication.find();
  
      res.status(200).json({ jobApplication });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  exports.updateJobApplication = async(req, res) => {
    try{
      const id=req.params.id;
      const {status}=req.body;
     await JobApplication.findByIdAndUpdate(id,{status});
      res.status(200).json({message:'updated successfully!'});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
