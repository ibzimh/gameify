//Arnav Sampigethaya
import React, { useState, useEffect, useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Config from "./env";
import { GroupContext } from './team_context'; 

const Leaderboard = ({ user, setUser }) => {
  const { currentGroup } = useContext(GroupContext);
  //console.log("CG: "+currentGroup._id)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(Config.BACKEND + "users");
        const data = await response.json();
        if (response.ok) {
          // Filter users based on the current team's usersList
          const usersInTeam = data.data.filter(user => currentGroup.usersList.includes(user._id));

          // Sorting users based on total points within the specific team in descending order
          const sortedUsers = usersInTeam.sort((a, b) => {
            const aTeam = a.teamIds.find(team => team.team_id === currentGroup._id);
            const bTeam = b.teamIds.find(team => team.team_id === currentGroup._id);

            const aTeamPoints = aTeam ? aTeam.total_points : 0;
            const bTeamPoints = bTeam ? bTeam.total_points : 0;

            return bTeamPoints - aTeamPoints;
          });

          setUsers(sortedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    const intervalId = setInterval(() => {
      fetchUsers();
    }, 500); // Fetch users every 0.5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentGroup]);

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
            {/* Display team-specific points */}
            <Text style={styles.pointsText}>{user.teamIds.find(team => team.team_id === currentGroup._id)?.total_points || 0}pt</Text>
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