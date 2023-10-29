import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'; 

import HomeScreen from './home';
import UsersScreen from './team';
import Leaderboard from './leaderboard';
import GiftScreen from './reward';
import TaskScreen from './create_task'; 
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, focused }) => (
  <TouchableOpacity
    style={{
      flex: 1,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: focused ? '#FF69B4' : '#ADD8E6', 
      borderRadius:15,
      marginHorizontal:5,
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{ showLabel: false }}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation, route }) => ({
            tabBarButton: (props) => (
              <CustomTabBarButton
                {...props}
                onPress={() => navigation.navigate(route.name)}
              >
                <FontAwesome5 name="home" size={30} color="#000" />
              </CustomTabBarButton>
            ),
          })}
        />
        <Tab.Screen
          name="Users"
          component={UsersScreen}
          options={({ navigation, route }) => ({
            tabBarButton: (props) => (
              <CustomTabBarButton
                {...props}
                onPress={() => navigation.navigate(route.name)}
              >
                <FontAwesome5 name="users" size={30} color="#000" />
              </CustomTabBarButton>
            ),
          })}
        />
        <Tab.Screen
          name="Tasks"
          component={TaskScreen}
          options={({ navigation, route }) => ({
            tabBarButton: (props) => (
              <CustomTabBarButton
                {...props}
                onPress={() => navigation.navigate(route.name)}
              >
                <FontAwesome5 name="tasks" size={30} color="#000" />
              </CustomTabBarButton>
            ),
          })}
        />
        <Tab.Screen
          name="Trophy"
          component={Leaderboard}
          options={({ navigation, route }) => ({
            tabBarButton: (props) => (
              <CustomTabBarButton
                {...props}
                onPress={() => navigation.navigate(route.name)}
              >
                <FontAwesome5 name="trophy" size={30} color="#000" />
              </CustomTabBarButton>
            ),
          })}
        />
        <Tab.Screen
          name="Gift"
          component={GiftScreen}
          options={({ navigation, route }) => ({
            tabBarButton: (props) => (
              <CustomTabBarButton
                {...props}
                onPress={() => navigation.navigate(route.name)}
              >
                <FontAwesome5 name="gift" size={30} color="#000" />
              </CustomTabBarButton>
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
