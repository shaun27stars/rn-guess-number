import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    <View style={{ ...DefaultStyles.screen, ...styles.screen }}>
      <Text style={DefaultStyles.title}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          // Local source
          source={require("../assets/images/success.png")}
          // Remote source
          // source={{
          //   uri:
          //     "https://blog.strava.com/wp-content/uploads/2018/06/DSC02332-1.jpg"
          // }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.numOfRounds}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </BodyText>
      </View>
      <MainButton title="NEW GAME" onPress={props.onNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    width: 300,
    height: 300,
    overflow: "hidden",
    marginVertical: 30
  },
  textContainer: {
    width: "80%",
    marginVertical: 15
  },
  resultText: {
    textAlign: "center",
    fontSize: 20
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold"
  }
});

export default GameOverScreen;
