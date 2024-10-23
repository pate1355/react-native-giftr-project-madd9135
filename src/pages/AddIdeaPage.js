// Dependencies
import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  Modal,
  Text,
} from "react-native";
import GiftContext from "../context/GiftContext";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Camera } from "expo-camera";

export default function AddIdeaPage({ navigation, route }) {
  const { personId } = route.params;
  const { addIdea } = useContext(GiftContext);
  const [text, setText] = useState("");
  const [imgUrl, setImg] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(null);
  const [pickPermission, setPickPermission] = useState(null);

  // Media library permission request
  const askForPickPermission = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        setModalVisible(false);
        return;
      }
    } catch (error) {
      alert("Something went wrong requesting gallery permission");
      console.log("error", error);
    }
  };

  // Choose image from gallery
  const chooseImgFromGallery = async () => {
    console.log("Inside chooseImgFromGallery Function");

    console.log("Waiting for permission for gallery");

    const askingPermission = await askForPickPermission();

    console.log("Permission granted for gallery");

    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!image.canceled) {
      setImg(image.assets[0].uri);
      setPickPermission(null);
      setModalVisible(false);
    }
  };

  // Camera permission request
  const askForCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        setModalVisible(false);
        return;
      }
    } catch (error) {
      alert("Something went wrong requesting camera permission");
      console.log("error", error);
    }
  };

  // Take image from camera
  const takeImgFromCamera = async () => {
    console.log("Inside takeImgFromCamera Function");

    console.log("Waiting for permission for camera");

    const askingPermission = await askForCameraPermission();

    console.log("Permission granted for camera");

    let image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!image.canceled) {
      const newUri = FileSystem.documentDirectory + "captured_image.jpg";
      try {
        await FileSystem.moveAsync({
          from: image.assets[0].uri,
          to: newUri,
        });
        setImg(newUri);
        setCameraVisible(null);
        setModalVisible(false);
      } catch (error) {
        alert("Failed to save the captured image.");
        console.log("Error moving file: ", error);
      }
    }
  };

  // Save the idea with image and text
  const saveIdea = () => {
    if (text && imgUrl) {
      addIdea(personId, text, imgUrl);
      navigation.goBack();
    } else {
      alert("Please enter a text and select an image");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputTxt}
        placeholder="Idea"
        value={text}
        onChangeText={setText}
      />

      {imgUrl ? (
        <Image
          source={{ uri: imgUrl }}
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />
      ) : (
        <Text>No Image Selected or Captured</Text>
      )}

      <Button title="Select Image" onPress={() => setModalVisible(true)} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text style={{ marginBottom: 20 }}>Choose an action</Text>
            <Button title="Take Picture" onPress={takeImgFromCamera} />
            <Button title="Pick from Gallery" onPress={chooseImgFromGallery} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Button title="Save Idea" onPress={saveIdea} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputTxt: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
});
