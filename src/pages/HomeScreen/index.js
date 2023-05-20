// import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Card, CustomButton } from '../../components';
import { handleListVendors } from '../../api/list_vendors';
import { logout } from '../../api/logout';
import { getUserData } from '../../api/storage';
import AuthContext from '../../context/AuthContext';
import styles from '../../styles';

function HomeScreen() {

    const [username, setUserName] = useState('')
    const [data, setData] = useState([]); // Isi dengan data yang ingin Anda paginasi
    const [isLoading, setIsLoading] = useState(false)
    const { setIsLoggedIn } = useContext(AuthContext)

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
        setIsLoading(true)
        try {
            await handleListVendors().then(result => {
                setData([...result.data]) // ! harus sesuai response nya! (array)
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

    const itemBuilder = ({ item }) => {
        return (
            <Card>
                <Text style={{ color: 'black', }}>{item.name}</Text>
                <View>
                    <Image source={{ uri: item.vendorsPictuers.path, width: 60 }} />
                </View>
            </Card>
        )
    }
    const renderFooter = () => {
        if (!isLoading) return null;

        return (
            <View style={thisStyles.footerContainer}>
                <ActivityIndicator color="gray" />
                <Text style={thisStyles.footerText}>Loading...</Text>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff',  }}>
            <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                <Text style={{ color: 'black', alignSelf: 'center', marginVertical: 20, }}>Welcome, {username}</Text>
                <CustomButton onPress={handleLogout} title='Logout' />
            </View>
            <Text style={[styles.text, {fontWeight: 'bold', marginHorizontal: 15}]}>Merchant Pilihan :</Text>    
            <View style={{ flexDirection: 'row', height: 120, margin: 10 }}>
                <FlatList
                    data={data}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={itemBuilder}
                    keyExtractor={(item) => item.id.toString()}
                    ListFooterComponent={renderFooter}
                />
            </View>
        </View>
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