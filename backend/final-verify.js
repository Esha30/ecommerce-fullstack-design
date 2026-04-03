import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const finalVerify = async () => {
    console.log('--- Final Verification of AI and Newsletter ---');

    // 1. Test AI with new model name
    console.log('\n[1] Testing AI (gemini-2.0-flash)...');
    try {
        const ai = await axios.post(`${API_URL}/ai/chat`, {
            message: 'What is the price of the Wireless Headphones?'
        });
        console.log('✅ AI Response:', ai.data.reply ? 'Received successfully' : 'Empty response');
    } catch (error) {
        console.log('❌ AI Failed:', error.response?.data?.error || error.message);
    }

    // 2. Test Newsletter Validation
    console.log('\n[2] Testing Newsletter Validation...');
    const emails = [
        { email: 'bad-email', expected: 'fail' },
        { email: 'test@tempmail.com', expected: 'fail' },
        { email: `finall_test_${Date.now()}@gmail.com`, expected: 'pass' }
    ];

    for (const item of emails) {
        try {
            const res = await axios.post(`${API_URL}/newsletter/subscribe`, {
                email: item.email
            });
            console.log(`- ${item.email}: ✅ Subscribed (Expected: ${item.expected})`);
        } catch (error) {
            console.log(`- ${item.email}: ❌ Failed: ${error.response?.data?.message || error.message} (Expected: ${item.expected})`);
        }
    }

    process.exit(0);
};

finalVerify();
