import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <Image
          source={require("/Users/juliaepshtein/Desktop/CS 320/gameify/src/assets/girlIcon.png")}
          style={styles.profileImage}
        /> */}
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.subheading}>Web Developer</Text>
        <ScrollView style={styles.horizontalLine} />
        <View style={styles.statisticsTitleContainer}>
          <Text style={styles.statisticsTitle}>Statistics</Text>
        </View>
        <View style={styles.statisticsContainer}>
          <View style={styles.roundRectangle}>
            <Text style={styles.statisticsText}>Total Points</Text>
            <Text style={styles.statisticsValue}>
              <Text style={styles.boldText}>1000</Text>
              <Text style={styles.lighterText}> total points</Text>
            </Text>
          </View>
          <View style={styles.roundRectangle}>
            <Text style={styles.statisticsText}>Leaderboard Position</Text>
            <Text style={styles.statisticsValue}>
              <Text style={styles.boldText}>3rd</Text>
              <Text style={styles.lighterText}> place</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 12, // Added left padding to align content to the left
  },
  profileImage: {
    width: Dimensions.get("window").width,
    height: 240,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "black",
    padding: 12,
  },
  subheading: {
    fontSize: 18,
    color: "gray",
    marginBottom: 20,
    padding: 12,
  },
  horizontalLine: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  statisticsTitleContainer: {
    alignItems: "flex-start",
    marginVertical: 20,
    marginLeft: 12,
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 12,
  },
  roundRectangle: {
    backgroundColor: "lightgray",
    borderRadius: 20,
    padding: 10,
    width: Dimensions.get("window").width / 2 - 24,
  },
  statisticsText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  statisticsValue: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  lighterText: {
    fontSize: 14,
    color: "lightgray",
  }, 
});

export default ProfileScreen;

