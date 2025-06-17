import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import Header from '../../components/Header';
import { IMAGES } from '../../assets/images';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { getProfileData, updateProfile, updationOtp } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from '../../components/Buttons';
import Success from '../../components/Success';
import { COLORS } from '../../enums/fontStyles';

const ProfileData = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false)
    const [galleryImage, setGalleryImage] = useState('');
    const [data, setData] = useState('');
    const [openModel, setOpenModel] = useState(false);
    const [loading, setLoading] = useState(false);

    const renderProfileData = async () => {
        setLoading(true);
        let getId = await AsyncStorage.getItem("loginData");
        getId = await JSON.parse(getId);
        const userId = getId?.userId;

        let getData = await fetch(getProfileData + `/${userId}`)
        getData = await getData.json();
        setData(getData?.result)
        setLoading(false);
    }

    useEffect(() => {
        renderProfileData();
    }, [])

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setGalleryImage(imageUri);
                setOpen(false)
            }
        });
    };

    const handleCameraLaunch = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setGalleryImage(imageUri);
                setOpen(false)
                console.log(imageUri);
            }
        });
    }

    const cancelFunction = () => {
        setGalleryImage("");
        renderProfileData();
    }

    const updateFunction = async () => {
        try {
            if (galleryImage) {
                setLoading(true)
                let getId = await AsyncStorage.getItem("loginData");
                getId = await JSON.parse(getId);
                const userId = getId?.userId;

                const formData = new FormData();

                formData.append("image", {
                    uri: galleryImage,
                    name: "photo.png",
                    type: "image/png"
                })

                let updation = await fetch(updateProfile + `/${userId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    body: formData
                })

                updation = await updation.json();
                if (updation?.result === "ok") {
                    setLoading(false)
                    setOpenModel(true);
                }
                else {
                    setLoading(false)
                    Alert.alert("Oops", updation?.result)
                }
            }
            else {
                Alert.alert("Oops", "Nothing to update")
            }
        }
        catch (err) {
            setLoading(false)
            Alert.alert("Error" + err);
        }
        finally {
            setLoading(false);
        }
    }

    const modalButtonFun = () => {
        setGalleryImage("");
        renderProfileData();
        setOpenModel(false)
    }

    const sendOtpForPin = async () => {
        try {
            setLoading(true);
            let getNumber = await AsyncStorage.getItem("loginData");
            getNumber = await JSON.parse(getNumber);
            const number = getNumber?.number;

            if (number) {
                let data = await fetch(updationOtp, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ number })
                })

                data = await data.json();
                if (data.response === "ok") {
                    setLoading(false)
                    navigation.navigate("VerifyForPin", { number })
                }
                else {
                    setLoading(false)
                    Alert.alert("Oops", data.result)
                }
            }
            else {
                setLoading(false)
                Alert.alert("Oops", "Can't fetch number")
            }
        }
        catch (err) {
            setLoading(false)
            Alert.alert("Error" + err)
        }
        finally {
            setLoading(false)
        }
    }

    const sendOtpForPassword = async () => {
        try {
            setLoading(true);
            let getNumber = await AsyncStorage.getItem("loginData");
            getNumber = await JSON.parse(getNumber);
            const number = getNumber?.number;

            if (number) {
                let data = await fetch(updationOtp, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ number })
                })

                data = await data.json();
                if (data.response === "ok") {
                    setLoading(false)
                    navigation.navigate("VerifyForPassword", { number })
                }
                else {
                    setLoading(false)
                    Alert.alert("Oops", data.result)
                }
            }
            else {
                setLoading(false)
                Alert.alert("Oops", "Can't fetch number")
            }
        }
        catch (err) {
            setLoading(false)
            Alert.alert("Error" + err)
        }
        finally {
            setLoading(false)
        }
    }

    const imageUri = `http://192.168.100.10:5000/${data?.image?.replace("\\", "/")}`;

    return (
        <View style={styles.container}>
            <Header headerContainer={styles.headerContainer} title={"Profile Settings"} />

            <ScrollView>
                <View style={styles.innerContainer}>
                    <Text style={styles.infoText}>Your Profile Information</Text>

                    <View style={styles.profileView}>
                        <Image style={styles.profileStyle} source={galleryImage ? { uri: galleryImage } : (data ? { uri: imageUri } : IMAGES.UserInactive)} />
                        <TouchableOpacity onPress={() => setOpen(true)}
                            style={styles.editView}>
                            <Image style={styles.editImage} source={IMAGES.Edit} />
                        </TouchableOpacity>
                    </View>

                    {galleryImage ? <View style={styles.buttonView}>
                        <Buttons onPress={updateFunction} buttonText={styles.titleText} buttonStyle={styles.buttonStyle} title={"Update"} />
                        <Buttons onPress={cancelFunction} buttonText={styles.titleText} buttonStyle={styles.buttonStyle} title={"Cancel"} />
                    </View> : null}

                    <Text style={styles.personalInfoText}>Personal Information</Text>

                    <View style={styles.informationView}>
                        <Text style={styles.headingText}>Name</Text>
                        {data ? <Text style={styles.answerText}>{data.name}</Text> : <Text style={styles.answerText}>-----</Text>}
                    </View>

                    <View style={styles.informationView}>
                        <Text style={styles.headingText}>Email</Text>
                        {data ? <Text style={styles.answerText}>{data.email}</Text> : <Text style={styles.answerText}>-----</Text>}
                    </View>

                    <View style={styles.informationView}>
                        <Text style={styles.headingText}>Mobile Phone</Text>
                        {data ? <Text style={styles.answerText}>{data.number}</Text> : <Text style={styles.answerText}>-----</Text>}
                    </View>

                    <View style={styles.informationView}>
                        <Text style={styles.headingText}>Card Number</Text>
                        {data ? <Text style={styles.answerText}>{data?.cardNumber.replace(/(.{4})/g, '$1  ').trim()}</Text> : <Text style={styles.answerText}>-----</Text>}
                    </View>

                    <Text style={styles.personalInfoText}>Security</Text>

                    <TouchableOpacity onPress={sendOtpForPin}
                        style={styles.informationView}>
                        <Text style={styles.headingText}>Change Pin</Text>
                        <Image style={styles.arrowImage} source={IMAGES.GoArrowBlue} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={sendOtpForPassword}
                        style={styles.informationView}>
                        <Text style={styles.headingText}>Change Password</Text>
                        <Image style={styles.arrowImage} source={IMAGES.GoArrowBlue} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {
                <Modal visible={open} transparent >
                    <View style={styles.modalMainView}>
                        <View style={styles.modalInnerView}>
                            <TouchableOpacity onPress={() => setOpen(false)}
                                style={styles.closeButton}>
                                <Image style={styles.crossImage} source={IMAGES.Close} />
                            </TouchableOpacity>

                            <View style={styles.bottomView}>
                                <TouchableOpacity onPress={handleCameraLaunch}
                                    style={styles.cameraButton}>
                                    <Image style={styles.cameraImage} resizeMode='contain' source={IMAGES.Camera} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={openImagePicker}
                                    style={styles.cameraButton}>
                                    <Image style={styles.cameraImage} resizeMode='contain' source={IMAGES.Gallery} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            }

            <Success visible={openModel} description={"Image Update Successfully"} onPressModal={modalButtonFun} />

            {
                loading && <View style={styles.loadingView}>
                    <ActivityIndicator color={COLORS.primary} size={50} />
                </View>
            }

        </View>
    );
}
export default ProfileData;