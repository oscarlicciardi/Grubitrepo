import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = ({ handleLogout, userName, userSurname, companyLogoUrl }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require("../images/logo.png")} style={styles.logo} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userSurname}>{userSurname}</Text>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <FontAwesome5 name="sign-out-alt" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#007BFF", // Updated background color
    elevation: 5, // Increased elevation for a stronger shadow effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18, // Increased font size
    fontWeight: "bold",
    color: "#ffffff", // Text color
  },
  userSurname: {
    fontSize: 16, // Increased font size
    color: "#ffffff", // Text color
  },
  logoutButton: {
    padding: 10, // Increased padding
    borderRadius: 10, // Increased border radius
    backgroundColor: "#0056b3", // Updated button color
  },
});

export default Header;
