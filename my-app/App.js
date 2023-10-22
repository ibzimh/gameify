import React, { useState } from "react";
import { Text, View, Button, Linking } from "react-native";

import styles from "./components/styles";
import LoginView from "./components/LoginView";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <View style={styles.container}>
        <LoginView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {user.username}!</Text>
    </View>
  );  
}