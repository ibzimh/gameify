// Jason Chen

import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GroupContext } from "./team_context";

import Config from "./env";

const HomeScreen = ({ user: user, setUser: setUser }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { currentGroup } = useContext(GroupContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchChores = async () => {
      try {
        const response = await fetch(Config.BACKEND + "chores");
        const data = await response.json();
        const choreInTeam = data.data.filter(
          (chore) => chore.teamId == currentGroup._id
        );
        setTasks(choreInTeam);
      } catch (error) {
        console.error("Error fetching chores:", error.message);
      }
    };

    const refreshTimer = setInterval(() => {
      // Trigger a re-render by updating the state
      setRefreshKey((prevKey) => prevKey + 1);
    }, 100);

    // Fetch chores on mount
    fetchChores();

    // Clean up the timer when the component is unmounted
    return () => clearInterval(refreshTimer);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    // Fetch chores every time refreshKey changes
    const fetchChores = async () => {
      try {
        const response = await fetch(Config.BACKEND + "chores");
        const data = await response.json();
        const choreInTeam = data.data.filter(
          (chore) => chore.teamId == currentGroup._id
        );
        setTasks(choreInTeam);
      } catch (error) {
        console.error("Error fetching chores:", error.message);
      }
    };

    // Fetch chores every time refreshKey changes
    fetchChores();
  }, [refreshKey]);

  const handleDelete = async (itemID) => {
    try {
      await fetch(Config.BACKEND + `chores/${itemID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemID }),
      });
      setRefreshKey((prevKey) => prevKey + 1);
      setSelectedTask(null); // Clear the selected task after deletion
      setIsModalVisible(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  const updatePoints = async (points, teamIdToUpdate) => {
    try {
      // console.log("user:" + user + "end user");
      const updatedTeamIds = user.teamIds.map((team) =>
        team.team_id === teamIdToUpdate
          ? { ...team, total_points: team.total_points + points }
          : team
      );
      console.log(user.teamIds);

      await fetch(Config.BACKEND + `users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamIds: updatedTeamIds,
        }),
      });

      // Update the user in the current component state
      setUser((prevUser) => ({
        ...prevUser,
        teamIds: updatedTeamIds,
      }));
    } catch (error) {
      console.error("Error updating points:", error);
      // Handle errors related to updating points
    }
  };
  colors = [
    '#D6EAF8', // Light Blue
    '#D1F2EB', // Light Aqua
    '#D5DBDB', // Light Gray
    '#FADBD8', // Light Pink
    '#FDEDEC', // Soft Red
    '#EAECEE', // Lavender Gray
    '#F2F3F4', // Whisper Gray
  ];
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Tasks</Text>
    </View>

    {/* Tasks */}
    {tasks.map((task, index) => (
      <View key={index} style={styles.taskCard}>
        <View style={[styles.taskPriorityHeader, { backgroundColor: colors[index % colors.length] }]}>
          <Text style={styles.taskPriorityText}>🚩 Priority task {index + 1}</Text>
          <View style={styles.pointsAndOptionsContainer}>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText}>{task.points}pt</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(true);
                setSelectedTask(task);
              }}
              style={styles.optionsButton}
            >
              <Text style={styles.optionsButtonText}>...</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.taskBody}>
        <Text style={styles.taskTitle}> 📌 {task.chore_name}</Text>
        <Text style={styles.taskDate}>{task.due_date}</Text>
        </View>
      </View>
    ))}

    {/* Modal for Task Details */}
    <Modal
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Task Detail</Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.modalTaskTitle}>📌 {selectedTask?.chore_name}</Text>
            <Text style={styles.modalTaskDescription}>{selectedTask?.description}</Text>
            <Text style={styles.modalTaskTime}>{selectedTask?.due_date}</Text>
          </View>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => {
              handleDelete(selectedTask?._id);
              updatePoints(selectedTask?.points, selectedTask?.teamId);
              setIsModalVisible(false);
            }}
          >
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the items horizontally
    alignItems: 'center',
    paddingTop: 60, // Increase this value to move the title and button lower
    paddingHorizontal: 20,
    },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 25,
    marginHorizontal: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
    marginBottom: 10,
},
  layerZeroContainer: {},
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rightSideContainer: {
    flexDirection: "row",
  },
  pointsContainer: {
    backgroundColor: '#00CC99', // Replace with actual color from your design
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 12,
  },
  taskPriorityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  pointsAndOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 15,
    color: 'black',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // This spreads out the items to the full width of the container
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  taskDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  pointsText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  taskIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginRight: 8,
  },
  modalContainer: {
    flex: 0,
    marginTop: -8,
    paddingTop: -4,
    paddingLeft: 4,
  },
  taskBody: {
    padding: 16,  // increased padding for a larger body
  },
  modalContentHelp: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    paddingBottom: 80,
  },
  modalContent: {
    backgroundColor: "white",
    height: "30%",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderTopColor: "gray",
  },
  optionsButton: {
    // Ensures the button is large enough to be an easy tap target
    minWidth: 44,
    minHeight: 44,
  },
  optionsButtonText: {
    fontSize: 24,
    color: '#000',
  },
  taskDate: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  headerCloseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    //backgroundColor: "blue",
    marginBottom: 15,
    paddingBottom: 10,
    borderColor: "lightgray",
    borderBottomWidth: 1,
  },
  taskDetail: {
    //backgroundColor: "purple",
    fontWeight: "bold",
    fontSize: 24,
  },
  taskDescription: {
    color: '#666',
  },
  closeButton: {},
  buttonText: {
    fontSize: 22,
    //backgroundColor: "yellow",
    color: "gray",
  },
  modalInfoContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 32,
    marginRight: 32,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  modalTaskName: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 6,
    //backgroundColor: "pink",
  },
  modalDescContainer: {},
  modalDesc: {
    fontSize: 14,
    marginBottom: 12,
    //backgroundColor: "yellow",
  },
  modalDeadlineContainer: {},
  modalDate: {
    fontSize: 12,
    color: "gray",
    //backgroundColor: "purple",
  },
  completeButton: {
    backgroundColor: '#5cb85c',
    borderRadius: 20,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  descContainer: {
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
  },
  deadlineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: "#888",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    // Style for close button
  },
  modalCloseButtonText: {
    fontSize: 22,
    color: '#000', // Or any color you prefer
  },
  modalBody: {
    // Styles for the modal body
  },
  modalTaskTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalTaskDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  modalTaskTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
});

export default HomeScreen;