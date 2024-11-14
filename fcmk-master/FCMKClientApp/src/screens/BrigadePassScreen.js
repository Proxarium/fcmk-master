import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Input, Button, Icon, Card } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";
import { passBrigade } from '../redux/actions/profileActions';
import { Root, Popup } from 'react-native-popup-confirm-toast'


function BrigadePassScreen({ navigation }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);
    const hash = useSelector(state => state.profile.hash);
    const activeBrigadeFinding = useSelector(state => state.profile.activeBrigadeFinding);
    const activeBrigade = useSelector(state => state.profile.activeBrigade);
    const shouldAsk = useSelector(state => state.profile.shouldAsk);
    const passingBrigade = useSelector(state => state.profile.passingBrigade);
    const brigadeRecipe = useSelector(state => state.brigade.brigadeRecipe);

    React.useEffect(() => {
        if (!passingBrigade) {
            if (shouldAsk) {
                navigation.navigate('BaseScreen', {
                    ask: true
                });
            }
        }
    }, [passingBrigade])

    const ConfirmIcon = (props) => (
        <Icon {...props} name='checkmark-outline' />
    );


    function confirmPassPressed(popup) {
        // console.log(todo);
        //id
        dispatch(passBrigade(hash, activeBrigade._id, brigadeRecipe));
        popup.hide();
    }

    return (
        <><Root>
            <View>
                <Text category='h6' style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Сдача бригады</Text>
            </View>

            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>

                    <View style={{}}>

                        <Button
                            accessoryLeft={ConfirmIcon}
                            status='success'
                            size='small'
                            style={{ marginTop: 10 }}
                            onPress={() => {
                                const popup = Popup;
                                Popup.show({
                                    type: 'confirm',
                                    title: 'Вы уверены, что хотите сдать бригаду?',
                                    buttonText: 'Да',
                                    confirmText: 'Нет',
                                    callback: () => confirmPassPressed(popup)
                                })
                            }
                            }
                        >Сдать бригаду</Button>


                        
                    </View>
                </View>
            </ScrollView>
            </Root>
        </>
    )

}

export default BrigadePassScreen;