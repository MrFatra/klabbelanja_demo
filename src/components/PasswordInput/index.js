import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/';

const PasswordInput = ({password, setPassword, placeholder = 'Password'}) => {
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
      {/* <Ionicons
        style={style.icon}
        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
        size={20}
        onPress={togglePasswordVisibility}
      /> */}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
input: {
    width: '100%',
    paddingVertical: 10,
    ...styles.input,
  },
  icon: {
    position: 'relative',
    right: 50,
    marginLeft: 10,
    color: '#888',
  },
});

export default PasswordInput;
