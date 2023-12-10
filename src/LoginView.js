//Kshama and Ibrahim
import React, { useState, useEffect } from "react";
import { Text, View, Button, Linking, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";

import qs from "qs";
import randomString from "random-string";
import URL from "url-parse";

import Config from "./env";
import RegisterView from "./RegisterView";

const loginProviders = {
  google: {
    title: "Google",
    redirect_uri: Config.BACKEND + "oauth2proxy/google", // where google will send the user back to
    client_id: Config.GOOGLE_CLIENT_ID,
    response_type: "code",
    scope: "profile email",
    token_endpoint: Config.BACKEND + "oauth2proxy/google/oauth2/google/token",
    authorization_endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  },
};


const apiUrl = Config.BACKEND + 'users';

function LoginView({setUser: setUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerScreen, setRegisterScreen] = useState(false);
  const [dashboardScreen, setDashBoardScreen] = useState(false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      backgroundColor: '#F5F5F5',
      borderRadius: 25,
      display: 'flex',
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      backgroundColor: 'transparent',
    },
    googleLoginButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 22,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginTop: 10,
      marginBottom: 20, // or adjust as needed for spacing
    },
    googleLoginText: {
      marginLeft: 10,
      color: 'black', // or any color as per your design
      fontWeight: 'bold',
    },
    orContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    orLine: {
      flex: 1,
      height: 1,
      backgroundColor: 'grey',
    },
    orText: {
      marginHorizontal: 10,
      color: 'grey',
    },
    registerLink: {
      marginTop: 20,
      fontWeight: 'bold',
    },
    loginButton: {
      backgroundColor: '#007AFF', // iOS blue color
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    googleIcon: {
      width: 24, // Adjust as necessary
      height: 24, // Adjust as necessary
      marginRight: 10, // Add some space between the icon and the text
    },  
    register: {
      height: 25,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor:'#2b2684',
      borderRadius: 10,
      justifyContent: 'center',
      color: '#2b2684',
      transition: 0.5,
      paddingTop: 5,
      paddingRight: 15,
      paddingBottom: 5,
      paddingLeft: 15,
      marginLeft: 10,
    },
    registerText: {
      color: '#2b2684',
      textAlign: 'center',
      fontSize: 10,
      fontWeight: 'bold',
      textDecorationLine: 'underline', // Underline for the link
    },
    loginText: {
      color: '#2b2684',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    loginButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    signUpText: {
      color: '#fff',
      fontSize: 16,
      marginTop: 20,
    },
    controllerImage: {
      width: 180, // Adjust the width as necessary
      height: 180, // Adjust the height as necessary
      marginBottom: 20, // Space between image and title
    },
    signUpLink: {
      fontWeight: 'bold',
      color: '#007AFF', // iOS blue color
      textDecorationLine: 'underline',
    },
    input: {
      flex: 1,
      fontSize: 18,
      paddingVertical: 10, // Adjust the padding as needed
      paddingLeft: 10, // Add padding to align text
    // Ensure there's no borderWidth or outline

    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20, // space below the title
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: 'grey',
      marginBottom: 20,
    },
    icon: {
      marginRight: 10,
    },
    submit: {
      height: 50,
      width: '100%', // Take full width of the container
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor:'#2b2684',
      borderRadius: 25,
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      marginBottom: 20,
      color: '#2b2684',
      transition: 0.5,
      // width: 20,
      marginLeft: 10,
      paddingTop: 5,
      paddingRight: 15,
      paddingBottom: 5,
      paddingLeft: 15,
      marginTop: 20,
    },
  });

  useEffect(() => {
    const changeEventListener = Linking.addEventListener("url", handleOpenUrl);
    Linking.getInitialURL().then((url) => {
      if (url) handleRedirectUri(url);
    });

    return () => {
      changeEventListener.remove();
    };
  }, []);
  
  const handleRedirectUri = (urlString) => {
    const url = new URL(urlString, true);
    const { code, state } = url.query;

    if (!code) return;

    const providerName = url.pathname.split("/")[2];
    const loginProvider = loginProviders[providerName];

    const { token_endpoint, grant_type, client_id, redirect_uri } = loginProvider;

    Promise.all((res, rej) => fetch(token_endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify(payload),
    })
    .then((resp) => resp.json())
    .then((user) => setUser(user))
    .catch((err) => {
        console.warn("something went wrong", err);
    }));
  }

  const handleOpenUrl = (url) => {
    handleRedirectUri(url);
  };

  // for logging in with google
  const handleLogin = (key) => {
    const loginProvider = loginProviders[key];
    const { client_id, redirect_uri, response_type, scope, authorization_endpoint } = loginProvider;

    const state = randomString();
    
    const params = { client_id, redirect_uri, response_type, scope, state };
    const authorizationUrl = authorization_endpoint + "?" + qs.stringify(params);

    console.log(authorizationUrl);
    console.log(redirect_uri);
    Linking.openURL(authorizationUrl);
  };

  // for logging in with username and password

  async function handleManualLogin(username, password, setUser) {
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
        // const userWithEmail = users.find(user => user.email === email); // find the user
        const userWithEmail = users.find(user => user.email === email && user.password === password); // find the user 
    
        return userWithEmail || null;
      } catch (error) {
        console.error(error.message);
        return null;
      }
    }

    getUserByEmail(username, password) // check if the user is authenticated
      .then((user) => { 
        setUser(user);
       }) // set the user
      .catch((err) => console.log("Error checking user authentication:", err.message));
  }

  if (registerScreen) {
    return (
      <RegisterView setUser={setUser} />
    );
  }
 

  return (
    <View style={styles.container}>
      {/* Controller Image */}
      <Image
        source={require('./img/gameify.png')} // Correct relative path to your image
        style={styles.controllerImage}
        resizeMode="contain" // Ensures the image scales to fit without distortion
      />

      {/* Title */}
      <Text style={styles.title}>SIGN IN</Text>
      {/* Google Login Button */}
    <TouchableOpacity style={styles.googleLoginButton} onPress={() => handleLogin('google')}>
      <Image
        source={require('./img/google.png')} // Correct path to your Google icon image
        style={styles.googleIcon}
        resizeMode="contain"
      />
      <Text style={styles.googleLoginText}>Login with Google</Text>
    </TouchableOpacity>

      {/* Or Separator */}
      <View style={styles.orContainer}>
        <Text style={styles.orText}>Or</Text>
      </View>
  
      {/* Username Input */}
      <View style={styles.inputContainer}>
      <Text style={styles.icon}>👤</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor='grey' // Set the placeholder text color
          value={username}
          onChangeText={setUsername}
          inlineImageLeft='username_icon' // This is where you specify the icon
        />
      </View>
  
      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.icon}>🔒</Text>
          <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor='grey' // Set the placeholder text color
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          inlineImageLeft='password_icon' // This is where you specify the icon
          />
      </View>
  
      {/* Submit Button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => handleManualLogin(username, password, setUser)} disabled={!username || !password}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
  
      {/* Register */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Text style={{ color: 'black' }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => setRegisterScreen(true)}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}> Sign Up</Text>
        </TouchableOpacity>
      </View>
  
      {/* Sneak In Button - Hidden/Developer Feature */}
      {/* Add this if you still want the Sneak In button */}
      <TouchableOpacity style={styles.submit} onPress={() => setUser(true)}>
        <Text style={styles.loginText}>Sneak In</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginView;