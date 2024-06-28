import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "./components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "./components/FormField";
import { useState } from "react";

const logo = require("../assets/images/adria.jpg");

type Form = {
  user: string;
  password: string;
};

export default function App() {
  const [form, setFrom] = useState<Form>({
    user: "",
    password: "",
  });

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
            handleChangeText={(e: string) => setFrom({ ...form, user: e })}
            otherStyles="mt-7"
            placeholder="Uporabniško ime"
          />
          <FormField
            title="Geslo"
            placeholder="Geslo"
            value={form.password}
            handleChangeText={(e: string) => setFrom({ ...form, password: e })}
            otherStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
