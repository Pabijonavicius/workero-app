import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  Button,
  TouchableOpacity,
  ProgressBarAndroid,
  View,
  RefreshControl,
  ScrollView
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { withNavigation, SafeAreaView } from "react-navigation";
import { Context as RecordsContext } from "../../../context/RecordsContext";
import { NavigationEvents } from "react-navigation";

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
const BUTTON = withNavigation(NavButton);

const SubmitPhotoScreen = () => {
  const [loading, setLoading] = useState(true);
  const { state: recordsState, isWorkdayStarted, clearState } = useContext(
    RecordsContext
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    fetchRecords({
      date: selectedDate.format("YYYY-MM-DD"),
      setLoading: isWorkdayStarted(setRefreshing)
    });
  }, [refreshing]);

  const status = recordsState.isWorkdayStarted;

  useEffect(() => {
    console.log("refresging submitphoto screen");
    isWorkdayStarted(setLoading);
  }, [status]);

  const startWorkday = <BUTTON text="Start Work" routeName="StartWorkday" />;
  const endWorkday = (
    <>
      <BUTTON text="Add Additional Photo" routeName="AddAdditionalPhoto" />
      <BUTTON text="End Work" routeName="EndWorkday" />
    </>
  );

  const showMenu = recordsState.isWorkdayStarted ? endWorkday : startWorkday;

  const progress = (
    <View style={styles.progressBarContainer}>
      <ProgressBarAndroid style={styles.progressBar} />
      <Text>Wait, checking your status...</Text>
    </View>
  );

  const showable =
    status === undefined ? null : (
      <>
        <Text style={styles.heading}>Work Submission Menu</Text>
        <SafeAreaView forceInset={{ top: "always" }}>
          {!loading ? showMenu : progress}
        </SafeAreaView>
      </>
    );

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      {recordsState.errorMessage !== "" ? (
        <Text
          style={{
            marginTop: 20,
            padding: 20,
            textAlign: "center",
            color: "#FF4136"
          }}
        >
          {recordsState.errorMessage}
        </Text>
      ) : null}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh} />
        }
        style={styles.container}
      >
        <NavigationEvents
          onWillBlur={() => {
            clearState();
          }}
        />
        {showable}
      </ScrollView>
    </SafeAreaView>
  );
};
SubmitPhotoScreen.navigationOptions = {
  header: null,
  tabBarIcon: (
    <MaterialCommunityIcons name="information" color="dodgerblue" size={35} />
  )
};

const styles = StyleSheet.create({
  progressBarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    padding: 20,
    margin: 20
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  progressBar: {
    color: "dodgerblue",
    width: 250,
    height: 250
  },
  container: {
    marginTop: 50
  },
  btnContainer: {
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "gainsboro",
    backgroundColor: "dodgerblue"
  },
  link: {
    color: "white",
    textAlign: "center"
  }
});
export default SubmitPhotoScreen;
