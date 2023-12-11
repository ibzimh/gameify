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
  const [refreshKey, setRefreshKey] = useState(0);
  const [teamPoints, setTeamPoints] = useState(0);
  const [users, setUsers] = useState([]);
  const [rewards, setRewards] = useState([
    {
      _id: "1",
      reward_name: "Finish Task 1",
      points: 100,
    },
    {
      _id: "2",
      reward_name: "Finish Home Screen",
      points: 100,
    },
    {
      _id: "3",
      reward_name: "Finish Rewards Page",
      points: 100,
    },
  ]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemModalVisible, setRedeemModalVisible] = useState(false);
  const [redeemedItems, setRedeemedItems] = useState([]);

  //Fetching Rewards
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await fetch(Config.BACKEND + "rewards"); // Update the URL
        const data = await response.json();
        if (response.ok) {
          const usersInTeam = data.data.filter(user =>
            currentUser.teamIds.includes(user._id)
          );

          // Extracting only relevant reward information (name and points)
          const rewardsInfo = usersInTeam.map(user => ({
            rewardName: user.reward_name,
            points: user.points["$numberInt"],
          }));

          setUsers(rewardsInfo); // Set state with rewards information only
        } else {
          console.error("Error fetching rewards:", data.message);
        }
      } catch (error) {
        console.error("Error fetching rewards:", error.message);
      }
    };

    const refreshTimer = setInterval(() => {
      // Trigger a re-render by updating the state
      setRefreshKey(prevKey => prevKey + 1);
    }, 500);

    fetchRewards(); // Correct function name
    return () => clearInterval(refreshTimer);
  }, [refreshKey]);

  //Pre-Existing Function, Not Sure Why It's Here
  const handleRedeem = () => {
    if (!selectedReward || currentUser.total_point < selectedReward.points) {
      return;
    }

    // Calculate the new points after deduction
    const newPoints = currentUser.total_point - selectedReward.points;

    // Calculate the new team points after redemption
    const newTeamPoints = teamPoints + selectedReward.points;

    // Update the list of redeemed items
    setRedeemedItems([...redeemedItems, selectedReward._id]);

    // Update currentUser with new points and achievements
    const updatedUser = {
      ...currentUser,
      total_point: newPoints,
      achievement: selectedReward.rewardName,
    };

    // Update the state with the new points and team points
    setTeamPoints(newTeamPoints);

    // Close the redeem modal
    setRedeemModalVisible(false);
  };

  //Renders The Rewards. Currently Hardcoded.
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
      <Text style={styles.itemName}>{item.rewardName}</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{item.points}pt</Text>
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

      {/* List of Items (Rewards) */}
      <FlatList
        data={rewards}
        keyExtractor={item => item._id.toString()}
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
              {selectedReward ? selectedReward.rewardName : ""}?
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
  rewardsBox: {
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
  rewardsText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  itemBox: {
    height: 100,
    width: "90%",
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    elevation: 3,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#555',
  },
  pointsRequired: {
    backgroundColor: '#FBECFF',
    borderRadius: 14,
    paddingVertical: 7,
    paddingHorizontal: 12,
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
  pointsContainer: {
    backgroundColor: '#FBECFF',
    borderRadius: 14,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  points: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
});

export default GiftScreen;

