import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { Button, Text, Input, CheckBox } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { FontAwesome5 } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";

function inputValidation(username, password) {
  if (isValidInput(username) && isValidInput(password)) {
    return true;
  }
  return false;
}
function isValidInput(input) {
  if (/^$|\s+/.test(input)) {
    return false;
  }
  return true;
}

const SigninScreen = ({ navigation }) => {
  const {
    state,
    signin,
    clearErrorMessage,
    rememberMe,
    loadInputs
  } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, toggleRemember] = useState(true);
  const [hidePassword, toggleHidePassword] = useState(true);
  const inputValidationStatus = inputValidation(username, password);

  const passIcon = (
    <FontAwesome5
      onPress={() => toggleHidePassword(!hidePassword)}
      name="eye"
      size={20}
      style={{ color: "dodgerblue" }}
    />
  );

  useEffect(() => {
    loadInputs().then(({ username, password }) => {
      console.log(username);
      console.log(password);
      console.log("dEBUUG");
      setUsername(username);
      setPassword(password);
    });
  }, []);

  function handleSignin() {
    if (inputValidationStatus) {
      rememberMe({ username, password });
      signin({ username, password });
    } else {
      return null;
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={"position"}>
        <SafeAreaView forceInset={{ top: "always" }}>
          <View style={styles.statusBar}>
            <StatusBar translucent barStyle="dark-content" />
          </View>
          <View style={styles.form}>
            <Text h2Style={styles.heading} h2>
              Please Sign In
            </Text>
            {state.errorMessage ? (
              <Text style={styles.errorMessage}>{state.errorMessage}</Text>
            ) : null}
            <Input
              selectionColor={"dodgerblue"}
              placeholder={"Username"}
              inputStyle={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              inputContainerStyle={styles.inputContainer}
              value={username}
              onChangeText={setUsername}
            />
            <Input
              selectionColor={"dodgerblue"}
              placeholder={"Password"}
              secureTextEntry={hidePassword}
              inputStyle={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              inputContainerStyle={styles.inputContainer}
              value={password}
              onChangeText={setPassword}
              rightIcon={passIcon}
              rightIconContainerStyle={styles.eyeContainer}
            ></Input>
            <CheckBox
              containerStyle={styles.checkboxContainer}
              title="Remember me"
              checked={remember}
              onPress={() => toggleRemember(!remember)}
              center
            />
            <Button
              onPress={() => handleSignin({ username, password })}
              title={"Sign In"}
              buttonStyle={
                inputValidationStatus ? styles.btnSuccess : styles.btnFail
              }
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

SigninScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "rgba(22,7,92,1)"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  form: {
    padding: 10,
    margin: 5,
    paddingTop: 10
  },
  heading: {
    paddingBottom: 10,
    color: "dodgerblue",
    textAlign: "center"
  },
  inputContainer: {
    borderColor: "#DDDDDD",
    borderWidth: 1,
    marginTop: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10
  },
  eyeContainer: {
    marginRight: 20
  },
  input: {
    padding: 15,
    margin: 5,
    color: "dodgerblue"
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  btnSuccess: {
    backgroundColor: "dodgerblue",
    marginTop: 15,
    margin: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    marginBottom: 0
  },
  btnFail: {
    backgroundColor: "gainsboro",
    marginTop: 15,
    margin: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    marginBottom: 0
  },
  errorMessage: {
    fontSize: 16,
    color: "#FF4136",
    textAlign: "center"
  }
});

export default SigninScreen;
