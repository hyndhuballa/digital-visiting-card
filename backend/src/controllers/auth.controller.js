const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getDb } = require('../config/database');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const db = getDb();

        // Check if user exists
        const existingUser = await db.collection('users').findOne({
            $or: [{ email }, { username }]
        });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const result = await db.collection('users').insertOne({
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Generate token
        const token = generateToken(result.insertedId);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: result.insertedId,
                username,
                email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = getDb();

        // Find user
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user._id);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

const getCurrentUser = async (req, res) => {
    try {
        const db = getDb();
        const user = await db.collection('users').findOne(
            { _id: req.user._id },
            { projection: { password: 0 } }
        );
        res.json(user);
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

module.exports = {
    register,
    login,
    logout,
    getCurrentUser
}; 