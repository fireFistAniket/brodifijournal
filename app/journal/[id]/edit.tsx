import { ScrollView, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { vh, vw } from "@/constants/ScreenSize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import Loader from "@/components/Loader";

const Edit = () => {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function getJournalDetails() {
    try {
      setLoading(true);
      const journalData: any = await AsyncStorage.getItem(`${id}`);
      const journal = JSON.parse(journalData);
      setTitle(journal.title);
      setDescription(journal.description);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function editJournalDetails() {
    setLoading(true);
    try {
      const newJournal = JSON.stringify({
        title: title.trim(),
        description: description.trim(),
        updatedAt: Date.now(),
      });
      await AsyncStorage.mergeItem(`${id}`, newJournal);
      //   router.replace(`/journal/${id}`);
      router.dismiss(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getJournalDetails();
  }, [id]);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: "#404040",
        paddingTop: 1 * vh,
        justifyContent: "space-around",
        paddingVertical: 2 * vw,
      }}
    >
      <Text
        className="text-white font-extrabold text-center"
        style={{ fontSize: 12 * vw }}
      >
        Edit your Journal
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
      </View>
      {loading && <Loader loading={loading} />}
      <View className="gap-2 border border-neutral-400 mx-4 rounded-xl py-2">
        <Text className="text-white text-2xl capitalize">
          Edit your description
        </Text>
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
      </View>
      <Button
        icon="note-plus"
        mode="contained"
        buttonColor="#262626"
        textColor="#d1d5db"
        labelStyle={{ fontSize: 4.5 * vw }}
        onPress={() => editJournalDetails()}
      >
        Edit Journal
      </Button>
    </ScrollView>
  );
};

export default Edit;
