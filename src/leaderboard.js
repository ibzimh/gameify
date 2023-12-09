import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Config from "./env";

const Leaderboard = () => {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const response = await fetch(Config.BACKEND + "/users");
        const data = await response.json();

        // Sorting users based on total points in descending order
        const sortedUsers = data.data.sort((a, b) => b.total_point - a.total_point);
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Leaderboard</Text>
      </View>
      {users.map((user, index) => (
        <View
          key={index}
          style={[
            styles.userContainer,
            index === 0 ? styles.gold : index === 1 ? styles.silver : index === 2 ? styles.bronze : {},
          ]}
        >
          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>{index + 1}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{user.user_name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>{user.total_point}pt</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 16,
  },
  gold: {
    backgroundColor: "gold",
  },
  silver: {
    backgroundColor: "silver",
  },
  bronze: {
    backgroundColor: "#cd7f32", // Bronze color
  },
  rankContainer: {
    marginRight: 10,
  },
  rankText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
  },
  userInfoContainer: {},
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "#888",
  },
  pointsContainer: {
    backgroundColor: "#5CB85C",
    padding: 8,
    borderRadius: 4,
  },
  pointsText: {
    color: "white",
  },
});

export default Leaderboard;