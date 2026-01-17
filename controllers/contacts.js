const Contact = require('../models/contact'); // lowercase path matches file

// Get all contacts
const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get contacts', error: error.message });
  }
};

// Get a single contact by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get contact', error: error.message });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'firstName, lastName, and email are required' });
    }

    const newContact = await Contact.create({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create contact', error: error.message });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'firstName, lastName, and email are required' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, favoriteColor, birthday },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update contact', error: error.message });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete contact', error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
