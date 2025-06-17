import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../../enums/fontStyles';
import Buttons from '../../../components/Buttons';
import { saveSecurityData } from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecurityQuestion = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;
    const question = item.question;
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const nextFunction = async () => {
        try {
            if (answer) {
                setLoading(true)
                let getData = await AsyncStorage.getItem("user")
                console.log(getData)
                getData = JSON.parse(getData)
                const userId = getData._id;
                console.log(userId)
                const data = {
                    userId,
                    question,
                    answer
                }
                let response = await fetch(saveSecurityData, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                console.log(response)
                response = await response.json();
                console.log(response)
                if (response.result === "Data saved") {
                    setLoading(false)
                    navigation.navigate("SecurityQuestions", { answer, question })
                }
                else {
                    setLoading(false)
                    Alert.alert(response.result)
                }
            }
        }
        catch (err) {
            setLoading(false)
            Alert.alert("Error" + err)
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <View style={styles.container}>
            <Header title={"Security Questions"} onPress={() => navigation.goBack()} />
            <Text style={styles.questionText}>{question}</Text>
            <Text style={styles.pleaseText}>Please, write a short answer in the field below.</Text>

            <View style={styles.inputView}>
                <TextInput style={styles.inputStyle}
                    placeholder='Write your answer here...'
                    placeholderTextColor={COLORS.primary}
                    numberOfLines={4}
                    multiline
                    value={answer}
                    onChangeText={(text) => setAnswer(text)}
                />
            </View>

            <Buttons onPress={nextFunction} title={"Save"} buttonStyle={styles.buttonStyle} />

            {
                loading && <View style={styles.loadingView}>
                    <ActivityIndicator color={COLORS.primary} size={50} />
                </View>
            }
        </View>
    );
}
export default SecurityQuestion;