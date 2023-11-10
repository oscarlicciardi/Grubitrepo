import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import ScanImageScreen from "../screens/ScanImageScreen";
import PrizesScreen from "../screens/PrizesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin ()  {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="ScanImage"
            component={ScanImageScreen}
            options={{
              tabBarLabel: "Scan Image",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="camera" color={color} size={size} />
              ),
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
      ) : (
        <LoginScreen handleLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;