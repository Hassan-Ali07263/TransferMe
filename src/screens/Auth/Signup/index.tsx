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
import { register } from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
    const navigation = useNavigation();

    const [isFocusEmail, setIsFocusEmail] = useState(false);
    const [isFocusPassword, setIsFocusPassword] = useState(false);
    const [isFocusConfirmPassword, setIsFocusConfirmPassword] = useState(false);
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState("")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (email.trim() === "") {
            setEmailErr("Enter your email");
            setLoading(false)
            return;
        }
        if (!isEmailValid(email)) {
            setEmailErr("Invalid email")
            setLoading(false)
            return;
        }
        setEmailErr("");

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
    }, [email, password, confirmPassword])


    const signupFun = async () => {
        try {
            setLoading(true);
            if (email && password && confirmPassword) {
                console.log("function start ...")
                if (emailErr === "" && passwordErr === "" && confirmPasswordErr === "") {
                    console.log("function start")
                    const data = {
                        email,
                        password,
                        confirmPassword
                    }
                    console.log("data is ", data)

                    let res = await fetch(register, {
                        method: "post",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                    console.log("res is ", res)
                    res = await res.json();
                    console.log(res)
                    if (res.result != "Email already registered") {
                        await AsyncStorage.setItem("user", JSON.stringify(res.result))
                        await AsyncStorage.setItem("token", res.auth)

                        const user = await AsyncStorage.getItem("user");
                        const token = AsyncStorage.getItem("token")
                        console.log("user in console is ", user)
                        console.log("token in console is ", token)
                    }

                    if (res.response === "ok") {
                        setLoading(false)
                        Alert.alert("congrats", "Sign up successfully")
                        navigation.navigate("Profile")
                    }
                    else {
                        setLoading(false)
                        Alert.alert("Oops", res.result)
                    }
                }
            }
            else {
                Alert.alert("enter the data ")
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
            <Text style={styles.loginText}>Sign Up</Text>

            <Text style={[isFocusEmail || email ? styles.focusedTextStyle : styles.emailText]}>Email Address</Text>
            <Input
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder={"helloweeniski@gmail.com"}
                placeholderColor={COLORS.grey}
                onFocus={() => setIsFocusEmail(true)}
                onBlur={() => setIsFocusEmail(false)}
                inputView={[isFocusEmail || email ? styles.emailInputStyle : null]}
                keyboardType={"email-address"}
                onRight={!emailErr && email ? <Image style={styles.chckImage} resizeMode='contain' source={IMAGES.Check} /> : null}
            />
            {
                emailErr && email ? <Text style={styles.errorText}>{emailErr}</Text> : null
            }

            <Text style={[isFocusPassword || password ? styles.focusedTextStyle : styles.emailText]}>Password</Text>
            <Input
                value={password}
                onChangeText={(text) => setPassword(text)}
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

            <Buttons onPress={signupFun} title={"Sign Up"} buttonStyle={styles.buttonStyle} />

            <View style={styles.orView}>
                <View style={styles.lineView} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.lineView} />
            </View>

            <View style={styles.googleFacbookView}>
                <TouchableOpacity>
                    <Image style={styles.googleIMage} source={IMAGES.Google} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image style={styles.googleIMage} source={IMAGES.Facebook} />
                </TouchableOpacity>
            </View>

            <View style={styles.noAccountView}>
                <Text style={styles.noAccountText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.signupText}>Login</Text>
                </TouchableOpacity>
            </View>

            {
                loading && <View style={styles.loadingView}>
                    <ActivityIndicator color={COLORS.primary} size={50} />
                </View>
            }
        </View>
    );
}
export default Login;