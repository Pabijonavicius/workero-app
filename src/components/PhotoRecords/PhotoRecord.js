import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
  ToastAndroid
} from "react-native";
import PhotoComments from "./PhotoComments";
import moment from "moment";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import { Button } from "react-native-elements";
import ZoomableImage from "./ZoomableImage";
import { Context as RecordsContext } from "../../context/RecordsContext";

function downloadFile(uri) {
  let filename = uri.split("/");
  filename = filename[filename.length - 1];
  let fileUri = FileSystem.documentDirectory + filename;
  FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
      saveFile(uri);
    })
    .catch(error => {
      Alert.alert("Error", "Couldn't download photo");
      console.error(error);
    });
}
async function saveFile(fileUri) {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
    ToastAndroid.show("Image was successfully downloaded!", ToastAndroid.LONG);
  }
}

const PhotoRecord = ({ data, setReload }) => {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [btnDownload, setBtnDowload] = useState(false);
  const [btnCommnet, setBtnCommnet] = useState(false);

  const { addComment } = useContext(RecordsContext);
  return (
    <View style={styles.container}>
      <ZoomableImage
        show={show}
        setShow={setShow}
        imageSource={data.links.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.usernameLabel}>@{data.username}</Text>
        <Text style={styles.addedAtLabel}>
          {moment(new Date(data.addedAt)).format("YYYY/MM/DD HH:mm")}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.imageContainer}
        onLongPress={() => setShow(true)}
      >
        <Image source={{ uri: data.links.thumb }} style={styles.image} />
      </TouchableOpacity>
      <PhotoComments comments={data.photoComments} />
      <View style={styles.textAreaContainer}>
        <TextInput
          value={comment}
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Type something"
          placeholderTextColor="grey"
          numberOfLines={12}
          multiline={true}
          onChangeText={setComment}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          buttonStyle={{
            backgroundColor: "white",
            borderWidth: 1
          }}
          titleStyle={{ color: "dodgerblue" }}
          containerStyle={{ backgroundColor: "yellow" }}
          title="Add Comment"
          onPress={() => {
            setBtnCommnet(true);
            addComment({ photoId: data.id, comment }, setReload);
            setTimeout(() => {
              setBtnCommnet(false);
            }, 5000);
            setComment("");
          }}
          disabled={btnCommnet}
        />
        <Button
          onPress={() => {
            setBtnDowload(true);
            downloadFile(data.links.image);
            setTimeout(() => {
              setBtnDowload(false);
            }, 15000);
          }}
          style={styles.btn}
          title="Download"
          disabled={btnDownload}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  infoContainer: {
    borderBottomWidth: 1,
    borderColor: "gainsboro",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  usernameLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "dodgerblue"
  },
  addedAtLabel: {
    paddingTop: 5,
    color: "#404040"
  },
  imageContainer: {
    width: "100%",
    height: 380
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    paddingRight: 50,
    paddingLeft: 50
  },
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

export default PhotoRecord;
