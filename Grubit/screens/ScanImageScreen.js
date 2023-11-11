import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as Tesseract from "tesseract.js";
import { FontAwesome } from "@expo/vector-icons";
import { Accelerometer } from "expo-sensors";
import colors from "../colors";

const ScanImageScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [location, setLocation] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [detectedText, setDetectedText] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const setupPermissionsAndListeners = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");

      if (status === "granted") {
        const locationStatus = await Location.requestPermissionsAsync();
        if (locationStatus.status === "granted") {
          const currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation.coords);
        }
      }

      const accelerometerPermission = await Accelerometer.isAvailableAsync();
      if (accelerometerPermission) {
        Accelerometer.setUpdateInterval(1000);
        Accelerometer.addListener(handleAccelerometerChange);
      }
    };

    const handleAccelerometerChange = (accelerometerData) => {
      const acceleration = Math.sqrt(
        accelerometerData.x ** 2 +
          accelerometerData.y ** 2 +
          accelerometerData.z ** 2
      );
      setIsMoving(acceleration > 1);
    };

    setupPermissionsAndListeners();

    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setCapturedImage(uri);
      console.log("Image URI:", uri);
      console.log("Location Coordinates:", location);
    }
  };

  const handleConfirm = () => {
    if (isMoving) {
      console.log("Device is moving, cannot proceed.");
      return;
    }
    if (capturedImage) {
      detectTextInImage(capturedImage);
      setShowForm(true);
    }
  };

  const detectTextInImage = async (imageUri) => {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imageUri, "eng", {
        logger: (info) => console.log(info),
      });

      setDetectedText(text);
      console.log("Detected Text:", text);

      extractInformation(text);
    } catch (error) {
      console.error("Error during text detection:", error);
    }
  };

  const extractInformation = (text) => {
    const companyNameRegex = /company\s*name\s*:\s*(.*)/i;
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/;
    const phoneRegex = /\+\d{1,}|\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/;

    const companyNameMatch = text.match(companyNameRegex);
    const emailMatch = text.match(emailRegex);
    const phoneMatch = text.match(phoneRegex);

    let companyName = "";
    let email = "";
    let phoneNumber = "";

    if (companyNameMatch) {
      companyName = companyNameMatch[1];
    } else {
      const firstLine = text.split("\n")[0].trim();
      companyName = firstLine;
    }

    if (emailMatch) {
      email = emailMatch[0];
    } else if (phoneMatch) {
      phoneNumber = phoneMatch[0];
    }
    setFormData({
      companyName,
      email,
      phoneNumber,
    });
  };

  const handleFormDataChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSend = async () => {
    setShowForm(false);
    setCapturedImage(null);
    setDetectedText(null);
    await handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    try {
      const apiUrl = `http://localhost:70076/User/AddCompany?companyName=${formData.companyName}&email=${formData.email}&phoneNumber=${formData.phoneNumber}&longitude=${location.longitude}&latitude=${location.latitude}`;
      const response = await axios.post(apiUrl);
      console.log("Post request successful:", response.data);
    } catch (error) {
      console.error("Error making post request:", error);
    }
  };

  const UserMessage = ({ message, style }) => (
    <View style={styles.messageContainer}>
      <Text style={[styles.messageText, style]}>{message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      />
      <View style={styles.overlay}>
        {capturedImage && (
          <>
            <Text style={styles.previewText}>Preview:</Text>
            <UserMessage
              message="Picture taken successfully!"
              style={styles.message}
            />
            <Image
              source={{ uri: capturedImage }}
              style={styles.previewImage}
            />
          </>
        )}
        {showForm && (
          <Modal animationType="slide" transparent={false} visible={showForm}>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Company Name"
                value={formData.companyName}
                onChangeText={(value) =>
                  handleFormDataChange("companyName", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleFormDataChange("email", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChangeText={(value) =>
                  handleFormDataChange("phoneNumber", value)
                }
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowForm(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
        {!showForm && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
              <FontAwesome name="camera" size={24} color="white" />
              <Text style={styles.buttonText}>Take Picture</Text>
            </TouchableOpacity>
            {capturedImage && (
              <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  previewImage: {
    width: 250,
    height: 250,
    marginTop: 15,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "#B0B0B0",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  sendButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  messageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  messageText: {
    color: "#333",
  },
});

export default ScanImageScreen;
