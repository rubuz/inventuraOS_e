import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "./components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "./components/FormField";
import { useEffect, useState } from "react";
import { login } from "../api/apiService";
import { router } from "expo-router";
import { Form, LoginResponse } from "../types/types";

const logo = require("../assets/images/adria.jpg");

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
      const data: LoginResponse = await login({
        user: form.user,
        password: form.password,
      });
      if (data.result === null) {
        console.error(data.error.text);
        console.log("FAKIN FAIL");
      } else {
        const resultArray = data.result;
        const hasCfaminventura = resultArray.some(
          (item) => item.app_displayname === "cfaminventura"
        );
        if (!hasCfaminventura) {
          setLoginError("User does not have access to cfaminventura");
          console.error("User does not have access to cfaminventura");
          return;
        } else {
          console.log("Login successful", data.result);
          console.log("Login successful", data.result[0].displayname);
          router.push("/home");
        }
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      console.error("Login error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // Place your action here. For example:
      router.push("/home");
      // Or any other logic you want to execute after 2 seconds
    }, 500);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

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
