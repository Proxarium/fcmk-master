import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator, Linking, ScrollView } from 'react-native';
import { Text, Input, Button, Icon, Card } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";


function PhoneBook({ navigation }) {

    const PhoneIcon = (props) => (
        <Icon {...props} name='phone-outline' />
    );

    return (
        <>
            <ScrollView>
                <View style={{ width: '100%', flex: 1, flexDirection: 'column', flexGrow: 1, marginTop: 10 }}>
                    <Text category='h6' style={{ marginTop: 10, marginLeft: 5 }}>Диспетчерская:</Text>

                    <Card status='success' style={{ width: '100%', marginLeft: 5, marginRight: 5, marginTop: 10 }}>
                        <View>



                            <Button accessoryLeft={PhoneIcon} onPress={() => { Linking.openURL('tel:119'); }}>Диспетчерская</Button>
                        </View>
                    </Card>
                </View>
                <View style={{ width: '100%', flex: 1, flexDirection: 'column', flexGrow: 1, marginTop: 10 }}>
                    <Text category='h6' style={{ marginTop: 10, marginLeft: 5 }}>Старший врач:</Text>

                    <Card status='primary' style={{ width: '100%', marginLeft: 5, marginRight: 5, marginTop: 10 }}>
                        <View>
                            <Button accessoryLeft={PhoneIcon} onPress={() => { Linking.openURL('tel:119'); }}>Васильев Василий Петрович</Button>
                        </View>
                    </Card>
                </View>
                <View style={{ width: '100%', flex: 1, flexDirection: 'column', flexGrow: 1, marginTop: 10 }}>
                    <Text category='h6' style={{ marginTop: 10, marginLeft: 5 }}>Администрация:</Text>
                    <Card status='danger' style={{ width: '100%', marginLeft: 5, marginRight: 5, marginTop: 10 }}>
                        <View>

                            <Text style={{ marginBottom: 5 }}>Зам директора ФЦМК по медицинской части</Text>
                            <Button style={{ marginBottom: 10 }} accessoryLeft={PhoneIcon} onPress={() => { Linking.openURL('tel:+79184676527'); }}>Колодкин Андрей Андреевич</Button>
                            <Text style={{ marginBottom: 5 }}>Зам главного врача по медицинской части ЦСА</Text>
                            <Button style={{ marginBottom: 10 }} accessoryLeft={PhoneIcon} onPress={() => { Linking.openURL('tel:+79051069220'); }}>Тычкова Елена Александровна</Button>
                            <Text style={{ marginBottom: 5 }}>Главный фельдшер:</Text>
                            <Button style={{ marginBottom: 10 }} accessoryLeft={PhoneIcon} onPress={() => { Linking.openURL('tel:+79998251002'); }}>Мухин Максим Александрович</Button>
                            <Text style={{ marginBottom: 5 }}>Старший фельдшер:</Text>
                            <Button style={{ marginBottom: 10 }} accessoryLeft={PhoneIcon} onPress={() => { Linking.openURL('tel:+79969238700'); }}>Петров Степан Михайлович</Button>
                            <Text style={{ marginBottom: 5 }}>Старший медицинский брат:</Text>
                            <Button style={{ marginBottom: 10 }} accessoryLeft={PhoneIcon} onPress={() => { Linking.openURL('tel:+79163427515'); }}>Словита Игорь Алексеевич</Button>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </>

    )

}

export default PhoneBook;