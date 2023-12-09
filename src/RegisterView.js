import React, { useState } from "react";
import { Text, View, Button, Linking, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";;

import Config from "./env";

const apiUrl = Config.BACKEND + 'users';

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

function RegisterView({setUser: setUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    controllerImage: {
      width: 180, // Adjust the width as necessary
      height: 180, // Adjust the height as necessary
      marginBottom: 20, // Space between image and title
      marginTop: 5,
    },
    login: {
      height: 40,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor:'#2b2684',
      borderRadius: 15,
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      marginBottom: 10,
      color: '#2b2684',
      transition: 0.5,
      // width: 20,
      marginTop: 10,
      paddingTop: 5,
      paddingRight: 15,
      paddingBottom: 5,
      paddingLeft: 15,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 0,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 40, // space below the title
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
    googleButton: {
      width: 20,
      marginRight: 10,
    },
    registerText: {
      color: '#2b2684',
      textAlign: 'center',
      fontSize: 10,
      fontWeight: 'bold',
    },
    loginButton: {
      // Your button styles...
      backgroundColor: '#007AFF', // Use the blue color from the screenshot
      borderRadius: 20,
      paddingVertical: 10,
      width: '80%', // Set width to match design, adjust as needed
      marginTop: 20, // Space above the button
      alignItems: 'center', // Center text horizontally
      justifyContent: 'center', // Center text vertically
    },
    loginButtonText: {
      // Your button text styles...
      color: '#FFFFFF', // White text color
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center', // Ensure the text is centered
    },
    loginText: {
      color: '#2b2684',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#2b2684',
      borderRadius: 15,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#2b2684',
      minHeight: 40, // Give a minimum height for the input field
      paddingLeft: 15,
      fontSize: 18,
      width: '80%', // Set width to match design, adjust as needed
      marginVertical: 10, // Space above and below the input field
      paddingVertical: 10,
      paddingHorizontal: 0,
    },
    submit: {
      height: 40,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor:'#2b2684',
      borderRadius: 15,
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
    },
  });

  return (
    <View style={styles.container}>
      {/* Controller Image */}
      <Image
        source={require('./img/gameify.png')} // Correct relative path to your image
        style={styles.controllerImage}
        resizeMode="contain" // Ensures the image scales to fit without distortion
      />
      {/* Title */}
      <Text style={styles.title}>SIGN UP</Text>
  
      {/* Username Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="👤 Email"
          placeholderTextColor='grey'
          keyboardType="email-address"
          value={username}
          onChangeText={setUsername}
          autoCapitalize='none'
        />
      </View>
  
      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="🔒 Password"
          placeholderTextColor='grey'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
  
      {/* Sign Up Button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => createUser(username, password)} disabled={!username || !password}>
        <Text style={styles.loginButtonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterView;