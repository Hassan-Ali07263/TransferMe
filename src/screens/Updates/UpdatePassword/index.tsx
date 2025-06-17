import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { IMAGES } from '../../../assets/images';
import Input from '../../../components/Input';
import { COLORS } from '../../../enums/fontStyles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Buttons from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { isEmailValid, isStrongPassword } from '../../../utills/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatePassword } from '../../../api';
const UpdatePassword = () => {
    const navigation = useNavigation();

    const [isFocusPassword, setIsFocusPassword] = useState(false);
    const [isFocusConfirmPassword, setIsFocusConfirmPassword] = useState(false);
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState("")

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (password.trim() === "") {
            setPasswordErr("enter your password")
            setLoading(false);
            return;
        }
        if (!isStrongPassword(password)) {
            setPasswordErr("Password must be at least 6 characters long")
            setLoading(false)
            return;
        }
        setPasswordErr("");

        if (confirmPassword.trim() === "") {
            setConfirmPasswordErr("enter your password")
            setLoading(false)
            return;
        }
        if (!isStrongPassword(confirmPassword)) {
            setConfirmPasswordErr("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }
        setConfirmPasswordErr("");

        if (password != confirmPassword) {
            setConfirmPasswordErr("password does not match");
            setPasswordErr("Password does not match")
            setLoading(false);
            return
        }
        setPasswordErr("");
        setConfirmPasswordErr("");
    }, [password, confirmPassword])


    const signupFun = async () => {
        try {
            setLoading(true);

            let getData = await AsyncStorage.getItem("loginData")
            getData = JSON.parse(getData)
            const id = getData?.userId;
            console.log(id)

            if (password && confirmPassword && passwordErr == "" && confirmPasswordErr == "") {
                console.log("function start ...")

                let response = await fetch(updatePassword + `/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ password, confirmPassword })
                })
                console.log(response)
                response = await response.json();

                if (response.response === "ok") {
                    setLoading(false);
                    Alert.alert("Congrats", "password updated successfully")
                    navigation.navigate("BottomTabs")
                }
                else {
                    setLoading(false)
                    Alert.alert("Oops", response.result)
                }
            }

            else {
                Alert.alert("Oops", "Something went wrong")
            }
        }
        catch (err) {
            setLoading(false)
            console.log(err)
            Alert.alert("Error" + err)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <View style={styles.container} >
            <Image source={IMAGES.Logo} resizeMode='contain' style={styles.logoStyle} />
            <Text style={styles.loginText}>Update Password</Text>

            <Text style={[isFocusPassword || password ? styles.focusedTextStyle : styles.emailText]}>Password</Text>
            <Input
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder={"********"}
                placeholderColor={COLORS.grey}
                onFocus={() => setIsFocusPassword(true)}
                onBlur={() => setIsFocusPassword(false)}
                inputView={[isFocusPassword || password ? styles.emailInputStyle : null]}
                keyboardType={"default"}
                onRight={<Ionicons name={showPassword ? "eye-off" : "eye"} color={COLORS.grey} size={25} />}
                onPress={() => setShowPassword(!showPassword)}
                secureTextEntry={showPassword}
            />
            {
                passwordErr && password ? <Text style={styles.errorText}>{passwordErr}</Text> : null
            }

            <Text style={[isFocusConfirmPassword || confirmPassword ? styles.focusedTextStyle : styles.emailText]}>Confirm Password</Text>
            <Input
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                placeholder={"********"}
                placeholderColor={COLORS.grey}
                onFocus={() => setIsFocusConfirmPassword(true)}
                onBlur={() => setIsFocusConfirmPassword(false)}
                inputView={[isFocusConfirmPassword || confirmPassword ? styles.emailInputStyle : null]}
                keyboardType={"default"}
                onRight={<Ionicons name={showConfirmPassword ? "eye-off" : "eye"} color={COLORS.grey} size={25} />}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                secureTextEntry={showConfirmPassword}
            />
            {
                confirmPasswordErr && confirmPassword ? <Text style={styles.errorText}>{confirmPasswordErr}</Text> : null
            }

            <Buttons onPress={signupFun} title={"Update"} buttonStyle={styles.buttonStyle} />

            {
                loading && <View style={styles.loadingView}>
                    <ActivityIndicator color={COLORS.primary} size={50} />
                </View>
            }
        </View>
    );
}
export default UpdatePassword;