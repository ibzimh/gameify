import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button } from "react-native";
import Config from "./env";
import { GroupContext } from './team_context';

const GiftScreen = ({ user, setUser }) =>  {
  const { currentGroup } = useContext(GroupContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [teamPoints, setTeamPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemModalVisible, setRedeemModalVisible] = useState(false);
  const [redeemedItems, setRedeemedItems] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await fetch(Config.BACKEND + "rewards");
        const data = await response.json();
        if (response.ok) {
          // Filter rewards based on the current team's rewards
          const rewardsInTeam = data.data.filter(reward => reward.teams === currentGroup._id);

          // Set state with rewards information only
          setRewards(rewardsInTeam);
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

    fetchRewards();
    return () => clearInterval(refreshTimer);
  }, [refreshKey, currentGroup._id]);

  
  const handleRedeem = async () => {
    if (!selectedReward || !user.teamIds) {
      // If selected reward doesn't exist or user doesn't have team information, do nothing
      return;
    }
  
    // Find the team information for the current group
    const currentTeam = user.teamIds.find((team) => team.team_id === currentGroup._id);
  
    if (!currentTeam || currentTeam.total_points < selectedReward.points) {
      // If the team information is not found or team doesn't have enough points, do nothing
      return;
    }
  
    try {
      const newTeamPoints = currentTeam.total_points - selectedReward.points;

      const updatedUser = {
        ...user,
        teamIds: user.teamIds.map((team) =>
          team.team_id === currentGroup._id
            ? { ...team, total_points: newTeamPoints }
            : team
        ),
        achievement: selectedReward.reward_name,
      };

      setTeamPoints(newTeamPoints);
      setRedeemedItems((prevRedeemedItems) => [...prevRedeemedItems, selectedReward._id]);

      // Update the user's state with the new team points
      setUser(updatedUser);
    
      // Update the user's team points in the database
      const response = await fetch(`${Config.BACKEND}users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
    
      const data = await response.json();
      if (!response.ok) {
        console.error("Error updating user's team points:", data.message);
      }
    } catch (error) {
      console.error("Error updating user's team points:", error.message);
    }

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
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{item.points}pt</Text>
      </View>
      {redeemedItems.includes(item._id) && (
        <Text style={styles.redeemedText}>
          Redeemed by {user.user_name}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Team Points Container */}
      <View style={styles.teamPointsContainer}>
      <Text style={styles.teamPointsText}>
  My Points:{" "}
  {user.teamIds &&
    user.teamIds
      .filter((team) => team.team_id === currentGroup._id)
      .map((team) => team.total_points)
      .toString()}
</Text>
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

