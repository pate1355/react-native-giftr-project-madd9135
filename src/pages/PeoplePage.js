// Dependencies
import React, { useContext, useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import * as Crypto from "expo-crypto";
import SvgUri from "react-native-svg";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
// import { SwipeableRef } from "../components/DeleteConfirmationModal";

// Context
import GiftContext from "../context/GiftContext";
console.log("GiftContext", GiftContext);
import MonthRecognize from "../components/monthRecognize";

export default function PeoplePage({ navigation }) {
  let { people } = useContext(GiftContext);
  let { deletePerson } = useContext(GiftContext);

  console.log(
    "people",
    people.forEach((person) => console.log(person.avatar))
  );

  const sortedPeople = people.sort((a, b) => a.dob.localeCompare(b.dob));
  console.log("sortedPeople", sortedPeople);

  const HorizontalCard = ({ item, index, navigation, deletePerson }) => {
    const [isGifPlaying, setIsGifPlaying] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsGifPlaying(false);
      }, 5000);
      return () => clearTimeout(timer);
    }, []);

    //Animation for Image on Card
    useEffect(() => {
      if (!isGifPlaying) {
        // Start the fade-in animation when the GIF stops playing
        Animated.timing(fadeAnim, {
          toValue: 1, // Fully visible
          duration: 500, // 500ms duration
          useNativeDriver: false,
        }).start();
      }
    }, [isGifPlaying]);

    // Render right actions (slidable delete button)
    const renderRightActions = () => {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            width: 100,
            marginVertical: 10,
          }}
        >
          {/* <Button
            title="Delete"
            color="#fff"
            onPress={() => deletePerson(item.id)}
          /> */}

          <DeleteConfirmationModal person={item} deletePerson={deletePerson} />
        </View>
      );
    };

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Idea", { personId: item.id })}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 20,
              backgroundColor: "#f9f9f9",
              borderRadius: 10,
              marginVertical: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 5,
            }}
          >
            <View style={styles.HorizontalCard}>
              <View>
                <View style={styles.count}>
                  <Text>{index + 1}</Text>
                </View>
                <View style={styles.verticalTxt}>
                  <Text style={styles.titleTxt}>{item.name}</Text>
                  <Text style={styles.bodyTxt}>
                    {MonthRecognize(item.dob.slice(5, 7))}
                    {item.dob.slice(8, 10) + ", "}
                    {item.dob.slice(0, 4)}
                  </Text>
                </View>
              </View>
              <View>
                {isGifPlaying && (
                  <Image
                    source={{
                      uri: "https://i.postimg.cc/Gm1H9KZQ/Animation-1729546691638-2.gif",
                    }}
                    style={{ width: 100, height: 100 }}
                    resizeMode="contain"
                  />
                )}
                {console.log("item.avatar", item.avatar)}

                {!isGifPlaying && (
                  <Animated.Image
                    width={100}
                    height={100}
                    source={{
                      uri: `https://api.multiavatar.com/${item.dob}.png?apikey=hJpi5MZyI8P2Rv`,
                    }}
                    style={{ width: 100, height: 100, opacity: fadeAnim }}
                    resizeMode="contain"
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View style={people.length === 0 ? styles.container : { padding: 15 }}>
      {people.length === 0 ? (
        <View style={styles.noFoundView}>
          <Image
            source={{
              uri: "https://i.postimg.cc/yY6R7sSP/quiz-ezgif-com-video-to-gif-converter.gif",
            }}
            style={styles.imgStyle}
          />
          <Text style={styles.bodyTxt}>No People Saved Yet</Text>
        </View>
      ) : (
        <FlatList
          data={people}
          renderItem={({ item, index }) => (
            <HorizontalCard
              item={item}
              index={index}
              navigation={navigation}
              deletePerson={deletePerson}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
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
    textAlign: "center",
  },
  bodyTxt: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
    textAlign: "center",
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
  HorizontalCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
    height: 100,
  },
  verticalTxt: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    textAlign: "center",
  },
});
