import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/user.model.js';
import { connectDB } from './src/lib/db.js';

dotenv.config();

const createAdmin = async () => {
    await connectDB();
    const username = 'instaguard';
    const email = 'instaguard@example.com'; // Dummy email for the username
    const password = 'esha@123';

    const existing = await User.findOne({ username });
    if (existing) {
        console.log('User "instaguard" already exists. Updating to admin...');
        existing.role = 'admin';
        await existing.save();
    } else {
        const admin = new User({
            username,
            email,
            password,
            role: 'admin'
        });
        await admin.save();
        console.log('Admin user "instaguard" created successfully!');
    }

    process.exit(0);
};

createAdmin();
