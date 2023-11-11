import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as Tesseract from "tesseract.js";
import { FontAwesome } from "@expo/vector-icons";

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

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");

      if (status === "granted") {
        const locationStatus = await Location.requestPermissionsAsync();
        if (locationStatus.status === "granted") {
          const currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation.coords);
        }
      }
    })();
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
    // Perform text detection using Tesseract.js
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

      // Extract relevant information (company name, email, phone number)
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
      // If there is no explicit "company name" match, consider the first line as the company name
      const firstLine = text.split("\n")[0].trim();
      companyName = firstLine;
    }

    if (emailMatch) {
      email = emailMatch[0];
    } else if (phoneMatch) {
      phoneNumber = phoneMatch[0];
    }

    // Updated setFormData
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

  const handleSend = () => {
    // Call your API to send the form data
    console.log("Form Data:", formData);
    // Reset the state or navigate to another screen if needed
    setShowForm(false);
    setCapturedImage(null);
    setDetectedText(null);
    // Add logic to send the data to your API
  };

  const UserMessage = ({ message, style }) => (
    <View style={{ alignItems: "center", marginVertical: 10 }}>
      <Text style={{ color: "#333", ...style }}>{message}</Text>
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
        <Text style={styles.previewText}>Preview:</Text>
        {capturedImage && (
          <UserMessage
            message="Picture taken successfully!"
            style={styles.message}
          />
        )}
        <Image source={{ uri: capturedImage }} style={styles.previewImage} />
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
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
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
    backgroundColor: "#3498db",
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
  message: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default ScanImageScreen;
