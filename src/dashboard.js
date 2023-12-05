import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const currentUser = {
  _id: "655130639407a73e835e4ac3",
  user_name: "Viet Truong",
  teamIds: ["655d3e1b6669b07181c0a468"], // Example team IDs associated with the user
  role: "admin",
  email: "vbtruong@umass.edu",
  dob: "1990-01-01",
  gender: "Male",
  total_point: 100,
  achievement: "Some achievement",
  status: "Active",
};
const Dashboard = () => {
  const navigation = useNavigation(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [team,setTeam] = useState([]);
 

  useEffect(() => {
    
    const fetchTeam = async () =>{
      try{
        const respond = await fetch("http://10.0.0.218:8081/users/656012a3cb5dbe885bfc9ee1");
    if (!respond.ok) {
      throw new Error(`Failed to fetch user data. Status: ${respond.status}`);
    }
    const data = await respond.json();

    const respond1 = await fetch("http://10.0.0.218:8081/teams");
    if (!respond1.ok) {
      throw new Error(`Failed to fetch teams. Status: ${respond1.status}`);
    }
    const data1 = await respond1.json();

    const team_id = data.data.teamIds;
    const currentTeam = data1.data.filter(team => team_id.includes(team._id));
    setTeam(currentTeam);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    }
  };
  

    fetchTeam();
  }, [team]);
  // Function to handle navigation
  const openGroup = (groupName) => {
    // Navigate to TeamManagement screen with parameters
    navigation.navigate('TeamManagement', { groupName });
  };

  const handleGroupPress = (groupName) => {
    // Navigate to Users screen with parameters
    navigation.navigate('Users', { groupName });
  };
  const handleCreateTeamPress = () => {
    setModalVisible(true);
  };
  const handleConfirmCreateTeam = async () => {
    try {
      const response = await fetch("http://10.0.0.218:8081/teams/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_name: teamName,usersList: ["656012a3cb5dbe885bfc9ee1"] }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add team');
      }
      const respond1 = await fetch("http://10.0.0.218:8081/users/656012a3cb5dbe885bfc9ee1")
      const data = await respond1.json();
      const user = data.data;      // Get the newly created team data
      const newTeamData = await response.json();
      const newTeam = newTeamData.data;

      // Update the dashboard with the new team
      setTeam(prevTeam => [...prevTeam, newTeam]);
  
      // Update the teamIds field of the current user
      const updatedUser = {
        ...user, // Assuming currentUser holds the current user's data
        teamIds: [...user.teamIds, newTeam._id], // Add the new team ID to the user's teamIds
      };
  
      // Update the teamIds field for the current user
      await fetch(`http://10.0.0.218:8081/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamIds: updatedUser.teamIds }), // Only send the updated teamIds
      });
  
      // Reset the input field and close the modal
      setModalVisible(false);
    } catch (error) {
      console.error('Error creating team:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Dashboard</Text>
      </View>
      {team.map((group, index) => (
        <TouchableOpacity
          key={group._id}
          style={[styles.groupContainer, { backgroundColor: group.color }]}
          onPress={() => handleGroupPress(group.team_name)}
        >
          <Text style={styles.groupName}>{group.team_name}</Text>
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
    backgroundColor: '#a593e0',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  groupContainer: {
    backgroundColor: '#ffffff', // White background for the cards
    paddingVertical: 70, // Vertical padding inside the cards
    paddingHorizontal: 20, // Horizontal padding inside the cards
    marginVertical: 10, // Margin between the cards
    marginHorizontal: 16, // Margin on the sides of the cards
    borderRadius: 10, // Rounded corners
    borderWidth: 1,
    borderColor: '#e0e0e0', // Border color
    flexDirection: 'row', // To align the text and the menu icon
    alignItems: 'center', // To center the content vertically
    justifyContent: 'space-between', // To create space between the text and the menu icon
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 1 }, // Shadow position for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 3, // Shadow blur radius for iOS
    elevation: 3, // Elevation for Android to create shadow
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
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
  // ...add any other styles you might need
});

export default Dashboard;