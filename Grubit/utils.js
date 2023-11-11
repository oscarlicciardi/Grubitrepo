import React from 'react';
import { View, Text } from 'react-native'; 
export const renderRightComponent = (user) => (
    <View style={{ alignItems: "center", flexDirection: "column" }}>
      <View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginRight: 10,
            fontFamily: "Montserrat-Italic-VariableFont_wght",
          }}
        >
          {user.firstName}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginRight: 10,
            fontFamily: "Montserrat-Italic-VariableFont_wght",
          }}
        >
          {user.lastName}
        </Text>
      </View>
    </View>
  );