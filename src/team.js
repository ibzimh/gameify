import React, { useState, useEffect,useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { GroupContext } from './team_context'; 

import { FontAwesome5 } from '@expo/vector-icons';


const currT = async () => {
  const res = await fetch(Config.BACKEND + "teams/6563b623779f11fb0b7d594d");
  const da= await res.json();
  return  da;
}
const currentUser = "Admin"
const UsersScreen = () => {
  const {currentGroup, setCurrentGroup } = useContext(GroupContext);

  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const [memberExistsMessage, setMemberExistsMessage] = useState(''); // State for member exists message

  useEffect(() => {
    const fetchUsersInCurrentTeam = async () => {
      try {
        const response = await fetch(Config.BACKEND + "users"); // Update the URL
        const data = await response.json();
        if (response.ok) {
          const usersInTeam = data.data.filter(user => currentGroup.usersList.includes(user._id));

          setUsers(usersInTeam); // Set state with users only in the current team
          setMemberExistsMessage("");
          setMemberEmail("");
        } else {

          console.error("Error fetching user:", data.message);


        }

      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUsersInCurrentTeam();
  }, [currentGroup]); 

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const deleteUser = async (index) => {
    try {
      const userToDelete = users[index];
      const currentT = await currT();
      // Remove the user ID from the current team's usersList
      const updatedUsersList = currentGroup.usersList.filter(
        userId => userId !== userToDelete._id
      );
      // Update the current team's usersList without the deleted user ID
      await fetch(Config.BACKEND + `teams/${currentGroup._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usersList: updatedUsersList }),
      });  
      const currentGroupState = currentGroup; // Replace this line with the actual way you access currentGroup state

      const updatedCurrentGroup = {
        ...currentGroupState, // Maintain existing properties
        usersList: updatedUsersList, // Update usersList with the new value
      };
      console.log(updatedCurrentGroup)
      setCurrentGroup(updatedCurrentGroup);
      const updatedTeamIds = userToDelete.teamIds.filter(team => updatedCurrentGroup._id !== team.team_id)
      console.log(updatedTeamIds)
      await fetch(Config.BACKEND + `users/${userToDelete._id}`, {
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
    const response = await fetch(Config.BACKEND + `users/email/${memberEmail}`);
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
    // Check if userId already exists in the current team's usersList
    if (currentGroup.usersList.includes(userId)) {
        console.log("Member already exists in the team");
        setMemberExistsMessage("This member is already in the team.");
    // Notify the user that the member already exists in the team
    // Handle accordingly (show a message, prevent duplicate addition, etc.)
    }else{
      setMemberExistsMessage("");

      const updatedUsersList = [...currentGroup.usersList, userId];
      console.log(updatedUsersList)
      // Update the current team's usersList with the new userId
      await fetch(Config.BACKEND + `teams/${currentGroup._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usersList: updatedUsersList }),
      });
      const currentGroupState = currentGroup; // Replace this line with the actual way you access currentGroup state
      const updatedCurrentGroup = {
        ...currentGroupState, // Maintain existing properties
        usersList: updatedUsersList, // Update usersList with the new value
      };
      setCurrentGroup(updatedCurrentGroup);
      const updatedResponse = await fetch(Config.BACKEND + "users");
      const updatedUserData = await updatedResponse.json();
      const newTeamIds = {
        team_id: updatedCurrentGroup._id,
        role:"Player",
        total_points:0,
        achievement:null,
        status:"Active"
      }

      // Update the user's teamIds by adding the team ID to their teamIds array
    const updatedTeamIds = [...data.data.teamIds, newTeamIds];

    // Update the user's teamIds field with the new team ID
    await fetch(Config.BACKEND + `users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamIds: updatedTeamIds }),
    });

      if (updatedResponse.ok) {
        const usersInTeam = updatedUserData.data.filter(user => updatedCurrentGroup.usersList.includes(user._id));
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
          {(currentUser == "Admin") &&(<TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
            <FontAwesome5 name={editMode ? 'check' : 'user-edit'} size={25} color="black" />
          </TouchableOpacity>)}
          <View style={styles.teamInfo}>
          <Text style={styles.teamHeader}>Name</Text>
          <Text style={styles.pointsHeader}>Points</Text>
          </View>
      </View>
      {users.map((user, index) => (
        <View key={index} style={styles.memberContainer}>
          <Text style={styles.memberName}>{user.user_name}</Text>
          {user.teamIds.filter(team => team.team_id === currentGroup._id).map((team, teamIndex) => (
            
            <View key={teamIndex}>
              <Text>{team.total_points}</Text>
              <Text>{team.role}</Text>
              
            </View>
          ))}
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
            {memberExistsMessage ? (
          <Text style={styles.memberExistsMessage}>{memberExistsMessage}</Text>
              ) : null}
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
  teamInfo: {
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: -10,
    paddingHorizontal: 10,
    borderColor: '#ccc', 
  },
  teamHeader: {
    marginLeft:20,
    fontWeight: 'bold',
    flex: 2, 
    fontSize:15,
  },
  pointsHeader: {
    fontSize:15,
    marginRight:20,
    flex: 1, 
    textAlign: 'right', 
    fontWeight: 'bold',
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
  memberExistsMessage: {
    color: 'red', 
    fontSize: 16,
    marginTop: 0,
    marginBottom:10,
  },
});

export default UsersScreen;