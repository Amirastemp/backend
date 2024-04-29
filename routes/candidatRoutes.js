const express = require('express');
const router = express.Router();
const candidatController = require('../controllers/candidateController.js');
const upload   = require('../middlewares/upload.js')
 router.post('/register', candidatController.candidatPost);
 router.get('/persontage/:id', candidatController.getProfileCompletion);
 router.get('/getCandidateById/:id',candidatController.getCandidateById);
 router.get('/getCandidatByuserId/:userId',candidatController.getCandidateByUserId);
 router.put('/update/:id',upload.single('cvFile'),candidatController.updateCandidate);
 module.exports = router;