const { MongoClient } = require('mongodb');

async function insertCard(cardData) {
    const client = new MongoClient('mongodb+srv://admins:visitingcards@vistocard.t30ugqa.mongodb.net/cardly-connect?retryWrites=true&w=majority&appName=VistoCard');
    
    try {
        console.log('Attempting to connect to MongoDB...');
        await client.connect();
        console.log('✅ Connected to MongoDB Atlas successfully');

        const db = client.db();
        console.log('Using database:', db.databaseName);
        
        const collection = db.collection('cards');
        console.log('Inserting card data:', cardData);
        
        const result = await collection.insertOne(cardData);
        console.log('✅ Card inserted with ID:', result.insertedId);

        // Verify the insertion by retrieving the card
        const insertedCard = await collection.findOne({ _id: result.insertedId });
        console.log('Retrieved card:', insertedCard);

        return result;
    } catch (err) {
        console.error('❌ Error inserting card:', err);
        return null;
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

// Test card data
const testCard = {
    name: "John Doe",
    email: "johndoe@example.com",
    contact: "1234567890",
    socialLinks: { linkedin: "linkedin.com/johndoe" },
    createdAt: new Date(),
    updatedAt: new Date()
};

// Run the test
insertCard(testCard).then(result => {
    if (result) {
        console.log('Test completed successfully');
    } else {
        console.log('Test failed');
    }
    process.exit(0);
}); 