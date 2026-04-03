import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/user.model.js';
import { connectDB } from './src/lib/db.js';

dotenv.config();

const checkUser = async () => {
    await connectDB();
    const username = 'instaguard';
    const email = 'mughalesha362@gmail.com';

    const userByUsername = await User.findOne({ username });
    if (userByUsername) {
        console.log(`Found user by username "${username}":`, JSON.stringify(userByUsername, null, 2));
    } else {
        console.log(`No user found with username "${username}"`);
    }

    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
        console.log(`Found user by email "${email}":`, JSON.stringify(userByEmail, null, 2));
    } else {
        console.log(`No user found with email "${email}"`);
    }

    process.exit(0);
};

checkUser();
