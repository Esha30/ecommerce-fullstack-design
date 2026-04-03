import axios from 'axios';

const API_URL = 'http://localhost:3000/api';
let adminToken = '';
let userToken = '';

const testAudit = async () => {
    console.log('--- Starting Comprehensive Backend Audit ---');

    // 1. Auth - Signup Validation
    console.log('\n[1] Testing Signup Validation...');
    const signupData = [
        { name: 'Invalid', email: 'not-an-email', pass: '123456', expected: 'fail' },
        { name: 'Disposable', email: 'test@mailinator.com', pass: '123456', expected: 'fail' },
        { name: 'Valid', email: `audit_user_${Date.now()}@gmail.com`, pass: 'esha@123', expected: 'pass' }
    ];

    for (const data of signupData) {
        try {
            const res = await axios.post(`${API_URL}/auth/signup`, {
                username: data.name,
                email: data.email,
                password: data.pass
            });
            console.log(`- ${data.email}: ✅ Signup Succeeded (Expected: ${data.expected})`);
        } catch (error) {
            console.log(`- ${data.email}: ❌ Signup Failed: ${error.response?.data?.message || error.message} (Expected: ${data.expected})`);
        }
    }

    // 2. Auth - Login
    console.log('\n[2] Testing Login...');
    try {
        const adminLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'instaguard7@gmail.com',
            password: 'esha@123'
        });
        console.log('✅ Admin Login Successful:', adminLogin.data.role);
    } catch (error) {
        console.log('❌ Admin Login Failed:', error.response?.data?.message || error.message);
    }

    try {
        const userLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'mughalesha362@gmail.com',
            password: 'esha@123'
        });
        console.log('✅ User Login Successful:', userLogin.data.role);
    } catch (error) {
        console.log('❌ User Login Failed:', error.response?.data?.message || error.message);
    }

    // 3. Products Audit
    console.log('\n[3] Testing Products API...');
    try {
        const products = await axios.get(`${API_URL}/product/get-all-products`);
        console.log(`✅ Fetched ${products.data.length} products`);
        if (products.data.length > 0) {
            const firstId = products.data[0]._id;
            const single = await axios.get(`${API_URL}/product/get-product/${firstId}`);
            console.log(`✅ Fetched single product: ${single.data.name}`);
        }
    } catch (error) {
        console.log('❌ Products API Failed:', error.response?.data?.message || error.message);
    }

    // 4. Inquiries Audit
    console.log('\n[4] Testing Inquiries API...');
    try {
        const inquiry = await axios.post(`${API_URL}/inquiries/create-inquiry`, {
            item: 'Audit Item',
            quantity: 10,
            unit: 'pcs',
            email: 'audit@gmail.com',
            message: 'Testing inquiry system'
        });
        console.log('✅ Created Inquiry:', inquiry.data.message);
    } catch (error) {
        console.log('❌ Inquiry Creation Failed:', error.response?.data?.message || error.message);
    }

    // 5. AI Audit (Mock Test)
    console.log('\n[5] Testing AI API...');
    try {
        const ai = await axios.post(`${API_URL}/ai/chat`, {
            message: 'Hello, what products do you have?'
        });
        console.log('✅ AI Response received');
    } catch (error) {
        console.log('❌ AI API Failed:', error.response?.data?.message || error.message);
    }

    console.log('\n--- Audit Complete ---');
};

testAudit();
