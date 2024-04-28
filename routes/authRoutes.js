const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const authJwt = require('../middlewares/authJwt.js');
const userController = require('../controllers/userController.js'); 
router.post('/login', authController.login);
router.get('/users', authController.getUsers);
router.get('/rhs', authController.getrhs);
router.get('/employees', authController.getemployees);
router.get('/users/:id', authController.getUserById);
router.post('/register', authController.signup);
router.post('/rhSignUp', authController.RHPost);
router.post('/emplSignUp', authController.EmployeePost);
router.put('/users/:id', authController.updateUser);
router.delete('/users/:id', authController.deleteUser);
router.post('/logout', authController.logout);

router.delete('/users', authController.deleteUserByEmail);


// Route pour l'accès public
// router.get('/board', authController.allAccess);

// // Route pour l'accès utilisateur
// router.get('/board/user',userController.userBoard);

// Route pour l'accès directeur
// router.get('/director/:id', userController.directorBoard);

// // Route pour l'accès administrateur
// router.get('/admin/:id',userController.adminBoard);

module.exports = router;
