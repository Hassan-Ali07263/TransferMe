import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, ImageBackground, Alert } from 'react-native';
import { styles } from './styles';
import Header from '../../components/Header';
import Cards from '../../components/Cards';
import { IMAGES } from '../../assets/images';
import Buttons from '../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCardData } from '../../api';

const CardDetail = () => {
  const navigation = useNavigation();
  const [cardData, setCardData] = useState([]);

  const renderCards = async () => {
    let getNumber = await AsyncStorage.getItem("loginData");
    getNumber = await JSON.parse(getNumber);
    const number = getNumber.number;

    let response = await fetch(getCardData + `/${number}`);
    response = await response.json();
    if (response.response === "ok") {
      setCardData(response.result)
    }
  }

  useEffect(() => {
    renderCards();
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View>
        <ImageBackground style={styles.cardImage} source={IMAGES.Card}>
          <View style={styles.topView}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.numberText}>{item?.cardNumber.replace(/(.{4})/g, '$1  ').trim()}</Text>
            </View>
            <View style={styles.expiryView}>
              <Text style={styles.nameText}>A Debit Card</Text>
              <Text style={styles.expiryText}>{item.expiry}</Text>
            </View>
          </View>

          <View style={styles.topView}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>CVV</Text>
              <Text style={styles.numberText}>{item.cvv}</Text>
            </View>
            <Text style={styles.visaText}>Visa</Text>
          </View>
        </ImageBackground>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Header headerContainer={styles.headerStyle} title={"Card Details"} />

      <Cards />

      <View style={styles.mainView}>
        <View style={styles.moneyContainer}>
          <View style={styles.topView}>
            <Text style={styles.typeText}>USD</Text>
            <Image style={styles.arrowImage} source={IMAGES.IncomingArrowWhite} />
          </View>
          <Text style={styles.moneyText}>72.26</Text>
        </View>

        <View style={styles.moneyContainerSend}>
          <View style={styles.topView}>
            <Text style={styles.typeText}>Euro</Text>
            <Image style={styles.arrowImage} source={IMAGES.OutgoingArrowWhite} />
          </View>
          <Text style={styles.moneyText}>34.61</Text>
        </View>

        <View style={styles.moneyContainerSend}>
          <View style={styles.topView}>
            <Text style={styles.typeText}>Yen</Text>
            <Image style={styles.arrowImage} source={IMAGES.OutgoingArrowWhite} />
          </View>
          <Text style={styles.moneyText}>95.21</Text>
        </View>

      </View>

      <Buttons onPress={() => navigation.navigate("AddCard")} buttonStyle={styles.buttonStyle} title={"Add Card"} />

      <Text style={styles.allCardText}>All Cards</Text>
      <ScrollView>
        <View>
          {
            cardData.length > 0 ?
              <FlatList
                data={cardData}
                renderItem={renderItem}
                contentContainerStyle={{ marginBottom: "27%" }}
              /> : <View style={styles.noDataView}>
                <Text style={styles.noDataText}>No Card Data Found</Text>
              </View>}
        </View>
      </ScrollView>
    </View>
  );
}
export default CardDetail;