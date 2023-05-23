import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ children, onPress }) => {
  return <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>{children}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.8,
    borderColor: '#999',
    aspectRatio: 2/3,
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    padding: 5,
  },
});

export default Card;
