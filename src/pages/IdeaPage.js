// Dependencies
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Context
import GiftContext from "../context/GiftContext";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
console.log("GiftContext", GiftContext);

export default function IdeaPage({ navigation, route }) {
  const { people, deleteIdea } = useContext(GiftContext);
  const { personId } = route.params;
  const person = people.find((p) => p.id === personId);

  const renderIdea = ({ item }) => {
    return (
      <View style={styles.ideaCard}>
        <View style={styles.imgTxt}>
          <Image
            source={{ uri: item.img }}
            style={{ width: 150, height: 150 }}
          />
        </View>
        <View style={styles.styleTxt}>
          <View style={styles.txtStructure}>
            <Text style={styles.bodyTxt}>Title: </Text>
            <Text style={styles.titleTxt}>{item.text}</Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => deleteIdea(personId, item.id)}
          >
            <Text style={[styles.btnText, styles.btnCancel]}>Delete Idea</Text>
          </TouchableOpacity>

          {/* <DeleteConfirmationModal
            deleteIdea={deleteIdea}
            personId={personId}
            ideaId={item.id}
            ideaName={item.text}
          ></DeleteConfirmationModal> */}
        </View>
      </View>
    );
  };

  return (
    <View
      style={person.ideas.length === 0 ? styles.container : styles.newContainer}
    >
      <Text style={styles.mainTitleTxt}>{person.name}'s Gift Ideas</Text>

      {person.ideas.length === 0 ? (
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://i.postimg.cc/qMr3csHy/self-control-ezgif-com-video-to-gif-converter.gif",
            }}
            style={styles.imgStyle}
          />
          <Text style={styles.bodyTxt}>No Idea Saved Yet</Text>
        </View>
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
    padding: 15,
  },
  newContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "Flex-start",
    justifyContent: "center",
    padding: 15,
  },
  noFoundView: {
    margin: 10,
    padding: 30,
  },
  imgStyle: {
    marginTop: 25,
    marginBottom: 25,
    width: 200,
    height: 200,
    borderRadius: 70,
  },
  bodyTxt: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    flexWrap: "wrap",
  },
  mainTitleTxt: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  titleTxt: {
    width: 100,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  ideaCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    gap: 30,
  },
  imgTxt: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
  },
  btnCancel: {
    color: "#5c5cfa",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#5c5cfa",
  },
  txtStructure: {
    flexDirection: "column",
    alignItems: "Flex-start",
    gap: 5,
    flexWrap: "wrap",
  },
  styleTxt: {
    paddingLeft: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "Flex-start",
    gap: 10,
    flexWrap: "wrap",
  },
});
