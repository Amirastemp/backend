// Import required modules
const express = require('express');
const router = express.Router();

// Import the search controller
const searchController = require('../controllers/searchController');

// Define the route for search requests
router.get('/searchUser', searchController.search);

// Export the router
module.exports = router;