import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch your leaderboard data here from an API or some other data source.
    // For this example, I'll use static data.
    const staticData = [
      { name: 'Kshama', score: 100 },
      { name: 'Jason', score: 80 },
      { name: 'Ibrahim', score: 60 },
      { name: 'Arnav', score: 40 },
      { name: 'Julia', score: 120 },
      { name: 'Viet', score: 175 },
    ];
    setLeaderboardData(staticData);
  }, []);

  const getPodiumPlayers = () => {
    // Sort the leaderboard data by score in descending order
    const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);

    // Extract the top 3 players
    const topThreePlayers = sortedData.slice(0, 3);

    return { topThreePlayers, allPlayers: sortedData };
  };

  const { topThreePlayers, allPlayers } = getPodiumPlayers();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.podium}>
        {topThreePlayers.map((player, index) => (
          <View
            style={[
              styles.podiumItem,
              { backgroundColor: podiumColors[index] },
            ]}
            key={index}
          >
            <Text style={styles.podiumText}>{player.name}</Text>
          </View>
        ))}
      </View>
      <FlatList
        data={allPlayers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score} points</Text>
          </View>
        )}
      />
    </View>
  );
};

const podiumColors = ['gold', 'silver', 'peru'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  podiumItem: {
    width: 80,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  podiumText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Leaderboard;
