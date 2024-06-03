const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const authJwt = require('../middlewares/authJwt.js');
const userController = require('../controllers/userController.js'); 
const uploadimage   = require('../middlewares/uploadimage.js')
router.post('/login', authController.login);
router.put('/changepassword', authController.changePassword);
router.post('/send-verification-code', authController.sendVerificationCode);
router.post('/verify-code-and-reset-password', authController.verifyCodeAndResetPassword);
router.get('/users', authController.getUsers);
router.get('/rhs', authController.getrhs);
router.get('/employees', authController.getemployees);
router.get('/users/:id', authController.getUserById);
router.post('/register',uploadimage.single('image'), authController.signup);
router.post('/rhSignUp', uploadimage.single('image'),authController.RHPost);
router.post('/emplSignUp',uploadimage.single('image'), authController.EmployeePost);
router.put('/users/:id', uploadimage.single('image'), authController.updateUser);
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
