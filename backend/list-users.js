import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/user.model.js';
import { connectDB } from './src/lib/db.js';

dotenv.config();

const listUsers = async () => {
    await connectDB();
    const users = await User.find({}, 'username email role');
    console.log('--- Current Users in DB ---');
    console.log(JSON.stringify(users, null, 2));
    process.exit(0);
};

listUsers();
