// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/userModel');
const LeaveRequest=require('../models/leaveRequest')
const config = require('../config/config');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
let verificationCodes = {};


/**********************login**************************************************************************************/
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

exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Générer un code de vérification
    const verificationCode = crypto.randomBytes(3).toString('hex');
    verificationCodes[email] = verificationCode;

    // Envoyer le code de vérification par email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Code de vérification',
      text: `Votre code de vérification est: ${verificationCode}`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.verifyCodeAndResetPassword = async (req, res) => {
  const { email, verificationCode, newPassword, confirmPassword } = req.body;

  // Vérification si les mots de passe correspondent
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Vérification du code de vérification
  if (verificationCodes[email] !== verificationCode) {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe de l'utilisateur avec le mot de passe haché
    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    // Supprimer le code de vérification
    delete verificationCodes[email];

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.changePassword = async (req, res) => {
  const { email, currentPassword, newPassword, confirmPassword } = req.body;

  // Vérification si les mots de passe correspondent
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });

    // Vérification de l'existence de l'utilisateur et de la correspondance du mot de passe actuel
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe de l'utilisateur avec le mot de passe haché
    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    // Répondre avec un message de succès
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
/***************************getUsers**************************************************************************************************************************************************/
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
/***********************************GETRH*************************************** */
exports.getrhs = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 1; // Default to the first page
    const pageSize = parseInt(req.query.pageSize) || 6; // Default to 10 items per page

    // Calculate the starting index for pagination
    const startIndex = (pageNumber - 1) * pageSize;

    // Fetch paginated RHs from the database
    const users = await User.find({ role: "RH" })
                             .skip(startIndex) // Skip the first elements based on the starting index
                             .limit(pageSize); // Limit the number of items to return

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/********************************GETEMPLOYEE************************************************* */
exports.getemployees = async (req, res) => {
  try {
    // Extraction du numéro de page de la requête HTTP
    const pageNumber = parseInt(req.query.pageNumber) || 1; // Par défaut, la première page

    // Extraction de la taille de la page de la requête HTTP
    const pageSize = parseInt(req.query.pageSize) || 6; // Par défaut, 10 éléments par page

    // Compter le nombre total d'employés dans la base de données ayant le rôle "employee"
    const totalEmployees = await User.countDocuments({ role: "employee" });

    // Calcul de l'index de départ pour la pagination
    const startIndex = (pageNumber - 1) * pageSize;

    // Calcul de l'index de fin pour la pagination
    const endIndex = Math.min(startIndex + pageSize - 1, totalEmployees - 1);

    // Récupération des employés paginés depuis la base de données
    const users = await User.find({ role: "employee" })
                             // Limiter le nombre d'éléments à retourner

    // Calcul du nombre total de pages nécessaires pour afficher tous les employés
    const totalPages = Math.ceil(totalEmployees / pageSize);

    // Envoi d'une réponse JSON contenant les informations paginées, y compris les employés récupérés,
    // le numéro de page actuel, la taille de la page, les index de départ et de fin, le nombre total de pages
    // et le nombre total d'employés
    res.json({
      pageNumber: pageNumber,
      pageSize: pageSize,
      startIndex: startIndex,
      endIndex: endIndex,
      users: users,
      totalPages: totalPages,
      totalEmployees: totalEmployees
    });
  } catch (error) {
    // Gestion des erreurs : affichage de l'erreur dans la console et envoi d'une réponse avec un statut 500
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




/*******************************POSTRH********************************************** */

exports.RHPost = async (req, res) => {
  try {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { firstName, lastName, userName, email,description, password, phone, address,active,hiring_date} = req.body;
    const image =req.file;
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set default role (RH)
    const role = 'RH';

    // Create a new user object with the provided data and default role
    const newUser = new User({ firstName, lastName, userName, email, description,password: hashedPassword, phone, address, role,hiring_date,active,image: image ? image.filename : null });

    // Save the new user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, config.SECRET);

    // Send a successful response with the token and user ID
    res.status(201).json({ message: 'User created successfully', userId: newUser._id, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
/******************************Employee**************************************************** */

exports.EmployeePost = async (req, res) => {
  try {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { firstName, lastName, userName, description,email, password, phone, address,active,hiring_date } = req.body;
 const image =req.file;
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set default role (RH)
    const role = 'employee';

    // Create a new user object with the provided data and default role
    const newUser = new User({ firstName, lastName, userName,description, email, password: hashedPassword, phone, address, role,active,hiring_date,image: image ? image.filename : null });

    // Save the new user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, config.SECRET);

    // Send a successful response with the token and user ID
    res.status(201).json({ message: 'User created successfully', userId: newUser._id, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
/**********************getUserById*********************************************************************************/
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
/***************************Signup**************************************************************************/
// controllers/authController.js

exports.signup = async (req, res) => {
  try {
    // Validation des données d'entrée
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extraction des données utilisateur du corps de la requête
    const { firstName, lastName, userName, email, password, phone, address, role } = req.body;

    // Vérification si l'email est déjà enregistré
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel objet utilisateur avec les données fournies
    const newUser = new User({ firstName, lastName, userName, email, password: hashedPassword, phone, address, role });

    // Enregistrement du nouvel utilisateur dans la base de données
    await newUser.save();

    // Génération du token JWT
    const token = jwt.sign({ userId: newUser._id }, config.SECRET);

    // Envoi d'une réponse réussie avec le token et l'ID utilisateur
    res.status(201).json({ message: 'User created successfully', userId: newUser._id, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/*********************logout*******************************************************************/

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to destroy session' });
      } else {
        return res.status(200).json({ message: 'Logout successful' });
      }
    });
  } else {
    return res.status(200).json({ message: 'No session to destroy' });
  }
};





/***********************UpdateUser**************************************************************/
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedRole, active } = req.body;

    // Create updateFields object with request body
    const updateFields = { ...req.body };

    // Check if updatedRole and active are provided, then add them to updateFields
    if (updatedRole) updateFields.role = updatedRole;
    if (active !== undefined) updateFields.active = active;

    // Check if an image file is uploaded
    if (req.file) {
      // Assuming the file is saved with multer and its filename is available in req.file.filename
      updateFields.image = req.file.filename;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


/***********************DeleteUser*****************************************************************/
// controllers/authController.js
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
/*********************************************************************************** */
exports.deleteUserByEmail = async (req, res) => {
  try {
    // Extract the email from the query parameters
    const { email } = req.query;

    // Check if the email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email parameter is required' });
    }

    // Find the user by email and delete
    const deletedUser = await User.findOneAndDelete({ email });

    // Check if user is not found
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return success message
    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


