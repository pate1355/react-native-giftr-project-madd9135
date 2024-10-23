import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
      <View style={styles.addPersonCard}>
        <Text style={styles.txt}>Person Name</Text>
        <TextInput
          style={styles.inputTxt}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <DatePicker
          style={styles.calender}
          mode="calendar"
          onDateChange={(date) => setDob(date)}
          maximumDate={new Date()}
          fadeToColor="gray"
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={savePerson}>
            <Text style={[styles.btnText, styles.btnSave]}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.btnText, styles.btnCancel]}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
  btnText: {
    color: "",
    fontSize: 18,
  },
  btnSave: {
    color: "#fff",
    backgroundColor: "#5c5cfa",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 10,
  },
  btnCancel: {
    color: "#5c5cfa",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: "#5c5cfa",
  },

  inputTxt: {
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addPersonCard: {
    margin: 20,
    gap: 10,
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
  },
  calendar: {
    width: 300,
    height: 200,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
