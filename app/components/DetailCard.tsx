import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import {
  LastnikOSResponse,
  LastnikOSResult,
  ShowToastParams,
  sendParams,
} from "../../types/types";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { NaziviResponse } from "../../types/types";
import { checkLocation, getNazivi, getOSinfo } from "../../api/apiService";
import CustomButton from "./CustomButton";
import OldOSModal from "./OldOSModal";
import Toast from "react-native-toast-message";
import { showToast } from "./toast";

const chevronLeft = require("../../assets/images/chevron-left.png");

interface DetailCardProps {
  dataOS: LastnikOSResult | null;
  isNaziv?: boolean;
  popisanoColor: boolean;
  numberOS: number;
}

const DetailCard = ({
  dataOS,
  isNaziv,
  popisanoColor,
  numberOS,
}: DetailCardProps) => {
  const [oldNumberOS, setOldNumberOS] = useState(0);
  const [oldDataOS, setOldDataOS] = useState<
    LastnikOSResult | null | undefined
  >(undefined);
  const [newNaziv, setNewNaziv] = useState<string>("");
  const [nazivi, setNazivi] = useState<NaziviResponse>([]);
  const [novaLokacija, setNovaLokacija] = useState<string | null>(null);

  const [sendData, setSendData] = useState<sendParams | null>();

  const [oldDataModal, setOldDataModal] = useState<boolean>(false);

  const handleGetNazivi = async () => {
    try {
      const dataNazivi = await getNazivi();
      setNazivi(dataNazivi.result);
    } catch (error) {
      console.error("Get nazivi error", error);
    }
  };

  useEffect(() => {
    setNewNaziv("");
    setOldDataOS(undefined);
    setNovaLokacija(null);
  }, [dataOS]);

  useEffect(() => {
    handleGetNazivi();
  }, []);

  const handleGetLastnikOld = async () => {
    try {
      const oldData: LastnikOSResponse = await getOSinfo(oldNumberOS);
      if (oldData.result === null) {
        console.log("Številka ne obstaja");
        setOldDataOS(null);
        showToast({
          type: "error",
          text1: "Ta številka OS ne obstaja",
        });
      } else {
        setOldDataOS(oldData.result);
        setOldDataModal(true);
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const locationCheck = async (location: number) => {
    try {
      const data = await checkLocation(location);
      return data.result.value;
    } catch (error) {
      showToast({
        type: "error",
        text1: "Napaka pri preverjanju lokacije",
      });
    }
  };

  const handleNovaLokacija = async (e: string) => {
    setNovaLokacija(e);
  };

  const handleCopy = () => {
    setNovaLokacija(String(dataOS?.lokacija));
  };

  const potrditev = async () => {
    let testLocation = await locationCheck(Number(novaLokacija));
    if (testLocation === false) {
      showToast({
        type: "error",
        text1: "Lokacija ne obstaja",
      });
      return;
    }
    if (dataOS?.osstanje_ime === null && newNaziv === "") {
      showToast({
        type: "error",
        text1: "Izberi naziv",
      });
      return;
    }
    if (newNaziv === "Naziv starega OS") {
      if (oldDataOS?.osstanje_ime !== undefined) {
        setSendData({
          stev: numberOS,
          lokacija: Number(novaLokacija),
          stev_old: oldNumberOS,
          naziv_inv: oldDataOS?.osstanje_ime,
        });
      }
    } else {
      setSendData({
        stev: numberOS,
        lokacija: Number(novaLokacija),
        stev_old: oldNumberOS,
        naziv_inv: newNaziv,
      });
    }

    if (dataOS?.popisan === "D") {
      showToast({
        type: "error",
        text1: "OS je že popisan",
      });
      return;
    }

    console.log(sendData);
  };

  return (
    <>
      <View
        className={`p-2 my-2 rounded-2xl ${
          popisanoColor ? "bg-green-200" : "bg-red-200"
        }`}
      >
        {!isNaziv && (
          <>
            {/* <Text className="text-center mb-2 text-base font-psemibold">
              Osnovno sredstvo nima naziva
            </Text> */}
            <Text className="text-sm font-psemibold mt-1">
              Stara številka OS
            </Text>
            <View
              className={`w-full h-8 rounded-xl border-[1px] font-pregular flex-col items-center justify-center ${
                popisanoColor
                  ? "border-green-300 bg-green-100 focus:border-green-500"
                  : "border-red-300 bg-red-100 focus:border-red-500"
              }`}
            >
              <TextInput
                className="text-sm w-full flex-col h-full items-center justify-center font-pregular ml-4"
                keyboardType="numeric"
                placeholder={
                  dataOS?.stev_old
                    ? String(dataOS?.stev_old)
                    : "Vnesi številko starega OS"
                }
                onChangeText={(e) => setOldNumberOS(Number(e))}
                onSubmitEditing={() => handleGetLastnikOld()}
              />
            </View>
            {oldDataOS?.osstanje_ime !== undefined && (
              <>
                <Text className="text-sm font-psemibold mt-2">Stari naziv</Text>
                <Text className="text-sm font-pmedium">
                  {oldDataOS?.osstanje_ime}
                </Text>
              </>
            )}
            <Text className="text-sm font-psemibold mt-1">Nov naziv</Text>
            <View
              className={`w-full h-8 rounded-xl border-[1px] font-pregular flex-col items-center justify-center ${
                popisanoColor
                  ? "border-green-300 bg-green-100 focus:border-green-500"
                  : "border-red-300 bg-red-100 focus:border-red-500"
              }`}
            >
              <Picker
                selectedValue={newNaziv}
                onValueChange={(itemValue, itemIndex) => setNewNaziv(itemValue)}
                placeholder="Izberi naziv"
                style={{
                  width: "100%",
                  height: "100%",
                  marginLeft: -15,
                }}
              >
                <Picker.Item
                  label=""
                  value=""
                  fontFamily="Popins-Regular"
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                />
                {oldDataOS && (
                  <Picker.Item
                    label="Naziv starega OS"
                    value="Naziv starega OS"
                    fontFamily="Popins-Regular"
                    enabled={
                      oldDataOS?.osstanje_ime !== undefined ? true : false
                    }
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  />
                )}
                {nazivi.slice(2).map((naziv, index) => (
                  <Picker.Item
                    label={naziv.naziv}
                    value={naziv.naziv}
                    key={index}
                    fontFamily="Popins-Regular"
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  />
                ))}
              </Picker>
            </View>

            <OldOSModal
              visible={oldDataModal}
              oldDataOS={oldDataOS}
              onClose={() => {
                setOldDataModal(false);
              }}
            />
          </>
        )}
        {dataOS?.osstanje_ime !== null && (
          <Text className="text-lg font-pmedium">{dataOS?.osstanje_ime}</Text>
        )}
        <Text className="text-sm font-psemibold mt-1">Lastnik</Text>
        <View className="w-full flex flex-row justify-between">
          <Text className="font-pregular text-base">{dataOS?.ime}</Text>
          <Text>{dataOS?.sifra}</Text>
        </View>
        <Text className="text-sm mt-1 font-psemibold">Lokacija</Text>
        <View className="w-full flex flex-row justify-between">
          <Text className="font-pregular text-base">
            {dataOS?.lokacija === null ? "/" : dataOS?.lokacija}
          </Text>
          <Text>{dataOS?.obrat_ime}</Text>
        </View>
        <View className="mt-1 w-full relative">
          <Text className="mb-1 font-psemibold text-sm">Nova lokacija</Text>
          <View
            className={`w-full h-8 border-[1px] rounded-xl flex-row items-center justify-between pl-2 relative ${
              popisanoColor
                ? "border-green-300 bg-green-100 focus:border-green-500"
                : "border-red-300 bg-red-100 focus:border-red-500"
            }`}
          >
            <TextInput
              className="font-pregular flex h-full w-full items-center"
              keyboardType="numeric"
              showSoftInputOnFocus={false}
              autoFocus={true}
              value={
                dataOS?.popisan === "D"
                  ? String(dataOS?.lokacija_inv)
                  : novaLokacija !== null
                  ? novaLokacija
                  : ""
              }
              onChangeText={handleNovaLokacija}
            />
            <TouchableOpacity
              className={`h-8 flex-row items-center justify-center ${
                popisanoColor ? "bg-green-300" : "bg-red-300"
              } rounded-[10px] px-2 absolute right-0 z-10`}
              onPress={handleCopy}
              disabled={dataOS?.lokacija === null ? true : false}
            >
              <Image
                source={chevronLeft}
                resizeMode="contain"
                className="h-3 w-3 pr-6"
              />
              <Text className="text-xs font-pregular">Kopiraj staro</Text>
            </TouchableOpacity>
          </View>
        </View>
        {dataOS?.popisan === "D" ? (
          <Text className="text-sm font-pbold text-green-700 text-center mt-2 tracking-wider">
            POPISANO
          </Text>
        ) : (
          <Text className="text-sm font-pbold text-red-700 text-center mt-2 tracking-wider">
            NEPOPISANO
          </Text>
        )}
      </View>
      <CustomButton
        title="VNESI"
        handlePress={potrditev}
        containerStyles="bg-[#002d5f]"
        disable={novaLokacija === "0" || novaLokacija === null ? true : false}
      />
      <Toast />
    </>
  );
};

export default DetailCard;
1;
