import { ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getNazivi, getOSinfo } from "../api/apiService";
import { LastnikOSResponse, LastnikOSResult, sendParams } from "../types/types";
import DetailCard from "./components/DetailCard";

type NazivItem = {
  naziv: string;
};

type NaziviResponse = NazivItem[];

export default function home() {
  const [numberOS, setNumberOS] = useState<number>(0);
  const [dataOS, setDataOS] = useState<LastnikOSResult | null | undefined>(
    undefined
  );

  const [sendParams, setSendParams] = useState<sendParams | null>();

  // useEffect(() => {
  //   if (dataOS !== null) {
  //     console.log(dataOS);
  //     console.log(nazivi);
  //   }
  // }, [dataOS]);

  const handleGetLastnik = async () => {
    try {
      const data: LastnikOSResponse = await getOSinfo(numberOS);
      if (data.result === null) {
        console.log("Številka ne obstaja");
        setDataOS(null);
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
        <View className="w-full min-h-[85vh] justify-start px-4 my-6 font-pregular">
          <Text className="text-2xl font-psemibold mt-5 text-center">
            Inventura OS
          </Text>
          <View className="w-full h-16 px-4 pl-6 mt-6 bg-white border-2 border-slate-400 rounded-2xl focus:border-[#002d5f] flex-row items-center">
            <TextInput
              className="text-2xl text-center w-full flex-col h-full items-center justify-center font-pbold tracking-widest"
              keyboardType="numeric"
              placeholder="Številka OS"
              onChangeText={(e) => setNumberOS(Number(e))}
              onSubmitEditing={() => handleGetLastnik()}
            />
          </View>
          {dataOS ? (
            dataOS.osstanje_ime === null ? (
              <>
                <DetailCard
                  isNaziv={false}
                  dataOS={dataOS}
                  popisanoColor={dataOS?.popisan === "D" ? true : false}
                />
              </>
            ) : (
              <>
                <DetailCard
                  isNaziv={true}
                  dataOS={dataOS}
                  popisanoColor={dataOS?.popisan === "D" ? true : false}
                />
              </>
            )
          ) : dataOS === null ? (
            <Text className="text-center text-red-500 my-6 text-xl font-pbold">
              Številka ne obstaja
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
