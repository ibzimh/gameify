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
              <Text style={styles.itemPoints}>
                {item.pointsRequired} points
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(93, 14, 234, 0.59)",
  },
  titleContainer: {
    width: 214,
    height: 54,
    borderRadius: 20,
    backgroundColor: "rgba(143, 85, 245, 0.59)",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  // Outer Circle Styles
  outerCircle: {
    width: 191,
    height: 190,
    flexShrink: 0,
    backgroundColor: "rgba(221, 144, 240, 0.70)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 191 / 2,
    marginTop: 20,
  },
  // Inner Circle Styles
  innerCircle: {
    width: 151,
    height: 148,
    flexShrink: 0,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 148 / 2,
  },
  score: {
    color: "#A42FC1",
    textAlign: "center",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "700",
  },
  points: {
    color: "#A42FC1",
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
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    borderRadius: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemPoints: {
    fontSize: 16,
  },
});

export default GiftScreen;
