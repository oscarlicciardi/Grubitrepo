import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../colors";
const Header = ({ handleLogout, userName, userSurname }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.userInfo}>
        <Text style={styles.welcomeText}>Hi,</Text>
        <Text style={styles.userName}>{userName} {userSurname}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.green,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: "#ffffff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  logoutButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#0056b3",
  },
});

export default Header;
