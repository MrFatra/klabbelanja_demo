import { API_URL_LOGIN } from "./routes";
import { saveAccessToken, saveUserData} from "./storage";

export const handleLogin = async (emailOrPhone, password) => {

  if (emailOrPhone !== '' && password !== '') {

    const data = new URLSearchParams();
    data.append('emailOrPhone', emailOrPhone);
    data.append('password', password);
  
    try {
      const response = await fetch(API_URL_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString()
      });
  
      const result = await response.json();
  
      if (result.status === false) {
        return { success: false, message: result.messages };
      } else {
        // validasi
        let user;
        if (emailOrPhone.startsWith('08') || emailOrPhone.startsWith('+62')) {
          user = result.data.users.phone;
        } else {
          user = result.data.users.email;
        }
        await saveAccessToken(result.data.tokens.tokens)
        await saveUserData(user)
        // await saveRefreshToken()
        return { success: true, access_token: result.data.tokens.tokens, user };
      }
    } catch (err) {
      console.log('Error Terjadi');
      console.log(err);
      return { success: false, message: 'Terjadi kesalahan.' };
    }
  } else {
    return { success: false, message: 'Data tidak boleh kosong.'}
  }
  };
  

//   ! COMMENTED SECTION


// export const login = async (emailOrPhone, password) => {
//     const accessToken = await getAccessToken()
    
//     try {
//         await handleLogin(emailOrPhone, password)
//     } catch (err) {

//     }

//     if (accessToken) {
//         if (shouldRefreshToken()) {
//             await refreshToken()
//         }

//     } else {
//         console.log('Gagal login, Tidak ada access token.')
//     }
// }