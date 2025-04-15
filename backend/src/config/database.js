const { MongoClient } = require('mongodb');

let db;
let client;

async function connectToDatabase() {
    try {
        const uri = process.env.MONGODB_URI;
        client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await client.connect();
        db = client.db(); // This will use the database specified in the connection string
        console.log('✅ Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db;
}

// Handle MongoDB connection events
process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1);
    }
});

module.exports = {
    connectToDatabase,
    getDb
}; 