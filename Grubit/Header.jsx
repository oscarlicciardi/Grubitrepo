import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = ({ handleLogout, userName, userSurname, companyLogoUrl }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.userInfo}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>{userName} {userSurname}</Text>
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
    paddingTop: 60,
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
  welcomeText: {
    fontSize: 16,
    color: "#ffffff",
  },
  userSurname: {
    fontSize: 16, // Increased font size
    color: "#ffffff", // Text color
  },
  logoutButton: {
    padding: 10, // Increased padding
    borderRadius: 30, // Increased border radius
  },
});

export default Header;
