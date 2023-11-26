import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const UsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://gameify.us-east-1.elasticbeanstalk.com/users"); // Update the URL
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Team Management</Text>
      </View>
      {users.map((user, index) => (
        <View key={index} style={styles.memberContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.user_name.charAt(0)}</Text>
          </View>
          <Text style={styles.memberName}>{user.user_name}</Text>
          <Text style={styles.memberRole}>{user.role}</Text>
          <Text>{user.total_point}</Text>          
        </View>
      ))}
      <View style={styles.footerButtons}>
      </View>
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
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  memberName: {
    flex: 2,
    fontSize: 16,
  },
  memberRole: {
    flex: 1,
    fontSize: 16,
    color: "#777",
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default UsersScreen;
