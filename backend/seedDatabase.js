const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./model/userModel');

dotenv.config();

// Test user credentials
const testUsers = [
    {
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'Admin123',
        role: 'admin',
        balance: 100000,
        commissionBalance: 0
    },
    {
        name: 'Seller User',
        email: 'seller@test.com',
        password: 'Seller123',
        role: 'seller',
        balance: 5000,
        commissionBalance: 0
    },
    {
        name: 'Buyer User',
        email: 'buyer@test.com',
        password: 'Buyer123',
        role: 'buyer',
        balance: 10000,
        commissionBalance: 0
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DATABASE_CLOUD);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('\n🗑️  Clearing existing data...');
        await User.deleteMany({});
        await mongoose.connection.db.collection('products').deleteMany({});
        await mongoose.connection.db.collection('biddingproducts').deleteMany({});
        await mongoose.connection.db.collection('categories').deleteMany({});
        console.log('✅ All data cleared');

        // Create test users
        console.log('\n👥 Creating test users...');
        for (const userData of testUsers) {
            const user = await User.create(userData);
            console.log(`✅ Created ${user.role}: ${user.email} (Password: ${userData.password})`);
        }

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📋 Test Account Credentials:');
        console.log('================================');
        testUsers.forEach(user => {
            console.log(`\n${user.role.toUpperCase()}:`);
            console.log(`  Email: ${user.email}`);
            console.log(`  Password: ${user.password}`);
            console.log(`  Balance: $${user.balance}`);
        });
        console.log('\n================================');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
