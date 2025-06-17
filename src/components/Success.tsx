import React from 'react';
import { View, Text, Modal, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS } from '../enums/fontStyles';
import { IMAGES } from '../assets/images';
import Buttons from './Buttons';

const Success = (props: any) => {
    const { visible, description, onPressModal } = props;

    return (
        <Modal visible={visible} transparent animationType={"slide"}>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Image style={styles.imageStyle} source={IMAGES.Success} />
                    <Text style={styles.congratsText}>Congrats!</Text>
                    <Text style={styles.descriptionText}>{description}</Text>

                    <Buttons onPress={onPressModal} buttonStyle={styles.buttonStyle} title={"Great!"} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    innerContainer: {
        backgroundColor: COLORS.white,
        flex: 1,
        paddingHorizontal: "5%",
        alignItems: "center"
    },
    buttonStyle: {
        width: "45%",
        borderRadius: 60,
        height: 59,
        marginTop: "15%"
    },
    descriptionText: {
        fontFamily: FONTS.semibold,
        fontSize: 16,
        color: COLORS.blue_4,
        width: "50%",
        textAlign: "center",
        marginVertical: "7%"
    },
    congratsText: {
        fontFamily: FONTS.bold,
        fontSize: 55,
        color: COLORS.blue_4,
        marginTop: "12%"
    },
    imageStyle: {
        height: 323,
        width: 262
    }
})
export default Success;