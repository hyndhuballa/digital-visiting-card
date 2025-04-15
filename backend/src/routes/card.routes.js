const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getDb } = require('../config/database');

// Get all cards
router.get('/', auth, async (req, res) => {
    try {
        const db = getDb();
        const cards = await db.collection('cards')
            .find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .toArray();
        res.json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ message: 'Error fetching cards', error: error.message });
    }
});

// Create a new card
router.post('/', auth, async (req, res) => {
    try {
        const { name, email, contact, socialLinks } = req.body;
        const db = getDb();
        
        const card = {
            name,
            email,
            contact,
            socialLinks,
            user: req.user._id,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('cards').insertOne(card);
        
        // Add card to user's cards array
        await db.collection('users').updateOne(
            { _id: req.user._id },
            { $push: { cards: result.insertedId } }
        );

        res.status(201).json({ ...card, _id: result.insertedId });
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ message: 'Error creating card', error: error.message });
    }
});

// Get a specific card
router.get('/:cardId', auth, async (req, res) => {
    try {
        const db = getDb();
        const card = await db.collection('cards').findOne({
            _id: req.params.cardId,
            user: req.user._id
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.json(card);
    } catch (error) {
        console.error('Error fetching card:', error);
        res.status(500).json({ message: 'Error fetching card', error: error.message });
    }
});

// Update a card
router.put('/:cardId', auth, async (req, res) => {
    try {
        const { title, description, fields } = req.body;
        
        const db = getDb();
        const card = await db.collection('cards').findOneAndUpdate(
            { _id: req.params.cardId, user: req.user._id },
            {
                $set: {
                    title,
                    description,
                    fields,
                    updatedAt: new Date()
                }
            },
            { returnDocument: 'after' }
        );

        if (!card.value) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.json(card.value);
    } catch (error) {
        console.error('Error updating card:', error);
        res.status(500).json({ message: 'Error updating card', error: error.message });
    }
});

// Delete a card
router.delete('/:cardId', auth, async (req, res) => {
    try {
        const db = getDb();
        const card = await db.collection('cards').findOneAndDelete({
            _id: req.params.cardId,
            user: req.user._id
        });

        if (!card.value) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Remove card from user's cards array
        await db.collection('users').updateOne(
            { _id: req.user._id },
            { $pull: { cards: card.value._id } }
        );

        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ message: 'Error deleting card', error: error.message });
    }
});

// Share card with a contact
router.post('/:cardId/share', auth, async (req, res) => {
    try {
        const { contactId } = req.body;
        
        // Verify contact exists
        const db = getDb();
        const user = await db.collection('users').findOne({ _id: req.user._id });
        if (!user.contacts.includes(contactId)) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Get the card
        const card = await db.collection('cards').findOne({
            _id: req.params.cardId,
            user: req.user._id
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Add to sharedWith array if not already shared
        if (!card.sharedWith.includes(contactId)) {
            await db.collection('cards').updateOne(
                { _id: req.params.cardId, user: req.user._id },
                { $push: { sharedWith: contactId } }
            );
        }

        res.json({ message: 'Card shared successfully' });
    } catch (error) {
        console.error('Error sharing card:', error);
        res.status(500).json({ message: 'Error sharing card', error: error.message });
    }
});

module.exports = router; 