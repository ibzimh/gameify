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
  const [teamPoints, setTeamPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemModalVisible, setRedeemModalVisible] = useState(false);
  const [redeemedItems, setRedeemedItems] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchGiftData = async () => {
      try {
        // Fetch user data including teamIds
        const userResponse = await fetch(
          `http://10.0.0.218:8081/users/${currentUser._id}`
        );
        const userData = await userResponse.json();
        const userTeamIds = userData.data.teamIds;

        // Fetch teams data
        const teamsResponse = await fetch("http://10.0.0.218:8081/teams");
        const teamsData = await teamsResponse.json();

        // Find the selected team based on user's teamIds
        const selectedTeamData = teamsData.data.find((team) =>
          userTeamIds.includes(team._id)
        );
        setSelectedTeam(selectedTeamData);

        // Fetch rewards data for the selected team
        const rewardsResponse = await fetch(
          `http://10.0.0.218:8081/rewards/team/${selectedTeamData._id}`
        );
        const rewardsData = await rewardsResponse.json();
        setItems(rewardsData.data);

        // Fetch team points and completed tasks
        const teamPointsResponse = await fetch(
          `http://10.0.0.218:8081/team/${selectedTeamData._id}/points`
        );
        const teamPointsData = await teamPointsResponse.json();
        setTeamPoints(teamPointsData.points);

        const completedTasksResponse = await fetch(
          `http://10.0.0.218:8081/user/${currentUser._id}/tasks`
        );
        const completedTasksData = await completedTasksResponse.json();
        setCompletedTasks(completedTasksData.tasks);
        setCompletedTasks(completedTasksData.tasks);
      } catch (error) {
        console.error("Error fetching gifts:", error.message);
        setItems([]);
      }
    };
    fetchGiftData();
  }, []);

  const handleRedeem = () => {
    if (!selectedReward) {
      return;
    }

    // calculate the new points after deduction
    const newPoints = currentUser.total_point - selectedReward.points;

    // update the list of redeemed items
    setRedeemedItems([...redeemedItems, selectedReward._id]);

    // update currentUser with new points and achievements
    const updatedUser = {
      ...currentUser,
      total_point: newPoints,
      achievement: selectedReward.reward_name,
    };

    // update the state with the new points
    setTeamPoints(newPoints);

    // close the redeem modal
    setRedeemModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemBox,
        redeemedItems.includes(item._id) ? styles.redeemedItem : null,
      ]}
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

  return (
    <View style={styles.container}>
      {/* Team Points Container */}
      <View style={styles.teamPointsContainer}>
        <Text style={styles.teamPointsText}>Team Points: {teamPoints}</Text>
      </View>

      {/* Display Completed Tasks */}
      <View style={styles.completedTasksBox}>
        <Text style={styles.completedTasksText}>Completed Tasks:</Text>
        {completedTasks.length > 0 ? (
          <FlatList
            data={completedTasks}
            keyExtractor={(task) => task._id}
            renderItem={({ item }) => (
              <Text style={styles.completedTaskItem}>{item.title}</Text>
            )}
          />
        ) : (
          <Text style={styles.noCompletedTasksText}>No completed tasks</Text>
        )}
      </View>

      {/* List of Items */}
      <FlatList
        data={items}
        keyExtractor={(item) => item._id.toString()}
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
    backgroundColor: "#fffeff",
  },
  teamPointsContainer: {
    backgroundColor: "#6495ed",
    width: "100%",
    height: "24%",
    justifyContent: "center",
    alignItems: "left",
  },
  teamPointsText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 20,
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
  completedTasksBox: {
    width: 214,
    height: 54,
    borderRadius: 20,
    backgroundColor: "#fffeff",
    alignItems: "left",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  completedTasksText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  itemBox: {
    borderWidth: 1,
    borderColor: "#6495ed",
    padding: 10,
    marginTop: 12,
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
    backgroundColor: "#FF69B4",
  },
  redeemedText: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 5,
  },
});

export default GiftScreen;
