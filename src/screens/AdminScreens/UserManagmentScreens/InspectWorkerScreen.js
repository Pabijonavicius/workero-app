import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ProgressBarAndroid
} from "react-native";
import { Input } from "react-native-elements";
import { Context as AdminContext } from "../../../context/AdminContext";
import DropDownSearch from "../../../components/DropdownSearch";

const InspectWorkerScreen = () => {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState();
  const { state: adminState, fetchAvailableUsers } = useContext(AdminContext);
  useEffect(() => {
    fetchAvailableUsers(setLoading);
  }, []);

  const progress = (
    <View style={styles.progressBarContainer}>
      <ProgressBarAndroid style={styles.progressBar} />
    </View>
  );

  return (
    <View>
      <KeyboardAvoidingView behavior="padding">
        {loading ? (
          progress
        ) : (
          <View style={styles.container}>
            <Text>Select Worker</Text>
            <DropDownSearch
              items={adminState.users}
              setSelectedItem={setSelectedItem}
              selectedItem={selectedItem}
            />
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Inspect</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10
  },
  btn: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "dodgerblue",
    borderColor: "white"
  },
  btnText: {
    color: "white"
  },
  inputContainer: {
    padding: 10
  },
  progressBarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    padding: 20,
    margin: 20
  },
  progressBar: {
    color: "dodgerblue",
    width: 250,
    height: 250
  }
});

InspectWorkerScreen.navigationOptions = {
  title: "Inspect Worker"
};

export default InspectWorkerScreen;
