
import { Alert } from "react-native";

const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'Tutup', onPress: () => {} }],
      { cancelable: false }
    );
  };

  export default showAlert