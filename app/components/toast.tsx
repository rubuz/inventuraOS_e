import { Text, View } from "react-native";
import Toast, { ErrorToast } from "react-native-toast-message";
import { ToastProps } from "react-native-toast-message";

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

export const toastConfig = {
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 13,
      }}
      text2Style={{
        fontSize: 12,
        flexWrap: "wrap",
        maxWidth: "100%",
        height: "auto",
      }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "97%",
        marginBottom: 20,
        borderRadius: 10,
        height: "auto",
        minHeight: 50,
        borderLeftColor: "#EF4444",
      }}
    />
  ),
  success: (props: ToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 13,
      }}
      text2Style={{
        fontSize: 12,
        flexWrap: "wrap",
        maxWidth: "90%",
      }}
      style={{
        width: "97%",
        marginBottom: 20,
        borderRadius: 10,
        height: "auto",
        minHeight: 50,
        borderLeftColor: "#22c55e",
      }}
    />
  ),
};
