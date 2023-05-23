import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    text: {
        color: '#555555',
    },
    textAnchor: {
        fontWeight:'800',
        color: '#007AFF'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 32,
        marginVertical: 30,
    },
    subText: {
        fontWeight: '600',
        fontSize: 20,
    },
    box: {
        borderRadius: 10,
        padding: 15,
        width: '100%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
    },
    inputContainer: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    input: {
        color: '#555555',
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#888',
        fontSize: 14,
        paddingLeft: 20,
        backgroundColor: '#f2f2f2',
        marginVertical: 10,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 13,
        backgroundColor: '#000',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    outlinedBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        borderRadius: 50,
        borderColor: 'black'
    },
})

export default styles