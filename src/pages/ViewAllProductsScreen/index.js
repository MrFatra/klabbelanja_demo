import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { handleListAllProducts } from "../../api/vendors_products";
import { NormalButton } from "../../components";
import Loading from "../../components/Loading";

function ViewAllProducts() {
    const navigation = useNavigation()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const showData = async () => {
        try {
            await handleListAllProducts().then(res => {
                setData([...res.electronics, ...res.physiques])
                console.log(data.length);
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
            <Text style={{ color: '#555', }}>Tidak ada produk lainnya.</Text>
        </View>
    )

    const itemBuilder = ({ item }) => (
        <TouchableOpacity key={item.id} activeOpacity={0.9} onPress={() => navigation.navigate('Detail Produk', {id: item.id, vendorId: item.vendors_id})}
            style={{
                borderRadius: 10,
                backgroundColor: 'white',
                elevation: 5,
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 6,
                margin: 5,
                padding: 10,
                flex: 1
            }}>
            <View style={{ flex: 1, }}>
                <Image source={{ uri: item.productsPictures.path, }} style={{
                    width: '100%',
                    borderRadius: 5,
                    height: 100,
                    resizeMode: 'contain',
                    marginBottom: 10,
                }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap" }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                    <View style={{
                        justifyContent: 'center',
                        backgroundColor: item.type == 1 ? '#90EE90' : '#ADD8E6',
                        padding: 4,
                        borderRadius: 5,
                    }}>
                        <Text style={{ color: 'white' }}>{item.type == 1 ? 'Fisik' : 'Digital'}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 9, flexWrap: "wrap" }}>
                    <Text style={{ color: 'black', marginRight: 5, fontSize: 12, }}>-Rp. {item.productsPrice.discount_amount}</Text>
                    <Text style={{ color: 'black', fontSize: 12, textDecorationLine: 'line-through' }}>Rp. {item.productsPrice.price}</Text>
                </View>
                <Text style={{ color: 'black', marginBottom: 15, fontWeight: 'bold', fontSize: 18 }}>Rp. {item.productsPrice.hpp}</Text>
                <NormalButton title={'Beli'}></NormalButton>
            </View>
        </TouchableOpacity>
    )

    return isLoading ? <Loading /> : (
        <FlatList
            numColumns={2}
            data={data}
            renderItem={itemBuilder}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ padding: 10 }}
            ListFooterComponent={isLoading ? null : renderFooter}
        />)
}

export default ViewAllProducts;