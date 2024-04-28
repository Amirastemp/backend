 
const express = require('express');
const router = express.Router();
const congeController = require('../controllers/congeController.js');

 router.get('/requests', congeController.getAllRequests);
 router.get('/requests/:id', congeController.getrequestsbyidemp);
 router.post('/request', congeController.addrequest);
 router.delete('/request/:id', congeController.deleteRequest);
 router.get('/request/:id', congeController. getRequestById);
 router.put('/request/:id',congeController.updateRequest);
 module.exports = router;
