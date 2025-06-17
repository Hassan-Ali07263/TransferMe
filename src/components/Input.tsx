import React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../enums/fontStyles';

const Input = (props: any) => {
    const { styleInput, placeholder, onPress, inputView, onRight, secureTextEntry, keyboardType, onFocus, onBlur, placeholderColor, value, onChangeText } = props;
    return (
        <View style={[styles.container, inputView]}>

            <TextInput style={[styles.inputStyle, styleInput]}
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
            <TouchableOpacity onPress={onPress}>
                {onRight}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        fontFamily: FONTS.medium,
        fontSize: 15,
        color: COLORS.dark,
        width:"80%"
    },
    container: {
        flexDirection: "row",
        height: 50,
        borderBottomColor: COLORS.grey_2,
        borderBottomWidth: 1,
        alignItems:"center",
        justifyContent:"space-between"
    }
})
export default Input;