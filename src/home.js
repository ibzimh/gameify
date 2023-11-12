import React from "react";
import { View, ScrollView, Text, StyleSheet, Button } from "react-native";

const HomeScreen = ({setUser: setUser}) => {
  const tasks = [
    {
      taskName: "Design Wireframe",
      points: 120,
      date: "Mon, 19 Jul 2022",
      time: "8:30 PM",
      desc: "Complete the Figma Wireframe by the next Sprint",
    },
    {
      taskName: "Create Login Page",
      points: 120,
      date: "Mon, 19 Jul 2022",
      time: "9:30 PM",
      desc: "Complete the login page by the next Sprint",
    },
    {
      taskName: "Create Leaderboard",
      points: 120,
      date: "Mon, 19 Jul 2022",
      time: "10:30 PM",
      desc: "Complete the leaderboard page by the next Sprint",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Home</Text>
      </View>
      <Button title={"log out"} onPress={() => {
          setUser(false);
          console.log("have been logged out");
      }}/>
      {tasks.map((tasks, index) => (
        <View key={index} style={styles.taskContainer}>
          <View style={styles.layerZeroContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.taskName}>{tasks.taskName}</Text>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>{tasks.points}pt</Text>
              </View>
            </View>
            <View style={styles.descContainer}>
              <Text style={styles.desc}>{tasks.desc}</Text>
            </View>
            <View style={styles.deadlineContainer}>
              <Text style={styles.time}>{tasks.time}</Text>
              <Text style={styles.date}>{tasks.date}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    // padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  layerZeroContainer: {
    flexDirection: "column",
    flex: 1,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    padding: 10,
    paddingTop: 0,
    alignContent: "space-between",
    flex: 1,
    margin: 2,
    borderWidth: 1,
    borderTopColor: "#f0f0f0",
    borderRightColor: "#f0f0f0",
    borderLeftColor: "#f0f0f0",
    borderBottomColor: "#000",
  },
  descContainer: {
    flexDirection: "column",
    alignItems: "center",
    //backgroundColor: "green",
    flex: 2,
    margin: 2,
    padding: 10,
    alignContent: "flex-start",
  },
  deadlineContainer: {
    flexDirection: "row",
    flex: 3,
    // backgroundColor: "darkorange",
    margin: 2,
    padding: 5,
    borderWidth: 1,
    borderTopColor: "#000",
    borderRightColor: "#f0f0f0",
    borderLeftColor: "#f0f0f0",
    borderBottomColor: "#f0f0f0",
  },
  taskName: {
    flexDirection: "row",
    flex: 2,
    fontSize: 24,
  },
  pointsContainer: {
    backgroundColor: "#e5e5e5",
    padding: 5,
    marginTop: 8,
    borderRadius: 5,
  },
  pointsText: {
    fontSize: 16,
  },
  desc: {
    fontSize: 18,
    textAlign: "left",
  },
  date: {
    flex: 1,
    fontSize: 12,
    color: "#777",
    // backgroundColor: "pink",
    textAlign: "right",
  },
  time: {
    flex: 1,
    fontSize: 12,
    color: "#777",
    // backgroundColor: "purple",
  },
});

export default HomeScreen;
