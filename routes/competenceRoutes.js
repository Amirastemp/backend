const express = require('express');
const router = express.Router();
//skills Controller
const skillsController = require('../controllers/skillsController.js');
//academic  Controller
const expAcaController = require('../controllers/academicExperienceController.js');
// professional Controller
const expProController = require('../controllers/professionalExperienceController.js');
//les routes of expProController
router.get('/expPro/:candidateId', expProController.getAllProfessionalExperiencesByCandidateId);
router.post('/addExperienceProbyId/:candidateId', expProController.createProfessionalExpByidCandidat);
router.delete('/deletebyid/:id', expProController.deleteProfessionalExperience);
//les routes of expAcaController
router.get('/expAca/:candidatId', expAcaController.getAllAcademicExperiencesbyidcandidat);
router.post('/addExperienceAcabyId/:candidateId', expAcaController.createAcademicExpbyIdCandidat);
router.delete('/deletebyid/:id', expAcaController.deleteAcademicExperience);
//les routes of SkillsController
router.get('/skill/:candidatId',skillsController.getAllSkillsByIdCandidat);
router.post('/addskillsbyId/:candidateId',skillsController.createSkillByCandidateId) ;
router.delete('/deletebyid/:id', skillsController.deleteSkill);
module.exports = router;