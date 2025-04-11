const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const User = require('../models/user.model');

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate('contacts', 'username email profilePicture')
            .populate('cards', 'title description');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { username, email, bio, profilePicture } = req.body;
        
        // Check if username or email is already taken
        if (username || email) {
            const existingUser = await User.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ],
                _id: { $ne: req.user._id }
            });
            
            if (existingUser) {
                return res.status(400).json({ message: 'Username or email already taken' });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { username, email, bio, profilePicture },
            { new: true, runValidators: true }
        ).select('-password');

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

// Update password
router.put('/password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        const user = await User.findById(req.user._id);
        const isMatch = await user.comparePassword(currentPassword);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password', error: error.message });
    }
});

// Delete user account
router.delete('/account', auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.clearCookie('token');
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting account', error: error.message });
    }
});

module.exports = router; 