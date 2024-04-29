const express = require('express');
const router = express.Router();
const jobpostController = require('../controllers/jobPostController.js');

 router.post('/addjobPost', jobpostController.createJobPost);
 router.get('/alljobPost', jobpostController.getAllJobPosts);
 module.exports = router;