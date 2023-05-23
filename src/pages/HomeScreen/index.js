// import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Card, CustomButton } from '../../components';
import { handleListVendorsAndProducts } from '../../api/vendors_products';
import { logout } from '../../api/logout';
import { getUserData } from '../../api/storage';
import AuthContext from '../../context/AuthContext';
import styles from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons'

function HomeScreen() {

    const navigation = useNavigation()

    const [username, setUserName] = useState('')
    const [vendorsData, setVendorsData] = useState([]); // Isi dengan vendorsData yang ingin Anda paginasi
    const [productsData, setProductsData] = useState([]); // Isi dengan productsData yang ingin Anda paginasi
    const [isLoading, setIsLoading] = useState(true)
    const { setIsLoggedIn } = useContext(AuthContext)

    const screenHeight = Dimensions.get('window').height;
    const flatListHeight = screenHeight / 3.5;

    const handleLogout = async () => {
        await logout().then(_ => {
            setIsLoggedIn(false)
        })
    }

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
        return (
            <Card onPress={() => navigation.navigate(`Detail ${isVendor ? 'Merchant' : 'Produk'}`, {id: item.id})}>
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
            </Card>
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
            <View style={{ marginVertical: 25, marginHorizontal: 20 }}>
                <Text style={{ color: 'black', alignSelf: 'center', marginVertical: 20, }}>Welcome, {username}</Text>
                <CustomButton onPress={handleLogout} title='Logout' />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 15 }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>Merchant Pilihan :</Text>
                <TouchableOpacity style={styles.outlinedBtn} onPress={() => navigation.navigate('Semua Merchant')}>
                    <Text style={[styles.text, { fontWeight: 'bold', marginHorizontal: 15 }]}>Lihat Semua</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ height: flatListHeight }}
                contentContainerStyle={{ padding: 10 }}
                data={vendorsData}
                horizontal={true}
                renderItem={({ item }) => itemBuilder({ item, photo: item.vendorsPictuers.path, isVendor: true })}
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
                style={{ height: flatListHeight }}
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