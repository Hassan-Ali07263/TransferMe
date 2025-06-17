import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image,
    ActivityIndicator,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { IMAGES } from '../../../assets/images';
import { styles } from './styles';
import { COLORS } from '../../../enums/fontStyles';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Buttons from '../../../components/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatePin } from '../../../api';

const PIN_LENGTH = 5;

const UpdatePin = () => {
    const navigation = useNavigation();
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNumberPress = (number) => {
        if (pin.length < PIN_LENGTH) {
            setPin(pin + number);
        }
        // if (pin.length + 1 === PIN_LENGTH) {
        //     setTimeout(() => {
        //         Alert.alert('PIN Entered', `Your PIN is ${pin + number}`);
        //         setPin('');
        //     }, 200);
        // }
    };

    const handleBiometricAuth = async () => {
        const rnBiometrics = new ReactNativeBiometrics();
        const { available } = await rnBiometrics.isSensorAvailable();

        if (!available) {
            Alert.alert('Biometric not available');
            return;
        }

        const { success } = await rnBiometrics.simplePrompt({
            promptMessage: 'Authenticate',
        });

        if (success) {
            Alert.alert('Authenticated');
            // navigate or auto-fill
        } else {
            Alert.alert('Authentication failed');
        }
    };

    const renderPinDots = () => {
        return (
            <View style={styles.dotsContainer}>
                {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            { backgroundColor: i < pin.length ? COLORS.primary : COLORS.white },
                        ]}
                    />
                ))}
            </View>
        );
    };

    const renderKeypad = () => {
        const keys = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['face', '0', 'fingerprint'],
        ];

        return keys.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keypadRow}>
                {row.map((key) => {
                    if (key === 'face' || key === 'fingerprint') {
                        return (
                            <TouchableOpacity
                                key={key}
                                style={styles.biometricKey}
                                onPress={handleBiometricAuth}
                            >
                                <Image style={styles.biomatricImages} source={key === 'face' ? IMAGES.Face : IMAGES.FIngerprint} />
                            </TouchableOpacity>
                        );
                    } else {
                        return (
                            <TouchableOpacity
                                key={key}
                                style={styles.key}
                                onPress={() => handleNumberPress(key)}
                            >
                                <Text style={styles.keyText}>
                                    {key}
                                </Text>
                            </TouchableOpacity>
                        );
                    }
                })}
            </View>
        ));
    };

    const setPinFun = async () => {
        try {
            setLoading(true)
            if (pin.length === 5) {

                let getData = await AsyncStorage.getItem("loginData")
                getData = JSON.parse(getData)
                const number = getData?.number;
                console.log(number)
                if (pin) {
                    console.log("start...")
                    let response = await fetch(updatePin + `/${number}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ pin })
                    })
                    console.log(response)
                    response = await response.json();

                    if (response.response === "ok") {
                        setLoading(false);
                        Alert.alert("Congrats", "Pin updated successfully")
                        navigation.navigate("BottomTabs")
                    }
                    else {
                        setLoading(false)
                        Alert.alert("Oops", response.result)
                    }
                }
                else {
                    setLoading(false)
                    Alert.alert("Oops", "Enter your pin")
                }
            }
            else {
                setLoading(false)
                Alert.alert("pin not complete")
            }
        }
        catch (err) {
            setLoading(false)
            setPin('');
            Alert.alert("Error" + err)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Header title={"Update Pin Code"} onPress={() => navigation.goBack()} />
            <Text style={styles.pleaseText}>Please set your own Pin Code</Text>
            <Text style={styles.title}>Set Pin Code (5-digit)</Text>
            {renderPinDots()}
            <View style={styles.keypadContainer}>{renderKeypad()}</View>

            <Buttons onPress={setPinFun} title={"Set"} buttonStyle={styles.buttonStyle} />
            {
                loading && <View style={styles.loadingView}>
                    <ActivityIndicator color={COLORS.primary} size={50} />
                </View>
            }
        </View>
    );
};

export default UpdatePin;
