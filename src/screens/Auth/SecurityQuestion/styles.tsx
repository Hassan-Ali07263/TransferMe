import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: "5%"
    },
    buttonStyle: {
        borderRadius: 50,
        width: "50%",
        marginTop: "50%",
        marginVertical: "10%"
    },
    inputStyle: {
        paddingHorizontal: "5%",
        fontFamily: FONTS.medium,
        fontSize: 15,
        color: COLORS.primary,
        lineHeight: 21
    },
    inputView: {
        backgroundColor: "rgba(1, 57, 255,.06)",
        borderRadius: 10,
        height: 110,
        marginVertical: "5%"
    },
    pleaseText: {
        fontFamily: FONTS.regular,
        fontSize: 15,
        color: COLORS.grey,
        marginVertical: "7%"
    },
    questionText: {
        fontFamily: FONTS.bold,
        fontSize: 44,
        color: COLORS.blue_1,
        lineHeight: 52,
        marginTop: "5%"
    },
    loadingView:{
        position:"absolute",
        top:"50%",
        right:"50%"
    }
})