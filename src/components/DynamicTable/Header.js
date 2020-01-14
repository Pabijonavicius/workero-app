import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as moment from "moment";

const Header = ({ name, title, width, setRecords, records }) => {
  const [isAsc, setIsAsc] = useState(false);
  function sort() {
    let temp;
    if (isAsc) {
      temp = records.sort((a, b) => (a[name] > b[name] ? 1 : -1));
      setIsAsc(false);
    } else {
      temp = records.sort((a, b) => (a[name] < b[name] ? 1 : -1));
      setIsAsc(true);
    }
    setRecords({ records: temp });
  }
  return (
    <TouchableOpacity
      onPress={sort}
      style={{
        padding: 10,
        borderWidth: 1,
        borderColor: "dodgerblue",
        width: width
      }}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "dodgerblue"
  }
});

export default Header;
