// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
// routes/authRoutes.js
router.get('/users', authController.getUsers);
router.get('/user',authController.getuserbyid);
// routes/authRoutes.js
router.post('/register', authController.signup);
// routes/authRoutes.js
router.put('/users/:id', authController.updateUser);
// routes/authRoutes.js
router.delete('/users/:id', authController.deleteUser);

module.exports = router;
