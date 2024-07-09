import {
  DeviceEventEmitter,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getNazivi, getOSinfo } from "../api/apiService";
import { LastnikOSResponse, LastnikOSResult, sendParams } from "../types/types";
import DetailCard from "./components/DetailCard";
import Toast from "react-native-toast-message";
import DataWedgeIntents from "react-native-datawedge-intents";

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

  useEffect(() => {
    // Listen for barcode scans
    DeviceEventEmitter.addListener("datawedge_broadcast_intent", (intent) => {
      // Extract the scanned data. The intent action and data key might vary based on your DataWedge configuration.
      const scannedData = intent?.["com.symbol.datawedge.data_string"];
      console.log("Scanned data: ", scannedData);
      setNumberOS(scannedData);
    });

    // Specify the action of the intent you configured in DataWedge
    DataWedgeIntents.registerBroadcastReceiver({
      filterActions: [
        "com.zebra.inventura.ACTION",
        "com.symbol.datawedge.api.RESULT_ACTION",
      ],
      filterCategories: ["android.intent.category.DEFAULT"],
    });

    return () => {
      // Clean up
      DeviceEventEmitter.removeAllListeners("datawedge_broadcast_intent");
    };
  }, []);

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
      1;
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[95vh] justify-start px-4 font-pregular">
          {/* <Text className="text-xl font-psemibold mt-2 text-center">
            Inventura OS
          </Text> */}
          <View className="relative">
            {/* <Text className="text-base text-black font-pmedium text-center bg-white top-3 px-2 ">
              Številka osnovnega sredstva
            </Text> */}
            <View className="w-full h-10 px-4 pl-6 mt-4 bg-white border-2 border-slate-400 rounded-2xl focus:border-[#002d5f] flex-row items-center">
              <TextInput
                className="text-xl text-center w-full flex-col h-full items-center justify-center font-pbold tracking-widest"
                keyboardType="numeric"
                autoFocus={true}
                onChangeText={(e) => setNumberOS(Number(e))}
                onSubmitEditing={() => handleGetLastnik()}
              />
            </View>
          </View>

          {dataOS ? (
            dataOS.osstanje_ime === null ? (
              <>
                <DetailCard
                  isNaziv={false}
                  dataOS={dataOS}
                  numberOS={numberOS}
                  popisanoColor={dataOS?.popisan === "D" ? true : false}
                />
              </>
            ) : (
              <>
                <DetailCard
                  isNaziv={true}
                  dataOS={dataOS}
                  numberOS={numberOS}
                  popisanoColor={dataOS?.popisan === "D" ? true : false}
                />
              </>
            )
          ) : dataOS === null ? (
            <Text className="text-center text-red-500 my-4 text-xl font-pbold">
              Številka ne obstaja
            </Text>
          ) : null}
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}
