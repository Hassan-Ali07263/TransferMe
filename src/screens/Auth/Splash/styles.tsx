import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/fontStyles";

export const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white,
        justifyContent:"space-between",
        paddingVertical:"10%"
    },
    transferText:{
        fontFamily:FONTS.regular,
        fontSize:16,
        color:COLORS.primary
    },
    secureText:{
        fontFamily:FONTS.regular,
        fontSize:16,
        color:COLORS.grey
    },
    secureView:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    bestPartnerText:{
        fontFamily:FONTS.medium,
        fontSize:13,
        color:COLORS.primary,
        alignSelf:"center"
    },
    transferMeText:{
        fontFamily:FONTS.semibold,
        fontSize:54,
        color:COLORS.primary,
        alignSelf:"center"
    },
    logoStyle:{
        height:83,
        width:"40%",
        alignSelf:"center",
        marginBottom:"3%"
    },
    logoView:{
    }
})