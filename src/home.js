import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  Modal,
  StyleSheet,
} from "react-native";

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchChores = async () => {
      try {
        const response = await fetch("http://10.78.152.56:8081/chores");
        const data = await response.json();
        setTasks(data.data);
      } catch (error) {
        console.error("Error fetching chores:", error.message);
      }
    };
    fetchChores();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
                    color={"midnightblue"}
                  />
                  <Modal
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                    animationType="slide"
                    presentationStyle="pageSheet"
                  >
                    <View>
                      {tasks.map((task, index) => (
                        <View
                          key={index}
                          style={styles.modalTaskContainer}
                        ></View>
                      ))}

                      <Button
                        title="Close"
                        color="midnightblue"
                        onPress={() => setIsModalVisible(false)}
                      />
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
};

const styles = StyleSheet.create({
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
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderColor: "ccc",
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
