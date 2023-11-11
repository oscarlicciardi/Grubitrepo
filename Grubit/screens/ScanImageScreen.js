import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNTextDetector from "rn-text-detector";

const ScanImageScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [location, setLocation] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [textRecognition, setTextRecognition] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      if (status === "granted") {
        const locationStatus = await Location.requestForegroundPermissionsAsync();
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
  
      if (RNTextDetector) {
        const textRecognitionResult = await RNTextDetector.detectFromUri(uri);
        setTextRecognition(textRecognitionResult);
      } else {
        console.error('RNTextDetector is not available.');
      }
    }
  };
  

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      />
      <View style={styles.cameraContainer}>
        <Button title="Take Picture" onPress={handleTakePicture} />
      </View>
      {capturedImage && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Preview:</Text>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          {!!textRecognition.length &&
            textRecognition.map((item, i) => (
              <Text key={i} style={styles.previewText}>
                {item.text}
              </Text>
            ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cameraContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  previewContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
  },
  previewText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default ScanImageScreen;
