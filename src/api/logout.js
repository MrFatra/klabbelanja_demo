import AsyncStorage from "@react-native-async-storage/async-storage"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY } from "./storage"

export const logout = async () => {
    await AsyncStorage.multiRemove([USER_DATA_KEY, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY])
}