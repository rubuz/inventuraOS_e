import { StatusBar } from "expo-status-bar";
import {
  DeviceEventEmitter,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "./components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { login } from "../api/apiService";
import { router } from "expo-router";
import { Form, LoginResponse, ShowToastParams } from "../types/types";
import { showToast } from "./components/toast";
import Toast from "react-native-toast-message";

const logo = require("../assets/images/adria.jpg");

export default function App() {
  const [form, setForm] = useState<Form>({
    user: "",
    password: "",
  });
  const [isSubmiting, setIsSubmitting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    setIsSubmitting(true);
    setLoginError("");
    try {
      const data: LoginResponse = await login({
        user: form.user.toUpperCase(),
        password: form.password,
      });
      if (data.result === null) {
        // console.error(data.error.text);
        // console.log("FAIL");
        showToast({
          type: "error",
          text1: "Nepravilno uporabniško ime ali geslo!",
        });
      } else {
        const resultArray = data.result;
        const hasCfaminventura = resultArray.some(
          (item) => item.app_displayname === "cfaminventura"
        );
        if (!hasCfaminventura) {
          setLoginError("User does not have access to cfaminventura");
          showToast({
            type: "error",
            text1: "Uporabnik nima dostopa do cfaminventura!",
          });
          return;
        } else {
          console.log("Login successful", data.result[0].displayname);
          router.push("/home");
        }
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      showToast({
        type: "error",
        text1: "Napaka pri prijavi!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // Place your action here. For example:
  //     router.push("/home");
  //     // Or any other logic you want to execute after 2 seconds
  //   }, 500);

  //   return () => clearTimeout(timer); // Cleanup the timer on component unmount
  // }, []);

  // const login = async (user, password) => {
  //   setIsSubmitting(true);
  //   setLoginError("");
  //   try {
  //     const response = await axios.post(
  //       API_URL_LOGIN,
  //       {
  //         parameters: {
  //           username: user,
  //           password: password,
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: API_LOGIN_HEADER,
  //         },
  //       }
  //     );
  //     if (response.data.result === null) {
  //       setLoginError(response.data.error.text);
  //       console.log("FAKIN FAIL");
  //     } else {
  //       console.log("Login successful", response.data.result);

  //     }
  //   } catch (error) {
  //     console.error("Login error", error);
  //     setLoginError("Napaka pri prijavi");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const login = async (user, password) => {
  //   setIsSubmitting(true);
  //   setLoginError("");
  //   try {
  //     const response = await fetch(API_URL_LOGIN, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: API_LOGIN_HEADER,
  //       },
  //       body: JSON.stringify({
  //         parameters: {
  //           username: user,
  //           password: password,
  //         },
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log("Data", data);
  //     if (data.error.error === false) {
  //       setLoginError(data.error.text);
  //       console.log("Login error", data.error.text);
  //     } else {
  //       console.log("Login successful", data.result);
  //     }
  //   } catch (error) {
  //     console.error("Login error", error);
  //     setLoginError("Napaka pri prijavi");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const submit = () => {
  //   login(form.user, form.password);
  // };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[95vh] justify-startr items-center px-2 my-6">
          <Image
            source={logo}
            resizeMode="contain"
            className="w-2/3 mx-auto h-9"
          />
          <Text className="text-2xl font-psemibold mt-5 text-center">
            Invetura OS
          </Text>

          {/* USER INPUT */}
          <View className={`space-y-1 mt-2 relative`}>
            <Text className="text-base text-black font-pmedium text-center absolute z-20 bg-white -top-1.5 px-2 left-[17px]">
              Uporabnik
            </Text>
            <View className="w-full h-[50px] px-4 pl-6 bg-white border-2 border-slate-600 rounded-2xl focus:border-blue-70 flex-row items-center">
              <TextInput
                className="flex-1 font-psemibold text-base"
                value={form.user}
                showSoftInputOnFocus={false}
                clearTextOnFocus={true}
                autoFocus={true}
                placeholderTextColor={"#A1A1AA"}
                onChangeText={(e: string) => setForm({ ...form, user: e })}
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                returnKeyType="next"
              />
            </View>
          </View>

          {/* PASSWORD INPUT */}
          <View className={`space-y-1 mt-2 relative`}>
            <Text className="text-base text-black font-pmedium text-center absolute z-20 bg-white -top-1.5 px-2 left-[17px]">
              Geslo
            </Text>
            <View className="w-full h-[50px] px-4 pl-6 bg-white border-2 border-slate-600 rounded-2xl focus:border-blue-70 flex-row items-center">
              <TextInput
                ref={passwordInputRef}
                className="flex-1 font-psemibold text-base"
                value={form.password}
                showSoftInputOnFocus={false}
                clearTextOnFocus={true}
                placeholderTextColor={"#A1A1AA"}
                onChangeText={(e: string) => setForm({ ...form, password: e })}
                secureTextEntry={true}
                returnKeyType="go"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                onPressIn={() => setShowPassword(true)}
                onPressOut={() => setShowPassword(false)}
              >
                <Text className="text-xs text-slate-600 font-pregular">
                  Pokaži
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <CustomButton
            title="Vpiši se"
            handlePress={handleLogin}
            containerStyles="w-full mt-2 bg-[#002d5f]"
            isLoading={isSubmiting}
          />
        </View>
        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
}
