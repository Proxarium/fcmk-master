import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Input, Button, Icon, Card } from '@ui-kitten/components'
import { logOut, getTodos } from '../redux/actions/profileActions';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BaseScreen from './BaseScreen';
import AboutScreen from './AboutScreen';
import BrigadeScreen from './BrigadeScreen';



function DrawerScreen({ navigation }) {
    const Drawer = createDrawerNavigator();
    const dispatch = useDispatch();

    const activeBrigade = useSelector(state => state.profile.activeBrigade);


    return (
        <>
            <Drawer.Navigator>
                <Drawer.Screen name="BaseScreen" component={BaseScreen} options={{ title: 'Главная' }} />
                {activeBrigade == null ? <Drawer.Screen name="BrigadeScreen" component={BrigadeScreen} options={{ title: 'Принять бригаду' }} /> : null}
                <Drawer.Screen name="AboutScreen" component={AboutScreen} options={{ title: 'О приложении' }} />
            </Drawer.Navigator>
        </>
    )
}


const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32,
    },
});


export default DrawerScreen;