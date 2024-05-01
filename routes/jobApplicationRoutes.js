const express = require('express');
const router = express.Router();
const jobapplicationController = require('../controllers/jobApplicationController.js');

 router.post('/addjobapplication', jobapplicationController.createJobApplication);
  router.get('/getalljobapplication', jobapplicationController.getAllJobApplications);
//  router.get('/onejobPost/:id', jobapplicationController.getoneJobPost);
  router.put('/updatejobapplication/:id', jobapplicationController.updateJobApplication);
//  router.delete('/deljobPost/:id', jobapplicationController.deleteoneJobPost);
//  router.get('/openjobPost', jobapplicationController.getAllOpenJobPosts);
 module.exports = router;