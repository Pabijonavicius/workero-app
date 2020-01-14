import React from "react";
import { View, ProgressBarAndroid, Text } from "react-native";

const ProgressLine = ({ containerStyle = {}, progress = 0 }) => {
  return (
    <View style={containerStyle}>
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progress / 100}
      />
    </View>
  );
};

export default ProgressLine;
