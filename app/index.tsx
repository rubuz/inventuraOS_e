import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "./components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "./components/FormField";
import { useState } from "react";
import { API_URL_LOGIN, API_LOGIN_HEADER } from "@env";
import axios from "axios";
import { login } from "../api/authService";

const logo = require("../assets/images/adria.jpg");

type Form = {
  user: string;
  password: string;
};

export default function App() {
  const [form, setForm] = useState<Form>({
    user: "",
    password: "",
  });
  const [isSubmiting, setIsSubmitting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  const handleLogin = async () => {
    setIsSubmitting(true);
    setLoginError("");
    try {
      const data = await login({ user: form.user, password: form.password });
      if (data.result === null) {
        setLoginError(data.error.text);
        console.log("FAKIN FAIL");
      } else {
        console.log("Login successful", data.result);
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      console.error("Login error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <View className="w-full min-h-[85vh] justify-center items-center px-4 my-6">
          <Image
            source={logo}
            resizeMode="contain"
            className="w-2/3 mx-auto h-9"
          />
          <Text className="text-2xl font-psemibold mt-5 text-center">
            Invetura OS
          </Text>
          <FormField
            title="Uporabnik"
            value={form.user}
            handleChangeText={(e: string) => setForm({ ...form, user: e })}
            placeholder="Uporabniško ime"
            otherStyles="mt-4"
          />
          <FormField
            title="Geslo"
            placeholder="Geslo"
            value={form.password}
            otherStyles="mt-4"
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
          />
          <CustomButton
            title="Vpiši se"
            handlePress={handleLogin}
            containerStyles="w-full mt-4"
            isLoading={isSubmiting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
