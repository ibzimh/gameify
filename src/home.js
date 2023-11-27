import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";const HomeScreen = ({ setUser: setUser }) => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);  useEffect(() => {
    const fetchChores = async () => {
      try {
        const response = await fetch("http://gameify.us-east-1.elasticbeanstalk.com/chores");
        const data = await response.json();
        setTasks(data.data);
      } catch (error) {
        console.error("Error fetching chores:", error.message);
      }
    };
    fetchChores();
  }, []);  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title={"Logout"}
        onPress={() => {
          // temporary button to skip login
          setUser(false);
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
                    onPress={() => setIsModalVisible(true)}
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
                              onPress={() => setIsModalVisible(false)}
                            >
                              <Text style={styles.buttonText}>X</Text>
                            </TouchableOpacity>
                          </View>
                        </View>                        <View style={styles.modalInfoContainer}>
                          <Text style={styles.modalTaskName}>
                            {task.chore_name}
                          </Text>
                          <Text style={styles.modalDesc}>
                            {task.description}
                          </Text>
                          <Text style={styles.modalDate}>{task.due_date}</Text>
                        </View>                        <Button
                          title="Complete"
                          color="black"
                          onPress={() => setIsModalVisible(false)}
                        />
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
});export default HomeScreen;