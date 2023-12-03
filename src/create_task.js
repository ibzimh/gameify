  import React, { useState,useContext } from "react";
  import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';

  import { Calendar } from "react-native-calendars";
  import { GroupContext } from './team_context'; // Adjust the import path accordingly


  const TaskScreen = () => {

    const { currentGroup } = useContext(GroupContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false); // New state for error modal

    const [task, setTask] = useState({
      title: "",
      description: "",
      points: "",
      deadline: "",
      teamId: currentGroup._id,

    });

    const handleInputChange = (key, value) => {
      setTask({ ...task, [key]: value });
    };

    const handleDateSelect = (date) => {
      const currentDate = new Date(); // Get the current date
      const selectedDate = new Date(date.dateString); // Convert selected date to a Date object
      // Check if the selected date is before the current date
      if (selectedDate < currentDate) {
        // Show an alert or perform any desired action to notify the user
        console.log('Please select a future date.');
        setErrorModalVisible(true); // Show error modal

        // You can choose to handle this situation in various ways, such as resetting the deadline or showing an error message to the user.
        // For example:
        // setTask({ ...task, deadline: '' }); // Reset the deadline
      } else {
        handleInputChange("deadline", date.dateString);
      }
      };
    const handleCreateTask = async () => {
      console.log("Sending POST request...");
      const data = {
        chore_name: task.title,
        description: task.description,
        due_date: task.deadline,
        points: parseInt(task.points),
        teamId: currentGroup._id,
      };

      console.log("Task:", data);

      try {
        await fetch('http://192.168.1.37:8084/chores/add', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });


        setModalVisible(true);

        setTask({
          title: "",
          description: "",
          points: "",
          deadline: "",
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handlePointsButtonPress = (selectedPoints) => {
      setTask({ ...task, points: selectedPoints });
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Create Task</Text>
        </View>
        <Text style={styles.taskName}>Task Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={task.title}
          onChangeText={(text) => handleInputChange("title", text)}
        />
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>Points:</Text>
          <ScrollView horizontal>
            {[100, 200, 300, 400, 500, 600].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.pointsButton,
                  task.points === value.toString() && styles.selectedPointsButton,
                ]}
                onPress={() => handlePointsButtonPress(value.toString())}
              >
                <Text style={styles.pointsButtonText}>{value}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Points (e.g., 500)"
          keyboardType="numeric"
          value={task.points}
          onChangeText={(text) => handleInputChange("points", text)}
        />
        <TouchableOpacity style={styles.deadlineContainer}>
          <Text style={styles.deadlineText}>Deadline:</Text>
          <Text style={styles.selectedDeadline}>{task.deadline}</Text>
        </TouchableOpacity>
        
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={
            task.deadline
              ? { [task.deadline]: { selected: true, selectedColor: "#007BFF" } }
              : {}
          }
          style={styles.calendar}
        />
        <Text style={styles.taskDescription}>Description</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Task Description"
          value={task.description}
          onChangeText={(text) => handleInputChange("description", text)}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={handleCreateTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Task created successfully!</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={errorModalVisible}
          onRequestClose={() => {
            setErrorModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Please select a future date!</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setErrorModalVisible(false);
                }}
              >
                <Text style={styles.closeButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 30,
      backgroundColor: "white",
      marginTop:20,
    },
    
    addButton: {
      backgroundColor: "#007BFF",
      padding: 15,
      borderRadius: 50,
      marginBottom: 50,
    },

    addButtonText: {
      color: "#fff",
      fontSize: 25,
      textAlign: "center",
      fontWeight:"bold",
    },

    header: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 30,
      textAlign: "center",
      color: "#273746", 
    },
    input: {
      height: 40,
      borderColor: "purple", // Change input border color
      borderWidth: 2,
      marginBottom: 16,
      paddingHorizontal: 12,
      borderRadius: 8,
      fontSize: 16,
    },

    pointsContainer: {
      flexDirection: "row",
      marginBottom: 16,
      alignItems: "center",
    },

    pointsText: {
      color: "#273746",
      fontSize: 16,
      marginRight: 8,
      fontWeight:"bold",
    },

    pointsButton: {
      backgroundColor: "#ccc",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginHorizontal: 4,
    },

    selectedPointsButton: {
      backgroundColor: "#007BFF",
    },

    pointsButtonText: {
      fontSize: 16,
      color: "#fff",
      textAlign: "center",
    },

    deadlineContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },

    deadlineText: {
      fontWeight:"bold",
      color:"#273746",
      fontSize: 16,
      marginRight: 8,
    },

    selectedDeadline: {
      fontSize: 16,
      color: "#007BFF",
    },

    calendar: {
      height: 300,
      marginBottom: 20,
      borderRadius:8
    },

    taskDescription: {
      color: "#273746",
      marginTop:50,
      fontSize: 16,
      marginBottom: 10,
      fontWeight:"bold",
    },
    taskName: {
      color: "#273746",
      marginTop:5,
      fontSize: 16,
      marginBottom: 10,
      fontWeight:"bold",
    },

    descriptionInput: {
      height: 100,
      borderColor: "gray",
      borderWidth: 2,
      marginBottom: 20,
      paddingHorizontal: 8,
      borderRadius:8,
      borderColor:"purple",
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 20,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: '#007BFF',
      padding: 12,
      borderRadius: 8,
      marginTop: 10,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
    },
  });

  export default TaskScreen;
