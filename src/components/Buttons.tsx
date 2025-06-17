import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../enums/fontStyles';

const Buttons = (props: any) => {
    const { title, buttonStyle, buttonText, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.container, buttonStyle]}>
            <Text style={[styles.titleStyle, buttonText]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 59,
        width: "60%",
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        elevation:2,
        alignSelf:"center"
    },
    titleStyle: {
        fontFamily: FONTS.semibold,
        fontSize: 22,
        color: COLORS.white
    }
})
export default Buttons;