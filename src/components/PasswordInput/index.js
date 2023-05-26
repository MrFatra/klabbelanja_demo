import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons'

const PasswordInput = ({ password, setPassword, placeholder = 'Password' }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={style.inputContainer}>
      <TextInput
        style={style.input}
        secureTextEntry={!showPassword}
        value={password}
        placeholder={placeholder}
        onChangeText={setPassword}
        placeholderTextColor='#555'
      />
      <IonIcon
        style={style.icon}
        color={'black'}
        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
        size={20}
        onPress={togglePasswordVisibility}
      />
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: '#f2f2f2',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'black',
    marginLeft: 15,
  },
  icon: {
    flex: 1,
    position: 'absolute',
    right: 10,
    padding: 10,
    color: '#888',
  },
});

export default PasswordInput;
