import React, { useState } from "react";
import { Text, View, Button, Linking, StyleSheet, TouchableOpacity, TextInput } from "react-native";;

import Config from "./env";

const apiUrl = Config.BACKEND + 'users';

const createUser = async (username, email, password, dob, gender) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_name: username,
          teamIds: null,
          email: email,
          password: password,
          dob: dob,
          gender: gender,
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
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const genders = ["Male", "Female", "Transgender", "Nonbinary"];

  const submit = () => {
    console.log("Submitting registration form...");
    function isValidDate(str) {
      let [day, month, year] = str.split("/");
      return /^(\d{2})\/(\d{2})\/(\d{4})$/.test(str) && day <= 31 && month <= 12;
    }

    function isValidEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (!isValidDate(dob)) {
      console.log("Invalid date of birth. Please enter a valid date in the format DD/MM/YYYY");
      return;
    } else if (!isValidEmail(email)) {
      console.log("Invalid email. Please enter a valid email address");
      return;
    }

    createUser(username, email, password, dob, gender);
  }

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
      marginLeft: 10,
      paddingTop: 5,
      paddingRight: 15,
      paddingBottom: 5,
      paddingLeft: 15,
    },
    genderButton: {
      height: 25, // 30
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor:'#2b2684',
      borderRadius: 10, // 10
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      marginBottom: 5,
      color: '#2b2684',
      transition: 0.5,
      marginTop: 5,
      paddingTop: 5,
      paddingRight: 15, // 10
      paddingBottom: 5,
      paddingLeft: 15, // 10
      marginRight: 10,
    },
    genderButtonText: {
      fontSize: 12,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    date: {
      height: 40,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor:'#2b2684',
      borderRadius: 10,
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      marginBottom: 5,
      color: '#2b2684',
      transition: 0.5,
      marginTop: 5,
      paddingTop: 5,
      paddingRight: 10,
      paddingBottom: 5,
      paddingLeft: 10,
      fontSize: 12,
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
          {/* Email Address */}
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
            <TouchableOpacity style={styles.submit} onPress={submit} disabled={!username || !password}>
              <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Gender Buttons */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.loginText}>Gender</Text>
            {genders.map((g, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.genderButton, gender === g ? {backgroundColor: '#2b2684'} : {}]}
                onPress={() => setGender(g)}
              >
                <Text style={[styles.genderButtonText, gender === g ? {color: 'white'} : {color: '#2b2684'}]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Date of birth */}
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.loginText}>Date of birth</Text>
            <TextInput
              style={styles.date}
              placeholder="DD/MM/YYYY"
              value={dob}
              onChangeText={(text) => setDob(text)}
            />
          </View>
        </View>
     </View>
   );
}

export default RegisterView;