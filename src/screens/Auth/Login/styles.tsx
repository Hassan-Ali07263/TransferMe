import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: "7%",
        paddingVertical: "10%"
    },
    emailText: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.grey,
        marginTop: "7%"
    },
    loginText: {
        fontFamily: FONTS.bold,
        fontSize: 40,
        color: COLORS.dark,
        marginBottom: "5%"
    },
    logoStyle: {
        height: 50,
        width: "20%"
    },
    emailInputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.blue
    },
    focusedTextStyle: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.primary,
        marginTop: "7%"
    },
    chckImage: {
        height: 18,
        width: 18
    },
    buttonStyle: {
        marginTop: "35%"
    },
    lineView: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grey_2,
        width: "30%"
    },
    orText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: COLORS.grey_2,
        marginHorizontal: "5%"
    },
    orView: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: "7%"
    },
    googleIMage: {
        height: 60,
        width: 60,
        elevation: 2
    },
    googleFacbookView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginHorizontal: "10%"
    },
    signupText: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.primary,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary
    },
    noAccountText: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.grey
    },
    noAccountView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "10%",
        marginTop:"40%"
    },
    errorText:{
        fontFamily:FONTS.regular,
        fontSize:12,
        color:COLORS.red
    },
    loadingView:{
        position:"absolute",
        top:"50%",
        right:"50%"
    }
})