import axios from 'axios';

const apiUrl = 'http://localhost:8084/auth';

const createUser = async (email, password) => {
  try {
    const response = await axios.post(apiUrl, {
      auth_provider: email,
      access_token: password,
    });

    if (response.status === 201) {
      console.log('User created successfully:', response.data.data);
    } else {
      console.log('Failed to create user:', response.data.message);
    }
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};

const checkUserAuthentication = async (email, password) => {
  try {
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      const authentications = response.data.data;
      const userExists = authentications.some(auth => auth.email === email && auth.password === password);

      return userExists;
    } else {
      console.error('Server responded with status:', response.status);
      return false;
    }

    return userExists;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default { createUser, checkUserAuthentication };