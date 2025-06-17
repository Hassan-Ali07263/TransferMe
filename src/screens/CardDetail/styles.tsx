import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerStyle: {
        marginHorizontal: "5%"
    },
    moneyText: {
        fontFamily: FONTS.medium,
        fontSize: 12,
        color: COLORS.white,
        alignSelf: "flex-end"
    },
    arrowImage: {
        height: 12.54,
        width: 12.54
    },
    typeText: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.white
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    moneyContainer: {
        backgroundColor: COLORS.blue_4,
        // height:45,
        width: "30%",
        borderRadius: 15,
        paddingHorizontal: "2%",
        paddingVertical: "2%",
        elevation: 1
    },
    mainView: {
        backgroundColor: COLORS.grey_3,
        flexDirection: "row",
        marginHorizontal: "5%",
        borderRadius: 15,
        justifyContent: "space-evenly",
        height: 64,
        alignItems: "center",
        elevation: 1,
        borderWidth: 0,
        marginVertical: "5%"
    },
    moneyContainerSend: {
        backgroundColor: COLORS.blue_3,
        // height:45,
        width: "30%",
        borderRadius: 15,
        paddingHorizontal: "2%",
        paddingVertical: "2%",
        elevation: 1
    },
    buttonStyle: {
        width: "45%",
        marginVertical: "4%"
    },
    allCardText: {
        fontFamily: FONTS.bold,
        fontSize: 17,
        lineHeight: 22,
        color: COLORS.blue_4,
        marginHorizontal: "5%"
    },
    visaText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.white,
        lineHeight: 18,
        alignSelf: "flex-end"
    },
    numberText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        lineHeight: 21,
        color: COLORS.white
    },
    expiryText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        lineHeight: 21,
        color: COLORS.white,
        alignSelf:"flex-end"
    },
    nameText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.white,
        lineHeight: 18,
        marginBottom:"5%"
    },
    cardImage: {
        height: 205,
        marginVertical: "1%",
        paddingHorizontal: "10%",
        paddingVertical: "4%",
        justifyContent: "space-between",
        paddingBottom: "6%"
    },
    noDataText:{
        fontFamily:FONTS.medium,
        fontSize:16,
        color:COLORS.primary
    },
    noDataView:{
        alignItems:"center",
        justifyContent:"center",
        height:150
    }

})