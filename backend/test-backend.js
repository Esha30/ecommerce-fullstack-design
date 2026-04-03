import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const testAuth = async () => {
    console.log('--- Testing Backend Auth ---');

    // 1. Test Admin Login
    console.log('\nTesting Admin Login (instaguard)...');
    try {
        const adminLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'instaguard',
            password: 'esha@123'
        });
        console.log('✅ Admin Login Successful:', adminLogin.data.role);
    } catch (error) {
        console.log('❌ Admin Login Failed:', error.response?.data?.message || error.message);
    }

    // 2. Test User Login
    console.log('\nTesting User Login (mughalesha362@gmail.com)...');
    try {
        const userLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'mughalesha362@gmail.com',
            password: 'esha@123'
        });
        console.log('✅ User Login Successful:', userLogin.data.role);
    } catch (error) {
        console.log('❌ User Login Failed:', error.response?.data?.message || error.message);
    }

    // 3. Test Signup with Invalid Email
    console.log('\nTesting Signup with Invalid Email...');
    try {
        const invalidSignup = await axios.post(`${API_URL}/auth/signup`, {
            username: 'Test User',
            email: 'invalid-email',
            password: 'password123'
        });
        console.log('❌ Signup with invalid email should have failed but succeeded:', invalidSignup.data);
    } catch (error) {
        console.log('✅ Signup with invalid email failed as expected:', error.response?.data?.message || error.message);
    }

    // 4. Test Signup with valid email
    console.log('\nTesting Signup with Valid Email (test_new@gmail.com)...');
    try {
        const validSignup = await axios.post(`${API_URL}/auth/signup`, {
            username: 'Test New User',
            email: 'test_new@gmail.com',
            password: 'password123'
        });
        console.log('✅ Signup with valid email successful:', validSignup.data.message);
    } catch (error) {
        console.log('❌ Signup with valid email failed:', error.response?.data?.message || error.message);
    }
};

testAuth();
