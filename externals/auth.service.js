
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
            // Resolve only if the status code is less than 500
            return status < 500;
        }
    });
}

const deleteToken = async (bearerToken) => {
    const headers = {
        "Authorization" : bearerToken
    }
    return await axios.get('/auth/deleteUserToken', { headers })
}
module.exports = {
    getAuthToken : getAuthToken,
    validateToken : validateToken,
    deleteToken : deleteToken
}