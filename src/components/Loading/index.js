import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const Loading = () => {
    return (
        <View style={thisStyles.footerContainer}>
            <ActivityIndicator color="gray" />
            <Text style={thisStyles.footerText}>Loading...</Text>
        </View>
    );
};

const thisStyles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    footerText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'gray',
    },
})

export default Loading