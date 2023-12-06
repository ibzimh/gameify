import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";


import Config from "./env";

const HomeScreen = ({ setUser: setUser }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);  
  const [selectedTask, setSelectedTask] = useState(null);


  // useEffect(() => {
  //   const fetchChores = async () => {
  //     try {
  //       const response = await fetch(Config.BACKEND + "/chores");
  //       //const response = await fetch(
  //       //   Config.BACKEND + "chores"
  //       // );
  //       const data = await response.json();
  //       setTasks(data.data);
  //     } catch (error) {
  //       console.error("Error fetching chores:", error.message);
  //     }
  //   };
  //   fetchChores();
  // }, []);

  useEffect(() => {
    const fetchChores = async () => {
      try {
        const response = await fetch(Config.BACKEND + "chores");
        const data = await response.json();
        setTasks(data.data);
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
        setTasks(data.data);
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

  // const toggleModal = (task) => {
  //   setSelectedTask(task);
  //   setIsModalVisible(!isModalVisible);
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title={"Logout"}
        onPress={() => {
          // temporary button to skip login
          console.log(setUser(null));
        }}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.header}></Text>
      </View>
      {tasks.map((task, index) => (
        <View key={index} style={styles.taskContainer}>
          <View style={styles.layerZeroContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.taskName}>{task.chore_name}</Text>
              <View style={styles.rightSideContainer}>
                <View style={styles.pointsContainer}>
                  <Text style={styles.pointsText}>{task.points}pt</Text>
                </View>
                <View style={styles.modalContainer}>
                  <Button
                    title="..."
                    onPress={() => {
                      setIsModalVisible(true);
                      setSelectedTask(task);
                    }}
                    color={"black"}
                  />
                  <Modal
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                    animationType="slide"
                    transparent={true}
                  >
                    <View style={styles.modalContentHelp}>
                      <View style={styles.modalContent}>
                        <View style={styles.headerCloseContainer}>
                          <Text style={styles.taskDetail}>Task Detail</Text>
                          <View style={styles.closeButton}>
                            <TouchableOpacity
                              styles={styles.closeButton}
                              onPress={() => {
                                setIsModalVisible(false);
                                setSelectedTask(null);
                              }}
                            >
                              <Text style={styles.buttonText}>X</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={styles.modalInfoContainer}>
                          <Text style={styles.modalTaskName}>
                            {selectedTask?.chore_name}
                          </Text>
                          <Text style={styles.modalDesc}>
                            {selectedTask?.description}
                          </Text>
                          <Text style={styles.modalDate}>
                            {selectedTask?.due_date}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.completeButton}
                          onPress={() => {
                            handleDelete(selectedTask?._id);
                          }}
                        >
                          <Text style={styles.completeText}>Complete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>
            </View>
            <View style={styles.descContainer}>
              <Text style={styles.desc}>{task.description}</Text>
            </View>
            <View style={styles.deadlineContainer}>
              <Text style={styles.date}>{task.due_date}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  taskContainer: {
    marginBottom: 20,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
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
    backgroundColor: "#5CB85C",
    padding: 8,
    borderRadius: 4,
  },
  pointsText: {
    color: "white",
  },
  modalContainer: {
    flex: 0,
    marginTop: -8,
    paddingTop: -4,
    paddingLeft: 4,
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
    flexDirection: "row",
    backgroundColor: "#5cb85c",
    borderRadius: 10,
    marginLeft: 220,
    paddingTop: 4,
    paddingBottom: 4,
    justifyContent: "center",
  },
  completeText: {
    fontSize: 28,
    //backgroundColor: "#5CB85C",

    borderRadius: 10,

    justifyContent: "center",
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
});

export default HomeScreen;
