import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { handleListAllVendors } from "../../api/vendors_products";
import styles from "../../styles";

function ViewAllVendors() {

    const navigation = useNavigation()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const showData = async () => {
        try {
            await handleListAllVendors().then(res => {
                setData([...res.vendors])
            })
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        showData()
    }, [])

    const renderFooter = () => (
        <View style={{ marginVertical: 50, alignItems: "center" }}>
            <Text style={{ color: '#555', }}>Tidak ada merchant lainnya.</Text>
        </View>
    )

    const Load = () => {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color="gray" />
                <Text style={{ color: '#555' }}>Loading...</Text>
            </View>
        );
    };


    const itemBuilder = ({ item }) => (
        <TouchableOpacity key={item.id} activeOpacity={0.9} onPress={() => navigation.navigate('Detail Merchant', { id: item.id }) }
            style={{
                borderRadius: 10,
                paddingVertical: 15,
                backgroundColor: 'white',
                elevation: 5,
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 6,
                margin: 5,
                paddingHorizontal: 15,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Image source={{ uri: item.vendorsPictures.path, }} style={{
                marginVertical: 20,
                width: '100%',
                height: 100,
                resizeMode: 'contain'
            }} />
            <Text style={[styles.text, { fontWeight: 'bold' }]}>{item.name}</Text>
        </TouchableOpacity>
    )

    return isLoading ? <Load /> : (
        <FlatList
            numColumns={2}
            data={data}
            renderItem={itemBuilder}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ padding: 10 }}
            ListFooterComponent={isLoading ? null : renderFooter}
        />)
}

export default ViewAllVendors;