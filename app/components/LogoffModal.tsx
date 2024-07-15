import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { ModalProps } from "../../types/types";

interface LogoffModalProps {
  visible: boolean;
  onChoice: (choice: boolean) => void;
  user: string;
}

const LogoffModal = ({ visible, onChoice, user }: LogoffModalProps) => {
  return (
    <Modal
      className="relative flex-row items-center justify-center"
      transparent={true}
      visible={visible}
    >
      <View className="bg-slate-100 rounded-2xl border-[1px] p-2 w-4/5 mx-auto my-auto flex-col">
        <Text className="font-pregular text-center">
          Vpisani ste kot: <Text className="font-pbold">{user}</Text>
        </Text>
        <Text className="font-psemibold text-center">
          Ali se želite odjaviti?
        </Text>
        <View className="flex-row justify-evenly w-full">
          <TouchableOpacity
            className="h-10 w-1/2 rounded-xl bg-green-600 flex-row items-center justify-center mx-2"
            onPress={() => onChoice(true)}
          >
            <Text className="text-white text-lg font-psemibold">DA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="h-10 rounded-xl w-1/2 bg-red-400 flex-row items-center justify-center mx-2"
            onPress={() => onChoice(false)}
          >
            <Text className="text-white text-lg font-psemibold">NE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LogoffModal;
