const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb+srv://admins:visitingcards@vistocard.t30ugqa.mongodb.net/cardly-connect?retryWrites=true&w=majority&appName=VistoCard';
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('cards');

        // 1. Insert multiple cards
        console.log('\n1. Inserting multiple cards...');
        const cards = [
            {
                name: "Test User 1",
                email: "test1@example.com",
                contact: "1111111111",
                socialLinks: { linkedin: "linkedin.com/test1" },
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Test User 2",
                email: "test2@example.com",
                contact: "2222222222",
                socialLinks: { linkedin: "linkedin.com/test2" },
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        const insertResult = await collection.insertMany(cards);
        console.log('Inserted cards with IDs:', insertResult.insertedIds);

        // 2. Update a card
        console.log('\n2. Updating a card...');
        const firstCardId = insertResult.insertedIds[0];
        const updateResult = await collection.updateOne(
            { _id: firstCardId },
            { $set: { name: "Updated Test User 1", updatedAt: new Date() } }
        );
        console.log('Updated documents:', updateResult.modifiedCount);

        // 3. Delete a card
        console.log('\n3. Deleting a card...');
        const secondCardId = insertResult.insertedIds[1];
        const deleteResult = await collection.deleteOne({ _id: secondCardId });
        console.log('Deleted documents:', deleteResult.deletedCount);

        // 4. List all cards
        console.log('\n4. Current cards in collection:');
        const allCards = await collection.find({}).toArray();
        console.log(allCards);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
        console.log('\nConnection closed');
    }
}

main(); 