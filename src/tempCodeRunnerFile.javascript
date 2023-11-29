const axios = require('axios');

const apiUrl = 'http://localhost:8084/auth';

const checkUserAuthentication = async (email, password) => {
  try {
    const response = await axios.get(apiUrl);
    const authentications = response.data.data;

    const userExists = authentications.some(
      (authentication) => authentication.auth_provider === email && authentication.access_token === password
    );

    if (response.status === 201) {
      console.log('User created successfully:', response.data.data);
    } else {
      console.log('Failed to create user:', response.data.message);
    }

    return userExists;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

checkUserAuthentication("ibzimh@gmail.com", '123456').then((userExists) => console.log(userExists));