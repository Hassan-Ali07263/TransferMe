import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
import { IMAGES } from '../assets/images';
import { COLORS, FONTS } from '../enums/fontStyles';
import { outgoingData } from '../constants';
import { outgoingHistory } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Outgoings = () => {

    const [outgoings, setOutgoings] = useState([]);

    const renderOutgoings = async () => {
        let getNumber = await AsyncStorage.getItem("loginData");
        getNumber = await JSON.parse(getNumber);
        const number = getNumber.number;

        let getData = await fetch(outgoingHistory + `/${number}`);
        getData = await getData.json();
        setOutgoings(getData.result)
    }

    useEffect(() => {
        renderOutgoings();
    }, [])

    const renderItem = ({ item }) => {

        const imagePath = item.recieverImage && `http://192.168.100.10:5000/${item.recieverImage.replace("\\", "/")}`

        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <Image style={styles.profileImage} source={{ uri: imagePath }} />
                    <View>
                        <Image style={styles.arrowStyle} source={IMAGES.OutgoingArrow} />
                        <Text style={styles.moneyText}>- ${item.amountSend}</Text>
                    </View>
                </View>
                <ImageBackground style={styles.backImage} source={IMAGES.Outgoing}>

                    <View>
                        <Text style={styles.fromText}>To</Text>
                        <Text style={styles.nameText}>{item.recieverName}</Text>
                    </View>

                    <Text style={styles.dateText}>{item.date}</Text>
                </ImageBackground>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            {
                outgoings.length > 0 ?
                    <FlatList
                        data={outgoings}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 10, paddingHorizontal: "5%", paddingBottom: "1%", marginBottom: "32%" }}
                    /> : <View style={styles.noDataView}>
                        <Text style={styles.noDataText}>No outgoing transactions</Text>
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
        borderWidth:1
    },
    backImage: {
        width: 157,
        overflow: "hidden",
        height: 140,
        borderRadius: 20,
        justifyContent: "space-between",
        paddingHorizontal: "6%",
        paddingBottom: "5%"
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
        color: COLORS.blue_4
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
        alignItems: "center",
        marginBottom: "32%"
    }

})
export default Outgoings;