import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles';

function SplashScreen() {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: '#fff' }}>
            <Text style={[styles.headerText, styles.text, { paddingHorizontal: 15 }]}>Klab Belanja</Text>
        </View>
    );
}

export default SplashScreen;