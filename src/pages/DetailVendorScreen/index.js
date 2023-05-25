import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { handleDetailVendor } from "../../api/vendors_products";
import Loading from "../../components/Loading";
import { NormalButton } from "../../components";
import styles from "../../styles";
import IonIcon from 'react-native-vector-icons/Ionicons'

function DetailVendor() {
    const navigation = useNavigation()
    const route = useRoute()
    const id = route.params.id
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({
        desc: '',
        products: [],
        name: '',
        address: '',
        photo: '',
        logo: ''
    })

    const showData = async () => {
        try {
            await handleDetailVendor(id).then(res => {
                setData({
                    desc: res.notes,
                    products: [...res.physiques, ...res.electronics],
                    name: res.name,
                    address: res.address,
                    photo: res.photo,
                    logo: res.logo
                })
            })
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item.id} activeOpacity={0.9}
        onPress={() => navigation.navigate('Detail Produk', {id: item.id, vendorId: id})}
            style={{
                borderRadius: 10,
                backgroundColor: 'white',
                elevation: 5,
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 6,
                marginVertical: 7,
                padding: 10,
                flex: 1
            }}>
            <View style={{ flex: 1, }}>
                {
                    item.productsPictures.path
                        ? (
                            <Image source={{ uri: item.productsPictures.path, }} style={{
                                width: '100%',
                                borderRadius: 5,
                                height: 100,
                                resizeMode: 'contain',
                                marginBottom: 10,
                            }} />
                        )
                        : (
                            <Text style={styles.text}>Gambar tidak tersedia.</Text>
                        )
                }
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
        // * 2 render
    )

    useEffect(() => {
        showData()
    }, [])


    return isLoading ? <Loading /> : (
        // ! LAYAR
        <ScrollView>
            <View>
                <Image source={{ uri: data.photo }} style={{ resizeMode: "cover", width: '100%', height: 200 }} />
                <View style={{
                    position: "absolute",
                    left: 10, bottom: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 1.5,
                    width: '50%',
                    height: '23%',
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: 'space-around',
                    flexDirection: "row",
                    padding: 5,
                }}>
                    <View style={{ width: 40, }}>
                        <Image source={{ uri: data.logo }} style={{ borderRadius: 5, resizeMode: 'contain', width: '100%', height: '100%' }} />
                    </View>
                    <Text style={{ color: '#333', fontWeight: 'bold' }}>{data.name}</Text>
                    <IonIcon name={'shield-checkmark'} size={20} color={'#1E90FF'} />
                </View>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: 20, marginBottom: 10 }}>
                <Text style={[styles.text, { marginBottom: 15, }]}>{data.address}</Text>
                <Text style={[styles.text, styles.subText]}>Deskripsi</Text>
                <Text style={[styles.text, { marginTop: 10, marginBottom: 20 }]}>{data.desc}</Text>
                {data.products.length == 0 ? (
                    <Text style={[styles.text, { borderTopColor: '#999', borderTopWidth: 1, paddingTop: 25, fontSize: 14.5, }]}>Tidak ada voucher untuk saat ini.</Text>
                ) : (
                    <Text style={[styles.text, { fontWeight: 'bold', borderTopColor: '#999', borderTopWidth: 1, paddingTop: 15, fontSize: 16, marginBottom: 7 }]}>Voucher Pilihan :</Text>
                )
                }
                {
                    data.products.map((item, index) => {
                        return renderItem({ item })
                    })
                }
            </View>
        </ScrollView >
    );
}

export default DetailVendor;