import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text, Input, Button, Icon, Card } from '@ui-kitten/components';
import { logOut, getTodos, askBrigades, completeTodo, passBrigade, resetBrigade } from '../redux/actions/profileActions';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import 'moment/locale/ru';
import { Root, Popup } from 'react-native-popup-confirm-toast'
import { CommonActions } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import ProgressiveImageBackground from "../components/ImageBackground";

function BaseScreen({ route, navigation }) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.profile.user);
    const hash = useSelector(state => state.profile.hash);
    const todosLoading = useSelector(state => state.profile.todosLoading);
    const todolist = useSelector(state => state.profile.todolist);
    const activeBrigadeFinding = useSelector(state => state.profile.activeBrigadeFinding);
    const activeBrigade = useSelector(state => state.profile.activeBrigade);
    const carImg = useSelector(state => state.profile.carImg);

    const ConfirmIcon = (props) => (
        <Icon {...props} name='checkmark-outline' />
    );
    const BrigadeIcon = (props) => (
        <Icon {...props} name='edit-2-outline' />
    );
    const PhoneIcon = (props) => (
        <Icon {...props} name='phone-outline' />
    );
    const [selectedTodoConfirm, setSelectedTodoConfirm] = React.useState(null);


    React.useEffect(() => {
        if (route.params != undefined) {
            if (route.params.ask == true) {
                dispatch(askBrigades(hash));
            }
        }

    }, [route.params])


    React.useEffect(() => {
        dispatch(getTodos(hash));
        dispatch(askBrigades(hash));
        dispatch(resetBrigade());
    }, [])




    const roleOptions = [
        { value: 'admin', label: 'Администратор ( Глав-врач )' },
        { value: 'main-paramedic', label: 'Главный фельдшер' },
        { value: 'medical-paramedic', label: 'Старший фельдшер' },
        { value: 'nurse-man', label: 'Старший мед брат' },
        { value: 'dispatcher', label: 'Диспетчер' },
        { value: 'user', label: 'Пользователь' },
        { value: 'nurseman', label: 'Медицинский брат - анестезист' },
        { value: 'nurse-anesth', label: 'Медицинская сестра - анестезист' },
        { value: 'paramedic', label: 'Фельдешер скорой медицинской помощи' }
    ]

    function getUserRole(userRole) {
        switch (userRole) {
            case 'admin':
                return 'Администратор ( Глав-врач )'
            case 'main-paramedic':
                return 'Главный фельдшер'
            case 'medical-paramedic':
                return 'Старший фельдшер'
            case 'nurse-man':
                return 'Старший мед брат'
            case 'dispatcher':
                return 'Диспетчер'
            case 'user':
                return 'Пользователь'
            case 'nurseman':
                return 'Медицинский брат - анестезист'
            case 'nurse-anesth':
                return 'Медицинская сестра - анестезист'
            case 'paramedic':
                return 'Фельдешер скорой медицинской помощи'
            default:
                return '';
        }
    }
    processLogOut = async () => {
        try {
            await AsyncStorage.removeItem('LOGIN');
            await AsyncStorage.removeItem('HASH');
        } catch (error) {
            console.log(error)
        }
        console.log('LOGOUT')
        dispatch(logOut());
        navigation.navigate('LoginScreen')
    }

    function confirmTodoPressed(popup, todo) {
        // console.log(todo);
        //id
        dispatch(completeTodo(hash, todo.id));
        popup.hide();
    }



    return (
        <>
            <Root>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>

                        <Card status='info' style={{ width: '100%', marginLeft: 5, marginRight: 5, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ marginRight: 4, width: 60, height: 60 }} source={{ uri: 'https://api.fcmkcp.ru/uploads/baseScreen/logo.png' }} />


                                <View style={{ flexDirection: 'column' }}>
                                    <Text category='h6' style={{ marginTop: 5, marginBottom: 10 }}>{user.name}</Text>
                                    <Text category='s1' style={{ marginBottom: 10 }}>{getUserRole(user.role)}</Text>
                                    <Text style={{ float: 'right' }} category='c1' style={{ marginTop: 5, marginBottom: 10 }}>{user.email}</Text>
                                </View>
                            </View>
                        </Card>





                        {activeBrigadeFinding ? (<>
                            <Card status='basic' style={{ width: '100%', marginLeft: 5, marginRight: 5 }}>
                                <View style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <View>
                                        <Text>Ищем активные бригады...</Text>
                                        <ActivityIndicator />
                                    </View>
                                </View>
                            </Card>
                        </>) : (<>
                            <Card status='basic' style={{ width: '100%', marginLeft: 1, marginRight: 2 }}>
                                <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                                    {activeBrigade == null ? (<>
                                        <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>

                                                <Image style={{ marginLeft: 10, width: 130, height: 100 }} source={{ uri: 'https://api.fcmkcp.ru/uploads/baseScreen/kung.png' }} />
                                                <Button style={{ marginTop: 10, borderRadius: 30 }} onPress={() => { navigation.navigate('BrigadeScreen', { screen: "SelectBrigadeScreen" }) }}>Принять бригаду</Button>
                                            </View>
                                            <View style={{ marginLeft: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <Image style={{ marginLeft: 10, width: 130, height: 100 }} source={{ uri: 'https://api.fcmkcp.ru/uploads/baseScreen/rescue_pack.png' }} />
                                                <Button style={{ marginTop: 10, borderRadius: 30 }}>Принять Вылет</Button>
                                            </View>
                                        </View>
                                    </>) : (<>
                                        <View style={{ height: '100%', display: 'flex', flex: 1, flexDirection: 'column', marginRight: 10, justifyContent: 'space-between' }}>
                                            <View >

                                                <Text style={{ flexDirection: 'row' }} category='h6'>Активная бригада</Text>

                                                <Text category='s1'>{activeBrigade.brigadeName}</Text>
                                            </View>

                                            <View>
                                                <Text category='h6'>Машина: </Text>
                                                <Text>{activeBrigade.selectedCar.carNumber}</Text>
                                            </View>
                                            <View>

                                                <Text category='h6'>Сотрудники:</Text>

                                                <View>
                                                    {activeBrigade.brigadeUsers.map((bUser, i) => {
                                                        return (
                                                            <>
                                                                <Text>{bUser.name}</Text>
                                                            </>
                                                        )
                                                    })}
                                                </View>

                                            </View>

                                            <Button style={{ marginTop: 5, borderRadius: 30 }} status="warning" onPress={() => navigation.navigate('BrigadePassScreen')}>Сдать бригаду</Button>

                                        </View>
                                        <View style={{ display: 'flex', flex: 1, flexDirection: 'column', direction: 'rtl', justifyContent: 'space-between' }}>
                                            <View>
                                                {/* <Image style={{ marginLeft: 10, width: 130, height: 100 }} source={{ uri: carImg.image }} /> */}
                                                {carImg.image != '' ? (<><Image style={{ marginLeft: 10, width: 150, height: 100 }} source={{ uri: carImg.image }} /></>) : null}
                                            </View>

                                            <Button style={{ marginTop: 10, borderRadius: 30 }} status="primary" onPress={() => navigation.navigate('BrigadeRecipeScreen')}>Требование</Button>
                                            <Button style={{ marginTop: 10, borderRadius: 30 }} status="primary" onPress={() => navigation.navigate('EquipInfoScreen')}>Оборудование</Button>
                                            <Button style={{ marginTop: 10, borderRadius: 30, }} accessoryLeft={PhoneIcon} status="primary" onPress={() => navigation.navigate('PhoneBook')}>Связь</Button>


                                            <Button style={{ marginTop: 10, borderRadius: 30 }} status="primary" >Написать рапорт</Button>


                                        </View>
                                    </>)}

                                </View>
                            </Card>

                        </>)}

                        {/* <View>
                                    {brigadeCompleted ? (<><Button status="warning">Сдать бригаду</Button></>) : (<><Button onPress={() => navigation.navigate('BrigadeScreen')}>Сдать бригаду</Button></>)}
                                </View> */}


                        {todosLoading ? (<>
                            <Card status='basic' style={{ width: '100%', marginLeft: 5, marginRight: 5 }}>
                                <ActivityIndicator />
                                <Text>Загружаем список дел...</Text>
                            </Card>
                        </>) : (
                            <>
                                {todolist.length > 0 ? (<>
                                    {console.log(todolist)}
                                    <View style={{ width: '100%', flex: 1, flexDirection: 'column', flexGrow: 1, marginTop: 10 }}>
                                        <Text category='h6' style={{ marginTop: 10, marginBottom: 10, marginLeft: 5 }}>Список ваших дел:</Text>

                                        {todolist.map((todo, i) => {
                                            return (
                                                <View key={i.toString()}>
                                                    <Card status='primary' style={{ width: '100%', marginBottom: 5 }}>

                                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                                            <View style={{ flexGrow: 1 }}>
                                                                <Text style={{ fontWeight: 'bold' }}>Задача:</Text>
                                                                <Text>{todo.text}</Text>
                                                                <Text style={{ fontWeight: 'bold' }}>Назначил:</Text>
                                                                <Text>{todo.creatorName}</Text>
                                                                <Text style={{ fontWeight: 'bold' }}>Дата:</Text>
                                                                <Text>{moment(todo.createdAt).format('LLL')}</Text>
                                                                <Text style={{ fontWeight: 'bold' }}>Выполнить до:</Text>
                                                                <Text>{moment(todo.completeAt).format('LLL')}</Text>

                                                                <Button
                                                                    accessoryLeft={ConfirmIcon}
                                                                    status='success'
                                                                    size='small'
                                                                    style={{ marginTop: 10 }}
                                                                    onPress={() => {
                                                                        // setSelectedTodoConfirm(todo);
                                                                        const popup = Popup;
                                                                        Popup.show({
                                                                            type: 'confirm',
                                                                            title: 'Выполнить поручение?',
                                                                            textBody: 'Вы уверены, что хотите отметить эту задачу как выполненную? ',
                                                                            buttonText: 'Да',
                                                                            confirmText: 'Нет',
                                                                            callback: () => confirmTodoPressed(popup, todo)
                                                                        })
                                                                    }
                                                                    }
                                                                />
                                                            </View>


                                                        </View>
                                                    </Card>
                                                </View>
                                            )
                                        })}

                                    </View></>) : (<>
                                        <View style={{ width: '100%', flex: 1, flexDirection: 'column', flexGrow: 1, marginTop: 10 }}>
                                            <Card status='success' style={{ width: '100%', marginBottom: 5 }}>
                                                <Text>На сегодня - задач нет</Text>
                                            </Card>
                                        </View>
                                    </>)}

                            </>
                        )}

                        <Button onPress={() => processLogOut()} size='medium' style={{ width: '80%', marginBottom: 10 }}>Выйти</Button>
                    </View>
                </ScrollView>
            </Root >
        </>
    )

}


const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32,
    },
});


export default BaseScreen;