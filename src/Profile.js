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
        <Image
          source={require("/Users/juliaepshtein/Desktop/CS 320/gameify/src/assets/girlIcon.png")}
          style={styles.profileImage}
        />
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
        <ScrollView style={styles.achievementsContainer}>
          <Text style={styles.achievementsTitle}>Achievements</Text>
          <View style={styles.achievementContainer}>
            <View style={styles.achievementIcon} />
            <View style={styles.achievementBackground} />
            <View style={styles.achievementDetails}>
              <Text style={styles.achievementTitle}>Legendary</Text>
              <Text style={styles.achievementDescription}>
                Complete 5 legendary tasks
              </Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground} />
                <View style={styles.progressBarFill} />
              </View>
            </View>
          </View>
          {/* Add more achievement containers as needed */}
        </ScrollView>
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
  achievementsContainer: {
    width: Dimensions.get("window").width,
    padding: 12,
    borderRadius: 20,
    borderColor: "lightgray", 
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  achievementContainer: {
    width: Dimensions.get("window").width,
    height: 154,
    backgroundColor: "white",
    marginBottom: 10,
    position: "relative",
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  achievementIcon: {
    width: 100,
    height: 91,
    left: 28,
    top: 26,
    position: "absolute",
    borderRadius: 20,
  },
  achievementBackground: {
    width: 100,
    height: 100,
    left: 28,
    top: 25,
    position: "absolute",
    backgroundColor: "rgba(142.82, 84.88, 245.44, 0.59)",
    borderRadius: 20,
  },
  achievementDetails: {
    width: Dimensions.get("window").width/2,
    height: 120,
    left: 150,
    top: 26,
    position: "absolute",
  },
  achievementTitle: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    wordWrap: "break-word",
  },
  achievementDescription: {
    color: "black",
    fontSize: 15,
    fontWeight: "400",
    wordWrap: "break-word",
  },
  progressBarContainer: {
    height: 16,
    position: "relative",
    marginTop: 8,
    borderRadius: 20,
    border: "1px #A0AAB8 solid",
  },
  progressBarBackground: {
    width: Dimensions.get("window").width/2,
    height: 16,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 20,
    border: "1px #A0AAB8 solid",
  },
  progressBarFill: {
    width: Dimensions.get("window").width/3,
    height: 16,
    position: "absolute",
    backgroundColor: "rgba(142.82, 84.88, 245.44, 0.59)",
    borderRadius: 20,
    border: "1px #A0AAB8 solid",
  },
});

export default ProfileScreen;
