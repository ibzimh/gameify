// WelcomeScreen.js
import React from 'react';
import { SafeAreaView, ImageBackground, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = ({ setShowWelcome }) => {
  return (
    <SafeAreaView style={styles.flexContainer}>
      <ImageBackground 
        source={require('./img/gradient.png')} // Replace with the path to your gradient image
        style={styles.backgroundImage}
        resizeMode="cover" // This will cover the entire background
      >
        <View style={styles.contentContainer}>
          <Image
          source={require('./img/gameify.png')} // Correct relative path to your image
          style={styles.controllerImage}
          resizeMode="contain" // Ensures the image scales to fit without distortion
          />
          <Text style={styles.title}>
            Make<Text style={styles.highlight}> Every Day</Text>
            {'\n'}<Text style={styles.highlight}>Game Day</Text> with<Text style={styles.unique}> Gameify</Text>
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowWelcome(false)} // Update to hide the welcome screen
            >
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
 

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1, // The SafeAreaView should also use flex: 1
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // This will make the ImageBackground fill the entire space
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    padding: 20, // Add some padding to avoid text touching the edges

  },
  container: {
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150, // Adjust the size as needed
    position: 'absolute', // Position them absolutely so they can be on opposite sides

  },
  title: {
    color: '#fff',
    fontSize: 28, // Slightly larger font for better legibility
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30, // Add space below the title
  },
  controllerImage: {
    width: 180, // Adjust the width as necessary
    height: 180, // Adjust the height as necessary
    marginBottom: 20, // Space between image and title
  },
  leftController: {
    top: '80%', // Adjust the position as needed
    left: '10%', // Adjust the position as needed
    transform: [{ rotate: '-15deg' }], // Tilt to the left

  },
  highlight: {
    color: '#D8BFD8', // Your specific shade of purple
  },
  rightController: {
    top: '10%', // Adjust the position as needed
    right: '10%', // Adjust the position as needed
    transform: [{ rotate: '15deg' }], // Tilt to the right
  },
  button: {
    backgroundColor: '#8A2BE2', // Use your desired color
    padding: 15,
    borderRadius: 25,
    marginVertical: 20,
    elevation: 5, // Add some shadow for depth (Android only, use shadow props for iOS)
  },
  unique: {
    color: '#FF6F61', // This is a coral-like color; you can choose any other contrasting color
    // You can also add other styles here if you want to make 'Gameify' more unique, such as:
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default WelcomeScreen;