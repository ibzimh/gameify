//Viet and Kshama
import React, { useEffect, useState ,createContext, useContext} from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TextInput } from 'react-native';
import { GroupContext } from './team_context'; // Adjust the import path accordingly


import Config from "./env";

const DashboardScreen = ({user:user, setUser: setUser, setTeams: setTeams}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [team,setTeam] = useState([]);
  const {setCurrentGroup } = useContext(GroupContext);
  useEffect(() => {
    
    const fetchTeam = async () =>{
      try{
      

    const respond1 = await fetch(Config.BACKEND + "teams");
    if (!respond1.ok) {
      throw new Error(`Failed to fetch teams. Status: ${respond1.status}`);
    }

    const data1 = await respond1.json();

    const teamIds = user.teamIds.map(teamIdObj => teamIdObj.team_id);
    const currentTeam = data1.data.filter(team => teamIds.includes(team._id));

    setTeam(currentTeam);

  } catch (error) {
    console.error("Error fetching data:", error.message);
    }
  };

    fetchTeam();
  }, []);
  
  const handleGroupPress = (group) => {
    
    setTeams(true)
   setCurrentGroup(group)

  };
  const handleCreateTeamPress = () => {
    setModalVisible(true);
  };
  const handleConfirmCreateTeam = async () => {
    try {

      const response = await fetch(Config.BACKEND + "teams/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_name: teamName,usersList: [user._id] }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add team');
      }

     
      const newTeamData = await response.json();
      const newTeam = newTeamData.data;
      // Update the dashboard with the new team
      setTeam(prevTeam => [...prevTeam, newTeam]);
      const newGroup = {
        team_id: newTeam._id,
        role:"Admin",
        total_points:0,
        achievement:null,
        status:"Active"
      }

      // Update the teamIds field of the current user
      const updatedUser = {
        ...user, // Assuming user holds the current user's data
        teamIds: [...user.teamIds, newGroup], // Add the new team ID to the user's teamIds
      };
  
      // Update the teamIds field for the current user

      await fetch(Config.BACKEND + `users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamIds: updatedUser.teamIds }), // Only send the updated teamIds
      });
      setUser(updatedUser)
      // Reset the input field and close the modal
      setModalVisible(false);
    } catch (error) {
      console.error('Error creating team:', error.message);
    }

  };
  const colors = [
    '#D6EAF8', // Light Blue
    '#D1F2EB', // Light Aqua
    '#D5DBDB', // Light Gray
    '#FADBD8', // Light Pink
    '#FDEDEC', // Soft Red
    '#EAECEE', // Lavender Gray
    '#F2F3F4', // Whisper Gray
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Dashboard</Text>
      </View>
    {team.map((group, index) => (
      <TouchableOpacity
        key={group._id}
        onPress={() => handleGroupPress(group)}
        style={styles.groupContainer}
      >
        <View style={[styles.colorHeader, { backgroundColor: colors[index % colors.length] }]}>
          {/* Icon will go here if needed */}
        </View>
        <View style={styles.teamInfo}>
          <Text style={styles.groupName}>{group.team_name}</Text>
        </View>
        <Text style={styles.menuIcon}>≡</Text>
      </TouchableOpacity>
    ))}
      

      {/* The Modal is only an overlay and should not replace the existing content */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              onChangeText={setTeamName}
              value={teamName}
              placeholder="Enter Team Name"
              placeholderTextColor="#555555"
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmCreateTeam}
            >
              <Text style={styles.confirmButtonText}>Confirm Team Creation</Text>
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

      {/* This button shows the modal when pressed */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateTeamPress}
      >
        <Text style={styles.createButtonText}>Create Team</Text>
      </TouchableOpacity>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    backgroundColor: '#00CC99',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20, // Adjust this value to increase or decrease roundness
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
  },
  groupContainer: {
    marginVertical: 20,
    marginHorizontal: 16,
    position: 'relative',
    borderRadius: 6,
    overflow: 'hidden', // This keeps the child views within the border radius
    backgroundColor: '#FFF', // Assuming the body section is white
    elevation: 3, // for Android shadow
    shadowOpacity: 0.1, // for iOS shadow
    shadowRadius: 3, // for iOS shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { height: 1, width: 0 }, // for iOS shadow
    borderWidth: 1, // Add border width
    borderColor: '#DDD',
  },
  colorHeader: {
    height: 100, // Adjust the height as necessary
    borderTopLeftRadius: 6, // Match the borderRadius of groupContainer if needed
    borderTopRightRadius: 6, // Match the borderRadius of groupContainer if needed
    // backgroundColor set dynamically
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  menuIcon: {
    position: 'absolute',
    top: 10, // Distance from the top of the container
    right: 10, // Distance from the right of the container
    fontSize: 24, // Size of the icon
  },
  teamInfo: {
    padding: 20, // Padding for the team name
    paddingHorizontal: 20,
    borderBottomWidth: 4, // Add border width
    borderColor: '#DDD',
  },
  createButton: {
    backgroundColor: '#007bff',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  createButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  groupName: {
    fontSize: 18, // Large text for visibility
    fontWeight: 'bold', // Bold text for the team name
    // Align the text as needed
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
    // Add this if you also want to change the text color when user types
    color: '#000000', // This sets the input text color to black
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

export default DashboardScreen;