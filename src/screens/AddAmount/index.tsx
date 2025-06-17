import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import { COLORS } from '../../enums/fontStyles';
import { IMAGES } from '../../assets/images';
import Buttons from '../../components/Buttons';
import Success from '../../components/Success';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMoney, sendAmount } from '../../api';

const AddAmount = ({ route }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState('');
    const [isFocusNumber, setIsFocusNumber] = useState(false);
    const [numberErr, setNumberErr] = useState("")
    const [open, setOpen] = useState(false)
    const [money, setMoney] = useState("");

    const recieverNumber = route.params.number;
    console.log(recieverNumber)

    const renderMoney = async () => {
        let getNumber = await AsyncStorage.getItem("loginData");
        getNumber = await JSON.parse(getNumber);
        const number = getNumber.number;

        let data = await fetch(getMoney + `/${number}`);

        data = await data.json();

        console.log(data.result.amount);
        setMoney(data.result.amount);
    }

    useEffect(() => {
        renderMoney()
    }, [])


    useEffect(() => {
        if (number.trim() === "") {
            setNumberErr("Enter your amount")
            return;
        }
        if (number <= "0") {
            setNumberErr("Enter valid amount")
            return;
        }
        if (Number(number) > Number(money)) {
            setNumberErr("Enter valid amount")
            return;
        }
        setNumberErr("");
    }, [number])

    const nextFunction = async () => {
        try {
            setLoading(true)
            if (number && numberErr === "") {
                let getSenderData = await AsyncStorage.getItem("loginData");
                getSenderData = await JSON.parse(getSenderData);
                const senderNumber = getSenderData.number;
                const senderId = getSenderData.userId;

                const data = {
                    senderUserId: senderId,
                    senderNumber: senderNumber,
                    recieverNumber: recieverNumber,
                    amount: number
                }

                let sending = await fetch(sendAmount, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                sending = await sending.json();

                if (sending.response === "ok") {
                    setOpen(true)
                }
                else {
                    Alert.alert("Oops", sending.result)
                }

            }
            else {
                Alert.alert("Oops", "Enter valid amount")
            }
        }
        catch (err) {
            setLoading(false)
            Alert.alert("Error" + err)
        }
        finally {
            setLoading(false)
        }

    }

    const modalButtonFun = async () => {
        navigation.navigate("BottomTabs")
        setNumber("")
        setOpen(false)

    }


    return (
        <View style={styles.container}>
            <Header onPress={() => navigation.goBack()} title={"Top-up Sim Card"} />

            <Text style={styles.availableText}>Available Balance</Text>
            {
                money ? <Text style={styles.monetText}>${money}</Text> : <ActivityIndicator style={{ marginHorizontal: "5%" }} color={COLORS.primary} size={35} animating />
            }
            <Text style={styles.descriptionText}>Please, enter the amount of Sim Card Number Top-up in below field.</Text>
            <Text style={[isFocusNumber || number ? styles.focusedTextStyle : styles.emailText]}>Enter Amount</Text>
            <Input
                value={number}
                onChangeText={(text) => setNumber(text)}
                placeholder={"Rs. 0000"}
                placeholderColor={COLORS.grey}
                onFocus={() => setIsFocusNumber(true)}
                onBlur={() => setIsFocusNumber(false)}
                inputView={[isFocusNumber || number ? styles.emailInputStyle : null]}
                keyboardType={"numeric"}
                onRight={!numberErr && number ? <Image style={styles.chckImage} resizeMode='contain' source={IMAGES.Check} /> : null}
            />
            {
                numberErr && number ? <Text style={styles.errorText}>{numberErr}</Text> : null
            }

            <Buttons onPress={nextFunction} title={"Send"} buttonStyle={styles.buttonStyle} />

            {
                loading && <View style={styles.loadingView}>
                    <ActivityIndicator color={COLORS.primary} size={50} />
                </View>
            }
            <Success visible={open} description={"Money Transfered Successfully"} onPressModal={modalButtonFun} />
        </View>
    );
}
export default AddAmount;