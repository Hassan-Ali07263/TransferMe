import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../assets/images';
import Cards from '../../components/Cards';
import SeeAll from '../../components/SeeAll';
import Incomings from '../../components/Incomings';
import Outgoings from '../../components/Outgoings';
import { useNavigation } from '@react-navigation/native';
import { getMoney, incomingHistory } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../enums/fontStyles';

const Home = () => {
  const navigation = useNavigation();
  const [money, setMoney] = useState("");
  const [outgoings, setOutgoings] = useState([]);

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
    renderMoney();
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.headerView}>
        <TouchableOpacity>
          <Image style={styles.menuImage} resizeMode='contain' source={IMAGES.Menu} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.bellImage} resizeMode='contain' source={IMAGES.Bell} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.moneyTransferView}>
          <View>
            <Text style={styles.currentText}>Current Balance</Text>
            <View style={styles.moneyView}>
              {
                money ? <Text style={styles.balanceText}>${money}</Text> : <ActivityIndicator style={{ marginHorizontal: "5%" }} color={COLORS.primary} size={35} animating />
              }
              <TouchableOpacity onPress={renderMoney}>
                <Image style={styles.reloadImage} source={IMAGES.Reload} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("SendMoney")}
            style={styles.sendButton}>
            <Image style={styles.sendMoney} source={IMAGES.MoneyTransfer} />
          </TouchableOpacity>
        </View>

        <Cards />
        <SeeAll title={"Incoming Transactions"} />

        <Incomings />

        <SeeAll title={"Outgoing Transactions"} />

        <Outgoings />

      </ScrollView>
    </View>
  );
}
export default Home;