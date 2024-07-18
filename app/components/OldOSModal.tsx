import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { LastnikOSResult } from "../../types/types";

interface OldOSModalProps {
  visible: boolean;
  oldDataOS: LastnikOSResult | null | undefined;
  onClose: () => void;
  reject: () => void;
}

const OldOSModal = ({
  visible,
  oldDataOS,
  onClose,
  reject,
}: OldOSModalProps) => {
  return (
    <Modal
      className="relative flex-row items-center justify-center"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="bg-slate-100 rounded-2xl border-[1px] p-2 w-4/5 mx-auto my-auto">
        <Text className="text-lg font-psemibold">
          {oldDataOS?.osstanje_ime}
        </Text>
        <View className="flex-row justify-between">
          <Text>{oldDataOS?.ime}</Text>
          <Text>{oldDataOS?.sifra}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text>{oldDataOS?.lokacija}</Text>
          <Text>{oldDataOS?.obrat_ime}</Text>
        </View>

        {/* <TouchableOpacity
          className="h-12 rounded-xl bg-[#002d5f] flex-row items-center justify-center mt-4"
          onPress={onClose}
        >
          <Text className="text-white text-lg font-psemibold">Vredu</Text>
        </TouchableOpacity> */}
        <View className="flex-row justify-evenly w-full">
          <TouchableOpacity
            className="h-10 w-1/2 rounded-xl bg-green-600 flex-row items-center justify-center mx-2"
            onPress={onClose}
          >
            <Text className="text-white text-lg font-psemibold">Vredu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="h-10 rounded-xl w-1/2 bg-red-400 flex-row items-center justify-center mx-2"
            onPress={reject}
          >
            <Text className="text-white text-lg font-psemibold">Prekliči</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OldOSModal;
