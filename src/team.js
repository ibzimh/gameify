import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";

import { FontAwesome5 } from '@expo/vector-icons';

const currentUser = {
  _id: "655130639407a73e835e4ac3",
  user_name: "Viet Truong",
  teamIds: ["656012a3cb5dbe885bfc9ee1"],
  role: "admin",
  email: "vbtruong@umass.edu",
  dob: "1990-01-01",
  gender: "Male",
  total_point: 100,
  achievement: "Some achievement",
  status: "Active",
};
const currentTeam = {
  _id: "6563b623779f11fb0b7d594d",
  team_name: "CS 320",
  usersList: []
}

const currT = async () => {
  const res = await fetch("http://192.168.1.37:8081/teams/6563b623779f11fb0b7d594d");
  const da= await res.json();
  return  da;
}

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');

  useEffect(() => {
    const fetchUsersInCurrentTeam = async () => {
      try {
        const res = await fetch("http://192.168.1.37:8081/teams/6563b623779f11fb0b7d594d");
        const da =  await res.json();
        console.log(da)

        const response = await fetch("http://192.168.1.37:8081/users");
        const userData = await response.json();
        if (response.ok) {
          const currentTeamUserIds = da.data.usersList; // IDs of users in the current team
          console.log(currentTeamUserIds)
          // Filter users based on IDs present in the current team's usersList
          const usersInTeam = userData.data.filter(user => currentTeamUserIds.includes(user._id));
          console.log(usersInTeam)
          setUsers(usersInTeam); // Set state with users only in the current team
        } else {

          console.error("Error fetching users:", userData.message);

        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsersInCurrentTeam();
  }, []); 

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const deleteUser = async (index) => {
    try {
      const userToDelete = users[index];
      const currentT = await currT();
      // Remove the user ID from the current team's usersList
      const updatedUsersList = currentT.usersList.filter(
        userId => userId !== userToDelete._id
      );
      console.log(updatedUsersList)
      const res = await fetch("http://192.168.1.37:8081/teams/6563b623779f11fb0b7d594d");
      const da =  await res.json();
      // Update the current team's usersList without the deleted user ID
      await fetch(`http://192.168.1.37:8081/teams/${da.data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usersList: updatedUsersList }),
      });
  
      // Update the state to reflect the changes in usersList
      setUsers(users.filter((_, idx) => idx !== index)); // Remove the user from the displayed user list

      const updatedTeamIds = userToDelete.teamIds.filter(
        teamId => teamId !== currentTeam._id
      );
      await fetch(`http://192.168.1.37:8081/users/${userToDelete._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamIds: updatedTeamIds }),
    });
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };
 
  const handleConfirmAddMember = async () => {
    const currentT = await currT();
    const response = await fetch(`http://192.168.1.37:8081/users/email/${memberEmail}`);
    const data = await response.json();
    console.log(data); // Inspect the structure of the response data

    if (!response.ok) {
      console.log("User not found with this email");
      // Handle the case where the user is not found with the entered email
      setModalVisible(false); // Close the modal after handling
      setMemberEmail(''); // Clear the email input
      return;
    }
    const userId = data.data._id; // Retrieve the userId from the response data
    console.log(userId)
    // Check if userId already exists in the current team's usersList
    if (currentT.data.usersList.includes(userId)) {
        console.log("Member already exists in the team");
    // Notify the user that the member already exists in the team
    // Handle accordingly (show a message, prevent duplicate addition, etc.)
    }else{

      const updatedUsersList = [...currentT.data.usersList, userId];
      console.log(updatedUsersList)
      // Update the current team's usersList with the new userId
      await fetch(`http://192.168.1.37:8081/teams/${currentTeam._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usersList: updatedUsersList }),
      });
      const updatedResponse = await fetch("http://192.168.1.37:8081/users");
      const updatedUserData = await updatedResponse.json();

      // Update the user's teamIds by adding the team ID to their teamIds array
    const updatedTeamIds = [...data.data.teamIds, currentTeam._id];

    // Update the user's teamIds field with the new team ID
    await fetch(`http://192.168.1.37:8081/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamIds: updatedTeamIds }),
    });

      if (updatedResponse.ok) {
        const usersInTeam = updatedUserData.data.filter(user => updatedUsersList.includes(user._id));
        setUsers(usersInTeam);
      } else {
        console.error("Error fetching updated users:", updatedUserData.message);
      }
      setModalVisible(false);
      setMemberEmail(''); // Clear the email input
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Team Management</Text>
   
          <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
            <FontAwesome5 name={editMode ? 'check' : 'user-edit'} size={25} color="black" />
          </TouchableOpacity>
      </View>
      {users.map((user, index) => (
        <View key={index} style={styles.memberContainer}>
          <Text style={styles.memberName}>{user.user_name}</Text>
          <Text style={styles.memberRole}>{user.role}</Text>
          <Text>{user.total_point}</Text>
          {editMode && (
            <TouchableOpacity onPress={() => deleteUser(index)} style={styles.deleteButton}>
              <FontAwesome5 name={'minus-circle'} size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
      ))}
       <View style={{ flex: 1 }}>
      {editMode && (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.plusButton}>
          <FontAwesome5 name={'plus-circle'} size={40} color="black" />
        </TouchableOpacity>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              onChangeText={setMemberEmail}
              value={memberEmail}
              placeholder="Enter Member Email"
              placeholderTextColor="#555555"
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmAddMember}
            >
              <Text style={styles.confirmButtonText}>Add Member</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
    marginTop:30,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  editButton: {
    marginLeft:10,
  },
  deleteButton: {
    marginTop:-5,
    position: 'absolute',
    top: 3,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  plusButton:{
    alignItems: "center",

  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 35, // Increase padding for bigger content area
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%', // Set a width relative to the screen size
    alignSelf: 'center', // Center the modal on the screen
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: '#000000',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    elevation: 2,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    marginTop: 10,
    elevation: 2,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UsersScreen;