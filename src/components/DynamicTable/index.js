import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import Headers from "./Headers";
import Body from "./Body";

function getRowWidths(w, data) {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      Object.keys(data[i]).map((key, index) => {
        console.log(data[i][key]);
        if (w[index] < data[i][key].length) {
          w[index] = data[i][key].length;
        }
      });
    }
    return w.map(r => (r < 10 ? 10 : r) * 9);
  }
  return w;
}

const DynamicTable = ({
  records,
  headers,
  setRecords,
  applyFieldTransformations,
  widths
}) => {
  // Executiong of this calculation takes very long :)
  // const widths = getRowWidths(
  //   headers.map(header => header.title.length),
  //   records
  // );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scrollableContainerX}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          style={styles.scrollableContainerY}
        >
          <Headers
            widths={widths}
            headers={headers}
            records={records}
            setRecords={setRecords}
          />
          <Body
            transform={applyFieldTransformations}
            widths={widths}
            records={records}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  scrollableContainerX: {
    margin: 5
  },
  scrollableContainerY: {
    margin: 5
  }
});
export default DynamicTable;
