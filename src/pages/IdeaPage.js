// Dependencies
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";

// Context
import GiftContext from "../context/GiftContext";
console.log("GiftContext", GiftContext);

export default function IdeaPage({ navigation, route }) {
  const { people, deleteIdea } = useContext(GiftContext);
  const { personId } = route.params;
  const person = people.find((p) => p.id === personId);

  const renderIdea = ({ item }) => (
    <View style={{ padding: 20 }}>
      <Image source={{ uri: item.img }} />
      <Text>{item.text}</Text>
      <Button
        title="Delete Idea"
        onPress={() => deleteIdea(personId, item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>{person.name}'s Gift Ideas</Text>
      {person.ideas.length === 0 ? (
        <Text>No ideas yet. Add one!</Text>
      ) : (
        <FlatList
          data={person.ideas}
          renderItem={renderIdea}
          keyExtractor={(item) => item.id}
        />
      )}
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
});
