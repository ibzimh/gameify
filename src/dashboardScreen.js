import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');

const DashboardScreen = ({ user, setUser, setTeams }) => {
  const userName = user ? user.name : 'Guest'; // Replace 'name' with the correct property

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('./img/people.png')} // Replace with the actual path to your image
        style={styles.backgroundImage}
      >
        {/* Other content goes here */}
      </ImageBackground>
      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome {userName}</Text>
      {/* View Teams Button */}
      <TouchableOpacity style={styles.viewTeamsButton} onPress={() => navigation.navigate('TeamsScreen')}>
        <Text style={styles.buttonText}>View Teams</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Aligns children vertically in the center
    alignItems: 'center', // Aligns children horizontally in the center
  },
  viewTeamsButton: {
    position: 'absolute', // Position the button over the container view
    bottom: 50, // Distance from the bottom of the screen
    paddingVertical: 25, // Vertical padding for the button
    backgroundColor: '#000', // Button background color
    borderRadius: 20, // Rounded corners for the button
    alignItems: 'center', // Center the text inside the button
    justifyContent: 'center', // Center the button content
    elevation: 2, // Shadow for Android
    // For iOS shadow
    paddingHorizontal: 25, // Vertical padding for the button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute', // You can use absolute positioning
    top: 50, // Adjust the distance from the top
    alignSelf: 'center', // This centers the text horizontally
    color: '#fff', // Change the color if needed
  },
  buttonText: {
    color: '#fff', // Text color for the button
    fontSize: 16, // Text font size
    fontWeight: 'bold', // Font weight for the text
  },
  backgroundImage: {
    position: 'absolute',
    width: window.width, // Increase width by 200 units
    height: window.height, // Increase height by 200 units
    marginHorizontal: -60, // Pull the image outwards by 100 units on both sides
    marginVertical: -100, // Pull the image outwards by 100 units on top and bottom
    top: 50, // Align the top edge of the image with the container
    left: 10, // Align the left edge of the image with the container
  },
  // ... other styles as needed ...
});

export default DashboardScreen;