import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from 'react-native'
import styles from "../../styles";

const CustomButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton