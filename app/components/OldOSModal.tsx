import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { LastnikOSResult } from "../../types/types";

interface OldOSModalProps {
  visible: boolean;
  oldDataOS: LastnikOSResult | null | undefined;
  onClose: () => void;
}

const OldOSModal = ({ visible, oldDataOS, onClose }: OldOSModalProps) => {
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
        <View className="flex-row justify-between">
          <Text>{oldDataOS?.lokacija}</Text>
          <Text>{oldDataOS?.obrat_ime}</Text>
        </View>

        <TouchableOpacity
          className="h-12 rounded-xl bg-[#002d5f] flex-row items-center justify-center mt-4"
          onPress={onClose}
        >
          <Text className="text-white text-lg font-psemibold">Vredu</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default OldOSModal;
