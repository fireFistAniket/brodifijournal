import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FAB } from "react-native-paper";

const AddButton = ({ onPress }: { onPress: () => void }) => {
  return <FAB icon="plus" style={styles.fab} onPress={onPress} />;
};

export default AddButton;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
