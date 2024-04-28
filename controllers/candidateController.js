// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const LeaveRequest=require('../models/leaveRequest')
const config = require('../config/config');
const { validationResult } = require('express-validator');
const Candidate = require('../models/candidatModel');


exports.candidatPost = async (req, res) => {
  try {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Extract user data from request body
    const { firstName, lastName, userName, email, password, phone, address, active } = req.body;
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Set role to "candidat"
    const role = 'candidat';
    // Create a new user object with the provided data and role
    const user = new User({ firstName, lastName, userName, email, password: hashedPassword, phone, address, role, active });
    // Save the new user to the database
    await user.save();
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, config.SECRET);
    // Create a new candidate object and associate it with the user
    const newCandidate = new Candidate({ user: user._id });
    // Save the new candidate to the database
    await newCandidate.save();
  
    
    // Send a successful response with the token and user ID
    res.status(200).send({
      id: user._id,
      username: user.userName,
      email: user.email,
      role: user.role,
      active: user.active,
      accessToken: token,
      candidatId: newCandidate._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign(
      { id: user.id },
      config.SECRET,
      {
        algorithm: 'HS256',
        expiresIn: 86400, // 24 hours
      }
    );
    res.status(200).send({
      id: user._id,
      username: user.userName,
      email: user.email,
      role: user.role,
      active:user.active,
      accessToken: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
/**************************************************************/
// Fonction pour calculer le pourcentage de complétion du profil
const calculateProfileCompletion = (candidate) => {
  let completionPercentage = 0;
  // Vérifier chaque attribut du candidat et incrémenter le pourcentage en conséquence
  if (candidate.user) {
    completionPercentage += 25;
  }
  if (candidate.professionalExperience) {
    completionPercentage += 25;
  }
  if (candidate.academicExperience) {
    completionPercentage += 25;
  }
  if (candidate.skills) {
    completionPercentage += 25;
  }
  // Ajoutez des conditions pour d'autres attributs si nécessaire
  return completionPercentage;
};
exports.getProfileCompletion = async (req, res) => {
  try {
    // Récupérer l'ID du candidat à partir des paramètres de la requête ou de la session, selon votre application
    const candidateId = req.params.id; // Supposons que l'ID du candidat soit passé en tant que paramètre dans l'URL

    // Rechercher le candidat dans la base de données en utilisant l'ID
    const candidate = await Candidate.findById(candidateId);

    // Si le candidat n'est pas trouvé, retourner une erreur
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Calculer le pourcentage de complétion du profil du candidat
    const profileCompletion = calculateProfileCompletion(candidate);

    // Répondre avec le pourcentage de complétion du profil
    res.status(200).json( profileCompletion )
  } catch (error) {
    // Gérer les erreurs
    console.error('Error fetching profile completion:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getCandidateById = async (req, res) => {
  const { id } = req.params; // Get the candidate ID from the request parameters
  try {
    const candidate = await Candidate.findById(id); // Find the candidate by ID
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate); // Send the candidate data as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};


// GET candidate by user ID
exports.getCandidateByUserId = async (req, res) => {
  try {
    // Extract user ID from the request parameters
    const userId = req.params.userId;

    // Find the candidate document by user ID
    const candidate = await Candidate.findOne({user: userId });

    // Check if a candidate was found
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // If a candidate is found, return it in the response
    res.json(candidate);
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// GET all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new candidate
exports.createCandidate = async (req, res) => {
  const candidate = new Candidate(req.body);
  try {
    const newCandidate = await candidate.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT (update) a candidate by ID
exports.updateCandidate = async (req, res) => {
  try {
    const id = req.params.id;
    await Candidate.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Candidate updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a candidate by ID
exports.deleteCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    await Candidate.findByIdAndDelete(id);
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
