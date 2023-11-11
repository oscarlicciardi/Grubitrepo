import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
    const score = 85;
  const rank = 15;
  const level = "Intermediate";
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.info}>John</Text>

        <Text style={styles.label}>Surname:</Text>
        <Text style={styles.info}>Doe</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>john.doe@example.com</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.info}>123-456-7890</Text>
      </View>

      <View style={styles.scoringPanel}>
        <Text style={styles.label}>Score:</Text>
        <Text style={styles.info}>{score}</Text>

        <Text style={styles.label}>Rank:</Text>
        <Text style={styles.info}>{rank}</Text>

        <Text style={styles.label}>Level:</Text>
        <Text style={styles.info}>{level}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  scoringPanel: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileInfo: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 18,
    marginBottom: 15,
  },
});

export default ProfileScreen;
