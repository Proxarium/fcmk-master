import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Input, Button, Icon, Card } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";
import { getBrigadeList, setSelectedBrigade } from '../redux/actions/brigadeActions';
import { useFocusEffect } from '@react-navigation/native';

function SelectBrigadeScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);
    const hash = useSelector(state => state.profile.hash);

    const brigadelist = useSelector(state => state.brigade.brigadelist);
    const brigadeLoading = useSelector(state => state.brigade.brigadeLoading);
    const selectedBrigade = useSelector(state => state.brigade.selectedBrigade);


    useFocusEffect(
        React.useCallback(() => {
            dispatch(getBrigadeList(hash));
        }, [dispatch, hash])
    );




    React.useEffect(() => {
        if (selectedBrigade != null) {
            navigation.navigate('SelectCarScreen');
        }
    }, [selectedBrigade])

    const handleSelectBrigade = (brigade) => {
        dispatch(setSelectedBrigade(brigade));
    }

    return (
        <>
            <ScrollView>
                <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                    <Text category='h6' style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Выберите свою бригаду</Text>
                    {brigadeLoading ? (<><ActivityIndicator /></>) : (<>
                        {brigadelist.map((brigade, i) => {
                            return (
                                <Card key={i.toString()} status='info' style={{ width: '100%', marginTop: 10 }}>
                                    <View style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                                        <View>
                                            <Text>{brigade.brigadeName}</Text>
                                        </View>
                                        <View>
                                            <Button onPress={() => handleSelectBrigade(brigade)}>Выбрать</Button>
                                        </View>
                                    </View>

                                </Card>
                            )
                        })}
                    </>)}
                </View>
            </ScrollView>
        </>
    )

}

export default SelectBrigadeScreen;