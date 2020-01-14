import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import moment from "moment";

function renderComments(comments, photoURI) {
  return comments.map((comment, index) => {
    const addedAt = moment(new Date(comment.addedAt));
    return (
      <View key={`comment-${index}`}>
        <View style={styles.writerInfoContainer}>
          <Text style={styles.writerLabel}>@{comment.user.username}&nbsp;</Text>
          <Text style={styles.messageLabel}>{comment.message}</Text>
        </View>
        <Text style={styles.addedAtLabel}>
          <Text>{addedAt.format("YYYY/MM/DD")}</Text>
          <Text style={styles.timeLabel}>
            &nbsp;{addedAt.format("HH:mm:ss")}
          </Text>
        </Text>
      </View>
    );
  });
}

const PhotoComments = ({ comments, photoURI }) => {
  return (
    <View style={styles.container}>{renderComments(comments, photoURI)}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 15
  },
  messageLabel: {
    flexWrap: "wrap",
    paddingRight: 50,
    width: "100%"
  },
  writerInfoContainer: {
    flexDirection: "row"
  },
  writerLabel: {
    fontWeight: "bold",
    color: "dodgerblue"
  },
  addedAtLabel: {
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "flex-end",
    fontSize: 11
  }
  // textAreaContainer: {
  //   marginTop: 10,
  //   marginBottom: 10,
  //   borderColor: "gainsboro",
  //   borderWidth: 1,
  //   borderBottomStartRadius: 10,
  //   borderBottomEndRadius: 10,
  //   borderTopStartRadius: 10,
  //   borderTopEndRadius: 10
  // },
  // textArea: {
  //   height: 80,
  //   justifyContent: "flex-start",
  //   alignContent: "flex-start",
  //   alignItems: "flex-start",
  //   padding: 10
  // }
});
export default PhotoComments;
