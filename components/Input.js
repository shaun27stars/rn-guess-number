import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return (
    <TextInput {...props} style={{ ...styles.textInput, ...props.style }} />
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "80%",
    height: 30,
    borderColor: "grey",
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    marginVertical: 10
  }
});

export default Input;
