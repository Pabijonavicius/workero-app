import React, { useState, useEffect, useContext } from "react";
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
import FormSubmitButton from "../../../components/FormSubmitButton";

function inputIsAllowed(input, [minLength, maxLength]) {
  if (
    isAllowedMaxLength(input, maxLength) &&
    isAllowedMinLength(input, minLength)
  ) {
    return true;
  }

  return false;
}

function isAllowedMaxLength(input, maxLength) {
  if (input.length <= maxLength) {
    return true;
  }
  return false;
}
function isAllowedMinLength(input, minLength) {
  if (input.length >= minLength) {
    return true;
  }
  return false;
}

function formatMessage(input, [minLength, maxLength], fieldName) {
  if (!isAllowedMinLength(input, minLength)) {
    return `${fieldName} is too short, it must contain at least  ${minLength} characters`;
  }
  if (!isAllowedMaxLength(input, maxLength)) {
    return `${fieldName} is too long, it must contain ${maxLength} characters or less`;
  }
  return "";
}

const AddWorkerScreen = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  const [inputError, setInputError] = useState("");
  const { state: adminState, addUser } = useContext(AdminContext);

  useEffect(() => {
    validateFields();
    console.log("changed!");
  }, [loading, username, password, firstName, lastName, inputError]);

  let usernameConstraints = [5, 150];
  let passwordConstraints = [6, 20];
  let firstNameConstraints = [2, 100];
  let lastNameConstraints = [2, 100];

  function validateFields() {
    if (
      inputIsAllowed(username, usernameConstraints) &&
      inputIsAllowed(password, passwordConstraints) &&
      inputIsAllowed(firstName, firstNameConstraints) &&
      inputIsAllowed(lastName, lastNameConstraints)
    ) {
      setSubmitBtnDisabled(false);
    } else {
      setSubmitBtnDisabled(true);
    }
  }

  const progress = (
    <View style={styles.progressBarContainer}>
      <ProgressBarAndroid style={styles.progressBar} />
    </View>
  );
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          {loading ? (
            progress
          ) : (
            <>
              {adminState.errorMessage !== "" ? (
                <Text
                  style={{
                    color: "red",
                    padding: 10,
                    textAlign: "center",
                    borderWidth: 1,
                    borderColor: "gainsboro",
                    borderRadius: 13
                  }}
                >
                  {adminState.errorMessage}
                </Text>
              ) : null}

              {inputError !== "" ? (
                <Text
                  style={{
                    color: "red",
                    padding: 10,
                    textAlign: "center",
                    borderWidth: 1,
                    borderColor: "gainsboro",
                    borderRadius: 13
                  }}
                >
                  {inputError}
                </Text>
              ) : null}

              <View style={styles.inputContainer}>
                <Text>Username</Text>
                <Input
                  onChangeText={setUsername}
                  placeholder={"john.smith"}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  onBlur={() => {
                    setInputError(
                      formatMessage(username, usernameConstraints, "Username")
                    );
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Password</Text>
                <Input
                  onBlur={() => {
                    setInputError(
                      formatMessage(password, passwordConstraints, "Password")
                    );
                  }}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  placeholder={"*********"}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>First Name</Text>
                <Input
                  onBlur={() => {
                    setInputError(
                      formatMessage(
                        firstName,
                        firstNameConstraints,
                        "First Name"
                      )
                    );
                  }}
                  onChangeText={setFirstName}
                  placeholder={"John"}
                  autoCorrect={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Last Name</Text>
                <Input
                  onBlur={() => {
                    setInputError(
                      formatMessage(lastName, lastNameConstraints, "Last Name")
                    );
                  }}
                  onChangeText={setLastName}
                  placeholder={"Smith"}
                  autoCorrect={false}
                />
              </View>
              <FormSubmitButton
                status={submitBtnDisabled}
                onPress={() => {
                  setLoading(true);
                  addUser({
                    username,
                    password,
                    firstName,
                    lastName,
                    setLoading,
                    setSubmitBtnDisabled
                  });
                }}
                text={"Add"}
              />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  },
  container: {
    margin: 20,
    padding: 10
  },
  inputContainer: {
    padding: 10
  }
});

AddWorkerScreen.navigationOptions = {
  title: "Add Worker"
};

export default AddWorkerScreen;
