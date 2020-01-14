import React from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Header from "./Header";

function Row({ record, widths, rowIndex }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: rowIndex % 2 ? "#eee" : null
      }}
    >
      {Object.keys(record).map((key, index) => (
        <Text
          style={{ padding: 10, width: widths[index] }}
          key={`${record[key]}-${index}`}
        >
          {record[key]}
        </Text>
      ))}
    </View>
  );
}

function renderRows(records, widths, transform) {
  return records.map((record, index) => {
    transform.fields.map(field => {
      record[field] = transform.callback(record[field]);
    });
    return (
      <Row
        key={`row-${index}`}
        rowIndex={index}
        record={record}
        widths={widths}
      />
    );
  });
}

export default function Body({ records, widths, transform }) {
  return (
    <View>
      {records.length === 0 ? (
        <Text style={styles.emptyLabel}>There are nothing to show..</Text>
      ) : (
        renderRows(records, widths, transform)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  row: { flexDirection: "row" },
  item: {
    borderWidth: 1,
    padding: 5
  },
  title: {
    fontSize: 18
  },
  emptyLabel: {
    padding: 15,
    color: "dodgerblue",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "left"
  }
});
