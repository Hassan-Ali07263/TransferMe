import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: "5%"
    },
    emailInputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.blue
    },
    focusedTextStyle: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.primary,
        marginTop: "8%"
    },
    emailText: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.grey,
        marginTop: "8%"
    },
    chckImage: {
        height: 18,
        width: 18
    },
    buttonStyle: {
        marginTop: "25%",
        width: "45%",
        borderRadius: 70
    },
    errorText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.red
    },
    loadingView: {
        position: "absolute",
        top: "50%",
        right: "50%"
    },
    descriptionText: {
        fontFamily: FONTS.regular,
        fontSize: 15,
        color: COLORS.grey
    },
    monetText: {
        fontFamily: FONTS.bold,
        fontSize: 35,
        color: COLORS.blue_2,
        marginVertical: "3%"
    },
    availableText: {
        fontFamily: FONTS.medium,
        fontSize: 18,
        lineHeight: 21,
        color: COLORS.grey,
        marginTop: "5%"
    }
})