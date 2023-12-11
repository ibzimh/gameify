import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable, View, Text, ScrollView } from "react-native";
import UploadImage from "./ImageUpload";
import Config from "./env"; 

const UserProfileView = ({ user, setUser }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const userTeamIds = user.teamIds.map((team) => team.team_id);
        
        const response = await fetch(Config.BACKEND + "teams");
        if (!response.ok) {
          throw new Error(`Failed to fetch teams. Status: ${response.status}`);
        }

        const data = await response.json();

        // Filter teams based on the user's teamIds
        const userTeams = data.data.filter((team) => userTeamIds.includes(team._id));

        setTeams(userTeams);
      } catch (error) {
        console.error("Error fetching teams:", error.message);
      }
    };

    fetchTeams();
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>Profile</Text>
              <Text style={styles.userInfo}>{user.user_name}</Text>
            </View>
            <View>
              <UploadImage />
            </View>
          </View>
          <View>
            <Text style={styles.text}>View Your Points Here</Text>
          </View>
        </View>

        <View style={styles.body}>
          {teams.map((team) => (
            <Pressable key={team._id} style={styles.RectangleShapeView}>
              <Text style={styles.headtText}>{team.team_name}</Text>
              <Text style={styles.SubjectText}>Total Points: {team.total_points || 0}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.btn}>
            <Text style={styles.text}>Logout</Text>
          </Pressable>
          <Pressable style={styles.btn}>
            <Text style={styles.text}>Change Password</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundSize: "contain",
    height: 300,
    backgroundColor: "#6495ed",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: "600",
    fontFamily: "Helvetica",
  },
  headtText: {
    fontFamily: "Helvetica",
    color: "grey",
    fontWeight: "600",
    float: "left",
    marginLeft: 20,
    marginTop: 10,
  },
  SubjectText: {
    color: "black",
    fontWeight: "550",
    fontSize: 16,
    fontFamily: "Helvetica",
    float: "left",
    marginLeft: 20,
    marginTop: 10,
  },
  userInfo: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  btn: {
    marginTop: 40,
    backgroundColor: "#6495ed",
    borderRadius: 10,
    width: 200,
    height: 50,
    alignItems: "center",
    padding: "6px",
    justifyContent: "center",
    elevation: 3,
  },
  body: {
    backgroundColor: "white",
    height: 500,
    alignItems: "center",
  },
  text: {
    color: "white",
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  RectangleShapeView: {
    marginTop: 20,
    width: "80%",
    height: 80,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    elevation: 3,
  },
  container: {
    flex: 1,
  },
});

export default UserProfileView;
