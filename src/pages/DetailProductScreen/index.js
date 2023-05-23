import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";

function DetailProduct() {
    const route = useRoute()
    const id = route.params.id

    return (
        // ! LAYAR
        <View style={{ flex: 1 }}>
            <View>
                <Text style={{ color: '#555' }}>{id}</Text>
            </View>
        </View>
    );
}

export default DetailProduct;