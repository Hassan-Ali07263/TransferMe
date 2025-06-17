import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import { AccountSecurity } from '../../../constants';
import Buttons from '../../../components/Buttons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { countQuestion } from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMAGES } from '../../../assets/images';

const SecurityQuestions = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const params = route.params || {};
    const { answer, question } = params;
    console.log(answer, question)
    const [questionApi, setQuestionApi] = useState([]);
    const [count, setCount] = useState();

    const getCountData = async () => {
        let getData = await AsyncStorage.getItem("user")
        console.log(getData)
        getData = JSON.parse(getData)
        const id = getData._id;
        console.log(id)
        let response = await fetch(countQuestion + `/${id}`)
        response = await response.json();
        console.log(response)
        setCount(response.count)
        const questionsArray = response.result.map(item => item.question);
        console.log("Extracted Questions:", questionsArray);
        console.log("runnninggggggg")
        setQuestionApi(questionsArray);
    }

    useEffect(() => {
        getCountData();
    }, [])

    const renderItem = ({ item }) => {
        const isMatched = questionApi.includes(item.question)
        console.log(isMatched)
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("SecurityQuestion", { item })}
                activeOpacity={.5}
                style={[
                    styles.questionButton,
                    isMatched && styles.matchedButton
                ]}>
                <Text style={styles.questionText}>{item.question}</Text>
                {
                    isMatched && <Image style={styles.checkImage} resizeMode='contain' source={IMAGES.Check} />
                }
            </TouchableOpacity>
        )
    }

    const saveFun = () => {
        if (count >= 3) {
            navigation.navigate("CreatePin")
        }
        else {
            Alert.alert("Oops", "Please fill atleast three questions")
        }
    }
    return (
        <View style={styles.container}>
            <Header title={"Security Questions"} onPress={() => navigation.goBack()} />
            <Text style={styles.queryText}>Please, add atleast 3 Questions to keep your account secured in case you forget your credentials.</Text>

            <FlatList
                data={AccountSecurity}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            <Buttons onPress={saveFun} buttonStyle={styles.buttonStyle} title={"Save"} />
        </View>
    );
}
export default SecurityQuestions;