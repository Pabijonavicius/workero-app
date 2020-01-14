import React from "react";
import { View, Text } from "native-base";
import PhotoRecord from "./PhotoRecord";
import { StyleSheet } from "react-native";

const PhotoRecords = ({ records, setReload }) => {
  function renderRecords() {
    return records.map((record, index) => (
      <View key={`photo-record-${index}`} style={index === 0 ? {} : styles.odd}>
        <PhotoRecord setReload={setReload} data={record} />
      </View>
    ));
  }

  return <View>{renderRecords(records)}</View>;
};

const styles = StyleSheet.create({
  odd: {
    borderTopWidth: 1,
    borderColor: "gainsboro"
  }
});
export default PhotoRecords;
