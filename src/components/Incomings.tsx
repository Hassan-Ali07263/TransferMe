import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
import { incomingData } from '../constants';
import { IMAGES } from '../assets/images';
import { COLORS, FONTS } from '../enums/fontStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { incomingHistory } from '../api';

const Incomings = () => {
    const [incomings, setIncomings] = useState([]);

    const renderIncomings = async () => {
        let getNumber = await AsyncStorage.getItem("loginData");
        getNumber = await JSON.parse(getNumber);
        const number = getNumber.number;

        let getData = await fetch(incomingHistory + `/${number}`);
        getData = await getData.json();
        setIncomings(getData.result)
    }

    useEffect(() => {
        renderIncomings();
    }, [])


    const renderItem = ({ item }) => {
        const imagePath = item.senderImage && `http://192.168.100.10:5000/${item.senderImage.replace("\\", "/")}`
        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <Image style={styles.profileImage} source={{ uri: imagePath }} />
                    <View>
                        <Image style={styles.arrowStyle} source={IMAGES.IncomingArrow} />
                        <Text style={styles.moneyText}>+ ${item.amountRecieved}</Text>
                    </View>
                </View>
                <ImageBackground style={styles.backImage} source={IMAGES.Incoming}>

                    <View>
                        <Text style={styles.fromText}>From</Text>
                        <Text style={styles.nameText}>{item.senderName}</Text>
                    </View>

                    <Text style={styles.dateText}>{item.date}</Text>
                </ImageBackground>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            {
                incomings.length > 0 ?
                    <FlatList
                        data={incomings}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 10, paddingHorizontal: "5%", paddingBottom: "1%" }}
                    /> : <View style={styles.noDataView}>
                        <Text style={styles.noDataText}>No incoming transactions</Text>
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        height: 40,
        width: 40,
        borderRadius: 40,
        borderWidth: 1
    },
    backImage: {
        width: 157,
        overflow: "hidden",
        height: 140,
        borderRadius: 20,
        justifyContent: "space-between",
        paddingHorizontal: "6%",
        paddingBottom: "7%"
    },
    container: {
        height: 198,
        width: 157,
        overflow: "hidden",
        elevation: .5,
        backgroundColor: COLORS.white,
        justifyContent: "space-between",
        borderRadius: 20,
        borderWidth: 0,
        borderColor: COLORS.white
    },
    moneyText: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        lineHeight: 21,
        color: COLORS.blue_3
    },
    arrowStyle: {
        height: 18,
        width: 18,
        alignSelf: "flex-end"
    },
    dateText: {
        fontFamily: FONTS.regular,
        fontSize: 10,
        lineHeight: 21,
        color: COLORS.dark,
    },
    nameText: {
        fontFamily: FONTS.bold,
        fontSize: 12,
        lineHeight: 16.5,
        color: COLORS.dark,
        width: "60%"
    },
    fromText: {
        fontFamily: FONTS.medium,
        fontSize: 10,
        lineHeight: 15,
        color: COLORS.dark
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        paddingTop: "5%"
    },
    noDataText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: COLORS.primary
    },
    noDataView: {
        height: 198,
        justifyContent: "center",
        alignItems: "center"
    }

})
export default Incomings;