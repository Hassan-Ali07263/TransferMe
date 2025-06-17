import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../../assets/images';
import Input from '../../../components/Input';
import { COLORS } from '../../../enums/fontStyles';
import Buttons from '../../../components/Buttons';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveProfile } from '../../../api';

const Profile = () => {
  const navigation = useNavigation();

  const [isFocusFirstName, setIsFocusFirstName] = useState(false);
  const [isFocusLastName, setIsFocusLastName] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [id, setId] = useState('');

  const [loading, setLoading] = useState(false);

  const [imageErr, setImageErr] = useState(false);
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("")

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImage(imageUri);
        console.log(imageUri)
      }
    });
  };

  useEffect(() => {
    if (image.trim() === "") {
      setImageErr(true)
      setLoading(false)
      return;
    }
    setImageErr(false)

    if (firstName.trim() === "") {
      setFirstNameErr("please enter correct name")
      setLoading(false);
      return;
    }
    setFirstNameErr("");

    if (lastName.trim() === "") {
      setLastNameErr("Please enter correct name");
      setLoading(false);
      return;
    }
    setLastNameErr("");
  }, [image, firstName, lastName])

  const setFunction = async () => {
    try {
      setLoading(true)
      if (firstName && lastName && image) {
        if (imageErr === false && firstNameErr === "" && lastNameErr === "") {
          console.log("inner function start");
          const data = await AsyncStorage.getItem("user")
          const userData = JSON.parse(data);
          console.log("id is ", userData._id)
          setId(userData._id);

          const formData = new FormData();
          formData.append("firstName", firstName);
          formData.append("lastName", lastName);
          formData.append("userId", id);
          formData.append("image", {
            uri: image,
            name: 'photo.png',
            type: "image/png"
          })
          console.log("form data is ", formData)
          const response = await fetch(saveProfile, {
            method: "post",
            headers: {
              'Content-type': 'multipart/form-data'
            },
            body: formData
          })
          console.log("response is ", response)
          const res = await response.json();
          console.log("res is ", res)
          if (res.response === "ok") {
            Alert.alert("Profile data saved successfully")
            navigation.navigate("PhoneNumber")
          }
          else {
            Alert.alert("Error", "something went wrong")
          }
        }
      }
      else {
        setLoading(false)
        Alert.alert("Empty fields")
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
      <Header title={"Profile"} onPress={() => navigation.goBack()} />
      <Text style={styles.pleaseText}>Please set up your profile</Text>
      {
        imageErr && image ? <Text style={styles.errorText}>Image error</Text> : null
      }
      <TouchableOpacity onPress={openImagePicker}
        style={imageErr && image ? styles.uploadViewErr : styles.uploadView}>
        {image ?
          <Image style={styles.uploadedImage} source={{ uri: image }} /> :
          <Image style={styles.uploadImage} resizeMode='contain' source={IMAGES.Upload} />
        }
      </TouchableOpacity>


      <Text style={[isFocusFirstName || firstName ? styles.focusedTextStyle : styles.notFocusedStyle]}>First Name</Text>
      <Input
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        onFocus={() => setIsFocusFirstName(true)}
        onBlur={() => setIsFocusFirstName(false)}
        inputView={[isFocusFirstName || firstName ? styles.inputStyle : null]}
        keyboardType={"default"}
        placeholder={"Micheal"}
        placeholderColor={COLORS.grey_2}
        onRight={firstName && firstNameErr === "" ? <Image style={styles.checkImage} resizeMode='contain' source={IMAGES.Check} /> : null}
      />

      {
        firstNameErr && firstName ? <Text style={styles.nameErrorText}>{firstNameErr}</Text> : null
      }

      <Text style={[isFocusLastName || lastName ? styles.focusedTextStyle : styles.notFocusedStyle]}>Last Name</Text>
      <Input
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        onFocus={() => setIsFocusLastName(true)}
        onBlur={() => setIsFocusLastName(false)}
        inputView={[isFocusLastName || lastName ? styles.inputStyle : null]}
        keyboardType={"default"}
        placeholder={"Starc"}
        placeholderColor={COLORS.grey_2}
        onRight={lastName && lastNameErr === "" ? <Image style={styles.checkImage} resizeMode='contain' source={IMAGES.Check} /> : null}
      />
      {
        lastNameErr && lastName ? <Text style={styles.nameErrorText}>{lastNameErr}</Text> : null
      }

      <Buttons onPress={setFunction} title={"Set"} buttonStyle={styles.buttonStyle} />

      {
        loading && <View style={styles.loadingView}>
          <ActivityIndicator color={COLORS.primary} size={50} />
        </View>
      }

    </View>
  );
}
export default Profile;