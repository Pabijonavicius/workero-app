import React from "react";
import { Modal, Dimensions, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const url = "https://workero.site/api/images/lukas/20191131/17_48_496.jpg";

const ZoomableImage = ({ show, setShow, imageSource }) => {
  return (
    <Modal
      animationType={"fade"}
      transparent={false}
      visible={show}
      onRequestClose={() => {
        setShow(!show);
      }}
    >
      <View style={styles.container}>
        <WebView source={{ uri: imageSource }} style={styles.image} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  image: {
    height: Math.round(Dimensions.get("window").height),
    width: Math.round(Dimensions.get("window").width),
    flex: 1
  }
});
export default ZoomableImage;
