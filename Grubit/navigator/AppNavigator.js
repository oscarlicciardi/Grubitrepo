import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../components/Header";
import ScanImageScreen from "../screens/ScanImageScreen.js";
import PrizesScreen from "../screens/PrizesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  const companyLogoUrl = "../images/logo.png";

  return (
    <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            header: () => (
              <Header
                handleLogout={handleLogout}
                userName="Thomas"
                userSurname="Losch"
                companyLogoUrl={companyLogoUrl}
              />
            ),
          }}
        >
          <Tab.Screen
            name="ScanImage"
            component={ScanImageScreen}
            options={{
              tabBarLabel: "Scan Image",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="camera" color={color} size={size} />
              ),
              unmountOnBlur:true
            }}
          />
          <Tab.Screen
            name="Prizes"
            component={PrizesScreen}
            options={{
              tabBarLabel: "Prizes",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="gift" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="user" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      
    </NavigationContainer>
  );
};

export default AppNavigator;
