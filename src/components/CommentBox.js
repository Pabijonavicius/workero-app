import React, { useState, createRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const CommentBox = ({
  placeholder = "Type something..",
  placeholderTextColor = "grey",
  multiline = true,
  onChangeText = () => {},
  numberOfLines = 12,
  underlineColorAndroid = "transparent",
  textAreaStyle = null,
  value = "",
  textAreaContainerStyle = null
}) => {
  return (
    <View style={textAreaContainerStyle || styles.textAreaContainer}>
      <TextInput
        value={value}
        style={textAreaStyle || styles.textAreaStyle}
        underlineColorAndroid={underlineColorAndroid}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    margin: 10,
    borderColor: "gainsboro",
    borderWidth: 1,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
  },
  textArea: {
    height: 80,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    padding: 10
  }
});

export default CommentBox;
