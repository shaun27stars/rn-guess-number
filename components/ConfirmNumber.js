import React from "react";
import { Text, Button, StyleSheet } from "react-native";
import Card from "./Card";
import Colors from "../constants/colors";
import NumberContainer from "./NumberContainer";
import MainButton from "../components/MainButton";

const ConfirmNumber = (props) => {
  const startGameHandler = () => {
    props.onStartGame(props.number);
  };

  return (
    <Card style={styles.card}>
      <Text>Your Chosen Number</Text>
      <NumberContainer>{props.number}</NumberContainer>
      <MainButton
        title="START GAME"
        color={Colors.primary}
        onPress={startGameHandler}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 50,
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  }
});

export default ConfirmNumber;
