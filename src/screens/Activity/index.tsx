import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { styles } from './styles';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SeeAll from '../../components/SeeAll';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../../enums/fontStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { incomingHistory, outgoingHistory } from '../../api';

const Activity = () => {
  const [search, setSearch] = useState('');

  const screenWidth = Dimensions.get('window').width;

  const [incomings, setIncomings] = useState([]);
  const [outgoings, setOutgoings] = useState([]);

  const renderIncomings = async () => {
    let getNumber = await AsyncStorage.getItem("loginData");
    getNumber = await JSON.parse(getNumber);
    const number = getNumber.number;

    let getData = await fetch(incomingHistory + `/${number}`);
    getData = await getData.json();
    const amounts = getData?.result?.map(item => item.amountRecieved);
    setIncomings(amounts)
  }

  const renderOutgoings = async () => {
    let getNumber = await AsyncStorage.getItem("loginData");
    getNumber = await JSON.parse(getNumber);
    const number = getNumber.number;

    let getData = await fetch(outgoingHistory + `/${number}`);
    getData = await getData.json();
    const amounts = getData?.result?.map(item => item.amountSend);
    console.log(amounts)
    setOutgoings(amounts)
  }

  useEffect(() => {
    renderIncomings();
    renderOutgoings();
  }, [])

  const incomingData = {
    labels: [],
    datasets: [
      {
        data: incomings.length > 0 ? incomings : [0],
      },
    ],
  };

  const outgoingData = {
    labels: [],
    datasets: [
      {
        data: outgoings.length > 0 ? outgoings : [0],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Header headerContainer={styles.headerContainer} title={"Activity"} />

      <ScrollView>
        <Input inputView={styles.inputView}
          styleInput={styles.inputStyle}
          placeholder={"Search"}
          placeholderColor={"rgba(0,0,0,.25)"}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />

        <SeeAll title={"Overall Incomings"} />

        <View>
          <LineChart
            data={incomingData}
            width={screenWidth - 40}
            height={275}

            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            segments={0}
            fromZero={true}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 0) => COLORS.blue_3,
              labelColor: () => 'transparent',
              style: {
                borderRadius: 20,
              },
              propsForDots: {
                r: '3',
              },

            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              alignSelf: 'center',
              paddingRight: 15,
              paddingLeft: 15,
            }}
          />
        </View>

        <SeeAll title={"Overall Outgoings"} />

        <View>
          <LineChart
            data={outgoingData}
            width={screenWidth - 40}
            height={275}

            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            segments={0}
            fromZero={true}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 0) => COLORS.blue_4,
              labelColor: () => 'transparent',
              style: {
                borderRadius: 20,
              },
              propsForDots: {
                r: '3',
              },

            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              alignSelf: 'center',
              paddingRight: 15,
              paddingLeft: 15,
              marginBottom: "32%"
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
export default Activity;