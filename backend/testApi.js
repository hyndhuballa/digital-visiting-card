const axios = require('axios');

const testLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: '123456'
    }, {
      withCredentials: true
    });

    console.log('✅ Login Success:', response.data);
  } catch (error) {
    console.log('❌ Login Error:', error.response ? error.response.data : error.message);
  }
};

testLogin();
