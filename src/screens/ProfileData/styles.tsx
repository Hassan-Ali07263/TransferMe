import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    innerContainer: {
        marginHorizontal: "5%",
        marginBottom:"35%"
    },
    headerContainer: {
        marginHorizontal: "5%"
    },
    editImage: {
        height: 14,
        width: 14
    },
    editView: {
        height: 30,
        width: 30,
        backgroundColor: COLORS.blue_4,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "8%",
        right: "0%"
    },
    profileStyle: {
        height: 134,
        width: 134,
        borderRadius: 134,
        borderWidth: 1
        // alignSelf:"center"
    },
    infoText: {
        fontFamily: FONTS.medium,
        fontSize: 18,
        color: COLORS.grey,
        lineHeight: 21,
        alignSelf: "center"
    },
    profileView: {
        alignSelf: "center",
        marginVertical: "5%"
    },
    answerText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.blue_5,
        lineHeight: 21
    },
    headingText: {
        fontFamily: FONTS.medium,
        fontSize: 12,
        color: COLORS.blue_4,
        lineHeight: 21
    },
    informationView: {
        height: 38,
        borderRadius: 10,
        backgroundColor: COLORS.grey_4,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "5%",
        flexDirection: "row",
        elevation: 1,
        marginVertical: "1.5%"
    },
    personalInfoText: {
        fontFamily: FONTS.bold,
        fontSize: 17,
        color: COLORS.blue_4,
        lineHeight: 22,
        marginVertical: "3%"
    },
    arrowImage: {
        height: 20,
        width: 20
    },
    modalInnerView: {
        backgroundColor: COLORS.white,
        height: "22%",
        borderTopLeftRadius: 30,
        borderWidth: 1,
        borderTopRightRadius: 30,
        borderColor: COLORS.blue_4,
        paddingHorizontal: "8%",
        paddingVertical: "8%"
    },
    modalMainView: {
        flex: 1,
        justifyContent: "flex-end"
    },
    cameraImage: {
        height: 40,
        width: 50
    },
    cameraButton: {
        backgroundColor: COLORS.primary,
        height: 70,
        width: 70,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        marginRight: "10%"
    },
    bottomView: {
        flexDirection: "row",
        alignItems: "center"
    },
    crossImage: {
        height: 20,
        width: 20
    },
    closeButton: {
        borderWidth: 1,
        borderRadius: 30,
        borderColor: COLORS.blue_4,
        justifyContent: "center",
        alignItems: "center",
        height: 35,
        width: 35,
        alignSelf: "flex-end"
    },
    buttonStyle: {
        width: "35%",
        height: 40
    },
    buttonView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: "2%",
        width: "70%",
        alignSelf: "center"
    },
    titleText: {
        fontFamily: FONTS.medium,
        fontSize: 12,
        color: COLORS.white
    },
    loadingView: {
        position: "absolute",
        top: "50%",
        right: "50%"
    },

})