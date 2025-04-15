const { MongoClient } = require('mongodb');

async function testCardOperations() {
    const client = new MongoClient('mongodb+srv://admins:visitingcards@vistocard.t30ugqa.mongodb.net/cardly-connect?retryWrites=true&w=majority&appName=VistoCard');
    
    try {
        console.log('Attempting to connect to MongoDB...');
        await client.connect();
        console.log('✅ Connected to MongoDB Atlas successfully');

        const db = client.db();
        const collection = db.collection('cards');

        // 1. Test inserting multiple cards
        console.log('\n1. Testing multiple card insertion...');
        const testCards = [
            {
                name: "Alice Smith",
                email: "alice@example.com",
                contact: "1234567890",
                socialLinks: { linkedin: "linkedin.com/alice" },
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Bob Johnson",
                email: "bob@example.com",
                contact: "0987654321",
                socialLinks: { linkedin: "linkedin.com/bob" },
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        const insertResult = await collection.insertMany(testCards);
        console.log('✅ Inserted cards with IDs:', insertResult.insertedIds);

        // 2. Test updating a card
        console.log('\n2. Testing card update...');
        const firstCardId = insertResult.insertedIds[0];
        const updateResult = await collection.updateOne(
            { _id: firstCardId },
            { 
                $set: { 
                    name: "Alice Smith Updated",
                    email: "alice.updated@example.com",
                    updatedAt: new Date()
                }
            }
        );
        console.log('✅ Updated card:', updateResult.modifiedCount, 'document(s) modified');

        // 3. Test deleting a card
        console.log('\n3. Testing card deletion...');
        const secondCardId = insertResult.insertedIds[1];
        const deleteResult = await collection.deleteOne({ _id: secondCardId });
        console.log('✅ Deleted card:', deleteResult.deletedCount, 'document(s) deleted');

        // 4. Check existing cards in the collection
        console.log('\n4. Checking existing cards in collection...');
        const existingCards = await collection.find({}).toArray();
        console.log('Current cards in collection:', existingCards);

        return true;
    } catch (error) {
        console.error('❌ Error:', error);
        return false;
    } finally {
        await client.close();
        console.log('\nConnection closed');
    }
}

// Run the test
testCardOperations().then(success => {
    if (success) {
        console.log('\nAll tests completed successfully');
    } else {
        console.log('\nTests failed');
    }
    process.exit(0); 