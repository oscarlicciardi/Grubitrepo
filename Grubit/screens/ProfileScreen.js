import React, {useEffect,useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../colors";

const ProfileScreen = () => {
  const score = 85;
  const rank = 15;
  const level = "Intermediate";
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("localhost:7046/api/User/profile");
        setProfile(response.data); 
      } catch (error) {
        console.error("Error fetching prize data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.scoringPanel}>
        <Text style={styles.label}>Score:</Text>
        <Text style={styles.info1}>{profile.score}</Text>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.info}>{profile.name}</Text>

        <Text style={styles.label}>Surname:</Text>
        <Text style={styles.info}>{profile.surname}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{profile.email}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.info}>{profile.phone}</Text>
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
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: 'column',  
    alignItems: 'center',     
    justifyContent: 'center',
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
    color: colors.darkGreen,
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
    color: colors.darkGreen,

  },
  info: {
    fontSize: 18,
    marginBottom: 15,
    color: colors.green,
  },
  info1: {
    fontSize: 42,
    marginBottom: 15,
    fontWeight : "bold",
    color: colors.green,

  },
});

export default ProfileScreen;
