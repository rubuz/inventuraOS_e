import { Modal, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ModalProps } from "../../types/types";

export default function PopisanModal({ visible, onChoice }: ModalProps) {
  return (
    <Modal
      className="relative flex-row items-center justify-center"
      transparent={true}
      visible={visible}
    >
      <View className="bg-slate-100 rounded-2xl border-[1px] p-2 w-4/5 mx-auto my-auto flex-col">
        <Text className="font-psemibold text-center">
          Osnovno sredstvo je že popisano
        </Text>
        <Text className="font-pregular text-center mb-2">
          Ali želite OS popisati še enkrat z novimi podatki?
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
}
