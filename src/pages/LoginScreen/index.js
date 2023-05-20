import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import styles from '../../styles';
import { useNavigation } from '@react-navigation/native'
import { handleLogin } from '../../api/login';
import { Alert as showAlert, CustomButton, PasswordInput } from '../../components/';
import { handleOutsideTouch } from '../../utils/HideKeyboard';
import AuthContext from '../../context/AuthContext';

const LoginScreen = () => {
    const navigation = useNavigation()

    const [emailOrPhone, setEmailOrPhone] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { setIsLoggedIn } = useContext(AuthContext)

    const login = async () => {
        setIsLoading(true);
        const result = await handleLogin(emailOrPhone, password);
        if (result.success) {
            setIsLoggedIn(true)
        } else {
            showAlert('Pesan', result.message);
        }
        setIsLoading(false);
    }

    return (
        <TouchableWithoutFeedback onPress={handleOutsideTouch}>
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 50,
            }}>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={[styles.headerText, styles.text]}>Login</Text>
                    <View style={styles.box}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} placeholder="Email" value={emailOrPhone} onChangeText={setEmailOrPhone} placeholderTextColor='#555'/>
                            <PasswordInput password={password} setPassword={setPassword} placeholder='Password' />
                        </View>
                        {isLoading ? <ActivityIndicator /> : <CustomButton onPress={login} title='Log In' />
                        }
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 40 }}>
                        <Text style={styles.text}>Belum punya akun? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.textAnchor}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default LoginScreen;
