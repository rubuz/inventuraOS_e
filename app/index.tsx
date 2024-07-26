import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";

import { useEffect, useRef, useState } from "react";
import { login } from "../api/apiService";
import { Form, LoginResponse, ShowToastParams } from "../types/types";
import { showToast, toastConfig } from "./components/toast";

const logo = require("../assets/images/adria.jpg");

export default function App() {
  const { user, userDB } = useLocalSearchParams();
  const [form, setForm] = useState<Form>({
    user: "",
    password: "",
  });
  const [isSubmiting, setIsSubmitting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passwordInputRef = useRef<TextInput>(null);
  const usernameInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (userDB) {
      setForm({ ...form, user: String(userDB) });
      passwordInputRef.current && passwordInputRef.current.focus();
    } else {
      usernameInputRef.current && usernameInputRef.current.focus();
    }
  }, []);

  const handleLogin = async () => {
    setIsSubmitting(true);
    setLoginError("");
    try {
      const data: LoginResponse = await login({
        user: form.user.toUpperCase(),
        password: form.password,
      });
      if (data.result === null) {
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
          console.log("Login successful", form.user.toUpperCase());
          router.push({
            pathname: "/home",
            params: {
              user: data.result[0].displayname,
              userDB: form.user.toUpperCase(),
            },
          });
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
  //   setForm({ ...form, user: String(userDB) });
  //   passwordInputRef.current && passwordInputRef.current.focus();
  // }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push({
  //       pathname: "/home",
  //     });
  //   }, 500); // 500 milliseconds = 0.5 seconds

  //   return () => clearTimeout(timer); // Cleanup the timer
  // }, []);

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
            Inventura OS
          </Text>

          {/* USER INPUT */}
          <View className={`space-y-1 mt-2 relative`}>
            <Text className="text-base text-black font-pmedium text-center absolute z-20 bg-white -top-1.5 px-2 left-[17px]">
              Uporabnik
            </Text>
            <View className="w-full h-[50px] px-4 pl-6 bg-white border-2 border-slate-600 rounded-2xl focus:border-blue-70 flex-row items-center">
              <TextInput
                ref={usernameInputRef}
                className="flex-1 font-psemibold text-base"
                value={form.user}
                showSoftInputOnFocus={false}
                clearTextOnFocus={true}
                // autoFocus={form.user === "" ? true : false}
                placeholderTextColor={"#A1A1AA"}
                onChangeText={(e: string) => {
                  setForm({ ...form, user: e });
                }}
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                returnKeyType="next"
                onFocus={() => {
                  setForm({ ...form, user: "" });
                }}
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
                secureTextEntry={!showPassword}
                returnKeyType="go"
                onSubmitEditing={handleLogin}
                onFocus={() => {
                  setForm({ ...form, password: "" });
                }}
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
        <Toast config={toastConfig} />
      </ScrollView>
    </SafeAreaView>
  );
}
