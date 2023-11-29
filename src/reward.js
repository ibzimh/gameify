import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const currentUser = {
  _id: "655130639407a73e835e4ac3",
  user_name: "Viet Truong",
  teamIds: ["655d3e1b6669b07181c0a468"],
  role: "admin",
  email: "vbtruong@umass.edu",
  dob: "1990-01-01",
  gender: "Male",
  total_point: 1000,
  achievement: "Some achievement",
  status: "Active",
};

const GiftScreen = () => {
  const [selectedTeam, setSelectedTeam] = useState(currentUser.teamIds[0]); // Default team is first team
  const [teamPoints, setTeamPoints] = useState(0); // Each team has its own points, default is 0
  const [teamTasks, setTeamTasks] = useState([]); // Each team has its own tasks, default is empty array
  const [points, setPoints] = useState(`${0} pt`);
  const [items, setItems] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemModalVisible, setRedeemModalVisible] = useState(false);
  const [redeemedItems, setRedeemedItems] = useState([]);

  useEffect(() => {
    // Fetch team data when selectedTeam changes
    const fetchTeamData = async () => {
      try {
        const response = await fetch(
          `http://172.31.252.91:8081/team/${selectedTeam}`
        );
        const teamData = await response.json();
        console.log("Fetched team data:", teamData);

        setTeamPoints(teamData.totalPoints);
        setTeamTasks(teamData.tasks);
      } catch (error) {
        console.error("Error fetching team data:", error.message);
        setTeamPoints(0);
        setTeamTasks([]);
      }
    };

    fetchTeamData();
  }, [selectedTeam]);

  // Fetch gift data when the component mounts
  useEffect(() => {
    const fetchGiftData = async () => {
      try {
        const response = await fetch("http://172.31.252.91:8081/rewards");
        const data = await response.json();
        console.log("Fetched data:", data);

        setItems(data.data); // Update items in the state with data from the API
      } catch (error) {
        console.error("Error fetching gifts:", error.message);
        // If there's an error, set an empty array
        setItems([]);
      }
    };

    fetchGiftData();
  }, []);

  const handleRedeem = () => {
    if (!selectedReward) {
      return;
    }

    // Calculate the new points after deduction
    const newPoints = currentUser.total_point - selectedReward.points;

    // Update the list of redeemed items
    setRedeemedItems([...redeemedItems, selectedReward._id]);

    // Update currentUser with new points and achievements
    const updatedUser = {
      ...currentUser,
      total_point: newPoints,
      achievement: selectedReward.reward_name, // Update achievement (replace with the desired logic)
    };

    // Implement the logic to update the user's achievements (you may want to append to an array)
    // Example: updatedUser.achievements.push(selectedReward.reward_name);

    // Update the state with the new points
    setPoints(`${newPoints} pt`);

    // Implement the logic to update the backend or any other data storage with the updated user

    // Close the redeem modal
    setRedeemModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemBox,
        redeemedItems.includes(item._id) ? styles.redeemedItem : null,
      ]}
      onPress={() => {
        setSelectedReward(item);
        setRedeemModalVisible(true);
      }}
    >
      <Text style={styles.itemName}>{item.reward_name}</Text>
      <View style={styles.pointsRequired}>
        <Text style={styles.itemPoints}>{item.points} points</Text>
      </View>
      {redeemedItems.includes(item._id) && (
        <Text style={styles.redeemedText}>
          Redeemed by {currentUser.user_name}
        </Text>
      )}
    </TouchableOpacity>
  );

  //dropdown meny
  const renderTeamDropdown = () => (
    <Dropdown
      data={currentUser.teamIds.map((teamId) => ({ label: `Team ${teamId}`, value: teamId }))}
      value={selectedTeam}
      onChange={(value) => setSelectedTeam(value)}
    />
  );

  return (
    <View style={styles.container}>
      {/* Outer Circle */}
      <View style={styles.outerCircle}>
        {/* Inner Circle */}
        <View style={styles.innerCircle}>
          <Text style={styles.score}>Your Score</Text>
          <Text style={styles.points}>{points}</Text>
        </View>
      </View>

      {/* Section Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Available Items:</Text>
      </View>

      {/* Team Dropdown */}
      {renderTeamDropdown()}
      
      {/* List of Items */}
      <FlatList
        data={items}
        keyExtractor={(item) => item._id.toString()} // Change keyExtractor to use _id
        renderItem={renderItem}
      />

      {/* Redeem Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={redeemModalVisible}
        onRequestClose={() => {
          setRedeemModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to redeem{" "}
              {selectedReward ? selectedReward.name : ""}?
            </Text>
            <Button title="Redeem" onPress={handleRedeem} />
            <Button
              title="Cancel"
              onPress={() => setRedeemModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fffeff",
  },
  titleContainer: {
    width: 214,
    height: 54,
    borderRadius: 20,
    backgroundColor: "#fffeff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  // Outer Circle Styles
  outerCircle: {
    width: 190,
    height: 190,
    flexShrink: 0,
    backgroundColor: "#5f43b2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
    marginTop: 20,
  },
  // Inner Circle Styles
  innerCircle: {
    width: 160,
    height: 160,
    flexShrink: 0,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
  },
  score: {
    color: "#3a3153",
    textAlign: "center",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "700",
  },
  points: {
    color: "#3a3153",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "500",
  },
  itemBox: {
    borderWidth: 1,
    borderColor: "#6C19FF",
    padding: 10,
    marginTop: 10,
    marginBottom: 14,
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    borderRadius: 10,
    height: 50,
  },
  itemName: {
    fontSize: 16,
  },
  pointsRequired: {
    width: 80,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#FBECFF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 4,
  },
  itemPoints: {
    color: "#2B262D",
    textAlign: "center",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
  },
  totalPointsBox: {
    backgroundColor: "#FFECFB",
    width: 214,
    height: 54,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  redeemedItem: {
    backgroundColor: "#FF69B4", // Change the color to pink for redeemed items
  },
  redeemedText: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 5,
  },
});

export default GiftScreen;
