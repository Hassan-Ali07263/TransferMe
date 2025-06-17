import { StyleSheet } from "react-native"
import { COLORS, FONTS } from "../../../enums/fontStyles"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: "5%"
    },
    queryText: {
        fontFamily: FONTS.regular,
        fontSize: 15,
        color: COLORS.grey,
        marginTop: "5%",
        marginBottom: "11%"
    },
    questionText: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: "rgba(81,100,191,.65)",
    },
    questionButton: {
        paddingHorizontal: "5%",
        backgroundColor: "rgba(0,26,77,.05)",
        height: 48,
        borderRadius: 10,
        justifyContent: "space-between",
        marginBottom: "6.5%",
        flexDirection:"row",
        alignItems:"center"
        
    },
    buttonStyle: {
        width: "40%",
        borderRadius: 50,
        marginBottom: "24%"
    },
    matchedButton:{
        backgroundColor:"rgba(1,102,255,.15)"
    },
    checkImage:{
        height:18,
        width:18
    }
})