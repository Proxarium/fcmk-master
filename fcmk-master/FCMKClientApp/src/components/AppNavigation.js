import * as React from 'react';
import { Text } from '@ui-kitten/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import DrawerScreen from '../screens/DrawerScreen';
import BrigadePassScreen from '../screens/BrigadePassScreen';
import BrigadeRecipeScreen from '../screens/BrigadeRecipeScreen';
import EquipInfoScreen from '../screens/EquipInfoScreen';
import PhoneBook from '../screens/PhoneBook';

const Stack = createNativeStackNavigator();

function AppNavigation({ navigation }) {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>

                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{ headerShown: false, headerBackVisible: false }}
                    />
                    <Stack.Screen
                        name="DrawerScreen"
                        component={DrawerScreen}
                        options={{ headerShown: false, headerBackVisible: false }}
                    />
                    <Stack.Screen
                        name="BrigadePassScreen"
                        component={BrigadePassScreen}
                        options={{ title: 'Сдача бригады' }}
                    />
                    <Stack.Screen
                        name="BrigadeRecipeScreen"
                        component={BrigadeRecipeScreen}
                        options={{ title: 'Рецепты' }}
                    />
                    <Stack.Screen
                        name="EquipInfoScreen"
                        component={EquipInfoScreen}
                        options={{ title: 'Информация об оборудовании' }}
                    />
                    <Stack.Screen
                        name="PhoneBook"
                        component={PhoneBook}
                        options={{ title: 'Связь' }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default AppNavigation;