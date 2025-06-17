import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import Buttons from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View></View>
            <View>
                <Image style={styles.logoStyle} resizeMode='contain' source={IMAGES.Logo} />
                <Text style={styles.welcomeText}>Welcome to</Text>
                <Text style={styles.transferMeText}>TransferMe.</Text>

                <Text style={styles.partnerText}>Your Best Monet Transfer Partner.</Text>
            </View>

            <Buttons onPress={() => navigation.navigate("Onboarding")} title={"Get Started"} />
        </View>
    );
}
export default Welcome;