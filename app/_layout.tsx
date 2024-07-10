import { DeviceEventEmitter, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import DataWedgeIntents from "react-native-datawedge-intents";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  // useEffect(() => {
  //   // Listen for barcode scans
  //   DeviceEventEmitter.addListener("datawedge_broadcast_intent", (intent) => {
  //     // Extract the scanned data. The intent action and data key might vary based on your DataWedge configuration.
  //     const scannedData = intent?.["com.symbol.datawedge.data_string"];
  //     console.log("Scanned data: ", scannedData);
  //   });

  //   // Specify the action of the intent you configured in DataWedge
  //   DataWedgeIntents.registerBroadcastReceiver({
  //     filterActions: [
  //       "com.zebra.inventura.ACTION",
  //       "com.symbol.datawedge.api.RESULT_ACTION",
  //     ],
  //     filterCategories: ["android.intent.category.DEFAULT"],
  //   });

  //   return () => {
  //     // Clean up
  //     DeviceEventEmitter.removeAllListeners("datawedge_broadcast_intent");
  //   };
  // }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
