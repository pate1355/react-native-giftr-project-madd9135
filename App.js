//Dependencies
import React, { Children } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

//Pages
import { GiftProvider } from "./src/context/GiftContext.js";
import peoplePage from "./src/pages/PeoplePage.js";
import addPersonPage from "./src/pages/AddPersonPage.js";
import ideaPage from "./src/pages/IdeaPage.js";
import addIdeaPage from "./src/pages/AddIdeaPage.js";

//Navigation
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <GiftProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="People">
            <Stack.Screen
              name="People"
              component={peoplePage}
              options={({ navigation }) => ({
                title: "People",
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Add Person")}
                    style={styles.button}
                  >
                    <Text style={{ color: "#000" }}>Add Person</Text>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="Add Person" component={addPersonPage} />
            <Stack.Screen
              name="Idea"
              component={ideaPage}
              options={({ navigation, route }) => ({
                title: "Idea",
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Add Idea", {
                        personId: route.params.personId,
                      })
                    }
                    style={styles.button}
                  >
                    <Text style={{ color: "#000" }}>Add Idea</Text>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="Add Idea" component={addIdeaPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </GiftProvider>
    </SafeAreaProvider>
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
});
