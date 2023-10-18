import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const Categories = () => {
  const[categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('http://172.31.19.188:8000/categories')
    .then(response=>response.json())
    .then(data => setCategories(data))
    .catch(error => console.error(error));
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item} onPress={() => console.log(item)}>
            <Text style={styles.title}>{item.category_id}</Text>
            <Text style={styles.content}>{item.category_name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.category_id.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', }, item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', }, title: { fontWeight: 'bold', fontSize: 18, marginBottom: 8, }, content: { fontSize: 14, }, });

export default Categories;
