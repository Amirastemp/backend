const  io  = require('../server');
const LeaveRequest = require('../models/leaveRequest');
const sendEmailNotification = require('../middlewares/notif.js');




// Fonction pour récupérer les demandes de congé avec pagination et limite
exports.getAllRequests = async (req, res) => {
  try {
    const pageSize = 6; // Nombre d'éléments par page
    const pageNumber = req.query.pageNumber || 2; // Numéro de la page à récupérer depuis les paramètres de requête

    // Calculer l'index de départ pour la pagination
    const startIndex = (pageNumber - 1) * pageSize;

    // Récupérer les demandes de congé avec pagination et limite depuis la base de données
    const requests = await LeaveRequest.find({})
       // Limiter le nombre de résultats par page

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getrequestsbyidemp = async (req, res) => {
  try {
    // Assuming the employee ID is passed as a URL parameter
    const id_emp = req.params.id;

    // Fetch requests filtered by id_emp
    const requests = await LeaveRequest.find({ id_emp: id_emp });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


/***************************************************** */


// Function to add a new leave request
exports.addrequest = async (req, res) => {
  const { id_emp, startDate, endDate, cause, status } = req.body;

  const today = new Date().toISOString().split('T')[0]; // Get current date without time

  // Check if startDate is before today's date
  if (startDate < today) {
    return res.status(400).json({ message: "Start date cannot be before today's date." });
  }

  // Check if endDate is after startDate
  if (startDate >= endDate) {
    return res.status(400).json({ message: "End date must be after start date." });
  }

  const request = new LeaveRequest({
    id_emp,
    startDate,
    endDate,
    cause,
    status
  });

  try {
    
    // Send email notification to HR
    await sendEmailNotification(req.body);
    // Save the new leave request to the database
    const newRequest = await request.save();


    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





// Function to get a request by its ID
exports.getRequestById = async (req, res) => {
  const requestId = req.params.id; // Get the request ID from the request parameters

  try {
    // Find the request by its ID in the database
    const request = await LeaveRequest.findById(requestId);

    if (!request) {
      // If no request with the given ID is found, return 404 Not Found
      return res.status(404).json({ message: 'Request not found' });
    }

    // Return the request data
    res.json(request);
  } catch (error) {
    // If an error occurs, return 500 Internal Server Error with the error message
    res.status(500).json({ message: error.message });
  }
};


exports.deleteRequest = async (req, res) => {
  const requestId = req.params.id; // Get the request ID from the request parameters

  try {
    // Find the request by its ID and delete it from the database
    const deletedRequest = await LeaveRequest.findByIdAndDelete(requestId);

    if (!deletedRequest) {
      // If no request with the given ID is found, return 404 Not Found
      return res.status(404).json({ message: 'Request not found' });
    }

    // Return a success message
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    // If an error occurs, return 500 Internal Server Error with the error message
    res.status(500).json({ message: error.message });
  }
};


exports.updateRequest = async (req, res) => {
  const requestId = req.params.id; // Get the request ID from the request parameters
  const { startDate, endDate, cause, status } = req.body;

  try {
    // Validate the request body
    if (!startDate || !endDate || !cause || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the request by its ID
    let request = await LeaveRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update request fields
    request.startDate = startDate;
    request.endDate = endDate;
    request.cause = cause;
    request.status = status;

    // Save the updated request
    const updatedRequest = await request.save();

    // Return the updated request
    res.json(updatedRequest);
  } catch (error) {
    // Check for specific validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    // Handle other errors
    res.status(500).json({ message: error.message });
  }
};



