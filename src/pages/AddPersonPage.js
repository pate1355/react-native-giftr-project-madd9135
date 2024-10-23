import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import GiftContext from "../context/GiftContext";

export default function AddPersonPage({ navigation }) {
  const { addPerson } = useContext(GiftContext);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const savePerson = () => {
    if (name && dob) {
      addPerson(name, dob);
      console.log(name, dob.slice(5, 7), dob.slice(8, 10));

      navigation.goBack();
    } else {
      // Handle validation error
      alert("Please enter a name and date of birth");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <View>
        <TextInput
          style={styles.inputTxt}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <DatePicker mode="calendar" onDateChange={(date) => setDob(date)} />
        <Button title="Save" onPress={savePerson} />
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginRight: 20,
  },
  inputTxt: {
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 10,
  },
});
