import Toast from "react-native-toast-message";

export const showToast = ({
  type,
  text1,
  text2,
}: import("../../types/types").ShowToastParams) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    visibilityTime: 4000,
    autoHide: true,
    position: "bottom",
    swipeable: true,
  });
};
