import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

export const GiftContext = createContext();

export const GiftProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  console.log(people);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const people = await AsyncStorage.getItem("people");
        if (people) {
          setPeople(JSON.parse(people));
        }
      } catch (error) {
        alert("Error loading people");
        console.log(error);
      }
    };
    fetchPeople();
  }, []);

  const addPerson = async (name, dob) => {
    try {
      console.log("name", name, "dob", dob);

      const newPerson = {
        id: Crypto.randomUUID(),
        name,
        dob,
        ideas: [],
      };
      const updatedPeople = [...people, newPerson];
      setPeople(updatedPeople);
      await AsyncStorage.setItem("people", JSON.stringify(updatedPeople));
    } catch (error) {
      alert("Error saving person");
      console.log(error);
    }
  };

  const deleteIdea = async (personId, ideaId) => {
    try {
      const person = people.find((person) => person.id === personId);
      const updatedIdeas = person.ideas.filter((idea) => idea.id !== ideaId);
      const updatedPerson = { ...person, ideas: updatedIdeas };
      const updatedPeople = people.map((person) =>
        person.id === personId ? updatedPerson : person
      );
      setPeople(updatedPeople);
      await AsyncStorage.setItem("people", JSON.stringify(updatedPeople));
    } catch (error) {
      alert("Error deleting idea");
      console.log(error);
    }
  };

  const addIdea = async (personId, text, imgUrl, width, height) => {
    try {
      const person = people.find((person) => person.id === personId);
      const newIdea = {
        id: Crypto.randomUUID(),
        text,
        img: imgUrl,
        width,
        height,
      };
      const updatedIdeas = [...person.ideas, newIdea];
      const updatedPerson = { ...person, ideas: updatedIdeas };
      const updatedPeople = people.map((person) =>
        person.id === personId ? updatedPerson : person
      );
      setPeople(updatedPeople);
      await AsyncStorage.setItem("people", JSON.stringify(updatedPeople));
    } catch (error) {
      alert("Error saving idea");
      console.log(error);
    }
  };

  return (
    <GiftContext.Provider value={{ people, addPerson, deleteIdea, addIdea }}>
      {children}
    </GiftContext.Provider>
  );
};

export default GiftContext;
