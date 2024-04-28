// controllers/searchController.js
const User = require('../models/userModel');


exports.search = async (req, res) => {
    try {
        const pageSize = parseInt(req.query.pageSize) || 10;
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const search = req.query.search || "";

        // Construct the query to find users with exact matching first name, last name, username, or email
        // Also filter by role === 'employee'
        const query = {
            $and: [
                {
                    $or: [
                        { firstName: search },
                        { lastName: search },
                        { userName: search },
                        { email: search }
                    ]
                },
                { role: 'employee' } // Filter by role === 'employee'
            ]
        };

        // Count documents matching the query
        const totalElements = await User.countDocuments(query);

        // Calculate total number of pages
        const totalPages = Math.ceil(totalElements / pageSize);

        // Fetch documents for the current page with pagination
        const results = await User.find(query)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        // Send response with total elements, total pages, and results
        res.json({
            totalElements: totalElements,
            totalPages: totalPages,
            results: results
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};









  



