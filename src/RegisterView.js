import React, { useState } from "react";
import { Text, View, Button, Linking, StyleSheet, TouchableOpacity, TextInput } from "react-native";;

import Config from "./env";
// import { createUser } from "./handleUsers";

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
      paddingLeft: 15,
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
        <View style={{ flexDirection: 'column' }}>
          {/* Username */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          {/* Password and Submit */}
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />  
            <TouchableOpacity style={styles.submit} onPress={() => createUser(username, password)} disabled={!username || !password}>
              <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
     </View>
   );
}

export default RegisterView;