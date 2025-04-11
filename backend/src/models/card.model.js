const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    fields: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        value: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            enum: ['text', 'email', 'phone', 'url', 'social'],
            default: 'text'
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isPublic: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    lastViewed: {
        type: Date
    }
}, {
    timestamps: true
});

// Index for faster queries
cardSchema.index({ user: 1, createdAt: -1 });
cardSchema.index({ title: 'text', description: 'text' });

// Method to increment views
cardSchema.methods.incrementViews = async function() {
    this.views += 1;
    this.lastViewed = new Date();
    await this.save();
};

// Method to check if card is shared with a user
cardSchema.methods.isSharedWith = function(userId) {
    return this.sharedWith.includes(userId);
};

const Card = mongoose.model('Card', cardSchema);

module.exports = Card; 