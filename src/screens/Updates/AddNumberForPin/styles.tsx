import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: "5%"
    },
    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.blue
    },
    notFocusedStyle: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.grey,
        marginTop: "7%"
    },
    focusedTextStyle: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.primary,
        marginTop: "7%"
    },
    checkImage: {
        height: 18,
        width: 18,
        marginRight: "2%"
    },
    pleaseText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        lineHeight: 26,
        color: COLORS.grey_1,
        width: "55%",
        textAlign: "center",
        alignSelf: "center",
        marginBottom: "20%",
        marginTop: "5%"
    },
    buttonStyle: {
        marginTop: "20%"
    },
    ErrorText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.red,
    },
    loadingView:{
        position:"absolute",
        top:"50%",
        right:"50%"
    }
})