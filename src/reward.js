import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

class GiftScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: "100 pt",
      items: [
        { id: 1, name: "Item 1", pointsRequired: 20 },
        { id: 2, name: "Item 2", pointsRequired: 30 },
        { id: 3, name: "Item 3", pointsRequired: 40 },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Outer Circle */}
        <View style={styles.outerCircle}>
          {/* Inner Circle */}
          <View style={styles.innerCircle}>
            <Text style={styles.score}>Your Score</Text>
            <Text style={styles.points}>{this.state.points}</Text>
          </View>
        </View>

        {/* Section Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Available Items:</Text>
        </View>

        {/* List of Items */}
        <FlatList
          data={this.state.items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemBox}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.pointsRequired}>
                <Text style={styles.itemPoints}>
                  {item.pointsRequired} points
                </Text>
              </View>
            </View>
          )}
        />

        {/* Box that displays total points with "Points" inside */}
        <View style={styles.totalPointsBox}>
          <Text style={styles.itemPoints}>Points</Text>
        </View>
      </View>
    );
  }
}

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
});

export default GiftScreen;