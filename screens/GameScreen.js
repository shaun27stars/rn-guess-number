import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Dimensions } from "react-native";
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

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const GameScreen = (props) => {
  const minimum = useRef(1);
  const maximum = useRef(100);
  const [currentGuess, setCurrentGuess] = useState(() => {
    return generateRandomBetween(1, 100, props.answer);
  });
  const [guessList, setGuessList] = useState([]);

  const { answer, onGameOver } = props;

  const [dimensions, setDimensions] = useState({ window, screen });

  const onDeviceRotation = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onDeviceRotation);
    return () => {
      Dimensions.removeEventListener("change", onDeviceRotation);
    };
  });

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

  let gameControls = (
    <React.Fragment>
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
    </React.Fragment>
  );

  if (dimensions.window.height < 500) {
    gameControls = (
      <View style={styles.controls}>
        <MainButton
          style={styles.buttonDown}
          title={<Ionicons name="md-arrow-down" size={24} color="white" />}
          onPress={nextGuessHandler.bind(this, "lower")}
        />
        <NumberContainer>{currentGuess}</NumberContainer>

        <MainButton
          title={<Ionicons name="md-arrow-up" size={24} color="white" />}
          onPress={nextGuessHandler.bind(this, "greater")}
        />
      </View>
    );
  }

  return (
    <View style={DefaultStyles.screen}>
      <Text style={{ ...DefaultStyles.title, ...styles.title }}>
        Opponent's Guess
      </Text>
      {gameControls}
      <GuessList guesses={guessList} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: Dimensions.get("window").height > 600 ? 10 : 0
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%"
  },
  buttonDown: {
    backgroundColor: colors.secondary
  }
});

export default GameScreen;
