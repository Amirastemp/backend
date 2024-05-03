// Import required modules
const express = require('express');
const router = express.Router();

// Import the search controller
const trainingController = require('../controllers/trainingController');

// Define the route for search requests
 router.post('/addschedule', trainingController.createschedule);
 router.get('/alltraining', trainingController.getAlltraining);
 router.get('/gettraining/:id', trainingController.getonetraining);
 router.put('/updatetraining/:id', trainingController.updateonetraining);
 router.delete('/deletetraining/:id', trainingController.deleteonetraining);
// Export the router
module.exports = router;