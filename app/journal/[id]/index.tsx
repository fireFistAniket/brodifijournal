import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Link,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { vmax, vw } from "@/constants/ScreenSize";
import { Icon } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JournalDetails = () => {
  const { id } = useLocalSearchParams();
  const [journal, setJournal] = useState<any>({});

  const router = useRouter();

  async function getJournalDetails() {
    try {
      const journalData: any = await AsyncStorage.getItem(`${id}`);
      setJournal(JSON.parse(journalData));
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteJournal() {
    try {
      await AsyncStorage.removeItem(`${id}`);
      //   router.replace("/index");
      router.dismiss(1);
    } catch (error) {
      console.error(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getJournalDetails();
    }, [])
  );

  const createTwoButtonAlert = () =>
    Alert.alert("Are you want to delete this jounal?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteJournal() },
    ]);

  useEffect(() => {
    getJournalDetails();
  }, [id]);

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#3f3f46",
        flex: 1,
        gap: 4 * vmax,
        paddingHorizontal: 2 * vmax,
        paddingVertical: 1.5 * vmax,
      }}
    >
      <View>
        <Text
          style={{ fontSize: 8 * vmax }}
          className="font-bold text-neutral-200"
        >
          {journal.title}
        </Text>
      </View>
      <Text
        style={{ fontSize: 3.5 * vmax }}
        className="font-medium text-neutral-200"
      >
        {journal.description}
      </Text>
      <View className="gap-y-4">
        <Text
          className="text-rose-300 font-bold"
          style={{ fontSize: 2 * vmax }}
        >
          Created:{" "}
          {`${new Date(journal.createdAt).toLocaleString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            // second: "2-digit",
            // timeZoneName: "short",
          })}`}
        </Text>
        <Text
          className="text-green-300 font-bold"
          style={{ fontSize: 2 * vmax }}
        >
          Last Updated:{" "}
          {`${new Date(journal.createdAt).toLocaleString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            // second: "2-digit",
            // timeZoneName: "short",
          })}`}
        </Text>
      </View>
      <View className="flex-row gap-x-4">
        <Link href={`/journal/${id}/edit`}>
          <View
            className="flex-row px-4 py-2 items-center bg-blue-600 rounded-3xl justify-between"
            style={{ minWidth: 30 * vw }}
          >
            <Icon source="note-edit" size={4 * vmax} color="#e5e5e5" />
            <Text
              className="font-semibold text-neutral-200"
              style={{ fontSize: 3 * vmax }}
            >
              Edit
            </Text>
          </View>
        </Link>
        <TouchableOpacity
          className="flex-row px-4 py-2 items-center bg-red-600 rounded-3xl justify-between"
          style={{ minWidth: 30 * vw }}
          onPress={createTwoButtonAlert}
        >
          <Icon source="delete" size={4 * vmax} color="#e5e5e5" />
          <Text
            className="font-semibold text-neutral-200"
            style={{ fontSize: 3 * vmax }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default JournalDetails;

const styles = StyleSheet.create({});
