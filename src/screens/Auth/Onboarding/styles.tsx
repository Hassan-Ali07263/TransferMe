import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../enums/fontStyles";
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    descriptionText: {
        fontFamily:FONTS.medium,
        fontSize:13,
        color:COLORS.grey,
        textAlign:"center",
        marginBottom:"25%",
        width:"90%",
        alignSelf:"center"
    },
    nameText: {
        fontFamily: FONTS.bold,
        fontSize: 35,
        color: COLORS.dark,
        textAlign:"center",
        marginBottom:"5%"
    },
    imageStyle: {
        height: 350,
        width: 350,
        alignSelf: "center",
        marginBottom:"5%"
    },
    flatListView: {
        width,
    }
})