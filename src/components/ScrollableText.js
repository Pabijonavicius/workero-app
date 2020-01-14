import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

const ScrollableText = ({ text, viewStyle, scrollViewStyle, textStyle }) => {
  return (
    <View style={styles.viewStyle}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scrollViewStyle}
      >
        <Text style={styles.textStyle}>{text}</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  viewStyle: {
    maxWidth: "60%"
  },
  scrollViewStyle: {
    height: 20
  },
  textStyle: {
    fontWeight: "bold"
  }
});

export default ScrollableText;
