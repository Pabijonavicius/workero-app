import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StatusBar,
  ScrollView,
  Platform,
  RefreshControl,
  KeyboardAvoidingView,
  Text,
  ProgressBarAndroid
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import moment from "moment";

import { Context as AuthContext } from "../../context/AuthContext";
import { Context as RecordsContext } from "../../context/RecordsContext";

import ScrollableText from "../../components/ScrollableText";
import DatePicker from "../../components/DatePicker";
import PhotoRecords from "../../components/PhotoRecords";
import ProgressBar from "../../components/ProgressBar";

function getMetaData(state) {
  let firstName = "";
  let lastName = "";
  if (state.user) {
    firstName = state.user.firstName;
    lastName = state.user.lastName;
  }
  return { firstName, lastName };
}

const UserHomeScreen = () => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()));
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const { state: authState } = useContext(AuthContext);
  const {
    state: recordsState,
    fetchRecords,
    clearErrorMessage,
    clearState,
    switchScreen
  } = useContext(RecordsContext);

  useEffect(() => {
    console.log("nu nx");
    if (recordsState.isSwitched) {
      setLoading(true);
      fetchRecords({
        date: selectedDate.format("YYYY-MM-DD"),
        setLoading: setLoading
      });
    }
  }, [recordsState.isSwitched]);

  useEffect(() => {
    setLoading(true);
    fetchRecords({
      date: selectedDate.format("YYYY-MM-DD"),
      setLoading: setLoading
    });
  }, [selectedDate]);

  useEffect(() => {
    fetchRecords({
      date: selectedDate.format("YYYY-MM-DD"),
      setLoading: () => {}
    });
  }, [reload]);

  const onRefresh = React.useCallback(() => {
    console.log(selectedDate.format("YYYY-MM-DD"));
    fetchRecords({
      date: selectedDate.format("YYYY-MM-DD"),
      setLoading: setRefreshing
    });
  }, [refreshing]);

  function triggerReload() {
    reload === 0 ? setReload(1) : setReload(0);
  }

  const photoRecords =
    recordsState.records.length === 0 ? (
      <View style={styles.noPhotosHandler}>
        <Text style={styles.noPhotosHandlerLabel}>
          You have not uploaded any photos today.
        </Text>
      </View>
    ) : (
      <PhotoRecords setReload={triggerReload} records={recordsState.records} />
    );

  const { firstName, lastName } = getMetaData(authState);

  const errorMessage =
    recordsState.errorMessage !== "" ? (
      <Text style={styles.error}>{recordsState.errorMessage}!</Text>
    ) : null;

  function setDatePicker(event, date) {
    setShow(Platform.OS === "ios" ? true : false);
    date ? setSelectedDate(moment(new Date(date))) : null;
  }

  const progress = (
    <ProgressBar
      containerStyle={styles.progressBarContainer}
      progressBarStyle={styles.progressBar}
      caption={"Please wait, fetching photos!"}
    />
  );

  const content = <View style={styles.container}>{photoRecords}</View>;

  return (
    <KeyboardAvoidingView behavior={"padding"}>
      <SafeAreaView forceInset={{ top: "always" }}>
        <StatusBar translucent barStyle="dark-content" />
        <NavigationEvents
          onWillBlur={() => {
            setTimeout(switchScreen, 1500);
            clearState();
          }}
        />
        <View style={styles.settingsContainer}>
          <View style={styles.metaInfoContainer}>
            <ScrollableText text={`${firstName} ${lastName}`} />
            <DatePicker
              show={show}
              setShow={setShow}
              mode={"date"}
              format={"YYYY-MM-DD"}
              setDatePicker={setDatePicker}
              selectedDate={selectedDate}
            />
          </View>
          {errorMessage}
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          forceInset={{ top: "always" }}
        >
          {!loading ? content : progress}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  noPhotosHandler: {
    padding: 15
  },
  noPhotosHandlerLabel: {
    fontWeight: "bold"
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
  },
  statusBar: {
    backgroundColor: "dodgerblue"
  },
  container: { marginBottom: 100 },
  metaInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12
  },
  settingsContainer: {
    borderBottomWidth: 1,
    borderColor: "gainsboro"
  },
  scrollableTextContainer: {
    maxWidth: "60%"
  },
  usernameLabelContainer: {
    height: 20
  },
  usernameLabel: {
    fontWeight: "bold"
  },
  selectedDateCaption: {
    color: "dodgerblue",
    fontWeight: "bold"
  },
  error: {
    color: "#FF4136",
    textAlign: "center",
    padding: 5
  }
});

export default UserHomeScreen;
