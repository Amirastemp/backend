const express = require('express');
const router = express.Router();
const candidatController = require('../controllers/candidateController.js');

 router.post('/register', candidatController.candidatPost);
 router.get('/persontage/:id', candidatController.getProfileCompletion);
 router.get('/getCandidateById/:id',candidatController.getCandidateById);
 router.get('/getCandidatByuserId/:userId',candidatController.getCandidateByUserId);
 router.put('/update/:id',candidatController.updateCandidate);
 module.exports = router;