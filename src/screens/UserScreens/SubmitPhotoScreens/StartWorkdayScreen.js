import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ProgressBarAndroid
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Divider } from "react-native-elements";
import FormImagePicker from "../../../components/FormImagePicker";
import CommentBox from "../../../components/CommentBox";
import { Context as RecordsContext } from "../../../context/RecordsContext";
import DropDownSearch from "../../../components/DropdownSearch";

const StartWorkdayScreen = () => {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  const [workplace, setWorkplace] = useState("");
  const { state, fetchWorkplaces, startWorkday } = useContext(RecordsContext);

  useEffect(() => {
    fetchWorkplaces();
  }, []);

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
    <KeyboardAvoidingView behavior="padding">
      <SafeAreaView forceInset={{ top: "always" }}>
        <Text style={styles.heading}>Start Work</Text>
        <Divider style={styles.divider} />

        <Text style={styles.subHeading}>Attach Photo</Text>
        <View style={styles.formContainer}>
          <FormImagePicker
            previewImage={false}
            image={image}
            setImage={setImage}
          />
          {progressContainer}
          <Text style={styles.caption}>Add Workplace Code</Text>
          <View>
            <DropDownSearch
              selectedItem={setSelectedItem}
              setSelectedItem={setSelectedItem}
              setTextState={setWorkplace}
              items={state.workplaces}
            />
          </View>
          <Text style={styles.caption}>Add Comment (optional)</Text>
          <CommentBox
            textAreaContainerStyle={styles.textAreaContainer}
            textAreaStyle={styles.textArea}
            value={comment}
            onChangeText={setComment}
          />
          <Button
            disabled={progress !== 0 || image === ""}
            onPress={() =>
              startWorkday({ setProgress, comment, image, workplace })
            }
            buttonStyle={styles.submitBtn}
            title="Submit Photo"
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

StartWorkdayScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1
  },
  progressContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10
  },
  heading: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    color: "#0e1111"
  },
  divider: {
    margin: 10,
    backgroundColor: "gainsboro",
    marginBottom: 2
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
    margin: 5,
    borderColor: "gainsboro",
    borderWidth: 1,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
  },
  textArea: {
    height: 40,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    padding: 10
  },
  submitBtn: {
    margin: 5,
    borderRadius: 10
  }
});
export default StartWorkdayScreen;
