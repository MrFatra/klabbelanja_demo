// import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Card } from '../../components';
import { getBanners, handleListVendorsAndProducts } from '../../api/vendors_products';
import { getUserData } from '../../api/storage';
import styles from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons'
import FAwesome from 'react-native-vector-icons/FontAwesome5'
import Carousel from 'react-native-reanimated-carousel';
import Loading from '../../components/Loading';

function HomeScreen() {

    const navigation = useNavigation()

    const [username, setUserName] = useState('')
    const [vendorsData, setVendorsData] = useState([]); // Isi dengan vendorsData yang ingin Anda paginasi
    const [productsData, setProductsData] = useState([]); // Isi dengan productsData yang ingin Anda paginasi
    const [isLoading, setIsLoading] = useState(true)
    const [banners, setBanners] = useState([])
    const [autoPlay, setAutoPlay] = useState(false)

    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const contentHeight = screenHeight / 3.5;


    const getUsername = async () => {
        try {
            await getUserData().then(result => {
                if (result != null) {
                    setUserName(result)
                } else {
                    return
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    const showData = async () => {
        try {
            await handleListVendorsAndProducts().then((result) => {
                setVendorsData([...result.vendors.slice(0, 5)])
                setProductsData([...result.products.slice(0, 5)])
            })
            await getBanners().then(res => {
                setBanners([...res.banners])
                setAutoPlay(true)
            })
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)

        }
    }

    useEffect(() => {
        getUsername()
        showData()

    }, [])

    const itemBuilder = ({ item, photo, isVendor }) => {
        // console.log(isVendor ? null : `item : ${item.vendors_id}`)
        return (
            <Card key={item.id} onPress={() => navigation.navigate(`Detail ${isVendor ? 'Merchant' : 'Produk'}`, {
                id: item.id,
                vendorId: isVendor ? null : item.vendors_id
            })}>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', }}>
                    <Text style={{ color: '#555', fontWeight: 'bold' }}>{item.name}</Text>
                    <Image source={{ uri: photo, }} style={{
                        marginVertical: 15,
                        width: '100%',
                        height: '50%',
                        resizeMode: 'contain'
                    }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#555' }}>Lihat Detail</Text>
                        <IonIcon name={'arrow-forward-outline'} color='#555' style={{ marginLeft: 2, }} />
                    </View>
                </View>
            </Card >
        )
    }

    const renderFooter = () => {
        if (!isLoading) return null

        return (
            <View style={thisStyles.footerContainer}>
                <ActivityIndicator color="gray" />
                <Text style={thisStyles.footerText}>Loading...</Text>
            </View>
        );
    };

    return (

        // ! MERCHANT
        <ScrollView style={{ backgroundColor: '#fff', }}>
            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold' }]}>Selamat Datang,</Text>
                <Text style={[styles.text, { fontSize: 13, marginLeft: 25, marginTop: 8, fontWeight: 'bold', marginRight: 5 }]}>{username}</Text>
            </View>
            {
                banners.length != 0
                    ? (
                        <Carousel
                            style={{ marginVertical: 10 }}
                            loop
                            mode='parallax'
                            width={screenWidth}
                            height={screenWidth / 2}
                            autoPlay={autoPlay}
                            data={banners}
                            scrollAnimationDuration={1000}
                            // pagingEnabled={true}
                            autoPlayInterval={4300}
                            // onSnapToItem={}
                            renderItem={({ item }) => {
                                return (
                                    <View
                                        style={{
                                            flex: 1,
                                            padding: 5,
                                            borderColor: '#999',
                                            borderRadius: 10,
                                            borderWidth: 1,
                                        }}
                                    >
                                        <Image source={{ uri: item.path }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10, }} />
                                    </View>
                                )
                            }}
                        />
                    )
                    : (
                        <Loading />
                    )
            }

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 15 }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Merchant Pilihan :</Text>
                <TouchableOpacity style={styles.outlinedBtn} onPress={() => navigation.navigate('Semua Merchant')}>
                    <Text style={[styles.text, { fontWeight: 'bold', marginHorizontal: 15 }]}>Lihat Semua</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ height: contentHeight }}
                contentContainerStyle={{ padding: 10 }}
                data={vendorsData}
                horizontal={true}
                renderItem={({ item }) => itemBuilder({ item, photo: item.vendorsPictures.path, isVendor: true })}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={renderFooter}
            />

            {/* ! PRODUK */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 15, marginTop: 10 }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Produk Pilihan :</Text>
                <TouchableOpacity style={styles.outlinedBtn} onPress={() => navigation.navigate('Semua Produk')}>
                    <Text style={[styles.text, { fontWeight: 'bold', marginHorizontal: 15 }]}>Lihat Semua</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ height: contentHeight }}
                contentContainerStyle={{ padding: 10 }}
                data={productsData}
                horizontal={true}
                renderItem={({ item }) => itemBuilder({ item, photo: item.productsPictures.path, isVendor: false })}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={renderFooter}
            />
        </ScrollView >
    );
}

const thisStyles = StyleSheet.create({
    itemContainer: {
        borderColor: '#555555',
        padding: 16,
        borderEndWidth: 1,
        borderEndColor: '#eaeaea',
    },
    itemText: {
        color: 'black',
        fontSize: 16,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    footerText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'gray',
    },
});

export default HomeScreen;