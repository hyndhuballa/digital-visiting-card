const { MongoClient } = require('mongodb');

async function testConnection() {
    const uri = 'mongodb+srv://admins:visitingcards@vistocard.t30ugqa.mongodb.net/cardly-connect?retryWrites=true&w=majority&appName=VistoCard';
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        console.log('Attempting to connect to MongoDB...');
        await client.connect();
        console.log('✅ Connected to MongoDB Atlas successfully');

        // Test database access
        const db = client.db();
        console.log('Database name:', db.databaseName);

        // List collections
        const collections = await db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));

        // Test creating a card
        const sampleCard = {
            title: "Test Business Card",
            description: "A test card to verify database operations",
            fields: [
                { label: "Name", value: "Test User" },
                { label: "Email", value: "test@example.com" }
            ],
            user: "test_user_id", // This would normally be a MongoDB ObjectId
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('cards').insertOne(sampleCard);
        console.log('Created card with ID:', result.insertedId);

        // Verify the card was created by fetching it
        const createdCard = await db.collection('cards').findOne({ _id: result.insertedId });
        console.log('Retrieved card:', createdCard);

        // Clean up - delete the test card
        await db.collection('cards').deleteOne({ _id: result.insertedId });
        console.log('Test card cleaned up');

        return true;
    } catch (error) {
        console.error('❌ Error:', error);
        return false;
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

// Run the test
testConnection().then(success => {
    if (success) {
        console.log('Test completed successfully');
    } else {
        console.log('Test failed');
    }
    process.exit(0);
}); 