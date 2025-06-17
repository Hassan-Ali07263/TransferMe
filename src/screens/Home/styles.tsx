import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.white
    },
    bellImage: {
        height: 21,
        width: 20,
        padding: "2%"
    },
    menuImage: {
        height: 16,
        width: 18,
        padding: "2%"
    },
    headerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: "5%",
        marginVertical: "5%"
    },
    balanceText: {
        fontFamily: FONTS.bold,
        fontSize: 35,
        color: COLORS.blue_2,
        marginHorizontal: "5%",
        lineHeight: 45
    },
    reloadImage: {
        height: 24,
        width: 24
    },
    moneyView: {
        flexDirection: "row",
        alignItems: "center"
    },
    currentText: {
        fontFamily: FONTS.medium,
        fontSize: 18,
        color: COLORS.grey,
        marginHorizontal: "5%",
        marginTop: "3%"
    },
    sendMoney: {
        height: 40,
        width: 40
    },
    moneyTransferView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: "5%"
    },
    sendButton: {
        height: 50,
        width: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.blue_4,
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
        backgroundColor: COLORS.blue_4
    }

})