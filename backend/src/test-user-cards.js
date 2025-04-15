const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function testUserCardOperations() {
    const uri = 'mongodb+srv://admins:visitingcards@vistocard.t30ugqa.mongodb.net/cardly-connect?retryWrites=true&w=majority&appName=VistoCard';
    const client = new MongoClient(uri);

    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('✅ Connected to MongoDB Atlas successfully');

        const db = client.db();
        const usersCollection = db.collection('users');
        const cardsCollection = db.collection('cards');

        // 1. Test user authentication
        console.log('\n1. Testing user authentication...');
        const testUser = {
            username: "testuser3",
            email: "test3@example.com",
            password: await bcrypt.hash("password123", 10),
            profilePicture: "https://example.com/avatar3.jpg",
            bio: "Test User 3",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const userResult = await usersCollection.insertOne(testUser);
        console.log('✅ Created test user with ID:', userResult.insertedId);

        // Verify password
        const storedUser = await usersCollection.findOne({ _id: userResult.insertedId });
        const passwordMatch = await bcrypt.compare("password123", storedUser.password);
        console.log('✅ Password verification:', passwordMatch ? 'Success' : 'Failed');

        // 2. Create and associate cards with the user
        console.log('\n2. Creating and associating cards with user...');
        const testCards = [
            {
                name: "Business Card 1",
                email: "business1@example.com",
                contact: "1111111111",
                socialLinks: { linkedin: "linkedin.com/business1" },
                user: userResult.insertedId,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Business Card 2",
                email: "business2@example.com",
                contact: "2222222222",
                socialLinks: { linkedin: "linkedin.com/business2" },
                user: userResult.insertedId,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        const cardsResult = await cardsCollection.insertMany(testCards);
        console.log('✅ Created cards with IDs:', cardsResult.insertedIds);

        // Update user with card references
        await usersCollection.updateOne(
            { _id: userResult.insertedId },
            { $set: { cards: cardsResult.insertedIds } }
        );
        console.log('✅ Associated cards with user');

        // 3. Test user-card relationship
        console.log('\n3. Testing user-card relationship...');
        
        // Get user with their cards
        const userWithCards = await usersCollection.findOne(
            { _id: userResult.insertedId },
            { projection: { password: 0 } }
        );
        console.log('User with card references:', userWithCards);

        // Get cards belonging to the user
        const userCards = await cardsCollection.find(
            { user: userResult.insertedId }
        ).toArray();
        console.log('Cards belonging to user:', userCards);

        return true;
    } catch (error) {
        console.error('❌ Error:', error);
        return false;
    } finally {
        await client.close();
        console.log('\nConnection closed');
    }
}

testUserCardOperations().then(success => {
    if (success) {
        console.log('\nAll tests completed successfully');
    } else {
        console.log('\nTests failed');
    }
    process.exit(0);
}); 