/*
import React from "react";
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import QRCode from "react-native-qrcode-svg";

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
      photosNeeded: 10,
      unlocked: false,
      expirationDate: '2023-12-31',
      available: true,
    },
    {
      name: 'Prize 2',
      photosNeeded: 10,
      unlocked: false,
      expirationDate: '2023-12-31',
      available: true,
    },
    {
      name: 'Prize 3',
      photosNeeded: 10,
      unlocked: true,
      expirationDate: '2023-12-31',
      available: false,
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

  return (
    <View style={styles.container}>
      <ScrollView>{renderPrizes()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  prizeContainer: {
    width: '100%',
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
*/

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

const PrizesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);

  const prizes = [
    {
      name: "Prize 1",
      photosNeeded: 10,
      unlocked: true,
      expirationDate: "2023-12-31",
      available: true,
    },
    {
      name: "Prize 2",
      photosNeeded: 10,
      unlocked: false,
      expirationDate: "2023-12-31",
      available: true,
    },
    {
      name: "Prize 3",
      photosNeeded: 10,
      unlocked: true,
      expirationDate: "2023-12-31",
      available: true,
    },
    {
      name: "Prize 4",
      photosNeeded: 10,
      unlocked: true,
      expirationDate: "2023-12-31",
      available: true,
    },
    {
      name: "Prize 5",
      photosNeeded: 15,
      unlocked: false,
      expirationDate: "2024-01-15",
      available: false,
    },
    {
      name: "Prize 6",
      photosNeeded: 20,
      unlocked: false,
      expirationDate: null,
      available: true,
    },
  ];

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPrize(null);
  };

  const handlePrizePress = (prize) => {
    if (prize.unlocked && prize.available) {
      setSelectedPrize(prize);
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };

  const renderVoucherModal = () => {
    if (!selectedPrize) {
      return null;
    }

    return (
      <Modal isVisible={modalVisible} onBackdropPress={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Voucher</Text>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <FontAwesome name="close" size={24} color="black" />
            </TouchableOpacity>
            <QRCode value="YourRandomQRCodeData" size={150} />
            <Text style={styles.modalSubtitle}>
              Scan this QR code to redeem your prize.
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

  const renderPrizes = () => {
    return prizes.map((prize, index) => (
      <TouchableOpacity
        key={index}
        style={styles.prizeContainer}
        onPress={() => handlePrizePress(prize)}
      >
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
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView>{renderPrizes()}</ScrollView>
      {renderVoucherModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  prizeContainer: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  notAvailableLabel: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "red",
    marginBottom: 8,
  },
  prizeName: {
    fontSize: 18,
    fontWeight: "bold",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default PrizesScreen;