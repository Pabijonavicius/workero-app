import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const galleryIcon = <FontAwesome name="photo" color="dodgerblue" size={35} />;
const cameraIcon = (
  <MaterialIcons name="add-a-photo" color="dodgerblue" size={35} />
);

const getPermissionAsync = async () => {
  const { status, permissions } = await Permissions.askAsync(
    Permissions.CAMERA
  );

  if (!permissions.camera) {
    alert("You must allow camera usage permissions in order to take photo");
  }
};

const FormImagePicker = ({
  image = "",
  setImage = () => {},
  setShow = () => {},
  previewImage = true
}) => {
  useEffect(() => {
    getPermissionAsync();
    console.log("hi");
  }, []);
  const _takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowEditing: false,
      quality: 1
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      {previewImage ? (
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={styles.imageContainer}
        >
          {image !== "" && (
            <Image source={{ uri: image }} style={styles.image} />
          )}
        </TouchableOpacity>
      ) : null}

      <View style={styles.btnContainer}>
        <Button
          title="Take Photo"
          titleStyle={styles.btnTitle}
          buttonStyle={styles.btn}
          onPress={_takePhoto}
          icon={cameraIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10
  },
  imageContainer: {
    height: 100,
    borderWidth: 1,
    borderColor: "gainsboro"
  },
  image: {
    height: "100%"
  },
  label: {
    alignSelf: "center"
  },
  btnContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
  },
  btn: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "dodgerblue"
  },
  btnTitle: {
    color: "#111",
    fontSize: 15,
    padding: 10
  }
});

export default FormImagePicker;
