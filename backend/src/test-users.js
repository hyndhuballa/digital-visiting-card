const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createTestUsers() {
    const uri = 'mongodb+srv://admins:visitingcards@vistocard.t30ugqa.mongodb.net/cardly-connect?retryWrites=true&w=majority&appName=VistoCard';
    const client = new MongoClient(uri);

    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('✅ Connected to MongoDB Atlas successfully');

        const db = client.db();
        const usersCollection = db.collection('users');

        // Test users data
        const testUsers = [
            {
                username: "testuser1",
                email: "test1@example.com",
                password: await bcrypt.hash("password123", 10),
                profilePicture: "https://example.com/avatar1.jpg",
                bio: "Test User 1",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: "testuser2",
                email: "test2@example.com",
                password: await bcrypt.hash("password123", 10),
                profilePicture: "https://example.com/avatar2.jpg",
                bio: "Test User 2",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        // Insert test users
        console.log('\nInserting test users...');
        const result = await usersCollection.insertMany(testUsers);
        console.log('✅ Inserted users with IDs:', result.insertedIds);

        // Verify the users were created
        console.log('\nVerifying created users:');
        const createdUsers = await usersCollection.find({}).toArray();
        createdUsers.forEach((user, index) => {
            console.log(`\nUser ${index + 1}:`);
            console.log(JSON.stringify({
                _id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                createdAt: user.createdAt
            }, null, 2));
        });

        return true;
    } catch (error) {
        console.error('❌ Error:', error);
        return false;
    } finally {
        await client.close();
        console.log('\nConnection closed');
    }
}

createTestUsers().then(success => {
    if (success) {
        console.log('\nTest completed successfully');
    } else {
        console.log('\nTest failed');
    }
    process.exit(0);
}); 