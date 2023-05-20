import AsyncStorage from '@react-native-async-storage/async-storage'

export const ACCESS_TOKEN_KEY = '@klabBelanja_accessToken'
export const REFRESH_TOKEN_KEY = '@klabBelanja_refreshToken'
export const USER_DATA_KEY = '@klabBelanja_user_data'

export const getUserData = async () => {
    try {
        return await AsyncStorage.getItem(USER_DATA_KEY)
    } catch (error) {
        console.error('Tidak ada data user yang valid');
        console.error(error);
    }
}

export const saveUserData = async (userData) => { // ! Data User JSON 
    try {
        return await AsyncStorage.setItem(USER_DATA_KEY, userData)
    } catch (error) {
        console.error('Tidak ada data user yang valid');
        console.error(error);
    }
}

export const getAccessToken = async () => {
    try {
        return await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
    } catch (error) {
        console.log('Tidak ada access token yang valid.')
        console.log(error)
    }
}

export const saveAccessToken = async (tokenValue) => {
    try {
        return await AsyncStorage.setItem(ACCESS_TOKEN_KEY, tokenValue)
    } catch (error) {
        console.log('Gagal menyimpan access token.')
        console.error(error);
    }
}

export const getRefreshToken = async () => {
    try {
        return await AsyncStorage.setItem(REFRESH_TOKEN_KEY)
    } catch (error) {
        console.log('Tidak ada refresh token yang valid.')
        console.log(error)
    }
}

export const saveRefreshToken = async (tokenValue) => {
    try {
        return await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokenValue)
    } catch (error) {
        console.log('Gagal menyimpan refresh token.')
        console.log(error)
    }
}
