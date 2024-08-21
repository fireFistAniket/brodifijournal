import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Journal from "@/components/Journal";
import AddButton from "@/components/AddButton";
import { Link, useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { vh, vmax } from "@/constants/ScreenSize";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "@/components/Loader";

const Home = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [journals, setJournals] = useState<any[]>([]);
  const fabFuction = () => {
    router.push("/journal/add");
  };

  const getAllJournal = async () => {
    try {
      setLoading(true);
      const keys = await AsyncStorage.getAllKeys();
      const journals: any = await AsyncStorage.multiGet(keys);
      setJournals(journals);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      await getAllJournal();
      setRefreshing(false);
    }, 150);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllJournal();
    }, [])
  );

  useEffect(() => {
    getAllJournal();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 bg-black/80 px-3 justify-around">
        {journals.length <= 0 ? (
          <>
            <Image
              source={require("../assets/images/no-added.png")}
              style={{ width: 35 * vmax, height: 35 * vmax }}
              resizeMode="contain"
              className="self-center"
            />
            <Text
              className="font-semibold text-neutral-200 justify-self-center text-center"
              style={{ fontSize: 3.5 * vmax }}
            >
              No Journal added
            </Text>
          </>
        ) : (
          <>
            <Text
              className="text-white font-bold text-center"
              style={{ marginVertical: 2 * vh, fontSize: 8 * vmax }}
            >
              All Journals
            </Text>
            {loading && <Loader loading={loading} />}
            <ScrollView
              contentContainerStyle={{ gap: 2 * vh, alignItems: "stretch" }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {journals.map((item) => (
                <Link key={item[0]} href={`/journal/${item[0]}/`}>
                  <Journal journalData={JSON.parse(item[1])} />
                </Link>
              ))}
            </ScrollView>
          </>
        )}
        <AddButton onPress={fabFuction} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
