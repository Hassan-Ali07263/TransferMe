import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import { COLORS } from '../../enums/fontStyles';
import { IMAGES } from '../../assets/images';
import Buttons from '../../components/Buttons';
import { isValidCard, isValidCvv, isValidExpiry } from '../../utills/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cardData } from '../../api';
import Success from '../../components/Success';

const AddCard = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [open,setOpen]=useState(false);

  const [number, setNumber] = useState('');
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [isFocusNumber, setIsFocusNumber] = useState(false);
  const [isFocusName, setIsFocusName] = useState(false)
  const [isFocusExpiry, setIsFocusExpiry] = useState(false)
  const [isFocusCvv, setIsFocusCvv] = useState(false)

  const [numberErr, setNumberErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [expiryErr, setExpiryErr] = useState("");
  const [cvvErr, setCvvErr] = useState("");


  useEffect(() => {
    if (number.trim() === "") {
      setNumberErr("Enter your card number")
      return;
    }
    if (!isValidCard(number)) {
      setNumberErr("Enter valid card number")
      return;
    }
    setNumberErr("");

    if (name.trim() === "") {
      setNameErr("Enter your name")
      return;
    }
    setNameErr("");

    if (expiry.trim() === "") {
      setExpiryErr("Enter expiry date")
      return;
    }
    if (!isValidExpiry(expiry)) {
      setExpiryErr("Enter valid expiry date")
      return;
    }
    setExpiryErr("");

    if (cvv.trim() === "") {
      setCvvErr("Enter your card CVV")
      return;
    }
    if (!isValidCvv(cvv)) {
      setCvvErr("Enter valid CVV number");
      return;
    }
    setCvvErr("")

  }, [number, name, expiry, cvv])


  const nextFunction = async () => {
    try {
      if (number && numberErr === "" && name && expiry && cvv && nameErr === "" && expiryErr === "" && cvvErr === "") {
        setLoading(true)
        let getNumber = await AsyncStorage.getItem("loginData");
        getNumber = await JSON.parse(getNumber);
        const phoneNumber = getNumber.number;
        const userId = getNumber.userId;

        const data = {
          userId: userId,
          number: phoneNumber,
          cardNumber: number,
          name: name,
          expiry: expiry,
          cvv: cvv
        }

        let response=await fetch(cardData,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        })
        response = await response.json();
        if(response.response==="ok"){
          setLoading(false);
          setOpen(true)
        }
        else{
          setLoading(false)
          Alert.alert("Oops",response.result)
        }
      }
      else {
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

  const modalButtonFun=()=>{
    navigation.navigate("BottomTabs")
    setOpen(false)
  }


  return (
    <View style={styles.container}>
      <Header onPress={() => navigation.goBack()} title={"Add Card"} />

      <Text style={styles.descriptionText}>To add a new card, please fill out the fields below carefully in order to add card successfully.</Text>
      <Text style={[isFocusNumber || number ? styles.focusedTextStyle : styles.emailText]}>Card Number</Text>
      <Input
        value={number}
        onChangeText={(text) => setNumber(text)}
        placeholder={"0931-5131-5321-6477"}
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

      <Text style={[isFocusName || name ? styles.focusedTextStyle : styles.emailText]}>Holder's Name</Text>
      <Input
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder={"William Smith"}
        placeholderColor={COLORS.grey}
        onFocus={() => setIsFocusName(true)}
        onBlur={() => setIsFocusName(false)}
        inputView={[isFocusName || name ? styles.emailInputStyle : null]}
        keyboardType={"default"}
        onRight={!nameErr && name ? <Image style={styles.chckImage} resizeMode='contain' source={IMAGES.Check} /> : null}
      />

      {
        nameErr && name ? <Text style={styles.errorText}>{nameErr}</Text> : null
      }

      <Text style={[isFocusExpiry || expiry ? styles.focusedTextStyle : styles.emailText]}>Expiry Date</Text>
      <Input
        value={expiry}
        onChangeText={(text) => setExpiry(text)}
        placeholder={"11/25"}
        placeholderColor={COLORS.grey}
        onFocus={() => setIsFocusExpiry(true)}
        onBlur={() => setIsFocusExpiry(false)}
        inputView={[isFocusExpiry || expiry ? styles.emailInputStyle : null]}
        keyboardType={"numbers-and-punctuation"}
        onRight={!expiryErr && expiry ? <Image style={styles.chckImage} resizeMode='contain' source={IMAGES.Check} /> : null}
      />
      {
        expiryErr && expiry ? <Text style={styles.errorText}>{expiryErr}</Text> : null
      }

      <Text style={[isFocusCvv || cvv ? styles.focusedTextStyle : styles.emailText]}>CVV</Text>
      <Input
        value={cvv}
        onChangeText={(text) => setCvv(text)}
        placeholder={"8824"}
        placeholderColor={COLORS.grey}
        onFocus={() => setIsFocusCvv(true)}
        onBlur={() => setIsFocusCvv(false)}
        inputView={[isFocusCvv || cvv ? styles.emailInputStyle : null]}
        keyboardType={"numeric"}
        onRight={!cvvErr && cvv ? <Image style={styles.chckImage} resizeMode='contain' source={IMAGES.Check} /> : null}
      />
      {
        cvvErr && cvv ? <Text style={styles.errorText}>{cvvErr}</Text> : null
      }

      <Buttons onPress={nextFunction} title={"Confirm"} buttonStyle={styles.buttonStyle} />

      {
        loading && <View style={styles.loadingView}>
          <ActivityIndicator color={COLORS.primary} size={50} />
        </View>
      }

      <Success visible={open} description={"Card added Successfully"} onPressModal={modalButtonFun} />
    </View>
  );
}
export default AddCard;