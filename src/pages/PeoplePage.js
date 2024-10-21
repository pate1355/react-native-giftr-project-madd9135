// Dependencies
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Context
import GiftContext from "../context/GiftContext";
console.log("GiftContext", GiftContext);

export default function PeoplePage({ navigation }) {
  let { people } = useContext(GiftContext);
  console.log("people in people page", people);
  const sortedPeople = people.sort((a, b) => a.dob.localeCompare(b.dob));
  console.log("sortedPeople", sortedPeople);

  const renderPerson = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Idea", { personId: item.id })}
    >
      <View style={{ padding: 20 }}>
        <Text>{item.name}</Text>
        <Text> {item.dob}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {people.length === 0 ? (
        <View style={styles.noFoundView}>
          <Text style={styles.titleTxt}>People List</Text>
          <Text style={styles.bodyTxt}>No People Saved Yet</Text>
        </View>
      ) : (
        <FlatList
          data={people}
          renderItem={renderPerson}
          keyExtractor={(item) => item.id}
        />
      )}
      {/* {GiftContext.length === 0 ? <Text>Yes</Text> : <Text>No</Text>} */}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleTxt: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  bodyTxt: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
  },
  noFoundView: {
    margin: 10,
    padding: 30,
    borderWidth: 1,
    borderColor: "#777",
  },
});
