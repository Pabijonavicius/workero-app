import React, { Component, useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  RefreshControl
} from "react-native";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";
import DynamicTable from "../../../components/DynamicTable";
import { Context as TableContext } from "../../../context/TableContext";
import { Context as RecordsContext } from "../../../context/RecordsContext";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import DatePicker from "../../../components/DatePicker";
import DropDownSearch from "../../../components/DropdownSearch";
import { Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { saveFile } from "../../../utils";

const headers = [
  {
    name: "id",
    title: "#"
  },
  {
    name: "workplace",
    title: "Workplace"
  },
  {
    name: "startTime",
    title: "Start Time"
  },
  {
    name: "endTime",
    title: "End Time"
  },
  {
    name: "time",
    title: "Time"
  }
];

function formatTime(time) {
  if (time.toString().length < 2) {
    return `0${time}`;
  }
  return time;
}

function sumWorkHours(data) {
  if (data.length > 0) {
    let ms = 0;

    data.map(record => {
      if (!(record.endTime === "n/a")) {
        const hours = moment
          .duration(Number(record.time.split(":")[0]), "hours")
          .asMilliseconds();
        const mins = moment
          .duration(Number(record.time.split(":")[1]), "minutes")
          .asMilliseconds();

        ms += hours + mins;
      }
    });

    const minutes = moment.duration(ms).minutes();
    const hours = Math.trunc(moment.duration(ms).asHours());

    return `${formatTime(hours)}:${formatTime(minutes)}`;
  } else {
    return 0;
  }
}

const UserStatisticsScreen = () => {
  const {
    state: tableState,
    filterRecords,
    fetchRecords,
    fetchWorkplaces
  } = useContext(TableContext);

  const [showSettings, setShowSettings] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()));
  const [monthly, setMonthly] = useState(false);
  const [workplace, setWorkplace] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const onRefresh = React.useCallback(() => {
    fetchRecords({ workplace, monthly, selectedDate });
  }, [refreshing]);

  useEffect(() => {
    fetchRecords({ workplace, monthly, selectedDate });
    fetchWorkplaces();
  }, []);
  useEffect(() => {
    console.log("rerender please");
  }, [tableState.records]);

  function saveSettings() {}

  function resetSettingStates() {
    setWorkplace("");
  }

  function setDatePicker(event, date) {
    setShow(Platform.OS === "ios" ? true : false);
    date ? setSelectedDate(moment(new Date(date))) : null;
  }

  const settingsIcon = (
    <MaterialIcons
      name="settings"
      color={showSettings ? "#111" : "dodgerblue"}
      size={35}
    />
  );
  const settings = (
    <View style={styles.settingsContainer}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{}}>Daily / Monthly</Text>
        <Switch
          style={{ width: 60 }}
          thumbColor={"dodgerblue"}
          value={monthly}
          onValueChange={setMonthly}
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20
        }}
      >
        <Text style={{ marginRight: 10 }}>Select Date</Text>
        <DatePicker
          show={show}
          setShow={setShow}
          mode={"date"}
          format={monthly ? "YYYY-MM" : "YYYY-MM-DD"}
          setDatePicker={setDatePicker}
          selectedDate={selectedDate}
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20
        }}
      >
        <Text style={{ marginRight: 10 }}>Select Workplace</Text>
        <DropDownSearch
          items={tableState.workplaces}
          setSelectedItem={setWorkplace}
          selectedItem={workplace}
          setTextState={setWorkplace}
          placeholder={"Leave empty, if you want all workplaces"}
        />
      </View>
      <Button
        onPress={() => {
          fetchRecords({ workplace, selectedDate, monthly });
          setTimeout(() => {
            setShowSettings(false);
          }, 1500);
        }}
        containerStyle={{
          marginTop: 20,
          backgroundColor: "dodgerblue",
          width: "80%",
          alignSelf: "center"
        }}
        buttonStyle={{ borderRadius: 20 }}
        title={"Set"}
      />
    </View>
  );

  const totalTime = sumWorkHours(tableState.records);

  const footerComponent =
    totalTime !== 0 ? (
      <View
        style={{
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "gainsboro",
          justifyContent: "space-evenly",
          alignItems: "center",
          alignSelf: "center"
        }}
      >
        <Button
          disabled={isDisabled}
          title={"As Excel"}
          containerStyle={{ backgroundColor: "#2ECC40", width: "50%" }}
          buttonStyle={{ backgroundColor: "#2ECC40" }}
          onPress={() => {
            setIsDisabled(true);
            setTimeout(() => {
              saveFile({
                sheetName: selectedDate.format("YYYY-MM-DD"),
                documentName: selectedDate.format("YYYY-MM-DD"),
                headers: headers,
                data: tableState.records,
                totalTime
              });
              setIsDisabled(false);
            }, 1000);
          }}
        />
        <Text style={{ paddingRight: 10, paddingLeft: 10 }}>
          Total time:
          <Text style={{ fontWeight: "bold" }}>{totalTime}</Text>
        </Text>
      </View>
    ) : null;

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.mainContainer}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View>
          <View style={styles.headingWrapper}>
            <Text>&nbsp;</Text>
            <Text style={styles.heading}>Worker Statistics</Text>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                setShowSettings(!showSettings);
                !showSettings ? resetSettingStates() : null;
              }}
            >
              {settingsIcon}
            </TouchableOpacity>
          </View>
          {showSettings ? settings : null}
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.mainContainer}
        >
          <View
            style={{
              display: showSettings ? "none" : "flex"
            }}
          >
            <DynamicTable
              widths={[80, 120, 180, 180, 120]}
              setRecords={filterRecords}
              records={tableState.records}
              headers={headers}
              applyFieldTransformations={{
                fields: ["startTime", "endTime"],
                callback: date => {
                  const d = moment(new Date(date));
                  if (d.isValid()) {
                    return d.format("YYYY-MM-DD HH:mm:ss");
                  }
                  return date;
                }
              }}
            />
          </View>
        </ScrollView>
        {footerComponent}
      </ScrollView>
    </SafeAreaView>
  );
};
UserStatisticsScreen.navigationOptions = {
  tabBarIcon: (
    <MaterialCommunityIcons name="information" color="dodgerblue" size={35} />
  )
};
export default UserStatisticsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 15
  },
  headingWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  settingsContainer: {
    borderTopWidth: 1,
    borderColor: "gainsboro",
    padding: 10
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  }
});
