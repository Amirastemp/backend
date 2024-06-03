// controllers/contactController.js
const Contact = require('../models/contactModule');

exports.createContact = async (req, res) => {
  try {
    const { name, email, sujet, message } = req.body;
    const newContact = new Contact({ name, email, sujet, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the contact' });
  }
};
