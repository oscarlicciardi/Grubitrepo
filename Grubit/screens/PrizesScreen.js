import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const PrizesScreen = () => {
  const prizes = [
    {
      name: 'Prize 1',
      photosNeeded: 10,
      unlocked: true,
      expirationDate: '2023-12-31',
      available: true,
    },
    {
      name: 'Prize 2',
      photosNeeded: 15,
      unlocked: false,
      expirationDate: '2024-01-15',
      available: false,
    },
    {
      name: 'Prize 3',
      photosNeeded: 20,
      unlocked: false,
      expirationDate: null,
      available: true,
    },
  ];

  const renderPrizes = () => {
    return prizes.map((prize, index) => (
      <View key={index} style={styles.prizeContainer}>
        {!prize.available && <Text style={styles.notAvailableLabel}>NOT AVAILABLE</Text>}
        <Text style={styles.prizeName}>{prize.name}</Text>
        {prize.unlocked ? (
          <Text style={styles.expirationDate}>Expires: {prize.expirationDate}</Text>
        ) : (
          <>
            <Text style={styles.photosNeeded}>{prize.photosNeeded} Photos Needed</Text>
            <FontAwesome name="lock" size={24} color="black" />
          </>
        )}
      </View>
    ));
  };

  return <View style={styles.container}>{renderPrizes()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prizeContainer: {
    width: '80%',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  notAvailableLabel: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
  prizeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  photosNeeded: {
    fontSize: 14,
    marginBottom: 8,
  },
  expirationDate: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default PrizesScreen;






