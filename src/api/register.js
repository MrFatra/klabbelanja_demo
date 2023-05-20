import { API_URL_REGISTER } from "./routes";

export const handleRegister = async (emailOrPhone, password, passwordVerify) => {
    const data = new URLSearchParams();
    data.append('emailOrPhone', emailOrPhone);
    data.append('password', password);
    data.append('password_verify', passwordVerify);
  
    try {
      const response = await fetch(API_URL_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString()
      });
  
      const result = await response.json();
  
      if (result.status === false) {
        if (result.code === 201) 
        return { success: false, message: result.messages };
        else if (result.code === 202)
        return { success: false, message: result.data.validation[0].message };
      } else {
        // validasi
        let user;
        if (emailOrPhone.startsWith('08') || emailOrPhone.startsWith('+62')) {
          user = result.data.users.phone;
        } else {
          user = result.data.users.email;
        }
        return { success: true, user };
      }
    } catch (err) {
      console.log(err);
      return { success: false, message: 'Terjadi kesalahan.' };
    }
  };
  