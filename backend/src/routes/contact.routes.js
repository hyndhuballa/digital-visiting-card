const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const User = require('../models/user.model');

// Get all contacts
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('contacts', 'username email profilePicture bio');
        res.json(user.contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error: error.message });
    }
});

// Add a contact
router.post('/', auth, async (req, res) => {
    try {
        const { email } = req.body;
        
        // Find the contact by email
        const contact = await User.findOne({ email });
        if (!contact) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if already in contacts
        const user = await User.findById(req.user._id);
        if (user.contacts.includes(contact._id)) {
            return res.status(400).json({ message: 'Contact already added' });
        }

        // Add to contacts
        user.contacts.push(contact._id);
        await user.save();

        res.status(201).json({ message: 'Contact added successfully', contact });
    } catch (error) {
        res.status(500).json({ message: 'Error adding contact', error: error.message });
    }
});

// Remove a contact
router.delete('/:contactId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const contactIndex = user.contacts.indexOf(req.params.contactId);
        
        if (contactIndex === -1) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        user.contacts.splice(contactIndex, 1);
        await user.save();

        res.json({ message: 'Contact removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing contact', error: error.message });
    }
});

// Get contact details
router.get('/:contactId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.contacts.includes(req.params.contactId)) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        const contact = await User.findById(req.params.contactId)
            .select('-password')
            .populate('cards', 'title description');
            
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact details', error: error.message });
    }
});

module.exports = router; 