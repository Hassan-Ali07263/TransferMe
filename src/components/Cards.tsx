import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { CardDetails } from '../constants';
import { COLORS, FONTS } from '../enums/fontStyles';

const Cards = (props: any) => {
    const { onPress } = props
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={onPress}
                style={styles.cardContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image style={styles.cardImage} resizeMode='contain' source={item.image} />

                    <View>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.typeText}>{item.type}  .  {item.cvv}</Text>
                    </View>
                </View>

                <Text style={styles.amountText}>${item.amount}</Text>

            </TouchableOpacity>
        )
    }
    return (
        <View>
            <FlatList
                data={CardDetails}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: "5%", gap: 13, marginTop: "7%"}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    amountText: {
        fontFamily: FONTS.bold,
        fontSize: 14,
        color: COLORS.blue_2,
    },
    typeText: {
        fontFamily: FONTS.semibold,
        fontSize: 13,
        color: COLORS.grey
    },
    nameText: {
        fontFamily: FONTS.medium,
        fontSize: 12,
        color: COLORS.dark,
        marginBottom: "7%"
    },
    cardImage: {
        height: 20,
        width: 32,
        marginRight: "8%"
    },
    cardContainer: {
        borderRadius: 20,
        borderColor: COLORS.blue_2,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 80,
        width: 307,
        flex: 1,
        paddingHorizontal: "5%"
    }
})
export default Cards;
