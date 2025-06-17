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
    uploadImage: {
        height: 24,
        width: 24
    },
    uploadedImage: {
        height: "100%",
        width: "100%"
    },
    uploadView: {
        height: 134,
        width: 134,
        borderRadius: 134,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        alignSelf: "center",
        marginBottom: "10%",
        elevation: 3,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: COLORS.primary
    },
    uploadViewErr: {
        height: 134,
        width: 134,
        borderRadius: 134,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        alignSelf: "center",
        marginBottom: "10%",
        elevation: 3,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: COLORS.red
    },
    pleaseText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: COLORS.grey_1,
        alignSelf: "center",
        marginVertical: "2%",
        marginBottom: "12%"
    },
    errorText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.red,
        alignSelf: "center"
    },
    nameErrorText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.red,
    },
    buttonStyle: {
        width: "40%",
        marginVertical: "15%"
    },
    checkImage: {
        height: 18,
        width: 18,
        marginRight: "2%"
    },
    loadingView:{
        position:"absolute",
        top:"50%",
        right:"50%"
    }

})