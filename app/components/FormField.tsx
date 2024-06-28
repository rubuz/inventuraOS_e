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
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-pmedium text-center">
        {title}
      </Text>
      <View className="w-full h-16 px-4 bg-slate-50 border-2 border-slate-600 rounded-2xl focus:border-blue-70 flex-row items-center">
        <TextInput
          className="flex-1 font-psemibold text-sm"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#A1A1AA"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Geslo" && !showPassword}
        />
        {title === "Geslo" && (
          <TouchableOpacity
            onPressIn={() => setShowPassword(true)}
            onPressOut={() => setShowPassword(false)}
          >
            <Text className="text-xs text-slate-600">Pokaži</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
