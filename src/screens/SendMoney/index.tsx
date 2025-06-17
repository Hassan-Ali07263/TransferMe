import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import { COLORS } from '../../enums/fontStyles';
import { IMAGES } from '../../assets/images';
import { isValidNumber } from '../../utills/Helper';
import Buttons from '../../components/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMoney, loginApi } from '../../api';

const SendMoney = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [isFocusNumber, setIsFocusNumber] = useState(false);
  const [numberErr, setNumberErr] = useState("")
  const [money, setMoney] = useState("");

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
      setNumberErr("Enter your number")
      return;
    }
    if (!isValidNumber(number)) {
      setNumberErr("Enter valid number")
      return;
    }
    setNumberErr("");
  }, [number])

  const nextFunction = async () => {
    try {
      if (number && numberErr === "") {
        setLoading(true)
        let data = await fetch(loginApi + `/${number}`)
        data = await data.json();
        console.log(data)
        if (data.response === "ok") {
          setLoading(false)
          navigation.navigate("AddAmount", { number })
        }
        else {
          setLoading(false)
          Alert.alert("Oops", data.result)
        }
      }
      else {
        setLoading(false)
        Alert.alert("Oops", "Enter valid number")
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



  return (
    <View style={styles.container}>
      <Header onPress={() => navigation.goBack()} title={"Top-up Sim Card"} />

      <Text style={styles.availableText}>Available Balance</Text>
      {
        money ? <Text style={styles.monetText}>${money}</Text> : <ActivityIndicator style={{ marginHorizontal: "5%" }} color={COLORS.primary} size={35} animating />
      }
      <Text style={styles.descriptionText}>Please, enter the Sim Card Number in below field.</Text>
      <Text style={[isFocusNumber || number ? styles.focusedTextStyle : styles.emailText]}>Mobile Phone No.</Text>
      <Input
        value={number}
        onChangeText={(text) => setNumber(text)}
        placeholder={"+1 8456 5846 5846"}
        placeholderColor={COLORS.grey}
        onFocus={() => setIsFocusNumber(true)}
        onBlur={() => setIsFocusNumber(false)}
        inputView={[isFocusNumber || number ? styles.emailInputStyle : null]}
        keyboardType={"numbers-and-punctuation"}
        onRight={!numberErr && number ? <Image style={styles.chckImage} resizeMode='contain' source={IMAGES.Check} /> : null}
      />
      {
        numberErr && number ? <Text style={styles.errorText}>{numberErr}</Text> : null
      }

      <Buttons onPress={nextFunction} title={"Next"} buttonStyle={styles.buttonStyle} />

      {
        loading && <View style={styles.loadingView}>
          <ActivityIndicator color={COLORS.primary} size={50} />
        </View>
      }
    </View>
  );
}
export default SendMoney;