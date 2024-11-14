import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Input, Button, Icon, Card } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";
import { getBrigadeCarList, setSelectedBrigadeCar, setBrigade } from '../redux/actions/brigadeActions';
import { useFocusEffect } from '@react-navigation/native';
import ProgressiveImageBackground from "../components/ImageBackground";


function SelectCarScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);
    const hash = useSelector(state => state.profile.hash);

    const brigadeCarList = useSelector(state => state.brigade.brigadeCarList);
    const brigadeCarLoading = useSelector(state => state.brigade.brigadeCarLoading);
    const selectedBrigade = useSelector(state => state.brigade.selectedBrigade);
    const selectedBrigadeCar = useSelector(state => state.brigade.selectedBrigadeCar);

    const isBrigadeSet = useSelector(state => state.brigade.isBrigadeSet);


    useFocusEffect(
        React.useCallback(() => {
            dispatch(getBrigadeCarList(hash));
        }, [dispatch, hash])
    );


    React.useEffect(() => {
        if (selectedBrigadeCar != null && selectedBrigade != null) {
            dispatch(setBrigade(selectedBrigade, selectedBrigadeCar, user))
        }
    }, [selectedBrigadeCar])

    React.useEffect(() => {
        if (isBrigadeSet && selectedBrigadeCar != null && selectedBrigade != null) {
            navigation.navigate('BrigadeInfoScreen');
        }
    }, [isBrigadeSet])

    const handleSelectBrigadeCar = (brigadecar) => {
        dispatch(setSelectedBrigadeCar(brigadecar));
    }

    return (
        <>
            <ScrollView>
                <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 10, paddingRight: 10 }}>

                    {selectedBrigade != null ? (<>
                        <Text category='h6' style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Бригада: <Text>{selectedBrigade.brigadeName}</Text></Text>
                    </>) : (<></>)}

                    <View style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text category='h6' style={{ marginTop: 10, marginBottom: 10, marginLeft: 10, textAlign: 'center' }}>Выберите автомобиль:</Text>
                    </View>

                    {brigadeCarLoading ? (<><ActivityIndicator /></>) : (<>
                        {brigadeCarList.map((brigadecar, i) => {
                            return (
                                <>
                                    <Card key={i.toString()} status='info' style={{ width: '100%', marginTop: 10 }}>

                                        <View style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'row' }}>
                                            <View style={{ width: 70 }}>
                                                <ProgressiveImageBackground style={{ height: 70, width: 70, }} source={{ uri: brigadecar.image }} />
                                            </View>
                                            <View style={{ flex: 1, display: 'flex', flexGrow: 1, flexDirection: 'column', height: '100%', minHeight: 70 }}>
                                            <View style={{ textAlign: 'left', paddingLeft: 10, borderBottomColor: '#EEEEEE', borderBottomWidth: 1, borderStyle: 'dashed' }}>
                                            <Text style={{ fontSize: 16 }}>{brigadecar.carNumber}</Text>
                                        </View>
                                                <View style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                    <Button size="small" onPress={() => handleSelectBrigadeCar(brigadecar)}>Выбрать</Button>
                                                </View>

                                            </View>
                                        </View>
                                    </Card>
                                </>
                            )
                        })}</>)}
                    <View style={{}}>
                        <Button style={{ marginTop: 20, marginBottom: 50 }} onPress={() => navigation.navigate('SelectBrigadeScreen')}>Назад</Button>
                    </View>
                </View>
            </ScrollView>
        </>
    )

}

export default SelectCarScreen;