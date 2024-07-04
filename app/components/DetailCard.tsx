import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { LastnikOSResult } from "../../types/types";

const chevronLeft = require("../../assets/images/chevron-left.png");

interface DetailCardProps {
  dataOS: LastnikOSResult | null;
  novaLokacija: string;
  popisanoColor: boolean;
  handleNovaLokacija: (e: string) => void;
  handleCopy: () => void;
}

const DetailCard = ({
  dataOS,
  novaLokacija,
  popisanoColor,
  handleNovaLokacija,
  handleCopy,
}: DetailCardProps) => {
  return (
    <View
      className={`p-4 my-4 rounded-2xl ${
        popisanoColor ? "bg-green-200" : "bg-red-200"
      }`}
    >
      <Text className="text-lg font-pmedium mb-4">{dataOS?.osstanje_ime}</Text>
      <Text className="text-sm font-psemibold">Lastnik</Text>
      <View className="w-full flex flex-row justify-between">
        <Text className="font-pregular text-lg">{dataOS?.ime}</Text>
        <Text>{dataOS?.sifra}</Text>
      </View>
      <Text className="text-sm mt-2 font-psemibold">Lokacija</Text>
      <View className="w-full flex flex-row justify-between">
        <Text className="font-pregular text-lg">{dataOS?.lokacija}</Text>
        <Text>{dataOS?.obrat_ime}</Text>
      </View>
      <View className="mt-2 w-full relative">
        <Text className="text-center mb-1 font-psemibold text-sm">
          Nova lokacija
        </Text>
        <View
          className={`w-full h-10 border-[1px] rounded-2xl flex-row items-center justify-between pl-4 relative ${
            popisanoColor
              ? "border-green-300 bg-green-100"
              : "border-red-300 bg-red-100"
          }`}
        >
          <TextInput
            className="font-pregular flex h-full w-full items-center"
            keyboardType="numeric"
            value={novaLokacija}
            onChangeText={handleNovaLokacija}
          />
          <TouchableOpacity
            className={`h-full flex-row items-center justify-center ${
              popisanoColor ? "bg-green-300" : "bg-red-300"
            } rounded-[14px] px-4 absolute right-0 z-10`}
            onPress={handleCopy}
          >
            <Image
              source={chevronLeft}
              resizeMode="contain"
              className="h-3 w-3 pr-6"
            />
            <Text className="text-sm font-pregular">Kopiraj staro</Text>
          </TouchableOpacity>
        </View>
      </View>
      {dataOS?.popisan === "D" ? (
        <Text className="text-base font-pbold text-green-700 text-center mt-4 tracking-wider">
          POPISANO
        </Text>
      ) : (
        <Text className="text-base font-pbold text-red-700 text-center mt-4 tracking-wider">
          NEPOPISANO
        </Text>
      )}
    </View>
  );
};

export default DetailCard;
