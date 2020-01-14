import React from "react";
import { View, ProgressBarAndroid, Text } from "react-native";

const ProgressBar = ({
  containerStyle = {},
  progressBarStyle = {},
  captionStyle = {},
  caption = null
}) => {
  return (
    <View style={containerStyle}>
      <ProgressBarAndroid style={progressBarStyle} />
      {caption ? <Text style={captionStyle}>{caption}</Text> : null}
    </View>
  );
};

export default ProgressBar;
