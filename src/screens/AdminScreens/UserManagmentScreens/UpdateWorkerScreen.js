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
  if (input !== "" && !isAllowedMinLength(input, minLength)) {
    return `${fieldName} is too short, it must contain at least  ${minLength} characters or you can leave it empty`;
  }
  if (input !== "" && !isAllowedMaxLength(input, maxLength)) {
    return `${fieldName} is too long, it must contain ${maxLength} characters or less or you can leave it empty`;
  }
  return "";
}

const UpdateWorkerScreen = () => {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState();

  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  const [inputError, setInputError] = useState("");

  const {
    state: adminState,
    fetchAvailableUsers,
    fetchUser,
    updateUser
  } = useContext(AdminContext);

  useEffect(() => {
    fetchAvailableUsers(setLoading);
  }, []);

  useEffect(() => {
    validateFields();
  }, [loading, password, firstName, lastName, inputError]);

  let passwordConstraints = [6, 20];
  let firstNameConstraints = [2, 100];
  let lastNameConstraints = [2, 100];

  function onSelectedItemChange(item) {
    setFirstName("");
    setPassword("");
    setLastName("");
    setSelectedItem(item);
    if (item.userId) {
      fetchUser({ userId: item.userId, setLoading: () => {} });
    }
  }

  function validateFields() {
    if (
      (inputIsAllowed(password, passwordConstraints) || password === "") &&
      (inputIsAllowed(firstName, firstNameConstraints) || firstName === "") &&
      (inputIsAllowed(lastName, lastNameConstraints) || lastName === "") &&
      (firstName !== "" || lastName !== "" || password !== "") &&
      adminState.user
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
    <View>
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
                {adminState.user ? (
                  <View style={{ marginBottom: 15, flexDirection: "row" }}>
                    <Text>
                      Selected User:{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {adminState.user.username}
                      </Text>
                    </Text>
                  </View>
                ) : null}

                <Text>Select User</Text>
                <DropDownSearch
                  items={adminState.users}
                  setSelectedItem={onSelectedItemChange}
                  selectedItem={selectedItem}
                  placeholder={
                    adminState.user
                      ? `Username: ${adminState.user.username}`
                      : "John Smith"
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Password</Text>
                <Input
                  value={password}
                  onBlur={() => {
                    setInputError(
                      formatMessage(password, passwordConstraints, "Password")
                    );
                  }}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  placeholder={adminState.user ? "Enter new password" : "Smith"}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>First Name</Text>
                <Input
                  onChangeText={setFirstName}
                  onBlur={() => {
                    setInputError(
                      formatMessage(
                        firstName,
                        firstNameConstraints,
                        "First Name"
                      )
                    );
                  }}
                  placeholder={
                    adminState.user ? adminState.user.firstName : "John"
                  }
                  value={firstName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Last Name</Text>
                <Input
                  value={lastName}
                  onBlur={() => {
                    setInputError(
                      formatMessage(lastName, lastNameConstraints, "Last Name")
                    );
                  }}
                  onChangeText={setLastName}
                  placeholder={
                    adminState.user ? adminState.user.lastName : "Smith"
                  }
                />
              </View>
              <FormSubmitButton
                status={submitBtnDisabled}
                text={"Update"}
                onPress={() =>
                  updateUser({
                    setLoading,
                    username: adminState.user.username,
                    firstName: firstName === "" ? null : firstName,
                    lastName: lastName === "" ? null : lastName,
                    password: password === "" ? null : password
                  })
                }
              />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
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
  }
});

UpdateWorkerScreen.navigationOptions = {
  title: "Update Worker"
};

export default UpdateWorkerScreen;
