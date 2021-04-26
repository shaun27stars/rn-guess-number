import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import Colors from "../constants/colors";
import BodyText from "./BodyText";

// First arg is set from .bind during the call. Item data is automatically appended by the regular function call
const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.guess}>
      <BodyText>#{listLength - itemData.index}:</BodyText>
      <BodyText style={styles.guessValue}>{itemData.item}</BodyText>
    </View>
  );
};

const GuessList = (props) => {
  let listContainerStyle = styles.listContainer;

  if (Dimensions.get("window").width > 350) {
    listContainerStyle = styles.listContainerBig;
  }
  return (
    // <ScrollView
    //   style={styles.container}
    //   contentContainerStyle={styles.listContent}
    // >
    //   {props.guesses.map((guess, idx) => (
    //     <View key={guess} style={styles.guess}>
    //       <BodyText>#{props.guesses.length - idx}:</BodyText>
    //       <BodyText style={styles.guessValue}>{guess}</BodyText>
    //     </View>
    //   ))}
    //   <Text></Text>
    // </ScrollView>

    <FlatList
      style={listContainerStyle}
      contentContainerStyle={styles.listContent}
      keyExtractor={(item) => item.toString()}
      data={props.guesses}
      renderItem={renderListItem.bind(this, props.guesses.length)}
    />
  );
};

export default GuessList;

const styles = StyleSheet.create({
  listContainer: {
    width: "70%",
    marginTop: 10
  },
  listContainerBig: {
    width: "40%",
    marginTop: 10
  },
  listContent: {
    // Scrollview at 100% height, starting at the bottom, but scrolling once it needs to
    flexGrow: 1, // basically the same as flex but actually works on scrollviews
    // alignItems: "center",
    justifyContent: "flex-end"
  },
  guess: {
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
    flexDirection: "row"
    // width: "60%"
  },
  guessValue: {
    marginLeft: 20,
    color: Colors.secondary
  }
});
