const apiUrl = 'http://localhost:8084/auth';

const createUser = async (email, password) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        auth_provider: email,
        access_token: password,
      })
    });

    const data = await response.json();

    if (response.status === 201) {
      console.log('User created successfully:', data.data);
    } else {
      console.log('Failed to create user:', data.message);
    }
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};

const checkUserAuthentication = async (email, password) => {
  try {
    const response = await fetch(apiUrl);

    if (response.status === 200) { 
      const data = await response.json();
      const authentications = data.data;
      const userExists = authentications.some(auth => auth.auth_provider === email && auth.access_token === password);

      return userExists;
    } else {
      console.error('Server responded with status:', response.status);
      return false;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default { createUser, checkUserAuthentication };