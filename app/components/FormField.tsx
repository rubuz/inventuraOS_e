import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`space-y-1 ${otherStyles} relative`}>
      <Text className="text-base text-black font-pmedium text-center absolute z-20 bg-white -top-1.5 px-2 left-[17px]">
        {title}
      </Text>
      <View className="w-full h-[50px] px-4 pl-6 bg-white border-2 border-slate-600 rounded-2xl focus:border-blue-70 flex-row items-center">
        <TextInput
          className="flex-1 font-psemibold text-base"
          value={value}
          placeholderTextColor={"#A1A1AA"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Geslo" && !showPassword}
        />
        {title === "Geslo" && (
          <TouchableOpacity
            onPressIn={() => setShowPassword(true)}
            onPressOut={() => setShowPassword(false)}
          >
            <Text className="text-xs text-slate-600 font-pregular">Pokaži</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
