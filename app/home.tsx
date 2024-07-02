import { ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { getOSinfo } from "../api/apiService";
import { LastnikOSResponse, LastnikOSResult } from "../types/types";

export default function home() {
  const [numberOS, setNumberOS] = useState<number>(0);
  const [dataOS, setDataOS] = useState<LastnikOSResult | null>(null);

  useEffect(() => {
    if (dataOS !== null) {
      console.log(dataOS);
    }
  }, [dataOS]);

  const handleGetLastnik = async () => {
    try {
      const data: LastnikOSResponse = await getOSinfo(numberOS);
      if (data.result === null) {
        console.log("Številka ne obstaja");
      } else {
        setDataOS(data.result);
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center items-center px-4 my-6">
          <Text className="text-2xl font-psemibold mt-5 text-center">
            Invetura OS
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Številka OS"
            onChangeText={(e) => setNumberOS(Number(e))}
            onSubmitEditing={() => handleGetLastnik()}
          />
          <Text>LASTNIK-test: {dataOS?.ime}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
