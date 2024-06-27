import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 26,
          fontFamily: "Poppins-Bold",
        }}
      >
        Open up App.tsx to start working on your app!
      </Text>
      <Text>fDSADFDSF sdasd GHJG</Text>
      <Text>LIVE</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
