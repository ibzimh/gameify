import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const TaskScreen = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    points: '',
    deadline: '',
    category: 0,
    assign_to: 0
  });

  const handleInputChange = (key, value) => {
    setTask({ ...task, [key]: value });
  };

  const handleDateSelect = (date) => {
    handleInputChange('deadline', date.dateString);
  };

  const handleCreateTask = async () => {
    console.log("Sending POST request...");
    const data = {
      chore_name: task.title,
      description: task.description,
      due_date: task.deadline,
      assign_to: parseInt(task.assign_to),
      category: parseInt(task.category),
      points: parseInt(task.points),
    };

    console.log("Task:", data);

    try {
      const response = await fetch('http://172.31.139.117:8081/chores/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      console.log(responseData);

      setTask({
        title: '',
        description: '',
        points: '',
        deadline: '',
        category: 0,
        assign_to: 0
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePointsButtonPress = (selectedPoints) => {
    setTask({ ...task, points: selectedPoints });
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
    value={task.title}
    onChangeText={(text) => handleInputChange('title', text)}
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
    onChangeText={(text) => handleInputChange('points', text)}
  />
  <TouchableOpacity style={styles.deadlineContainer}>
    <Text style={styles.deadlineText}>Deadline:</Text>
    <Text style={styles.selectedDeadline}>{task.deadline}</Text>
  </TouchableOpacity>
  <Calendar
    onDayPress={handleDateSelect}
    markedDates={task.deadline ? {[task.deadline]: {selected: true, selectedColor: '#007BFF'}} : {}}
    style={styles.calendar}
  />
  <Text style={styles.taskDescription}>Description</Text>
  <TextInput
    style={styles.descriptionInput}
    placeholder="Task Description"
    value={task.description}
    onChangeText={(text) => handleInputChange('description', text)}
    multiline
  />
  <TouchableOpacity
    style={styles.addButton}
    onPress={handleCreateTask} 
  >
    <Text style={styles.addButtonText}>+ Add Task</Text>
  </TouchableOpacity>
</ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 50,
    backgroundColor: '#f0f0f0',
  },

  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 50,
  },

  addButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',  
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },

  pointsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',  
  },

  pointsText: {
    fontSize: 16,
    marginRight: 8,
  },

  pointsButton: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },

  selectedPointsButton: {
    backgroundColor: '#007BFF',
  },

  pointsButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',  
  },

  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  deadlineText: {
    fontSize: 16,
    marginRight: 8,
  },

  selectedDeadline: {
    fontSize: 16,
    color: '#007BFF',
  },

  calendar: {
    height: 300,
    marginBottom: 20,
  },

  taskDescription: {
    fontSize: 16,
    marginBottom: 10,  
  },

  descriptionInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },

});

export default TaskScreen;


