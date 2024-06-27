import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "./components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require("../assets/images/adria.jpg");

export default function App() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={logo} />
          <Text className="text-3xl text-red-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            quaerat odio reiciendis voluptatem similique non eius voluptatum
            minus harum accusantium!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
