import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Input from '../../../components/Input';
import { COLORS } from '../../../enums/fontStyles';
import { IMAGES } from '../../../assets/images';
import Buttons from '../../../components/Buttons';
import { isValidNumber } from '../../../utills/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendOtp } from '../../../api';

const PhoneNumber = () => {
  const navigation = useNavigation();

  const [number, setNumber] = useState('');
  const [isFocus, setIsFocus] = useState(false)
  const [numberErr, setNumberErr] = useState("")
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (number.trim() === "") {
      setNumberErr("Enter your number")
      setLoading(false)
      return;
    }
    setNumberErr("");

    if (!isValidNumber(number)) {
      setNumberErr("Enter valid number")
      setLoading(false);
      return;
    }
    setNumberErr("");

  }, [number])

  const confirmFunction = async () => {
    try {
      setLoading(true)
      if (number.trim() === "") {
        return Alert.alert("Error", "Enter your number")
      }
      if (number && numberErr === "") {
        await AsyncStorage.setItem("number",number)
        let getData = await AsyncStorage.getItem("user");
        console.log(getData);
        getData = JSON.parse(getData)
        const userId = getData._id;
        const data = { userId, number }
        console.log(data)
        let response = await fetch(sendOtp, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        console.log(response)
        response = await response.json();
        console.log(response);
        console.log(response.data)
        if (response.data) {
          navigation.navigate("PhoneVerification", { number })
        }
      }
      else {
        Alert.alert("Error", "Invalid number")
      }
    }
    catch (err) {
      setLoading(false)
      console.log(err)
      Alert.alert("Error"+ err)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      <Header title={"Phone Number"} onPress={() => navigation.goBack()} />

      <Text style={styles.pleaseText}>Please add your mobile phone number</Text>

      <Text style={[isFocus || number ? styles.focusedTextStyle : styles.notFocusedStyle]}>* Phone Number</Text>
      <Input
        value={number}
        onChangeText={(text) => setNumber(text)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        inputView={[isFocus || number ? styles.inputStyle : null]}
        keyboardType={"default"}
        placeholder={"+1 8456 5846 5846"}
        placeholderColor={COLORS.grey_2}
        onRight={number && numberErr === "" ? <Image style={styles.checkImage} resizeMode='contain' source={IMAGES.Check} /> : null}
      />
      {
        numberErr && number ? <Text style={styles.ErrorText}>{numberErr}</Text> : null
      }

      <Buttons onPress={confirmFunction} title={"Confirm"} buttonStyle={styles.buttonStyle} />

      {
        loading && <View style={styles.loadingView}>
          <ActivityIndicator color={COLORS.primary} size={50} />
        </View>
      }
    </View>
  );
}
export default PhoneNumber;