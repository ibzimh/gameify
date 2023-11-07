import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Julia Epshtein</Text>
        <Text style={styles.subheading}>Web Developer</Text>
        <ScrollView>
          <Text style={styles.team}>Team A</Text>
          <Text style={styles.team}>Team B</Text>
          <Text style={styles.team}>Team C</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subheading: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  team: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;
