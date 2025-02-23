import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import {
  checkLocation,
  getNazivi,
  getOSinfo,
  potrdilo,
} from "../api/apiService";
import {
  LastnikOSResponse,
  LastnikOSResult,
  PotrdiloResponse,
  sendParams,
} from "../types/types";
import CustomButton from "./components/CustomButton";
import OldOSModal from "./components/OldOSModal";
import PopisanModal from "./components/PopisanModal";
import LogoffModal from "./components/LogoffModal";
import { showToast, toastConfig } from "./components/toast";
import Skeleton from "./components/Skeleton";

const chevronLeft = require("../assets/images/chevron-left.png");

type NazivItem = {
  naziv: string;
};

type NaziviResponse = NazivItem[];

export default function home() {
  const { user, userDB } = useLocalSearchParams();

  const [numberOS, setNumberOS] = useState<number>(0);
  const [dataOS, setDataOS] = useState<LastnikOSResult | null | undefined>(
    undefined
  );
  const [oldNumberOS, setOldNumberOS] = useState<number>(0);
  const [oldDataOS, setOldDataOS] = useState<
    LastnikOSResult | null | undefined
  >(undefined);
  const [displayNubmer, setDisplayNumber] = useState<string>("");
  const [newNaziv, setNewNaziv] = useState<string>("");
  const [nazivi, setNazivi] = useState<NaziviResponse>([]);
  const [novaLokacija, setNovaLokacija] = useState<string | null>("");
  const [inuputLocationValue, setInputLocationValue] = useState<string>("");
  const [disableBtn, setDisableBtn] = useState<boolean>(true);

  const [sendData, setSendData] = useState<sendParams>({
    stev: 0,
    lokacija: 0,
    stev_old: 0,
    naziv_inv: "",
  });
  const [oldDataModal, setOldDataModal] = useState<boolean>(false);
  const [popisanModal, setPopisanModal] = useState<boolean>(false);
  const [logoffModal, setLogoffModal] = useState<boolean>(false);
  const [sendAgain, setSendAgain] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const lokacijaInputRef = useRef<TextInput>(null);
  const numberOSInputRef = useRef<TextInput>(null);
  const oldNumberOSInptuRef = useRef<TextInput>(null);

  // BACKHANDLER
  useEffect(() => {
    const backAction = () => {
      setLogoffModal(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (dataOS?.popisan === "D") {
      setSendData({
        stev: numberOS,
        lokacija: dataOS?.lokacija_inv ? dataOS?.lokacija_inv : 0,
        stev_old: dataOS?.stev_old ? dataOS?.stev_old : 0,
        naziv_inv: dataOS?.naziv_inv ? dataOS?.naziv_inv : "",
      });
      setOldNumberOS(dataOS?.stev_old ? dataOS?.stev_old : 0);
      // setOldDataOS(undefined);
    } else {
      setNewNaziv("");
      // setOldDataOS(undefined);
      setNovaLokacija(null);
      setSendData({
        stev: numberOS,
        lokacija: dataOS?.lokacija_inv ? dataOS?.lokacija_inv : 0,
        stev_old: dataOS?.stev_old ? dataOS?.stev_old : 0,
        naziv_inv: dataOS?.naziv_inv ? dataOS?.naziv_inv : "",
      });
      setOldNumberOS(dataOS?.stev_old ? dataOS?.stev_old : 0);
    }
  }, [dataOS]);

  useEffect(() => {
    handleGetNazivi();
  }, []);

  // useEffect(() => {
  //   console.log(sendData);
  //   console.log(oldDataOS);
  // }, [sendData]);

  const handlePopisan = (choice: boolean) => {
    if (choice === true) {
      // setSendData({
      //   stev: numberOS,
      //   lokacija: Number(novaLokacija),
      //   stev_old: oldNumberOS,
      //   naziv_inv: newNaziv,
      // });
      sendingData();
      setPopisanModal(false);
    }

    if (choice === false) {
      setPopisanModal(false);
    }
  };

  const handleLogoff = (choice: boolean) => {
    if (choice === true) {
      setLogoffModal(false);
      router.push({
        pathname: "/",
        params: { user: user, userDB: userDB },
      });
    }

    if (choice === false) {
      setLogoffModal(false);
    }
  };

  // useEffect(() => {
  //   setSendData((prev) => ({ ...prev, lokacija: Number(novaLokacija) }));
  // }, [dataOS?.lokacija_inv]);

  const handleGetNazivi = async () => {
    try {
      const dataNazivi = await getNazivi();
      setNazivi(dataNazivi.result);
    } catch (error) {
      console.error("Get nazivi error", error);
      showToast({
        type: "error",
        text1: "NAPAKA",
        text2: "API Naziv: " + error,
      });
    }
  };

  const handleGetLastnikOld = async () => {
    try {
      const oldData: LastnikOSResponse = await getOSinfo(oldNumberOS);
      if (oldData.result === null) {
        console.log("Številka ne obstaja");
        setOldDataOS(null);
        showToast({
          type: "error",
          text1: "NAPAKA",
          text2: "Ta številka OS ne obstaja",
        });
        oldNumberOSInptuRef.current && oldNumberOSInptuRef.current.focus();
      } else {
        if (oldData.result.popisan === "D") {
          showToast({
            type: "error",
            text1: "NAPAKA",
            text2: "Osnovno sredstvo je že popisano",
          });
          setOldDataOS(null);
          setOldNumberOS(0);
          setOldDataModal(false);
          oldNumberOSInptuRef.current && oldNumberOSInptuRef.current.focus();
        } else {
          setOldDataOS(oldData.result);
          setOldDataModal(true);
        }
      }
    } catch (error) {
      console.error("GetLastnikOld error", error);
      showToast({
        type: "error",
        text1: "NAPAKA",
        text2: "API GetLastnikOld: " + error,
      });
    }
  };

  const handleOldOS = () => {
    setSendData({ ...sendData, stev_old: oldNumberOS });
    handleGetLastnikOld();
  };

  const handleNewNaziv = (naziv: string) => {
    if (naziv === "Naziv starega OS") {
      setSendData({ ...sendData, naziv_inv: String(oldDataOS?.osstanje_ime) });
      lokacijaInputRef.current && lokacijaInputRef.current.focus();
    } else {
      setSendData({ ...sendData, naziv_inv: naziv });
      lokacijaInputRef.current && lokacijaInputRef.current.focus();
    }
  };

  const locationCheck = async (location: number) => {
    try {
      const data = await checkLocation(location);
      return data.result.value;
    } catch (error) {
      console.error("Location check error", error);
      showToast({
        type: "error",
        text1: "NAPAKA",
        text2: "API Lokacija: " + error,
      });
    }
  };

  // useEffect(() => {
  //   if (dataOS !== null) {
  //     console.log(dataOS);
  //     console.log(nazivi);
  //   }
  // }, [dataOS]);

  const handleGetLastnik = async () => {
    setIsLoading(true);
    try {
      const data: LastnikOSResponse = await getOSinfo(numberOS);
      if (data.result === null) {
        console.log("Številka ne obstaja");
        setDisplayNumber("");
        setDataOS(null);
      } else {
        setDataOS(data.result);
        focusInputBasedOnData(data.result.popisan);
        setOldDataOS(null);
        setDisableBtn(false);
        if (data.result.stev_old !== null) {
          await fetchAndSetOldData(data.result.stev_old);
          // console.log("TESTETSDTTETS");
          // try {
          //   const oldData: LastnikOSResponse = await getOSinfo(
          //     data.result.stev_old
          //   );
          //   setOldNumberOS(data.result.stev_old);
          //   setOldDataOS(oldData.result);
          //   console.log(oldDataOS);
          // } catch (error) {
          //   console.error("Login error", error);
          // }
        }
      }
    } catch (error) {
      console.error("GetLastnik error", error);
      showToast({
        type: "error",
        text1: "NAPAKA",
        text2: "API GetLastnik: " + error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const focusInputBasedOnData = (data: string) => {
    if (data === "D") {
      numberOSInputRef.current && numberOSInputRef.current.focus();
    } else if (data === "N") {
      lokacijaInputRef.current && lokacijaInputRef.current.focus();
      lokacijaInputRef.current && lokacijaInputRef.current.clear();
    }
  };

  const fetchAndSetOldData = async (oldNumber: number) => {
    try {
      const oldData: LastnikOSResponse = await getOSinfo(oldNumber);
      setOldNumberOS(oldNumber);
      setOldDataOS(oldData.result);
    } catch (error) {
      console.error("GetLastnikOld2 error", error);
      showToast({
        type: "error",
        text1: "NAPAKA",
        text2: "API GetLastnikOld2: " + error,
      });
    }
  };

  const sendingData = async () => {
    try {
      const data: PotrdiloResponse = await potrdilo(sendData);
      if (data.error.error === true) {
        let errorMessage = data.error.text;
        const matches = errorMessage.match(/\r\n(.*?)\r\n/);
        if (matches && matches[1]) {
          errorMessage = matches[1];
          console.log(errorMessage);
        }
        showToast({
          type: "error",
          text1: "NAPAKA",
          text2: errorMessage,
        });
      } else {
        showToast({
          type: "success",
          text1: "Podatki uspešno poslani",
        });

        const successData = await getOSinfo(sendData.stev);
        const successDataOld = await getOSinfo(sendData.stev_old);
        try {
          if (successData.result === null) {
            console.log("Številka ne obstaja");
            setDataOS(null);
          } else {
            setDisableBtn(true);
            setDataOS(successData.result);
            setOldDataOS(successDataOld.result);
            setSendData((prev) => ({
              ...prev,
              naziv_inv: successData.result.osstanje_ime,
              lokacija: successData.result.lokacija_inv,
            }));
            // console.log(sendData.naziv_inv);
            // console.log(oldDataOS?.osstanje_ime);
          }
          numberOSInputRef.current && numberOSInputRef.current.focus();
        } catch (error) {
          console.error("Send-GetLastnik error", error);
          showToast({
            type: "error",
            text1: "NAPAKA",
            text2: "API Send-GetLastnik: " + error,
          });
        }
      }
    } catch (error) {
      console.error("Sending error", error);
      showToast({
        type: "error",
        text1: "NAPAKA",
        text2: "API Send: " + error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const potrditev = async () => {
    if (sendData.lokacija === 0) {
      showToast({
        type: "error",
        text1: "NAPAKA",
        text2: "Vnesi lokacijo",
      });
      lokacijaInputRef.current && lokacijaInputRef.current.focus();
      lokacijaInputRef.current && lokacijaInputRef.current.clear();
      return;
    }
    let testLocation = await locationCheck(Number(sendData.lokacija));
    if (testLocation === false) {
      showToast({
        type: "error",
        text1: "NAPAKA",
        text2: "Lokacija " + sendData.lokacija + " ne obstaja",
      });
      lokacijaInputRef.current && lokacijaInputRef.current.focus();
      lokacijaInputRef.current && lokacijaInputRef.current.clear();
      return;
    }
    if (dataOS?.popisan === "D") {
      setPopisanModal(true);
      return;
    }
    if (dataOS?.osstanje_ime === null && sendData.naziv_inv === "") {
      showToast({
        type: "error",
        text1: "NAPAKA",
        text2: "Vnesi naziv OS",
      });
      return;
    }
    if (newNaziv === "Naziv starega OS") {
      if (oldDataOS?.osstanje_ime !== undefined) {
        // setSendData({
        //   stev: numberOS,
        //   lokacija: Number(novaLokacija),
        //   stev_old: oldNumberOS,
        //   naziv_inv: oldDataOS?.osstanje_ime,
        // });
        sendingData();
      }
    } else {
      sendingData();
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="w-full min-h-[95vh] justify-start px-2 font-pregular">
          {/* <Text className="text-xl font-psemibold mt-2 text-center">
            Inventura OS
          </Text> */}
          <View className="relative">
            <Text className="text-xs text-black font-pregular text-center bg-white absolute z-20 top-2 left-3 px-1 ">
              Številka OS
            </Text>
            <View className="w-full h-10 px-4 pl-6 mt-4 bg-white border-2 border-slate-400 rounded-2xl focus:border-[#002d5f] flex-row items-center">
              <TextInput
                className="text-xl text-center w-full flex-col h-full items-center justify-center font-pbold tracking-widest"
                keyboardType="numeric"
                ref={numberOSInputRef}
                autoFocus={true}
                clearTextOnFocus={true}
                showSoftInputOnFocus={false}
                value={numberOS === 0 ? "" : String(numberOS)}
                onChangeText={(e) => {
                  if (/^\d*$/.test(e) || e === "") {
                    setNumberOS(e === "" ? 0 : Number(e));
                  }
                }}
                onSubmitEditing={() => {
                  setDisplayNumber(String(numberOS));
                  handleGetLastnik();
                }}
                onFocus={() => setNumberOS(0)}
              />
            </View>
          </View>

          {dataOS === null && (
            <Text className="text-center text-red-700 my-4 text-lg font-psemibold">
              Številka ne obstaja
            </Text>
          )}

          {/* NOV NAČIN */}
          {/* {isLoading ? (
            <View className="bg-slate-200 rounded-2xl p-2 my-1">
              <Skeleton />
            </View>
          ) : ( */}
          <View
            className={`p-2 my-1 rounded-2xl ${
              dataOS?.popisan === "D" ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {dataOS?.osstanje_ime !== null && (
              <>
                <Text className="text-lg font-pmedium text-centern">
                  {dataOS?.osstanje_ime}
                </Text>
              </>
            )}
            {(dataOS?.osstanje_ime === null ||
              dataOS?.spec1 === "ODPRTO ZA POTREBE INVENTURE") && (
              <>
                {/* <Text className="text-center mb-2 text-base font-psemibold">
              Osnovno sredstvo nima naziva
            </Text> */}
                <Text className="text-xs font-psemibold mt-0">
                  Stara številka OS
                </Text>
                <View
                  className={`w-full h-8 rounded-xl border-[1px] font-pregular flex-col items-center justify-center ${
                    dataOS?.popisan === "D"
                      ? "border-green-300 bg-green-100 focus:border-green-500"
                      : "border-red-300 bg-red-100 focus:border-red-500"
                  }`}
                >
                  <TextInput
                    className="text-sm w-full flex-col h-full items-center justify-center font-pregular ml-4"
                    keyboardType="numeric"
                    // placeholder={
                    //   dataOS?.stev_old
                    //     ? String(dataOS?.stev_old)
                    //     : "Vnesi številko starega OS"
                    // }
                    showSoftInputOnFocus={false}
                    value={oldNumberOS === 0 ? "" : String(oldNumberOS)}
                    ref={oldNumberOSInptuRef}
                    onChangeText={(e) => {
                      if (/^\d*$/.test(e) || e === "") {
                        setOldNumberOS(e === "" ? 0 : Number(e));
                      }
                    }}
                    onSubmitEditing={handleOldOS}
                    editable={!disableBtn}
                  />
                </View>
                {oldDataOS?.osstanje_ime === null ? (
                  <></>
                ) : (
                  <>
                    <Text className="text-sm font-pmedium">
                      {oldDataOS?.osstanje_ime}
                    </Text>
                  </>
                )}
                <Text className="text-xs font-psemibold mt-1">Nov naziv</Text>
                <View
                  className={`w-full h-8 rounded-xl border-[1px] font-pregular flex-col items-center justify-center ${
                    dataOS?.popisan === "D"
                      ? "border-green-300 bg-green-100 focus:border-green-500"
                      : "border-red-300 bg-red-100 focus:border-red-500"
                  }`}
                >
                  <Picker
                    selectedValue={
                      String(sendData.naziv_inv) ===
                      String(oldDataOS?.osstanje_ime)
                        ? "Naziv starega OS"
                        : sendData?.naziv_inv
                    }
                    onValueChange={(itemValue, itemIndex) =>
                      handleNewNaziv(itemValue)
                    }
                    placeholder="Izberi naziv"
                    enabled={!disableBtn}
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
                  reject={() => {
                    setOldNumberOS(0);
                    setOldDataOS(undefined);
                    setOldDataModal(false);
                    oldNumberOSInptuRef.current &&
                      oldNumberOSInptuRef.current.focus();
                  }}
                />
              </>
            )}
            <Text className="text-xs font-psemibold mt-1">Lastnik</Text>
            <View className="w-full flex flex-row justify-between">
              <Text className="font-pregular text-base max-w-[75%]">
                {dataOS?.ime}
              </Text>
              <Text>{dataOS?.sifra}</Text>
            </View>
            <Text className="text-xs mt-1 font-psemibold">Lokacija</Text>
            <View className="w-full flex flex-row justify-between">
              <Text className="font-pregular text-base">
                {!dataOS?.lokacija ? "" : dataOS?.lokacija}
              </Text>
              <Text>{dataOS?.obrat_ime}</Text>
            </View>
            <View className="mt-1 w-full relative">
              <Text className="mb-1 font-psemibold text-xs">Nova lokacija</Text>
              <View
                className={`w-full h-8 border-[1px] rounded-xl flex-row items-center justify-between pl-2 relative ${
                  dataOS?.popisan === "D"
                    ? "border-green-300 bg-green-100 focus:border-green-500"
                    : "border-red-300 bg-red-100 focus:border-red-500"
                }`}
              >
                <TextInput
                  ref={lokacijaInputRef}
                  editable={dataOS !== null ? true : false}
                  // editable={!disableBtn}
                  className="font-pregular flex h-full w-full items-center"
                  keyboardType="numeric"
                  showSoftInputOnFocus={false}
                  value={String(sendData.lokacija)}
                  onChangeText={(e) => {
                    if (/^\d*$/.test(e) || e === "") {
                      setSendData({ ...sendData, lokacija: Number(e) });
                    }
                  }}
                  onSubmitEditing={potrditev}
                />
                <TouchableOpacity
                  className={`h-8 flex-row items-center justify-center ${
                    dataOS?.popisan === "D" ? "bg-green-300" : "bg-red-300"
                  } rounded-[10px] px-2 absolute -right-[1px] z-10`}
                  onPress={() =>
                    setSendData({
                      ...sendData,
                      lokacija: Number(dataOS?.lokacija),
                    })
                  }
                  // disabled={dataOS?.lokacija === null ? true : false}
                  disabled={disableBtn}
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
              <View className="flex flex-row justify-center items-center pt-2 gap-2">
                <Text className="font-pregular text-sm">
                  {displayNubmer !== "" ? displayNubmer : ""}
                </Text>
                <Text className="text-sm font-pbold text-green-700 text-center tracking-wider">
                  POPISANO
                </Text>
              </View>
            ) : (
              <View className="flex flex-row justify-center items-center pt-2 gap-2">
                <Text className="font-pregular text-sm">
                  {displayNubmer !== "" ? displayNubmer : ""}
                </Text>
                <Text className="text-sm font-pbold text-red-700 text-center tracking-wider">
                  NEPOPISANO
                </Text>
              </View>
            )}
          </View>
          {/* )} */}

          <CustomButton
            title="VNESI"
            handlePress={potrditev}
            containerStyles="bg-[#002d5f]"
            // disable={dataOS === (null || undefined) ? true : false}
            disable={disableBtn}
            isLoading={isLoading}
          />
          <PopisanModal visible={popisanModal} onChoice={handlePopisan} />
          <LogoffModal
            visible={logoffModal}
            onChoice={handleLogoff}
            user={String(user)}
          />
        </View>
      </ScrollView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}
