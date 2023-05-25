import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { handleDetailProduct } from "../../api/vendors_products";
import Loading from "../../components/Loading";
import styles from "../../styles";
import IonIcon from 'react-native-vector-icons/Ionicons'

function DetailProduct() {
    const navigation = useNavigation()
    const route = useRoute()
    const id = route.params.id
    const vendorId = route.params.vendorId
    const [isLoading, setIsLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(0)
    const [data, setData] = useState({
        vendorName: '',
        productName: '',
        productPictures: '',
        vendorLogo: '',
        type: '',
        desc: '',
        price: 0
    })

    const incrementQuantity = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        setPrice(data.price * newQuantity)
    }

    const decrementQuantity = () => {
        if (quantity != 0 && quantity != 1) {
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
            setPrice(data.price * newQuantity)
        } else {
            return
        }
    }

    const showData = async () => {
        try {
            return await handleDetailProduct(id, vendorId).then(res => {
                // console.log(res.status);
                setData({
                    vendorName: res.vendorName,
                    productName: res.productName,
                    productPictures: res.productPictures,
                    vendorLogo: res.vendorLogo,
                    type: res.type,
                    desc: res.desc,
                    price: parseInt(res.price),
                })

                return res
            })
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        showData().then(res => {
            setPrice(parseInt(res.price) * quantity)
            console.log(data)
        })
    }, [])

    // const renderItem = ({ item }) => (
    //     <TouchableOpacity key={item.id} activeOpacity={0.9}
    //         style={{
    //             borderRadius: 10,
    //             backgroundColor: 'white',
    //             elevation: 5,
    //             shadowColor: 'black',
    //             shadowOpacity: 0.2,
    //             shadowOffset: { width: 0, height: 2 },
    //             shadowRadius: 6,
    //             marginVertical: 7,
    //             padding: 10,
    //             flex: 1
    //         }}>
    //         <View style={{ flex: 1, }}>
    //             {
    //                 item.productsPictures.path
    //                     ? (
    //                         <Image source={{ uri: item.productsPictures.path, }} style={{
    //                             width: '100%',
    //                             borderRadius: 5,
    //                             height: 100,
    //                             resizeMode: 'contain',
    //                             marginBottom: 10,
    //                         }} />
    //                     )
    //                     : (
    //                         <Text style={styles.text}>Gambar tidak tersedia.</Text>
    //                     )
    //             }
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap" }}>
    //                 <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
    //                 <View style={{
    //                     justifyContent: 'center',
    //                     backgroundColor: item.type == 1 ? '#90EE90' : '#ADD8E6',
    //                     padding: 4,
    //                     borderRadius: 5,
    //                 }}>
    //                     <Text style={{ color: 'white' }}>{item.type == 1 ? 'Fisik' : 'Digital'}</Text>
    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row', marginVertical: 9, flexWrap: "wrap" }}>
    //                 <Text style={{ color: 'black', marginRight: 5, fontSize: 12, }}>-Rp. {item.productsPrice.discount_amount}</Text>
    //                 <Text style={{ color: 'black', fontSize: 12, textDecorationLine: 'line-through' }}>Rp. {item.productsPrice.price}</Text>
    //             </View>
    //             <Text style={{ color: 'black', marginBottom: 15, fontWeight: 'bold', fontSize: 18 }}>Rp. {item.productsPrice.hpp}</Text>
    //             <NormalButton title={'Beli'}></NormalButton>
    //         </View>
    //     </TouchableOpacity>
    //     // * 2 render
    // )

    return isLoading ? <Loading /> : (
        // ! LAYAR
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{
                    borderColor: '#555',
                    borderWidth: 1,
                    marginVertical: 15,
                    marginHorizontal: 15,
                    borderRadius: 10,
                    paddingVertical: 25,
                    paddingHorizontal: 15,
                    flex: 1,
                    overflow: "hidden",
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: "center",
                }}>
                    <View style={{ width: '100%', height: 150, borderRadius: 15, backgroundColor: '#dcdcdc', position: 'absolute', right: -195, top: 20, transform: [{ rotate: '20deg' }] }} />
                    <View style={{ width: '100%', height: 150, opacity: .45, borderRadius: 15, backgroundColor: '#dcdcdc', position: 'absolute', right: -170, top: 20, transform: [{ rotate: '17deg' }] }} />
                    <View style={{ flex: 1, justifyContent: 'space-between', height: 100 }}>
                        <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16 }}>{data.productName}</Text>
                        <Text style={{ color: '#888', fontWeight: 'bold',  }}>{data.vendorName}</Text>
                        <Text style={{ color: '#333', fontWeight: 'bold' }}>Rp. {data.price}</Text>
                    </View>
                    <View style={{ width: 60, }}>
                        <Image source={{ uri: data.productPictures }} style={{ borderRadius: 5, resizeMode: 'contain', width: '100%', height: '50%' }} />
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Detail Merchant', { id: vendorId })} activeOpacity={.6} style={{
                    borderColor: '#555',
                    borderWidth: 1,
                    marginVertical: 15,
                    marginHorizontal: 15,
                    borderRadius: 10,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                    flex: 1,
                    height: 80,
                    flexDirection: "row",
                }}>
                    <Image source={{ uri: data.vendorLogo }} style={{ borderRadius: 5, resizeMode: 'contain', width: '20%', height: '50%', marginRight: 10, }} />
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                        <View style={{ flexDirection: "row", alignItems: 'center', }}>
                            <Text style={{ color: '#333', fontWeight: 'bold', marginRight: 5 }}>{data.vendorName}</Text>
                            <IonIcon name={'shield-checkmark'} size={20} color={'#1E90FF'} />
                        </View>
                        <IonIcon name={'arrow-forward-circle-outline'} size={30} color={'black'} />
                    </View>
                </TouchableOpacity>

                <View style={{ paddingHorizontal: 15, paddingTop: 20, marginBottom: 10 }}>
                    <Text style={[styles.text, styles.subText]}>Deskripsi</Text>
                    <Text style={[styles.text, { marginTop: 10, marginBottom: 20 }]}>{data.desc}</Text>
                </View>


            </ScrollView>

            <View style={{ position: "relative", bottom: 0, borderTopColor: '#555', borderTopWidth: 1, paddingVertical: 15, paddingHorizontal: 10 }}>
                <View style={{ justifyContent: 'space-between', flexDirection: "row" }}>
                    <Text style={[styles.text, { fontWeight: 'bold', fontSize: 18 }]}>Rp. {price}</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <TouchableOpacity style={{ padding: 10, borderWidth: 1, borderColor: '#555', borderRadius: 10 }} onPress={decrementQuantity}>
                            <Text style={styles.text}>-</Text>
                        </TouchableOpacity>
                        <Text style={[styles.text, { marginHorizontal: 15 }]}>{quantity}</Text>
                        <TouchableOpacity style={{ padding: 10, borderWidth: 1, borderColor: '#555', borderRadius: 10 }} onPress={incrementQuantity}>
                            <Text style={styles.text}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: 'space-evenly', marginTop: 25 }}>
                    <TouchableOpacity style={{ borderRadius: 10, borderWidth: 1, borderColor: '#555', padding: 13, flex: 1, marginRight: 15, alignItems: 'center' }}>
                        <Text style={styles.text}>Tambah Keranjang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: 'black', padding: 13, flex: 1, alignItems: 'center', justifyContent: "center" }}>
                        <Text style={{ color: 'white', }}>Beli Sekarang</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View >
    );
}

export default DetailProduct;