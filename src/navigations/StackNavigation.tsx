import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import * as ui from "../screens/index"
import BottomTabs from './BottomTabs';
import * as ux from "../screens/Updates/index";

const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Splash' component={ui.Splash} />
                <Stack.Screen name='Login' component={ui.Login} />
                <Stack.Screen name='Welcome' component={ui.Welcome} />
                <Stack.Screen name='Onboarding' component={ui.Onboarding} />
                <Stack.Screen name='Signup' component={ui.Signup} />
                <Stack.Screen name='Profile' component={ui.Profile} />
                <Stack.Screen name='PhoneNumber' component={ui.PhoneNumber} />
                <Stack.Screen name='SecurityQuestion' component={ui.SecurityQuestion} />
                <Stack.Screen name='CreatePin' component={ui.CreatePin} />
                <Stack.Screen name='LoginViaPin' component={ui.LoginViaPin} />
                <Stack.Screen name='PhoneVerification' component={ui.PhoneVerification} />
                <Stack.Screen name='BottomTabs' component={BottomTabs} />
                <Stack.Screen name='SecurityQuestions' component={ui.SecurityQuestions} />
                <Stack.Screen name='AddAmount' component={ui.AddAmount} />
                <Stack.Screen name='AddCard' component={ui.AddCard} />
                <Stack.Screen name='SendMoney' component={ui.SendMoney} />
                <Stack.Screen name='AddNumberForPin' component={ux.AddNumberForPin} />
                <Stack.Screen name='AddNumberForPassword' component={ux.AddNumberForPassword} />
                <Stack.Screen name='VerifyForPassword' component={ux.VerifyForPassword} />
                <Stack.Screen name='VerifyForPin' component={ux.VerifyForPin} />
                <Stack.Screen name='UpdatePin' component={ux.UpdatePin} />
                <Stack.Screen name='UpdatePassword' component={ux.UpdatePassword} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default StackNavigation;