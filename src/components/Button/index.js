import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from 'react-native'
import styles from "../../styles";

const CustomButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const NormalButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={[styles.buttonContainer, { paddingVertical: 8 }]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}


export { CustomButton, NormalButton }