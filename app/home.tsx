import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { getOSinfo } from "../api/apiService";
import { LastnikOSResponse, LastnikOSResult } from "../types/types";

const chevronLeft = require("../assets/images/chevron-left.png");

export default function home() {
  const [numberOS, setNumberOS] = useState<number>(0);
  const [dataOS, setDataOS] = useState<LastnikOSResult | null>(null);
  const [novaLokacija, setNovaLokacija] = useState<string>("0");

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

  const handleCopyStaro = () => {
    setNovaLokacija(String(dataOS?.lokacija));
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6 font-pregular">
          <Text className="text-2xl font-psemibold mt-5 text-center">
            Invetura OS
          </Text>
          <View className="w-full h-16 px-4 pl-6 mt-6 bg-white border-2 border-slate-600 rounded-2xl focus:border-blue-700 flex-row items-center">
            <TextInput
              className="text-2xl text-center w-full flex-col h-full items-center justify-center font-pbold"
              keyboardType="numeric"
              placeholder="Številka OS"
              onChangeText={(e) => setNumberOS(Number(e))}
              onSubmitEditing={() => handleGetLastnik()}
            />
          </View>
          <View
            className={`p-4 my-4 rounded-2xl ${
              dataOS?.popisan === "D" ? "bg-green-200" : "bg-red-200"
            }`}
          >
            <Text className="text-lg font-pmedium">{dataOS?.osstanje_ime}</Text>
            <Text className="text-sm font-psemibold">Lastnik</Text>
            <View className="w-full flex flex-row justify-between">
              <Text className="font-pregular text-lg">{dataOS?.ime}</Text>
              <Text>{dataOS?.sifra}</Text>
            </View>
            <Text className="text-sm mt-2 font-psemibold">Lokacija</Text>
            <View className="w-full flex flex-row justify-between">
              <Text className="font-pregular text-lg">{dataOS?.lokacija}</Text>
              <Text>{dataOS?.obrat_ime}</Text>
            </View>
            <View className="mt-2 w-full relative">
              <Text className="text-center mb-1 font-psemibold text-sm">
                Nova lokacija
              </Text>
              <View className="w-full h-10 border-[1px] border-red-300 rounded-2xl bg-red-100 flex-row items-center justify-between pl-4 relative">
                <TextInput
                  className="font-pregular flex h-full w-full items-center"
                  keyboardType="numeric"
                  value={novaLokacija}
                  onChangeText={(e) => setNovaLokacija(e)}
                />
                <TouchableOpacity
                  className="h-full flex-row items-center justify-center bg-red-300 rounded-[14px] px-4 absolute right-0 z-10"
                  onPress={handleCopyStaro}
                >
                  <Image
                    source={chevronLeft}
                    resizeMode="contain"
                    className="h-3 w-3 pr-6"
                  />
                  <Text className="text-sm font-pregular">Kopiraj staro</Text>
                </TouchableOpacity>
              </View>
            </View>
            {dataOS?.popisan === "D" ? (
              <Text className="text-base font-pbold text-green-700 text-center mt-4">
                POPISANO
              </Text>
            ) : (
              <Text className="text-base font-pbold text-red-700 text-center mt-2">
                NEPOPISANO
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
