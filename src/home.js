import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
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
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>{task.points}pt</Text>
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
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
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
  pointsContainer: {
    backgroundColor: "#5CB85C",
    padding: 8,
    borderRadius: 4,
  },
  pointsText: {
    color: "white",
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

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: "#f0f0f0",
//   },
//   headerContainer: {
//     marginBottom: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   taskContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//     // padding: 10,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   layerZeroContainer: {
//     flexDirection: "column",
//     flex: 1,
//   },
//   infoContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     // backgroundColor: "red",
//     padding: 10,
//     paddingTop: 0,
//     alignContent: "space-between",
//     flex: 1,
//     margin: 2,
//     borderWidth: 1,
//     borderTopColor: "#f0f0f0",
//     borderRightColor: "#f0f0f0",
//     borderLeftColor: "#f0f0f0",
//     borderBottomColor: "#000",
//   },
//   descContainer: {
//     flexDirection: "column",
//     alignItems: "center",
//     //backgroundColor: "green",
//     flex: 2,
//     margin: 2,
//     padding: 10,
//     alignContent: "flex-start",
//   },
//   deadlineContainer: {
//     flexDirection: "row",
//     flex: 3,
//     // backgroundColor: "darkorange",
//     margin: 2,
//     padding: 5,
//     borderWidth: 1,
//     borderTopColor: "#000",
//     borderRightColor: "#f0f0f0",
//     borderLeftColor: "#f0f0f0",
//     borderBottomColor: "#f0f0f0",
//   },
//   taskName: {
//     flexDirection: "row",
//     flex: 2,
//     fontSize: 24,
//   },
//   pointsContainer: {
//     backgroundColor: "#e5e5e5",
//     padding: 5,
//     marginTop: 8,
//     borderRadius: 5,
//   },
//   pointsText: {
//     fontSize: 16,
//   },
//   desc: {
//     fontSize: 18,
//     textAlign: "left",
//   },
//   date: {
//     flex: 1,
//     fontSize: 12,
//     color: "#777",
//     // backgroundColor: "pink",
//     textAlign: "right",
//   },
//   time: {
//     flex: 1,
//     fontSize: 12,
//     color: "#777",
//     // backgroundColor: "purple",
//   },
// });

// export default HomeScreen;
