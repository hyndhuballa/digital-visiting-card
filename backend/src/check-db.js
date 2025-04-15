const { MongoClient } = require('mongodb');

async function checkDatabase() {
    const uri = 'mongodb+srv://admins:visitingcards@vistocard.t30ugqa.mongodb.net/cardly-connect?retryWrites=true&w=majority&appName=VistoCard';
    const client = new MongoClient(uri);

    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('✅ Connected to MongoDB Atlas successfully');

        const db = client.db();
        console.log('Database name:', db.databaseName);

        // Check cards collection
        console.log('\nChecking cards collection:');
        const cards = await db.collection('cards').find({}).toArray();
        console.log('Total cards:', cards.length);
        cards.forEach((card, index) => {
            console.log(`\nCard ${index + 1}:`);
            console.log(JSON.stringify(card, null, 2));
        });

        // Check users collection
        console.log('\nChecking users collection:');
        const users = await db.collection('users').find({}).toArray();
        console.log('Total users:', users.length);
        users.forEach((user, index) => {
            console.log(`\nUser ${index + 1}:`);
            console.log(JSON.stringify(user, null, 2));
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.close();
        console.log('\nConnection closed');
    }
}

checkDatabase(); 