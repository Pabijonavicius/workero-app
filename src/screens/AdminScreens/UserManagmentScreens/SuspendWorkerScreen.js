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
import FormSubmitButton from "../../../components/FormSubmitButton";
import { CheckBox } from "react-native-elements";

const SuspendWorkerScreen = () => {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState();
  const [blocked, setBlocked] = useState(true);
  const [nonBlocked, setNonBlocked] = useState(false);
  const {
    state: adminState,
    fetchByBlockStatus,
    changeBlockStatus
  } = useContext(AdminContext);

  useEffect(() => {
    fetchByBlockStatus({ setLoading, isBlocked: blocked });
    console.log(selectedItem);
  }, [blocked, nonBlocked]);

  const progress = (
    <View style={styles.progressBarContainer}>
      <ProgressBarAndroid style={styles.progressBar} />
    </View>
  );

  function onRadioButtonChange(onCallback, offCallback) {
    onCallback(true);
    offCallback(false);
  }

  return (
    <View>
      <KeyboardAvoidingView behavior="padding">
        {loading ? (
          progress
        ) : (
          <View style={styles.container}>
            <Text>User block status</Text>
            <View
              style={{
                margin: 5,
                padding: 5,
                flexDirection: "row"
              }}
            >
              <CheckBox
                title="Blocked"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={blocked}
                containerStyle={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  margin: 0,
                  padding: 0
                }}
                onPress={() => onRadioButtonChange(setBlocked, setNonBlocked)}
              />
              <CheckBox
                title="Non-Blocked"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={nonBlocked}
                containerStyle={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  margin: 0,
                  padding: 0
                }}
                onPress={() => onRadioButtonChange(setNonBlocked, setBlocked)}
              />
            </View>
            <Text>Select Worker</Text>
            <DropDownSearch
              items={adminState.users}
              setSelectedItem={item => {
                setSelectedItem(item);
                console.log(item);
              }}
              selectedItem={selectedItem}
            />
            <FormSubmitButton
              status={selectedItem === null ? true : false}
              onPress={() => {
                selectedItem
                  ? changeBlockStatus({
                      userid: selectedItem.userId,
                      setLoading
                    })
                  : null;
                fetchByBlockStatus({ setLoading, isBlocked: false });
              }}
              hidden={blocked ? true : false}
              text="Block"
            />
            <FormSubmitButton
              status={selectedItem === null ? true : false}
              onPress={() => {
                selectedItem
                  ? changeBlockStatus({
                      userid: selectedItem.userId,
                      setLoading
                    })
                  : null;
                fetchByBlockStatus({ setLoading, isBlocked: true });
              }}
              hidden={blocked ? false : true}
              text="Unblock"
            />
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

SuspendWorkerScreen.navigationOptions = {
  title: "Suspend Worker"
};

export default SuspendWorkerScreen;
