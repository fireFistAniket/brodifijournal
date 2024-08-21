import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import { vh, vw } from "@/constants/ScreenSize";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Loader from "@/components/Loader";

const Add = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function addNewJournal(tit: string, desc: string) {
    if (hasErrors(tit) || hasErrors(desc)) {
      return;
    }

    setLoading(true);
    try {
      const key: string | any = uuid.v4();
      const journal = await AsyncStorage.setItem(
        key,
        JSON.stringify({
          title: tit.trim(),
          description: desc.trim(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
      );

      setLoading(false);
      // router.push(`/journal/${key}`);
      router.dismiss(1);
    } catch (error) {
      console.error(error);
    }
  }

  const hasErrors = (str: string | string[]) => {
    return str.length <= 0 ? true : false;
  };

  return (
    <View className="bg-neutral-700 flex-1 pt-2 px-2 justify-around">
      <Text
        className="text-white font-extrabold text-center"
        style={{ fontSize: 12 * vw }}
      >
        Add new Journal
      </Text>
      <View className="gap-2 border border-neutral-400 mx-4 rounded-xl py-2">
        <Text className="text-white text-2xl capitalize">add title</Text>
        <TextInput
          value={title} 
          mode="outlined"
          outlineColor="#ffffff"
          textColor="#ffffff"
          activeOutlineColor="#ffffff"
          onChangeText={(text) => setTitle(text)}
          style={{ fontSize: 5 * vw }}
          contentStyle={{ backgroundColor: "rgb(64,64,64)", paddingLeft: 2 }}
        />
        <HelperText type="error" visible={hasErrors(title)}>
          minimum 3 chracters needed
        </HelperText>
      </View>
      {loading && <Loader loading={loading} />}
      <View className="gap-2 border border-neutral-400 mx-4 rounded-xl py-2">
        <Text className="text-white text-2xl capitalize">add description</Text>
        <TextInput
          value={description}
          mode="outlined"
          outlineColor="#ffffff"
          textColor="#ffffff"
          activeOutlineColor="#ffffff"
          multiline
          onChangeText={(text) => setDescription(text)}
          style={{ fontSize: 5 * vw }}
          contentStyle={{
            backgroundColor: "rgb(64,64,64)",
            paddingLeft: 2,
            height: 14 * vh,
          }}
        />
        <HelperText type="error" visible={hasErrors(description)}>
          minimum 10 chracters needed
        </HelperText>
      </View>
      <Button
        icon="note-plus"
        mode="contained"
        buttonColor="#262626"
        textColor="#d1d5db"
        labelStyle={{ fontSize: 4.5 * vw }}
        onPress={() => addNewJournal(title, description)}
      >
        Add Journal
      </Button>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({});
