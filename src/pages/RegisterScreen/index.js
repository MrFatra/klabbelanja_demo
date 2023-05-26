import React, { useCallback, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { handleRegister } from "../../api/register";
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { CustomButton, PasswordInput, Alert as showAlert } from "../../components";
import styles from "../../styles";
import { handleOutsideTouch } from '../../utils/HideKeyboard';

const RegisterScreen = () => {
  const navigation = useNavigation()

  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const register = async () => {
    setIsLoading(true);
    const result = await handleRegister(emailOrPhone, password, passwordVerify);
    if (result.success == true) {
      navigation.navigate('Login')
    } else {
      showAlert('Pesan', result.message);
    }
    setIsLoading(false);
  }

  //  hapus form
  useFocusEffect(
    useCallback(
      () => {
        setEmailOrPhone('')
        setPassword('')
        setPasswordVerify('')
      },
      [],
    )

  )

  return (
    <TouchableWithoutFeedback onPress={handleOutsideTouch}>
      <View style={{
        backgroundColor: '#fff', flexDirection: 'row', flex: 1, alignItems: 'center', paddingHorizontal: 30,
      }}>
        {/* ROW */}
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={[styles.text, styles.headerText]}>Register</Text>
          <View style={styles.box}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email/Nomor Telepon"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                placeholderTextColor='#555'
              />
              <PasswordInput password={password} setPassword={setPassword} placeholder='Password' />
              <PasswordInput password={passwordVerify} setPassword={setPasswordVerify} placeholder='Verifikasi Password' />
            </View>
            {
              isLoading ? <ActivityIndicator></ActivityIndicator> : <CustomButton title="Register" onPress={register} />
            }
          </View>
          <View style={{ flexDirection: 'row', marginTop: 40, }}>
            <Text style={styles.text}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textAnchor}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;