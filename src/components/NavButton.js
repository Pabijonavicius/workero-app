import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

const NavButton = ({ navigation, text, routeName }) => {
  return (
    <></>
    // <TouchableOpacity
    //   style={styles.container}
    //   onPress={() => navigation.navigate(routeName)}
    // >
    //   <Text style={styles.link}>{text}</Text>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "gainsboro",
    backgroundColor: "dodgerblue"
  },
  link: {
    color: "white"
  }
});

export default withNavigation(NavButton);
