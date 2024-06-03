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
router.delete('/deleteprobyid/:id', expProController.deleteProfessionalExperience);
router.get('/getProbyid/:id', expProController.getexpProById);
router.put('/updateexpPro/:id', expProController.updateProfessionalExperience);
//les routes of expAcaController
router.get('/expAca/:candidatId', expAcaController.getAllAcademicExperiencesbyidcandidat);
router.post('/addExperienceAcabyId/:candidateId', expAcaController.createAcademicExpbyIdCandidat);
router.delete('/deleteacabyid/:id', expAcaController.deleteAcademicExperience);
router.get('/getAcabyid/:id', expAcaController.getexpAcaById);
router.put('/updateexpAca/:id', expAcaController.updateAcademicExperience);
//les routes of SkillsController
router.get('/skill/:candidatId',skillsController.getAllSkillsByIdCandidat);
router.post('/addskillsbyId/:candidateId',skillsController.createSkillByCandidateId) ;
router.delete('/deleteskillbyid/:id', skillsController.deleteSkill);
router.get('/getskillbyid/:id', skillsController.getSkillById);
router.put('/updateskill/:id', skillsController.updateSkill);
module.exports = router;