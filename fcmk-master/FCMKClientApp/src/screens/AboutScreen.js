import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Input, Button, Icon, Card } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";

function AboutScreen({ navigation }) {

    return(
        <>
            <View>
                <Text category='h6' style={{ marginTop: 10, marginBottom: 10, marginLeft:10 }}>Информация о приложении</Text>
            </View>
        </>
    )

}

export default AboutScreen;