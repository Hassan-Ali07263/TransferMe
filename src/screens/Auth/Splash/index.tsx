import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  const checkIn = async () => {
    let user = await AsyncStorage.getItem("loginData");
    if (user) {
      navigation.navigate("Login")
    }
    else {
      navigation.navigate("Welcome")
    }
  }

  useEffect(() => {
    setTimeout(() => {
      checkIn();
    }, 3000);
  }, [])
  return (
    <View style={styles.container}>
      <View></View>
      <View style={styles.logoView}>
        <Image style={styles.logoStyle} resizeMode='contain' source={IMAGES.Logo} />
        <Text style={styles.transferMeText}>TransferMe</Text>
        <Text style={styles.bestPartnerText}>Your Best Money Transfer Partner</Text>
      </View>

      <View style={styles.secureView}>
        <Text style={styles.secureText}>Secured by </Text>
        <Text style={styles.transferText}>TransferMe.</Text>
      </View>
    </View>
  );
}
export default Splash;