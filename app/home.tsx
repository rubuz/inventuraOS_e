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
import DetailCard from "./components/DetailCard";
import CustomButton from "./components/CustomButton";

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
            Inventura OS
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
          <DetailCard
            dataOS={dataOS}
            novaLokacija={novaLokacija}
            popisanoColor={dataOS?.popisan === "D" ? true : false}
            handleNovaLokacija={(e: string) => setNovaLokacija(String(e))}
            handleCopy={handleCopyStaro}
          />
          <CustomButton
            title="VNESI"
            handlePress={() => console.log("VNEŠENO")}
            containerStyles="bg-[#002d5f]"
            disable={novaLokacija === "0" ? true : false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
