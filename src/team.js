import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const UsersScreen = () => {
  const members = [
    { name: 'Julia', role: 'Admin', points: 120 },
    { name: 'Jason', role: 'Member', points: 120 },
    { name: 'Kshama', role: 'Member', points: 120 },
    { name: 'Arnav', role: 'Member', points: 120 },
    { name: 'Viet', role: 'Member', points: 120 },
    { name: 'Emily', role: 'Member', points: 120 },
    { name: 'Ibrahim', role: 'Member', points: 120 }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Team Management</Text>
      </View>
      <Text style={styles.subHeader}>CS 320 Group</Text>
      {members.map((member, index) => (
        <View key={index} style={styles.memberContainer}>
          <View style={styles.avatar}>
            {/* Avatar placeholder */}
            <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
          </View>
          <Text style={styles.memberName}>{member.name}</Text>
          <Text style={styles.memberRole}>{member.role}</Text>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>{member.points}pt</Text>
          </View>
        </View>
      ))}
      <View style={styles.footerButtons}>
        {/* Placeholder for footer icons/buttons */}
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
  subHeader: {
    fontSize: 20,
    marginBottom: 20,
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
  pointsContainer: {
    backgroundColor: "#e5e5e5",
    padding: 5,
    borderRadius: 5,
  },
  pointsText: {
    fontSize: 16,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default UsersScreen;
