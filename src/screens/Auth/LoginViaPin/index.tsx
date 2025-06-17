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
import { useNavigation, useRoute } from '@react-navigation/native';
import Buttons from '../../../components/Buttons';
import { intializaMoney, loginPin } from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PIN_LENGTH = 5;

const LoginViaPin = () => {
    const navigation = useNavigation();
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);

    const route = useRoute();
    const number = route.params?.number;
    console.log(number)

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

    const loginViaPinFunction = async () => {
        try {
            setLoading(true)

            if (pin.length === 5) {
                let response = await fetch(loginPin + `/${number}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ pin })
                })
                response = await response.json();
                console.log(response)
                if (response.result === "Matched") {
                    // setLoading(false);
                    setPin('');

                    let user = await AsyncStorage.getItem("loginData");
                    user = await JSON.parse(user);
                    const userId = user.userId;
                    console.log(userId)

                    const data = { userId, number };

                    let initializeMoney = await fetch(intializaMoney, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                    initializeMoney = await initializeMoney.json();
                    console.log(initializeMoney)
                    if (initializeMoney.result === "created") {
                        setLoading(false)
                        Alert.alert("Login successfully")
                        navigation.navigate("BottomTabs")
                    }
                    else if (initializeMoney.result === "Already initialized") {
                        setLoading(false)
                        Alert.alert("Successfully login")
                        navigation.navigate("BottomTabs")
                    }
                }
                else {
                    setLoading(false);
                    setPin('');
                    Alert.alert("Oops", response.result)
                }
            }
            else {
                setLoading(false)
                Alert.alert("Oops", "Looks like pin not complete")
            }
        }
        catch (err) {
            setLoading(false)
            setPin('');
            Alert.alert("Error" + err)
        }
    }
    return (
        <View style={styles.container}>
            <Header title={"Login"} onPress={() => navigation.goBack()} />
            <Text style={styles.pleaseText}>Please enter your Pin Code</Text>
            <Text style={styles.title}>Set Pin Code(5-digit)</Text>
            {renderPinDots()}
            <View style={styles.keypadContainer}>{renderKeypad()}</View>

            <Buttons onPress={loginViaPinFunction} title={"Go"} buttonStyle={styles.buttonStyle} />

            {
                loading && <View style={styles.loadingView}>
                    <ActivityIndicator color={COLORS.primary} size={50} />
                </View>
            }
        </View>
    );
};

export default LoginViaPin;
