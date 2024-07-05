import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { getNazivi, getOSinfo } from "../api/apiService";
import { LastnikOSResponse, LastnikOSResult, sendParams } from "../types/types";
import DetailCard from "./components/DetailCard";
import CustomButton from "./components/CustomButton";
import { Picker } from "@react-native-picker/picker";

const chevronLeft = require("../assets/images/chevron-left.png");

type NazivItem = {
  naziv: string;
};

type NaziviResponse = NazivItem[];

export default function home() {
  const [numberOS, setNumberOS] = useState<number>(0);
  const [dataOS, setDataOS] = useState<LastnikOSResult | null | undefined>(
    undefined
  );
  const [novaLokacija, setNovaLokacija] = useState<string | null>(null);
  const [sendParams, setSendParams] = useState<sendParams | null>();
  const [newNaziv, setNewNaziv] = useState<string>("");
  const [nazivi, setNazivi] = useState<NaziviResponse>([]);

  useEffect(() => {
    if (dataOS !== null) {
      console.log(dataOS);
      console.log(nazivi);
    }
  }, [dataOS]);

  const handleGetNazivi = async () => {
    try {
      const dataNazivi = await getNazivi();
      setNazivi(dataNazivi.result);
    } catch (error) {
      console.error("Get nazivi error", error);
    }
  };

  useEffect(() => {
    handleGetNazivi();
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
    }
  };

  const handleCopyStaro = () => {
    setNovaLokacija(String(dataOS?.lokacija_inv));
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-start px-4 my-6 font-pregular">
          <Text className="text-2xl font-psemibold mt-5 text-center">
            Inventura OS
          </Text>
          <View className="w-full h-16 px-4 pl-6 mt-6 bg-white border-2 border-slate-600 rounded-2xl focus:border-blue-700 flex-row items-center">
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
                <Text>Osnovno sredstvo nima naziva</Text>
                <View className="w-full h-14 rounded-2xl border-2 font-pregular flex-col items-center justify-center bg-red-200">
                  <Picker
                    selectedValue={newNaziv}
                    onValueChange={(itemValue, itemIndex) =>
                      setNewNaziv(itemValue)
                    }
                    placeholder="Izberi naziv"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {nazivi.map((naziv, index) => (
                      <Picker.Item
                        label={naziv.naziv}
                        value={naziv.naziv}
                        key={index}
                        fontFamily="Popins-Regular"
                        style={{
                          fontFamily: "Poppins-Regular",
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      />
                    ))}
                  </Picker>
                </View>
              </>
            ) : (
              <>
                <DetailCard
                  dataOS={dataOS}
                  novaLokacija={novaLokacija}
                  popisanoColor={dataOS?.popisan === "D" ? true : false}
                  handleNovaLokacija={(e: string) => setNovaLokacija(String(e))}
                  handleCopy={handleCopyStaro}
                />
                <CustomButton
                  title="VNESI"
                  handlePress={() => setNovaLokacija(null)}
                  containerStyles="bg-[#002d5f]"
                  disable={
                    novaLokacija === "0" || novaLokacija === null ? true : false
                  }
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
