const express = require('express');
const router = express.Router();
const jobpostController = require('../controllers/jobPostController.js');

 router.post('/addjobPost', jobpostController.createJobPost);
 router.get('/alljobPost', jobpostController.getAllJobPosts);
 router.get('/onejobPost/:id', jobpostController.getoneJobPost);
 router.put('/updatejobPost/:id', jobpostController.updateoneJobPost);
 router.delete('/deljobPost/:id', jobpostController.deleteoneJobPost);
 router.get('/openjobPost', jobpostController.getAllOpenJobPosts);
 module.exports = router;