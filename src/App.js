import React, { useState } from "react";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
  </View>
);

const UsersScreen = () => (
  <View style={styles.container}>
    <Text>Users Screen</Text>
  </View>
);

const TrophyScreen = () => (
  <View style={styles.container}>
    <Text>Trophy Screen</Text>
  </View>
);

const GiftScreen = () => (
  <View style={styles.container}>
    <Text>Gift Screen</Text>
  </View>
);

const CustomTabBarButton = ({ children, onPress, focused }) => (
  <TouchableOpacity
    style={{
      flex: 1,
      height: 70,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: focused ? "#FF69B4" : "#ADD8E6",
      borderRadius: 15,
      marginHorizontal: 5,
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const CustomTabScreen = (name, component) => {
  return <Tab.Screen
    name={name}
    component={component}
    options={({ navigation, route }) => ({
      tabBarButton: (props) => (
        <CustomTabBarButton
          {...props}
          onPress={() => navigation.navigate(route.name)}
        >
          <FontAwesome5 name={name.toLowerCase()} size={30} color="#000" />
        </CustomTabBarButton>
      ),
    })}
  />;
};

const TaskScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [deadline, setDeadline] = useState("");

  const handlePointsButtonPress = (selectedPoints) => {
    setPoints(selectedPoints);
  };

  const handlePointsInputChange = (text) => {
    setPoints(text);
  };

  const handleDateSelect = (date) => {
    setDeadline(date.dateString);
  };

  const handleCreateTask = () => {
    console.log(
      `Task Title: ${title}, Description: ${description}, Points: ${points}, Deadline: ${deadline}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Create a New Task</Text>
      </View>
      <Text style={styles.taskDescription}>Task Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>Points:</Text>
        <ScrollView horizontal>
          {[100, 200, 300, 400, 500, 600].map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.pointsButton,
                points === value.toString() && styles.selectedPointsButton,
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
        value={points}
        onChangeText={handlePointsInputChange}
      />
      <TouchableOpacity style={styles.deadlineContainer}>
        <Text style={styles.deadlineText}>Deadline:</Text>
        <Text style={styles.selectedDeadline}>{deadline}</Text>
      </TouchableOpacity>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={
          deadline
            ? { [deadline]: { selected: true, selectedColor: "#007BFF" } }
            : {}
        }
        style={styles.calendar}
      />
      <Text style={styles.taskDescription}>Description</Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity //style = {styles.addButtonContainer}
        style={styles.addButton}
        onPress={() => console.log("Add Task Button Pressed")}
      >
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{ showLabel: false }}
        screenOptions={{ headerShown: false }}
      >
    {CustomTabScreen("Home", HomeScreen)}
    {CustomTabScreen("Users", UsersScreen)}
    {CustomTabScreen("Tasks", TaskScreen)}
    {CustomTabScreen("Trophy", TrophyScreen)}
    {CustomTabScreen("Gift", GiftScreen)}
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 50,
    backgroundColor: "#f0f0f0",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 50,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  headerContainer: {
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  pointsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  pointsText: {
    fontSize: 16,
    marginRight: 8,
    alignSelf: "center",
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
  },
  deadlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  deadlineText: {
    fontSize: 16,
    marginRight: 8,
    alignSelf: "center",
  },
  selectedDeadline: {
    fontSize: 16,
    color: "#007BFF",
    alignSelf: "center",
  },
  calendar: {
    height: 300,
    marginBottom: 20,
  },
  taskDescription: {
    fontSize: 16,
    alignSelf: "start",
  },
  descriptionInput: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  navbar: {
    flex: 1,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Pink for selected, white for others
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  navButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  navButtonText: {
    color: "#007BFF",
    fontSize: 12,
    marginTop: 5,
  },
});

export default App;
