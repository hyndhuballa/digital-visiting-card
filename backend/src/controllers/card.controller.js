const Card = require('../models/card.model');

// Create a new card
const createCard = async (req, res) => {
    try {
        const card = new Card({
            ...req.body,
            owner: req.user._id
        });
        await card.save();
        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({ message: 'Error creating card', error: error.message });
    }
};

// Get all cards for the current user
const getCards = async (req, res) => {
    try {
        const cards = await Card.find({
            $or: [
                { owner: req.user._id },
                { 'sharedWith.user': req.user._id }
            ]
        }).populate('owner', 'username email');
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cards', error: error.message });
    }
};

// Get a single card
const getCard = async (req, res) => {
    try {
        const card = await Card.findOne({
            _id: req.params.id,
            $or: [
                { owner: req.user._id },
                { 'sharedWith.user': req.user._id },
                { isPublic: true }
            ]
        }).populate('owner', 'username email');

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Increment views if the viewer is not the owner
        if (card.owner._id.toString() !== req.user._id.toString()) {
            card.views += 1;
            card.lastViewed = new Date();
            await card.save();
        }

        res.json(card);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching card', error: error.message });
    }
};

// Update a card
const updateCard = async (req, res) => {
    try {
        const card = await Card.findOne({
            _id: req.params.id,
            $or: [
                { owner: req.user._id },
                { 'sharedWith.user': req.user._id, 'sharedWith.permission': 'edit' }
            ]
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        Object.assign(card, req.body);
        await card.save();
        res.json(card);
    } catch (error) {
        res.status(500).json({ message: 'Error updating card', error: error.message });
    }
};

// Delete a card
const deleteCard = async (req, res) => {
    try {
        const card = await Card.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting card', error: error.message });
    }
};

// Share a card with another user
const shareCard = async (req, res) => {
    try {
        const { userId, permission } = req.body;
        const card = await Card.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Check if already shared with the user
        const existingShare = card.sharedWith.find(share => 
            share.user.toString() === userId
        );

        if (existingShare) {
            existingShare.permission = permission;
        } else {
            card.sharedWith.push({ user: userId, permission });
        }

        await card.save();
        res.json(card);
    } catch (error) {
        res.status(500).json({ message: 'Error sharing card', error: error.message });
    }
};

// Search cards
const searchCards = async (req, res) => {
    try {
        const { query } = req.query;
        const cards = await Card.find({
            $and: [
                { $text: { $search: query } },
                {
                    $or: [
                        { owner: req.user._id },
                        { 'sharedWith.user': req.user._id },
                        { isPublic: true }
                    ]
                }
            ]
        }).populate('owner', 'username email');
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Error searching cards', error: error.message });
    }
};

module.exports = {
    createCard,
    getCards,
    getCard,
    updateCard,
    deleteCard,
    shareCard,
    searchCards
}; 