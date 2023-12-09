const apiUrl = 'http://localhost:8084/users';

async function handleManualLogin (username, password) {
    async function getUserByEmail(email, password) {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch users from the server');
        }
    
        const data = await response.json();
        const users = data.data;
        const userWithEmail = users.find(user => user.email === email); // find the user
        // const userWithEmail = users.find(user => user.email === email && user.password === password); // find the user
    
        return userWithEmail || null;
      } catch (error) {
        console.error(error.message);
        return null;
      }
    }

    getUserByEmail(username, password) // check if the user is authenticated
      .then((user) => { console.log(user) }) // set the user
      .catch((err) => console.log("Error checking user authentication:", err.message));
  }

handleManualLogin('ihasaan@umass.edu', '12345678');

