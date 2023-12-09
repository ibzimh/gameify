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
import Config from "./env";


const UsersScreen = ({user: user, setUser: setUser}) => {

  const {currentGroup, setCurrentGroup } = useContext(GroupContext);
  const [refreshKey, setRefreshKey] = useState(0);

  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const [memberExistsMessage, setMemberExistsMessage] = useState('');
  const isAdmin = user.teamIds.filter(team => team.team_id == currentGroup._id)[0].role == "Admin"
  useEffect(() => {
    const fetchUsersInCurrentTeam = async () => {
      try {
        const response = await fetch(Config.BACKEND + "users"); // Update the URL
        const data = await response.json();
        if (response.ok) {
          const usersInTeam = data.data.filter(user => currentGroup.usersList.includes(user._id));

          setUsers(usersInTeam); // Set state with users only in the current team
          setMemberExistsMessage("");
     
        } else {

          console.error("Error fetching user:", data.message);

        }

      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    const refreshTimer = setInterval(() => {
      // Trigger a re-render by updating the state
      setRefreshKey((prevKey) => prevKey + 1);
    }, 500);

    fetchUsersInCurrentTeam();
    return () => clearInterval(refreshTimer);

  }, [refreshKey]); 

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const deleteUser = async (index) => {
    try {
      const userToDelete = users[index];
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
    const res = await fetch(Config.BACKEND + "users");
    const da = await res.json();
    const addedUser = da.data.filter(user => user.email === memberEmail)
    if (addedUser.length == 0) {

      console.log("User not found with this email");
      // Handle the case where the user is not found with the entered email
      setModalVisible(false); // Close the modal after handling
      setMemberEmail(''); // Clear the email input
      return;
    }
    const userId = addedUser[0]._id; // Retrieve the userId from the response data
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
      await fetch( `${Config.BACKEND}teams/${currentGroup._id}`, {

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
    const updatedTeamIds = [...addedUser[0].teamIds, newTeamIds];

    // Update the user's teamIds field with the new team ID
    await fetch(`${Config.BACKEND}users/${userId}`, {

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
        <Text style={styles.header}>{currentGroup.team_name}</Text>
          {(isAdmin) &&(<TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
            <FontAwesome5 name={editMode ? 'check' : 'user-edit'} size={25} color="black" />
          </TouchableOpacity>)}
          <View style={styles.teamInfo}>
          </View>
      </View>
      {users.map((user, index) => (
        <View key={index} style={styles.memberContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.user_name[0]}</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{user.user_name}</Text>
            {user.teamIds.filter(team => team.team_id === currentGroup._id).map((team, teamIndex) => (

              <View key={teamIndex}>

                <Text style={styles.memberRole}>{team.role}</Text>
                
              </View>
              ))}
          </View>
          
          {user.teamIds.filter(team => team.team_id === currentGroup._id).map((team, teamIndex) => (
            <View key={teamIndex}>
              <View style={styles.pointsContainer}>
              <Text style={styles.points}>{team.total_points}pt</Text>
              </View>              
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
    backgroundColor: "#D6EAF8",
    width: '100%',
  },
  headerContainer: {
    marginBottom: 20,
    width: '100%',
    height: '20%',
    justifyContent: "center",
  },
  header: {
    marginTop:40,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    elevation: 3,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#D1F2EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#555',
  },
  teamInfo: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: -10,
    paddingHorizontal: 10,
    borderColor: '#ccc', 
  },
  points: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  memberRole: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
    justifyContent: 'center', // Center vertically if needed
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  memberInfo: {
    flex: 1,
    alignItems: 'center', // Center the name and role
    justifyContent: 'center', // Center vertically if needed
  },
  editButton: {
    fontSize: 14,
    color: '#666',
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
  pointsContainer: {
    backgroundColor: '#FBECFF',
    borderRadius: 14,
    paddingVertical: 7,
    paddingHorizontal: 12,
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