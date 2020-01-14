import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Text,
  ProgressBarAndroid,
  RefreshControl
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import moment from "moment";

import { Context as AuthContext } from "../../context/AuthContext";
import { Context as RecordsContext } from "../../context/RecordsContext";
import { Context as AdminContext } from "../../context/AdminContext";

import ScrollableText from "../../components/ScrollableText";
import DatePicker from "../../components/DatePicker";
import PhotoRecords from "../../components/PhotoRecords";
import DropDownSearch from "../../components/DropdownSearch";

function getMetaData(state) {
  let firstName = "";
  let lastName = "";
  if (state.user) {
    firstName = state.user.firstName;
    lastName = state.user.lastName;
  }
  return { firstName, lastName };
}

const AdminHomeScreen = () => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()));
  const [reload, setReload] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  const [refreshing, setRefreshing] = useState(false);
  //Loaders
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  const { state: authState } = useContext(AuthContext);
  const { state: adminState, fetchAvailableUsers } = useContext(AdminContext);

  const {
    state: recordsState,
    fetchPhotosByUsernameAndDate,
    clearErrorMessage
  } = useContext(RecordsContext);

  useEffect(() => {
    fetchAvailableUsers(setLoadingUsers);
  }, []);

  useEffect(() => {
    setLoadingPhotos(true);
    let username;
    if (!selectedItem) {
      username = null;
    } else {
      username = selectedItem.username;
    }
    let date = selectedDate.format("YYYY-MM-DD");

    fetchPhotosByUsernameAndDate(username, date, setLoadingPhotos);
  }, [selectedDate, selectedItem]);

  useEffect(() => {
    let username;
    if (!selectedItem) {
      username = null;
    } else {
      username = selectedItem.username;
    }
    let date = selectedDate.format("YYYY-MM-DD");
    fetchPhotosByUsernameAndDate(username, date, () => {});
  }, [reload]);

  const onRefresh = React.useCallback(() => {
    let date = selectedDate.format("YYYY-MM-DD");
    setSelectedItem();
    setTimeout(() => {
      fetchPhotosByUsernameAndDate(selectedItem, date, setLoadingPhotos);
    }, 800);
  }, [refreshing]);

  function triggerReload() {
    reload === 0 ? setReload(1) : setReload(0);
  }

  const photoRecords =
    recordsState.records.length === 0 ? (
      <View style={styles.noPhotosHandler}>
        <Text style={styles.noPhotosHandlerLabel}>
          didn't upload any photos today...
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
    <View style={styles.progressBarContainer}>
      <ProgressBarAndroid style={styles.progressBar} />
      <Text>Please wait, fetching photos!</Text>
    </View>
  );
  const content = <View style={styles.container}>{photoRecords}</View>;
  return (
    <KeyboardAvoidingView behavior={"padding"}>
      <SafeAreaView forceInset={{ top: "always" }}>
        <StatusBar translucent barStyle="dark-content" />
        <NavigationEvents onWillBlur={clearErrorMessage} />
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
        <DropDownSearch
          items={adminState.users}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          placeholder={"John Dales"}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!loadingUsers && !loadingPhotos ? content : progress}
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
  container: { marginBottom: 120 },
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

export default AdminHomeScreen;
