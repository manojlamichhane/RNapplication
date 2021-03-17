import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "../constants";

const Card = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>{title}</Text>
      <Text style={{ color: "white" }}>{subtitle}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 25,
  },
});
export default Card;
