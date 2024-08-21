import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const JournalDetailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="edit" options={{ headerTitle: "" }} />
    </Stack>
  );
};

export default JournalDetailsLayout;

const styles = StyleSheet.create({});
