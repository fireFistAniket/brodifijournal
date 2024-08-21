import { StyleSheet, Text } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { vh, vmax, vw } from "@/constants/ScreenSize";

const Journal = ({ journalData }: { journalData: any }) => {
  return (
    <Card
      style={{
        backgroundColor: "#3f3f46",
        elevation: 5,
        minWidth: 85 * vw,
      }}
    >
      <Card.Content style={{ gap: 0.8 * vh }}>
        <Text className="text-rose-300 font-bold" style={{ fontSize: 4 * vw }}>
          {`${new Date(journalData.createdAt).toLocaleString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}
        </Text>
        <Text
          className="font-bold text-zinc-300"
          style={{ fontSize: 6 * vmax }}
        >
          {journalData.title}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default Journal;

const styles = StyleSheet.create({});
