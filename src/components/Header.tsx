import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { IMAGES } from '../assets/images';
import { COLORS, FONTS } from '../enums/fontStyles';

const Header = (props: any) => {
    const { title, backImageStyle, onPress, backButtonContainer, headerText, headerContainer } = props;
    return (
        <View style={[styles.container, headerContainer]}>
            <TouchableOpacity onPress={onPress}
                style={[styles.backButton, backButtonContainer]}>
                <Image style={[styles.backButtonImage, backImageStyle]} resizeMode='contain' source={IMAGES.BackArrow} />
            </TouchableOpacity>

            <Text style={[styles.titleStyle, headerText]}>{title}</Text>

            <Text style={{ width: "12%" }}></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: "5%"
    },
    backButton: {
        height: 35,
        width: 63,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    backButtonImage: {
        height: 24,
        width: 24
    },
    titleStyle: {
        fontFamily: FONTS.semibold,
        fontSize: 20,
        color: COLORS.dark
    }
})
export default Header;