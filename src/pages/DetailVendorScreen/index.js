import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../../styles";

function DetailVendor() {
    const route = useRoute()
    const id = route.params.id
    const [isLoading, setIsLoading] = useState()

    // !! TAHAP TEST DENGAN VAR BIASA !
    const desc = '';

    // ! HANDLE API

    useEffect(() => {
        
    }, [])
    

    return (
        // ! LAYAR
        <View style={{ flex: 1 }}>
            <View style={{ height: '35%', backgroundColor: '#555' }}>
                <View style={{
                    position: "absolute",
                    left: 10, bottom: 10,
                    backgroundColor: 'black',
                    height: '20%',
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: 'space-evenly',
                    flexDirection: "row",
                    padding: 5,
                }}>
                    {/* Image Contain */}
                    {/* TExt */}
                    <Text>Logo</Text>
                    <Text>Nama Merchant</Text>
                    <Text>Verified</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: 20 }}>
                <Text style={[styles.text, styles.subText]}>Desc</Text>
                <Text style={[styles.text, {marginTop: 10, marginBottom: 20}]}>Description Here</Text>
                {/* LIST */}
                <Text style={styles.text}>Voucher Pilihan :</Text>
                {/* FLATLIST */}
            </View>
        </View>
    );
}

export default DetailVendor;