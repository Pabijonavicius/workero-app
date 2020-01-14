// import React from "react";
// import { Text } from "native-base";

// const AddAdditionalPhotoScrenn = () => {
//   return <Text>AddAdditionalPhotoScrenn</Text>;
// };

// AddAdditionalPhotoScrenn.navigationOptions = {
//   header: null
// };

// export default AddAdditionalPhotoScrenn;
import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  ProgressBarAndroid
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Divider } from "react-native-elements";
import FormImagePicker from "../../../components/FormImagePicker";
import CommentBox from "../../../components/CommentBox";
import { Context as RecordsContext } from "../../../context/RecordsContext";
import { NavigationEvents } from "react-navigation";

const AddAdditionalPhotoScrenn = () => {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const { endOrAdditionalPhoto } = useContext(RecordsContext);

  const progressContainer = (
    <View style={styles.progressContainer}>
      <ProgressBarAndroid
        color={"dodgerblue"}
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progress / 100}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={"padding"}>
      <SafeAreaView forceInset={{ top: "always" }}>
        <NavigationEvents
          onWillBlur={() => {
            () => console.log("Fuck this!");
          }}
        />
        <ScrollView style={styles.scrollArea}>
          <Text style={styles.heading}>Add Additional Photo</Text>
          <Divider style={styles.divider} />

          <Text style={styles.subHeading}>Attach Photo</Text>
          <View style={styles.formContainer}>
            <FormImagePicker image={image} setImage={setImage} />
            {progressContainer}
            <Text style={styles.caption}>Add Comment (optional)</Text>
            <CommentBox
              textAreaContainerStyle={styles.textAreaContainer}
              textAreaStyle={styles.textArea}
              value={comment}
              onChangeText={setComment}
            />
            <Button
              disabled={progress !== 0 || image == ""}
              onPress={() =>
                endOrAdditionalPhoto({
                  image,
                  comment,
                  setProgress,
                  type: "additional"
                })
              }
              buttonStyle={styles.submitBtn}
              title="Submit Photo"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

AddAdditionalPhotoScrenn.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1
  },
  progressContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10
  },
  scrollArea: {
    padding: 10,
    margin: 10,
    marginBottom: 0,
    paddingBottom: 0
  },
  heading: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    color: "#0e1111"
  },
  divider: {
    margin: 20,
    backgroundColor: "gainsboro",
    marginBottom: 5
  },
  subHeading: {
    alignSelf: "center",
    color: "#AAA",
    fontWeight: "bold",
    fontSize: 15
  },
  formContainer: {},
  caption: {
    textAlign: "center"
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
  },
  submitBtn: {
    margin: 15,
    borderRadius: 10,
    marginBottom: 100
  }
});

export default AddAdditionalPhotoScrenn;
