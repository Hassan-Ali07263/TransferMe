import React, { useState } from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import Header from '../../../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../../../components/Input';
import { COLORS } from '../../../enums/fontStyles';
import { IMAGES } from '../../../assets/images';
import Buttons from '../../../components/Buttons';
import { styles } from './styles';
import { updationOtpVerify, verifyOtp } from '../../../api';

const VerifyForPin = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { number } = route.params;
    console.log(number)

    const [otp, setOtp] = useState('');
    const [isFocus, setIsFocus] = useState(false)
    const [loading, setLoading] = useState(false);

    const [otpErr, setOtpErr] = useState("");

    const confirmFunction = async () => {
        try {
            setLoading(true)
            if (number && otp && otpErr === "") {
                const data = { number, otp };

                let response = await fetch(updationOtpVerify, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                response = await response.json();
                console.log(response)
                if (response.result === "otp matched") {
                    Alert.alert("Number verified successfully")
                    navigation.navigate("UpdatePin")
                }
                else {
                    Alert.alert(response.result)
                }

            }
        }
        catch (err) {
            setLoading(false)
            console.log(err)
            Alert.alert("Error", err)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <View style={styles.container}>
            <Header title={"Verify your Number"} onPress={() => navigation.goBack()} />

            <Text style={styles.pleaseText}>Please verify your Phone Number</Text>

            <Text style={[isFocus || otp ? styles.focusedTextStyle : styles.notFocusedStyle]}>Enter Verification Code (5-digit)</Text>
            <Input
                value={otp}
                onChangeText={(text) => setOtp(text)}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                inputView={[isFocus || otp ? styles.inputStyle : null]}
                keyboardType={"numeric"}
                placeholder={"56234"}
                placeholderColor={COLORS.grey_2}
                onRight={otp && <Image style={styles.checkImage} resizeMode='contain' source={IMAGES.Check} />}
            />

            <Buttons onPress={confirmFunction} title={"Verify"} buttonStyle={styles.buttonStyle} />

            {
                loading && <View style={styles.loadingView}>
                    <ActivityIndicator color={COLORS.primary} size={50} />
                </View>
            }
        </View>
    );
}
export default VerifyForPin;