import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { IMAGES } from '../assets/images';
import { COLORS, FONTS } from '../enums/fontStyles';

const SeeAll = (props: any) => {
    const { title,onPress } = props;
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <TouchableOpacity onPress={onPress}
            style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <Image style={styles.goImage} resizeMode='contain' source={IMAGES.GoArrow} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    goImage: {
        height:8,
        width:17
    },
    seeAllText: {
        fontFamily:FONTS.regular,
        fontSize:14,
        color:COLORS.blue_2
    },
    seeAllButton: {
        flexDirection:"row",
        alignItems:"center"
    },
    titleText: {
        fontFamily:FONTS.medium,
        fontSize:18,
        color:COLORS.grey
    },
    mainContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginHorizontal:"5%",
        marginVertical:"5%"
    }
})
export default SeeAll;