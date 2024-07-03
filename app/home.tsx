import {
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

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Text className="text-2xl font-psemibold mt-5 text-center">
            Invetura OS
          </Text>
          <View className="w-full h-16 px-4 pl-6 mt-6 bg-white border-2 border-slate-600 rounded-2xl focus:border-blue-700 flex-row items-center">
            <TextInput
              className="text-2xl text-center w-full flex items-center justify-center font-bold"
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
            <Text className="text-sm font-semibold">Lastnik</Text>
            <View className="w-full flex flex-row justify-between">
              <Text className="text-base">{dataOS?.ime}</Text>
              <Text>{dataOS?.sifra}</Text>
            </View>
            <Text className="text-sm mt-2 font-semibold">Lokacija</Text>
            <View className="w-full flex flex-row justify-between">
              <Text className="text-base">{dataOS?.lokacija}</Text>
              <Text>{dataOS?.obrat_ime}</Text>
            </View>
            <View className="mt-2 w-full relative">
              <Text className="text-center mb-1">Nova lokacija</Text>
              <View className="w-full h-12 border-[1px] border-red-300 rounded-2xl bg-red-100 flex-row items-center justify-between pl-4">
                <TextInput
                  keyboardType="numeric"
                  placeholder="Nova lokacija"
                  value={novaLokacija}
                  onChangeText={(e) => setNovaLokacija(e)}
                />
                <TouchableOpacity className="h-full flex-col items-center justify-center bg-red-300 rounded-2xl px-4">
                  <Text className="text-sm">Kopiraj staro</Text>
                </TouchableOpacity>
              </View>
            </View>
            {dataOS?.popisan === "D" ? (
              <Text className="text-base font-bold text-green-700 text-center mt-4">
                POPISANO
              </Text>
            ) : (
              <Text className="text-base font-bold text-red-700 text-center mt-2">
                NEPOPISANO
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
