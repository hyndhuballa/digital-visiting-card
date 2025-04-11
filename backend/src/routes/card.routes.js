const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Card = require('../models/card.model');
const User = require('../models/user.model');

// Get all cards
router.get('/', auth, async (req, res) => {
    try {
        const cards = await Card.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cards', error: error.message });
    }
});

// Create a new card
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, fields } = req.body;
        
        const card = new Card({
            title,
            description,
            fields,
            user: req.user._id
        });

        await card.save();
        
        // Add card to user's cards array
        await User.findByIdAndUpdate(req.user._id, {
            $push: { cards: card._id }
        });

        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({ message: 'Error creating card', error: error.message });
    }
});

// Get a specific card
router.get('/:cardId', auth, async (req, res) => {
    try {
        const card = await Card.findOne({
            _id: req.params.cardId,
            user: req.user._id
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.json(card);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching card', error: error.message });
    }
});

// Update a card
router.put('/:cardId', auth, async (req, res) => {
    try {
        const { title, description, fields } = req.body;
        
        const card = await Card.findOneAndUpdate(
            { _id: req.params.cardId, user: req.user._id },
            { title, description, fields },
            { new: true, runValidators: true }
        );

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.json(card);
    } catch (error) {
        res.status(500).json({ message: 'Error updating card', error: error.message });
    }
});

// Delete a card
router.delete('/:cardId', auth, async (req, res) => {
    try {
        const card = await Card.findOneAndDelete({
            _id: req.params.cardId,
            user: req.user._id
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Remove card from user's cards array
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { cards: card._id }
        });

        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting card', error: error.message });
    }
});

// Share card with a contact
router.post('/:cardId/share', auth, async (req, res) => {
    try {
        const { contactId } = req.body;
        
        // Verify contact exists
        const user = await User.findById(req.user._id);
        if (!user.contacts.includes(contactId)) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Get the card
        const card = await Card.findOne({
            _id: req.params.cardId,
            user: req.user._id
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Add to sharedWith array if not already shared
        if (!card.sharedWith.includes(contactId)) {
            card.sharedWith.push(contactId);
            await card.save();
        }

        res.json({ message: 'Card shared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sharing card', error: error.message });
    }
});

module.exports = router; 