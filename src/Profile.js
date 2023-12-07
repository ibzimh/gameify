import React, { Component } from "react";
import { StyleSheet, Pressable, View, Image, Text, ImageBackground } from "react-native";
import UploadImage from "./ImageUpload";

export default class UserProfileView extends Component {

  render() {
    return (
      
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>Dashboard</Text>
              <Text style={styles.userInfo}>John Doe</Text>
            </View>
            <View>
              <UploadImage />
            </View>
          </View>
          <View>
            <Text style={styles.text}>View Your Points Here</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>CS 320</Text>
            <Text style={styles.SubjectText}>Total Points: 500</Text>
          </Pressable>
          <Pressable style={styles.RectangleShapeView}>
            <Text style={styles.headtText}>Team Burger</Text>
            <Text style={styles.SubjectText}>Total Points: 500 </Text>
          </Pressable>
          {/*Logout Button*/}
          <Pressable style={styles.btn}>
            <Text style={styles.text}>Logout</Text>
          </Pressable>
          <Pressable style={styles.btn}>
            <Text style={styles.text}>Change Password</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundSize: "contain",
    height: 300,
    backgroundColor: "#6495ed",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
    float: "right"
  },
  location: {
    borderColor: "white",
    width: 10,
    height: 10,
    float: "left"
  },
  hamburger: {
    borderColor: "white",
    width: 10,
    height: 10,
    float: "right"
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: "600",
    fontFamily: "Helvetica"
  },
  headtText: {
    fontFamily: "Helvetica",
    color: "grey",
    fontWeight: "600",
    float: "left",
    marginLeft: 20,
    marginTop: 10
  },
  SubjectText: {
    color: "black",
    fontWeight: "550",
    fontSize: 16,
    fontFamily: "Helvetica",
    float: "left",
    marginLeft: 20,
    marginTop: 10
  },
  userInfo: {
    fontSize: 20,
    color: "white",
    fontWeight: "600"
  },
  btn: {
    marginTop: 80,
    backgroundColor: "#6495ed",
    borderRadius: 10,
    width: 200,
    height: 50,
    alignItems: "center",
    padding: "6px",
    justifyContent: "center",
    elevation: 3,
  },
  body: {
    backgroundColor: "white",
    height: 500,
    alignItems: "center"
  },
  text: {
    color: "white",
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  RectangleShapeView: {
    marginTop: 20,
    width: "80%",
    height: 80,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    elevation: 3
  }

});
