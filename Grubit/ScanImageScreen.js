// -- THE ONE WITH EXPO CAMERA
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, ScrollView, useColorScheme, TextInput, Image, Modal, LogBox } from 'react-native';
// import { styles } from './styles';
// import * as Location from "expo-location";
import * as Tesseract from "tesseract.js";
import { FontAwesome } from "@expo/vector-icons";

// import TextRecognition from 'react-native-text-recognition';

/*

const save = async () => {

}

function ScanImageScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scannedCode, setScannedCode] = useState('');
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const [company, setCompany] = useState('');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vat, setVat] = useState('');

  return (

    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Text style={{ alignSelf: 'center', color: isDarkMode ? '#FFF' : '#000', margin: 40, marginTop: 200 }}>{'\n'}Take a picture of a truck</Text>

      <Camera
        style={{ width: '100%', height: '30%' }}
        type={type}>
      </Camera>

      <View style={{ marginTop: 40 }}>
        <TextInput placeholder='Company Name' style={{ ...styles.textfield, marginBottom: 15, height: 40, backgroundColor: isDarkMode ? '#2C2C2E' : '#E3E3E8', color: isDarkMode ? 'white' : 'black' }} value={company} onChangeText={setCompany} />
        <TextInput placeholder='Street' style={{ ...styles.textfield, marginBottom: 15, height: 40, backgroundColor: isDarkMode ? '#2C2C2E' : '#E3E3E8', color: isDarkMode ? 'white' : 'black' }} value={street} onChangeText={setStreet} />
        <TextInput placeholder='Zip Code' style={{ ...styles.textfield, marginBottom: 15, height: 40, backgroundColor: isDarkMode ? '#2C2C2E' : '#E3E3E8', color: isDarkMode ? 'white' : 'black' }} value={zip} onChangeText={setZip} />
        <TextInput placeholder='City' style={{ ...styles.textfield, marginBottom: 15, height: 40, backgroundColor: isDarkMode ? '#2C2C2E' : '#E3E3E8', color: isDarkMode ? 'white' : 'black' }} value={city} onChangeText={setCity} />
        <TextInput placeholder='Country' style={{ ...styles.textfield, marginBottom: 15, height: 40, backgroundColor: isDarkMode ? '#2C2C2E' : '#E3E3E8', color: isDarkMode ? 'white' : 'black' }} value={country} onChangeText={setCountry} />
        <TextInput placeholder='Phone' style={{ ...styles.textfield, marginBottom: 15, height: 40, backgroundColor: isDarkMode ? '#2C2C2E' : '#E3E3E8', color: isDarkMode ? 'white' : 'black' }} value={phone} onChangeText={setPhone} />
        <TextInput placeholder='Email' style={{ ...styles.textfield, marginBottom: 15, height: 40, backgroundColor: isDarkMode ? '#2C2C2E' : '#E3E3E8', color: isDarkMode ? 'white' : 'black' }} value={email} onChangeText={setEmail} />
        <TextInput placeholder='VAT number' style={{ ...styles.textfield, marginBottom: 15, height: 40, backgroundColor: isDarkMode ? '#2C2C2E' : '#E3E3E8', color: isDarkMode ? 'white' : 'black' }} value={vat} onChangeText={setVat} />
      </View>

      <TouchableOpacity
        style={{ margin: 10, marginTop: 50, marginBottom: 200, padding: 15, borderRadius: 15, backgroundColor: '#007AFF', width: 150, alignSelf: 'center', }}
        onPress={() => {
          save(//company, street, zip, city, country, phone, email, vat)
        }}
      >

        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Add</Text>
      </TouchableOpacity>



    </ScrollView>

  );
}



*/







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
      vatNumber,
      street,
      zipCode,
      city,
      country
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
                style={styles.textfield}
                placeholder="Company Name"
                value={formData.companyName}
                onChangeText={(value) =>
                  handleFormDataChange("companyName", value)
                }
              />
              <TextInput
                style={styles.textfield}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleFormDataChange("email", value)}
              />
              <TextInput
                style={styles.textfield}
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChangeText={(value) =>
                  handleFormDataChange("phoneNumber", value)
                }
              />

              <TextInput
                style={styles.textfield}
                placeholder="VAT Number"
                value={formData.vatNumber}
                onChangeText={(value) =>
                  handleFormDataChange("vatNumber", value)
                }
              />

              <TextInput
                style={styles.textfield}
                placeholder="Street"
                value={formData.street}
                onChangeText={(value) =>
                  handleFormDataChange("Street", value)
                }
              />

              <TextInput
                style={styles.textfield}
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChangeText={(value) =>
                  handleFormDataChange("ZIP Code", value)
                }
              />

              <TextInput
                style={styles.textfield}
                placeholder="City"
                value={formData.city}
                onChangeText={(value) =>
                  handleFormDataChange("City", value)
                }
              />

              <TextInput
                style={styles.textfield}
                placeholder="Country"
                value={formData.country}
                onChangeText={(value) =>
                  handleFormDataChange("Country", value)
                }
              />




              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={{ ...styles.buttonText, marginLeft: 0 }}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowForm(false)}
              >
                <Text style={{ ...styles.buttonText, marginLeft: 0 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
        {!showForm && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={{ ...styles.button, color: 'red' }} onPress={handleTakePicture}>
              <FontAwesome name="camera" size={24} color="white" />
              <Text style={{ ...styles.buttonText, marginLeft: 0 }}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={{ ...styles.buttonText, marginLeft: 0 }}>Confirm</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 600,
    minWidth: 300,
    margin: 10,
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    alignSelf: 'center',
  },
  sendButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 250,
    minWidth: 150,
    margin: 10,
    borderRadius: 15,
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 250,
    minWidth: 150,
    margin: 10,
    borderRadius: 15,
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
  container: {
    flex: 1,
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    paddingTop: 40,
    padding: 8,

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007AFF',
    padding: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#007AFF',


  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 250,
    minWidth: 150,
    margin: 10,
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    alignSelf: 'center',
  },


  textfield: {
    margin: 8,
    paddingLeft: 10,
    fontSize: 14,
    borderRadius: 10,
    backgroundColor: "lightgray",
    height: 35,
    textAlign: 'left',
    maxWidth: 600,
    minWidth: 300,
    alignSelf: 'center',
  },

  picker: {
    marginVertical: 0,
    height: 120,
    width: 300,
    overflow: 'visible',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    textAlign: 'right',
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    numberOfLines: 3,

  },
  pickerItemStyle: {

    maxHeight: "100%",
    fontWeight: 'normal',
    width: "100%",
    flexWrap: 'wrap',
    textAlign: 'justify',
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    numberOfLines: 3,
  }
});


export default ScanImageScreen;


