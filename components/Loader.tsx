import { View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { vmax } from "@/constants/ScreenSize";

const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <View className="absolute top-1/2 left-0 right-0 z-50">
      <ActivityIndicator
        animating={loading}
        color={"#d6d3d1"}
        size={10 * vmax}
      />
    </View>
  );
};

export default Loader;
