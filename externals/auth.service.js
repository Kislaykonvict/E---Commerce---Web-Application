
const axios = require('axios').default;
axios.defaults.baseURL = 'http://localhost:3000';

const getAuthToken = async (payload) => {
    return await axios.post('/auth/getAccessToken', payload);
}

const validateToken = async (userToken) => {
    const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : userToken
    };
    // const validateStatus = (status) => {
    //     return status < 500; // Resolve only if the status code is less than 500
    // }
    return await axios.get('/auth/validate', { 
        headers : headers, 
        validateStatus : (status) => {
            return status < 500;
        }
    });
}

module.exports = {
    getAuthToken : getAuthToken,
    validateToken : validateToken
}