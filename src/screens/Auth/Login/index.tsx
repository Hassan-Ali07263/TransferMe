import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import Input from '../../../components/Input';
import { COLORS } from '../../../enums/fontStyles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Buttons from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { isValidNumber } from '../../../utills/Helper';
import { loginApi } from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const navigation = useNavigation();

  const [number, setNumber] = useState('');
  const [isFocusNumber, setIsFocusNumber] = useState(false);
  const [numberErr, setNumberErr] = useState("")
  const [loading, setLoading] = useState(false);

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

  const loginFunction = async () => {
    try {

      if (number && numberErr === "") {
        setLoading(true)
        console.log("fun start ")
        let response = await fetch(loginApi + `/${number}`, {
          method: "GET"
        })
        response = await response.json();
        console.log(response)

        if (response.response === "ok") {
          console.log("console in response fun")
          setLoading(false)
          await AsyncStorage.setItem("loginData", JSON.stringify(response.result)); // use 'result', not 'data'
          const loginDataString = await AsyncStorage.getItem("loginData");
          const loginData = JSON.parse(loginDataString);
          console.log("number in async storage is ", loginData);
          navigation.navigate("LoginViaPin", { number })
        }
        else {
          setLoading(false)
          Alert.alert("Oops", response.result)
        }
      }
      else {
        setLoading(false);
        Alert.alert("Oops", "Enter valid number")
      }
    }
    catch (err) {
      setLoading(false)
      Alert.alert("Error" + err)
    }
  }

  return (
    <View style={styles.container} >
      <Image source={IMAGES.Logo} resizeMode='contain' style={styles.logoStyle} />
      <Text style={styles.loginText}>Log in</Text>

      <Text style={[isFocusNumber || number ? styles.focusedTextStyle : styles.emailText]}>Phone Number</Text>
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

      <Buttons onPress={loginFunction} title={"Log In"} buttonStyle={styles.buttonStyle} />

      <View style={styles.orView}>
        <View style={styles.lineView} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.lineView} />
      </View>

      <View style={styles.googleFacbookView}>
        <TouchableOpacity>
          <Image style={styles.googleIMage} source={IMAGES.Google} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image style={styles.googleIMage} source={IMAGES.Facebook} />
        </TouchableOpacity>
      </View>

      <View style={styles.noAccountView}>
        <Text style={styles.noAccountText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {
        loading && <View style={styles.loadingView}>
          <ActivityIndicator color={COLORS.primary} size={50} />
        </View>
      }
    </View>
  );
}
export default Login;