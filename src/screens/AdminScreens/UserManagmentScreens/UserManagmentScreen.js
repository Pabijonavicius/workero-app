import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { withNavigation, SafeAreaView } from "react-navigation";
import { Divider } from "react-native-elements";

const UserManagmentScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Admin Menu</Text>
        <Divider style={styles.divider} />
        <View style={{ margin: 20 }}>
          <Button text="Add Worker" routeName="AddWorker" />
          <Button text="Update Worker" routeName="UpdateWorker" />
          <Button text="Suspend Worker" routeName="SuspendWorker" />
          {/* <Button text="Inspect Worker" routeName="InspectWorker" /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
const NavButton = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={() => navigation.navigate(routeName)}
    >
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};
const Button = withNavigation(NavButton);

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20
  },
  divider: {
    margin: 10,
    backgroundColor: "gainsboro",
    marginBottom: 2,
    width: "100%"
  },
  btnContainer: {
    height: 50,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "dodgerblue",
    width: Dimensions.get("window").width - 20,
    justifyContent: "center",
    borderRadius: 20
  },
  link: {
    color: "white",
    alignSelf: "center"
  }
});

UserManagmentScreen.navigationOptions = {
  header: null
};
export default UserManagmentScreen;
