import React from 'react';
import * as ui from "../screens/index"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../enums/fontStyles';
import { IMAGES } from '../assets/images';
import { Image, TouchableOpacity, View } from 'react-native';

const BottomTabs = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: '5%',
                shadowOffset: 1,
                backgroundColor: COLORS.white,
                borderRadius: 20,
                height: 70,
                marginHorizontal: "5%",
                paddingTop: "5%",
            },
            tabBarButton: (props) => (
                <TouchableOpacity
                    {...props}
                    activeOpacity={1}
                />
            ),
            tabBarIcon: ({ focused }) => {
                let icon;

                if (route.name === 'Home') {
                    icon = focused
                        ? IMAGES.HomeActive
                        : IMAGES.HomeInactive
                } else if (route.name === 'CardDetail') {
                    icon = focused
                        ? IMAGES.WalletActive
                        : IMAGES.WalletInactive
                } else if (route.name === 'Activity') {
                    icon = focused
                        ? IMAGES.ChartActive
                        : IMAGES.ChartInactive
                } else if (route.name === 'ProfileData') {
                    icon = focused
                        ? IMAGES.UserActive
                        : IMAGES.UserInactive
                }

                return (
                    <View style={{
                        width: 44,
                        height: 65,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: focused ? COLORS.primary : COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Image
                            source={icon}
                            style={{
                                width: 24,
                                height: 24,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                );
            }
        })}>
            <Tab.Screen name='Home' component={ui.Home} />
            <Tab.Screen name='CardDetail' component={ui.CardDetail} />
            <Tab.Screen name='Activity' component={ui.Activity} />
            <Tab.Screen name='ProfileData' component={ui.ProfileData} />
        </Tab.Navigator>
    );
}
export default BottomTabs;