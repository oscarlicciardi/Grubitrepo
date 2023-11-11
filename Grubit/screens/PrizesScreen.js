import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import colors from "../colors";

const PrizesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [prizes, setPrizes] = useState(null);

 
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPrize(null);
  };

  const handlePrizePress = (prize) => {
    if (prize.Status!="NotAvailable") {
      setSelectedPrize(prize);
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7046/prizes/list");
        setPrizes(response.data);
      } catch (error) {
        console.error("Error fetching prize data:", error);
      }
    };

    fetchData();
  }, []);

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
              <FontAwesome name="close" size={24} color= {colors.darkGreen} />
            </TouchableOpacity>
            <QRCode value="YourRandomQRCodeData" size={150} />
            <Text style={styles.modalSubtitle}>
              Scan this QR code to redeem your prize or say {prizes.code} to the cashier
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
        style={[
          styles.prizeContainer,
          prize.Status = "NotAvailable" && styles.notAvailableContainer, 
        ]}
        onPress={() => handlePrizePress(prize)}
      >
        <Text style={[styles.prizeName, !prize.available && { color: colors.white }]}>
          {prize.name}
        </Text>
        {prize.Status != "NotAvailable" && (
          <>
            <Text
              style={[
                styles.photosNeeded,
                prize.Status == "NotAvailable" && { color: colors.white }, 
              ]}
            >
              {prize.pointsNeeded} Points Needed
            </Text>
            <FontAwesome name="lock" size={24} color={colors.white} />
          </>
        )}
      </TouchableOpacity>
    ));
  };

  // Render the component
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
    backgroundColor: colors.white, 
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',     
    justifyContent: 'center',
  },
  notAvailableContainer: {
    backgroundColor: colors.green, 
  },
  notAvailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  notAvailableLabel: {
    fontSize: 12,
    marginBottom: 8,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalSubtitle: {
    marginTop: 15,
    textAlign: 'center',
  },
});

export default PrizesScreen;