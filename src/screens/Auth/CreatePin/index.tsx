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
import { signupPin } from '../../../api';
import Success from '../../../components/Success';

const PIN_LENGTH = 5;

const CreatePin = () => {
    const navigation = useNavigation();
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

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
                const number = await AsyncStorage.getItem("number");
                console.log(number)

                let getData = await AsyncStorage.getItem("user")
                getData = JSON.parse(getData)
                const userId = getData._id;
                console.log(userId)

                const data = {
                    number,
                    userId,
                    pin
                }

                let response = await fetch(signupPin, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                response = await response.json();
                console.log(response)

                if (response.result === "data saved") {
                    setLoading(false)
                    setPin('');
                    await AsyncStorage.setItem("signup", "true")
                    setOpen(true)
                }
                else {
                    setLoading(false)
                    setPin('')
                    Alert.alert("Oops", response.result)
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
            Alert.alert("Error", err)
        }
    }

    const modalButtonFun = async () => {
        navigation.navigate("Login")
        setOpen(false)

    }
    return (
        <View style={styles.container}>
            <Header title={"Set Pin Code"} onPress={() => navigation.goBack()} />
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

            <Success visible={open} description={"Account Registed Successfully"} onPressModal={modalButtonFun} />

        </View>
    );
};

export default CreatePin;
