import { StyleSheet } from "react-native";
import { COLORS } from "../../enums/fontStyles";

export const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    headerContainer:{
        marginHorizontal:"5%"
    },
    inputStyle:{
        width:"100%"
    },
    inputView:{
        marginHorizontal:"5%",
        borderBottomWidth:0,
        backgroundColor:COLORS.white,
        borderRadius:15,
        paddingHorizontal:"5%",
        marginTop:"5%"
    }
    
})