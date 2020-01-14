import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default FormSubmitButton = ({
  status,
  onPress,
  text,
  hidden = false
}) => {
  const styles = StyleSheet.create({
    btn: {
      display: hidden ? "none" : "flex",
      borderWidth: 1,
      padding: 10,
      margin: 10,
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: "dodgerblue",
      borderColor: "white"
    },
    disabledBtn: {
      display: hidden ? "none" : "flex",
      borderWidth: 1,
      padding: 10,
      margin: 10,
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: "gainsboro",
      borderColor: "white"
    },
    btnText: {
      color: "white"
    }
  });

  return (
    <TouchableOpacity
      disabled={status}
      onPress={onPress}
      style={status ? styles.disabledBtn : styles.btn}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};
