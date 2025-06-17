import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: "20%",
        justifyContent: "space-between"
    },
    partnerText: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.grey,
        textAlign: "center",
        marginTop: "7%"
    },
    transferMeText: {
        fontFamily: FONTS.bold,
        fontSize: 36,
        color: COLORS.primary,
        textAlign: "center",
        lineHeight: 39
    },
    welcomeText: {
        fontFamily: FONTS.bold,
        fontSize: 45,
        color: COLORS.dark,
        textAlign: "center",
        lineHeight: 48
    },
    logoStyle: {
        height: 83,
        width: "40%",
        alignSelf: "center",
        marginBottom: "5%"
    }
})