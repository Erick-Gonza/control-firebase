import Toast from "react-native-toast-message";

const validLoginToast = () => {
  Toast.show({
    type: "success",
    text1: "Operation successful",
  });
};

const invalidLoginToast = () => {
  Toast.show({
    type: "error",
    text1: "Invalid email or passsword",
  });
};

const genericErrorToast = () => {
  Toast.show({
    type: "error",
    text1: "Something went wrong",
  });
};

export { validLoginToast, invalidLoginToast, genericErrorToast };
