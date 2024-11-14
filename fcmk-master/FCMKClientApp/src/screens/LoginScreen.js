import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator, ImageBackground, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Input, Button, Icon } from '@ui-kitten/components'
import { sendLogin, setNotLoggedIn, setLoggedIn, askSavedData } from '../redux/actions/profileActions';
import { useSelector, useDispatch } from "react-redux";


function LoginScreen({ navigation }) {

    const dispatch = useDispatch();
    const [loginValue, setLoginValue] = React.useState('');
    const [pswValue, setPswValue] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const userFound = useSelector(state => state.profile.userFound);
    const userLogged = useSelector(state => state.profile.userLogged);
    const loggingIn = useSelector(state => state.profile.loggingIn);
    const loginError = useSelector(state => state.profile.loginError);

    const hash = useSelector(state => state.profile.hash);
    const userLogin = useSelector(state => state.profile.userLogin);

    _fetchUser = async () => {
        console.log('Пытаемся получить сохраненные данные');
        try {
            const login = await AsyncStorage.getItem('LOGIN');
            if (login !== null) {
                console.log('Сохраненный логин: ' + login);
                const hash = await AsyncStorage.getItem('HASH');
                console.log(hash)
                if (hash != null) {
                    // ЕСТЬ ДАННЫЕ ОБ АВТОРИЗАЦИИ. СПРАШИВАЕМ СЕРВЕР ОБ ИХ ДОСТОВЕРНОСТИ
                    console.log('Нужен запрос на достоверность')
                    dispatch(askSavedData(login, hash))
                }
            } else {
                // ПОЛЬЗОВАТЕЛЬ НЕ АВТОРИЗОВАН
                console.log('Сохраненный пользователь не найден');
                dispatch(setNotLoggedIn())
            }
        } catch (error) {
            console.log(error);
        }
    }

    const _setData = async () => {
        console.log('Пытаемся сохранить данные');
        try {
            await AsyncStorage.setItem('LOGIN', userLogin);
            await AsyncStorage.setItem('HASH', hash);
        } catch (error) {
            console.log(error)
        }
        dispatch(setLoggedIn())
    };


    React.useEffect(() => {
        //Окно запущено, проверяем есть ли сохраненные данные о пользователе
        _fetchUser();
    }, [])

    React.useEffect(() => {
        if (userFound) {
            //Пользователь вошел в систему. Сохраняем данные в Storage
            _setData();
        }
    }, [userFound])

    React.useEffect(() => {
        if (userLogged) {
            console.log('должны перейти на окно DrawerScreen')
            navigation.navigate('DrawerScreen')
        }
    }, [userLogged])


    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const processLogin = () => {
        dispatch(sendLogin(loginValue, pswValue))
    }

    return (
        <>





            <ScrollView style={[styles.scrollview]}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={0}
                    behavior={"position"}
                    style={{ flex: 1 }}
                    enabled
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginVertical: -80, display: 'flex', height: Dimensions.get('window').height }}>
                        {loggingIn ? (
                            <>
                                <ActivityIndicator />
                            </>
                        ) : (
                            <>
                                <Text style={{ color: 'white' }}>Авторизация</Text>
                                <Input

                                    style={{ width: '80%', marginBottom: 10 }}
                                    placeholder='Логин'
                                    value={loginValue}
                                    onChangeText={nextValue => setLoginValue(nextValue)}
                                />
                                <Input
                                    style={{ width: '80%', marginBottom: 10 }}
                                    placeholder='Пароль'
                                    value={pswValue}
                                    accessoryRight={renderIcon}
                                    secureTextEntry={secureTextEntry}
                                    onChangeText={nextValue => setPswValue(nextValue)}
                                />
                                {loginError != null ? (
                                    <>
                                        {loginError == 'not-found' ? (
                                            <>
                                                <Text style={{ color: 'red', marginBottom: 10 }}>Пользователь не найден</Text>
                                            </>
                                        ) : (<></>)}
                                    </>
                                ) : (<></>)}

                                <Button onPress={processLogin} size='medium' style={{ width: '40%', borderRadius: 30, marginBottom: 110 }}>Войти</Button>

                            </>
                        )}


                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

            <ImageBackground
                style={[styles.fixed, styles.containter, { zIndex: -1 }]}
                source={{ uri: "https://api.fcmkcp.ru/uploads/loginScreen/144.jpg" }}
            />
        </>
    )
}


const styles = StyleSheet.create({
    containter: {
        // height:'100%'
        width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height //for full screen
    },
    fixed: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    scrollview: {
        backgroundColor: 'transparent'
    }
});

export default LoginScreen;