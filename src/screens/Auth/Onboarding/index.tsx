import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';
import { styles } from './styles';
import { OnboardingList } from '../../../constants';
import Buttons from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentIndex < OnboardingList.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("Login")
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.flatListView}>
        <Image style={styles.imageStyle} resizeMode='contain' source={item.image} />
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>

        <Buttons onPress={handleNext} title={"Continue"} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={OnboardingList}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
          );
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1, marginVertical: "10%" }}
      />

    </View>
  );
}
export default Onboarding;