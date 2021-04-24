import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import GuessList from "../components/GuessList";

import colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const minimum = useRef(1);
  const maximum = useRef(100);
  const [currentGuess, setCurrentGuess] = useState(() => {
    return generateRandomBetween(1, 100, props.answer);
  });
  const [guessList, setGuessList] = useState([]);

  const { answer, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === answer) {
      onGameOver(guessList.length + 1);
    }
  }, [currentGuess, answer, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.answer) ||
      (direction === "greater" && currentGuess > props.answer)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong…", [
        { text: "Sorry!", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      maximum.current = currentGuess;
    } else {
      minimum.current = currentGuess + 1;
    }
    const nextGuess = generateRandomBetween(
      minimum.current,
      maximum.current,
      currentGuess
    );
    setCurrentGuess(nextGuess);
    setGuessList((currGuesses) => [currentGuess, ...currGuesses]);
  };

  return (
    <View style={DefaultStyles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          style={styles.buttonDown}
          title={<Ionicons name="md-arrow-down" size={24} color="white" />}
          onPress={nextGuessHandler.bind(this, "lower")}
        />
        <MainButton
          title={<Ionicons name="md-arrow-up" size={24} color="white" />}
          onPress={nextGuessHandler.bind(this, "greater")}
        />
      </Card>
      <GuessList guesses={guessList} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  },
  buttonDown: {
    backgroundColor: colors.secondary
  }
});

export default GameScreen;
