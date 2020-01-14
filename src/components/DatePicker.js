import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({
  show,
  setShow,
  setDatePicker,
  mode,
  format,
  selectedDate
}) => {
  return (
    <View style={styles.viewContainerStyle}>
      {show ? (
        <DateTimePicker
          value={selectedDate.toDate()}
          mode={mode}
          display="default"
          onChange={setDatePicker}
        />
      ) : null}
      <Text style={styles.textStyle} onPress={() => setShow(true)}>
        {selectedDate.format(format)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainerStyle: {},
  textStyle: {
    color: "dodgerblue",
    fontWeight: "bold"
  }
});
export default DatePicker;
