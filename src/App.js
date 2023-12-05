import React, { useState } from 'react';
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
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginView from "./LoginView";
import HomeScreen from "./home";
import UsersScreen from "./team";
import ProfileScreen from "./Profile";
import { FontAwesome5 } from '@expo/vector-icons';
import Leaderboard from './leaderboard';
import GiftScreen from './reward';
import TaskScreen from './create_task'; 
const Tab = createBottomTabNavigator();

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

const CustomTabScreen = (name, Component, props) => {
  return <Tab.Screen
    name={name}
    children={(screenProps) => <Component {...screenProps} {...props} />}
    options={({ navigation, route }) => ({
      tabBarButton: (screenProps) => (
        <CustomTabBarButton
          {...screenProps}
          onPress={() => navigation.navigate(route.name)}
        >
          <FontAwesome5 name={name.toLowerCase()} size={30} color="#000" />
        </CustomTabBarButton>
      ),
    })}
  />;
};


const App = () => {
  const [user, setUser] = useState(null);

  if (!user) { 
    return (
      <View style={styles.container}>
        <LoginView setUser={setUser}/>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{ showLabel: false }}
        screenOptions={{ headerShown: false }}
      >
      {CustomTabScreen("Home", HomeScreen, {setUser: setUser})}
      {CustomTabScreen("Users", UsersScreen)}
      {CustomTabScreen("Profile", ProfileScreen)}
      {CustomTabScreen("Tasks", TaskScreen)}
      {CustomTabScreen("Trophy", Leaderboard)}
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
  headerContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  },
  pointsText: {
    fontSize: 16,
    marginRight: 8,
    alignSelf: 'center',
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
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  deadlineText: {
    fontSize: 16,
    marginRight: 8,
    alignSelf: 'center',
  },
  selectedDeadline: {
    fontSize: 16,
    color: '#007BFF',
    alignSelf: 'center',
  },
  calendar: {
    height: 300,
    marginBottom: 20,

  },
  taskDescription: {
    fontSize: 16,
    alignSelf: 'start'
  },
  descriptionInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  navbar: {
    flex: 1,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:  '#fff', // Pink for selected, white for others
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
  },
  navButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  navButtonText: {
    color: '#007BFF',
    fontSize: 12,
    marginTop: 5,
  },
  
});

export default App;