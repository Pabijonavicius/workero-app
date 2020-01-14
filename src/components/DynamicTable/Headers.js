import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Header from "./Header";

function renderHeaders(headers, widths, records, setRecords) {
  return headers.map((header, index) => (
    <Header
      width={widths[index]}
      key={`header-${index}`}
      name={header.name}
      title={header.title}
      records={records}
      setRecords={setRecords}
    />
  ));
}
export default function Headers({ headers, widths, records, setRecords }) {
  return (
    <View style={styles.container}>
      {renderHeaders(headers, widths, records, setRecords)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "dodgerblue"
  },
  title: {
    fontSize: 18
  }
});
