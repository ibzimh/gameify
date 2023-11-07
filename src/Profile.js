import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('/Users/juliaepshtein/Desktop/CS 320/gameify/src/assets/defaultProfile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
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
    backgroundColor: '#f2f2f2', // Background color
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: 'white', 
    borderWidth: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black', 
  },
  subheading: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  team: {
    fontSize: 16,
    marginBottom: 10,
    color: 'blue', 
  },
});

export default ProfileScreen;
