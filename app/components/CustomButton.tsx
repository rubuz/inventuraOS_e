import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text>CustomButton</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    paddingVertical: 10,
    width: 200,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});
