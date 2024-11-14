import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Input, Button, Icon, Card } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';

import SelectBrigadeScreen from './SelectBrigadeScreen';
import SelectCarScreen from './SelectCarScreen';
import BrigadeInfoScreen from './BrigadeInfoScreen';
import BrigadeEquipmentScreen from './BrigadeEquipmentScreen';
import BrigadeReportScreen from './BrigadeReportScreen';
import BrigadePassScreen from './BrigadePassScreen';


const Stack = createNativeStackNavigator();

function BrigadeScreen({ navigation }) {

    return (
        <>
            <Stack.Navigator >
                <Stack.Screen
                    name="SelectBrigadeScreen"
                    component={SelectBrigadeScreen}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                <Stack.Screen
                    name="SelectCarScreen"
                    component={SelectCarScreen}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                <Stack.Screen
                    name="BrigadeInfoScreen"
                    component={BrigadeInfoScreen}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                <Stack.Screen
                    name="BrigadeEquipmentScreen"
                    component={BrigadeEquipmentScreen}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                <Stack.Screen
                    name="BrigadeReportScreen"
                    component={BrigadeReportScreen}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                <Stack.Screen
                    name="BrigadePassScreen"
                    component={BrigadePassScreen}
                    options={{ headerShown: false, headerBackVisible: false }}
                />

            </Stack.Navigator>
        </>
    )

}

export default BrigadeScreen;