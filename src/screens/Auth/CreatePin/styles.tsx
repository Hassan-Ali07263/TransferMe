import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/fontStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: "5%"
    },
     title: {
        fontFamily:FONTS.regular,
        fontSize:13,
        color:COLORS.grey,
        alignSelf:"center",
        marginVertical:"10%"
    },
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: "10%",
        gap: 12,
        alignSelf:"center"
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderWidth:1,
        borderColor:COLORS.grey,

    },
    keypadContainer: {
        width: '90%',
        alignSelf:"center"
    },
    keypadRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: "5%",
    },
    key: {
        width: 58,
        height: 58,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    keyText: {
        fontFamily:FONTS.medium,
        fontSize: 20,
        color: COLORS.dark,
    },
    biometricKey: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    biomatricImages:{
        height:35,
        width:35
    },
    pleaseText:{
        fontFamily:FONTS.medium,
        fontSize:16,
        color:COLORS.grey_1,
        width:"50%",
        alignSelf:"center",
        textAlign:"center",
        marginTop:"5%"
    },
    buttonStyle:{
        width:"40%",
        marginVertical:"10%"
    },
    loadingView:{
        position:"absolute",
        top:"50%",
        right:"50%"
    }
})