import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Input, Button, Icon, Card } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";
import { getBrigadeList, setSelectedBrigade, sendReport } from '../redux/actions/brigadeActions';
import { useFocusEffect } from '@react-navigation/native';

function BrigadeReportScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);
    const hash = useSelector(state => state.profile.hash);


    const brigadeEquipmentCopy = useSelector(state => state.brigade.brigadeEquipmentCopy);
    const carEquipmentCopy = useSelector(state => state.brigade.carEquipmentCopy);
    const carOxygenCopy = useSelector(state => state.brigade.carOxygenCopy);


    const brigadeEquipment = useSelector(state => state.brigade.brigadeEquipment);
    const carEquipment = useSelector(state => state.brigade.carEquipment);
    const carOxygen = useSelector(state => state.brigade.carOxygen);


    const stepOneComplete = useSelector(state => state.brigade.stepOneComplete);
    const stepTwoComplete = useSelector(state => state.brigade.stepTwoComplete);

    const brigadeCompleted = useSelector(state => state.brigade.brigadeCompleted);
    const brigadeSended = useSelector(state => state.brigade.brigadeSended);


    const [reportFormed, setReportFormed] = React.useState(false)

    const [stepOneReport, setStepOneReport] = React.useState([]);
    const [stepTwoReport, setStepTwoReport] = React.useState([]);
    const [stepThreeReport, setStepThreeReport] = React.useState([]);
    const [comment, setComment] = React.useState('');


    React.useEffect(() => {
        if(brigadeSended){
            navigation.navigate('BaseScreen', {
                ask: true
              });
        }
    }, [brigadeCompleted])


    function formReport() {

        //i equip block
        //y equip block item
        let tmpBrigadeArray = [...stepOneReport];
        let tmpCarArray = [...stepTwoReport];
        let tmpCarOxyArray = [...stepThreeReport];


        for (let i = 0; i < brigadeEquipmentCopy.length; i++) {
            let obj = {
                name: brigadeEquipmentCopy[i].name,
                items: []
            }

            for (let y = 0; y < brigadeEquipmentCopy[i].equipment.length; y++) {

                if (brigadeEquipmentCopy[i].equipment[y].originalValue != undefined) {

                    if (brigadeEquipmentCopy[i].equipment[y].quantity != brigadeEquipmentCopy[i].equipment[y].originalValue) {
                        console.log('Не состыковочка');
                        console.log('В оригинале - ' + brigadeEquipmentCopy[i].equipment[y].originalValue);
                        console.log('Указано - ' + brigadeEquipmentCopy[i].equipment[y].quantity);
                        console.log('Добавляем в массив');
                        obj.items.push({
                            step: 1,
                            name: brigadeEquipmentCopy[i].equipment[y].name,
                            quantity: brigadeEquipmentCopy[i].equipment[y].quantity,
                            originalValue: brigadeEquipmentCopy[i].equipment[y].originalValue,
                        })
                        // tmpBrigadeArray.push({
                        //     step: 1,
                        //     name: brigadeEquipmentCopy[i].equipment[y].name,
                        //     quantity: brigadeEquipmentCopy[i].equipment[y].quantity,
                        //     originalValue: brigadeEquipmentCopy[i].equipment[y].originalValue,
                        // })

                    }
                } else {
                    console.log('Кол-во соответсвует.')
                }
            }
            tmpBrigadeArray.push(obj);

        }



        for (let i = 0; i < carEquipmentCopy.length; i++) {
            let objCar = {
                name: carEquipmentCopy[i].name,
                items: []
            }
            for (let y = 0; y < carEquipmentCopy[i].items.length; y++) {
                if (carEquipmentCopy[i].items[y].originalValue != undefined) {
                    if (carEquipmentCopy[i].items[y].quantity != carEquipmentCopy[i].items[y].originalValue) {
                        console.log('Не состыковочка');
                        console.log('В оригинале - ' + carEquipmentCopy[i].items[y].originalValue);
                        console.log('Указано - ' + carEquipmentCopy[i].items[y].quantity);
                        console.log('Добавляем в массив');

                        objCar.items.push({
                            step: 2,
                            name: carEquipmentCopy[i].items[y].name,
                            quantity: carEquipmentCopy[i].items[y].quantity,
                            originalValue: carEquipmentCopy[i].items[y].originalValue,
                        })

                    }
                } else {
                    console.log('Кол-во соответсвует.')
                }
            }
            tmpCarArray.push(objCar);
        }

        for (let i = 0; i < carOxygenCopy.length; i++) {
            console.log('1st for')
            console.log(carOxygenCopy[i]);

            for (let y = 0; y < carOxygenCopy[i].items.length; y++) {
                let isReductor = false;
                if (carOxygenCopy[i].items[y].extraChecked) {
                    isReductor = true;
                }
                tmpCarOxyArray.push({
                    step: 3,
                    name: carOxygenCopy[i].items[y].name,
                    quantity: carOxygenCopy[i].items[y].value,
                    reductor: isReductor
                })
            }

        }
        setStepOneReport(tmpBrigadeArray)
        setStepTwoReport(tmpCarArray)
        setStepThreeReport(tmpCarOxyArray)
        setReportFormed(true);
    }

    React.useEffect(() => {
        formReport()
    }, [])

    const handleSendReport = () => {
        dispatch(sendReport(stepOneReport, stepTwoReport, stepThreeReport, comment, user._id, hash));
    }

    if (stepOneComplete && stepTwoComplete && reportFormed) {
        return (
            <>
                <ScrollView>
                    <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>

                        <Text category='h6' style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Итоговый отчет</Text>

                        {stepOneReport.length > 0 ? (
                            <Card status='info' style={{ width: '100%', marginTop: 10 }}>
                                {stepOneReport.map((stepOneObj, i) => {
                                    return (
                                        <>
                                            {stepOneObj.items.length > 0 ? (<>
                                                <Text category="h6">{stepOneObj.name}</Text>
                                                {stepOneObj.items.map((stepOneObjItem, i) => {
                                                    return (
                                                        <View key={i.toString()} style={{ display: 'flex', flex: 1, flexDirection: 'row', borderBottomColor: '#9c9c9c', borderBottomWidth: 1, borderStyle: 'dashed' }}>
                                                            <View><Text>{stepOneObjItem.name}</Text></View>
                                                            {(stepOneObjItem.originalValue - stepOneObjItem.quantity) > 0 ? (<>
                                                                <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'flex-end' }}><Text>{stepOneObjItem.originalValue - stepOneObjItem.quantity}</Text></View>
                                                            </>) : null}
                                                        </View>
                                                    )
                                                })}
                                            </>) : null}
                                        </>
                                    )
                                })}
                            </Card>
                        ) : null}

                        {stepTwoReport.length > 0 ? (
                            <Card status='info' style={{ width: '100%', marginTop: 10 }}>
                                {stepTwoReport.map((stepTwoObj, i) => {
                                    return (
                                        <>
                                            {stepTwoObj.items.length > 0 ? (<>
                                                <Text category="h6">{stepTwoObj.name}</Text>
                                                {stepTwoObj.items.map((stepTwoObjItem, i) => {
                                                    return (
                                                        <View key={i.toString()} style={{ display: 'flex', flex: 1, flexDirection: 'row', borderBottomColor: '#9c9c9c', borderBottomWidth: 1, borderStyle: 'dashed' }}>
                                                            <View><Text>{stepTwoObjItem.name}</Text></View>
                                                            {(stepTwoObjItem.originalValue - stepTwoObjItem.quantity) > 0 ? (<>
                                                                <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'flex-end' }}><Text>{stepTwoObjItem.originalValue - stepTwoObjItem.quantity}/{stepTwoObjItem.originalValue}</Text></View>
                                                            </>) : null}
                                                        </View>
                                                    )
                                                })}
                                            </>) : null}
                                        </>
                                    )
                                })}
                            </Card>
                        ) : null}

                        {stepThreeReport.length > 0 ? (
                            <Card status='info' style={{ width: '100%', marginTop: 10 }}>
                                {stepThreeReport.map((stepThreeObj, i) => {
                                    return (
                                        <>
                                            {stepThreeObj.quantity < 50 ? (<>
                                                <View key={i.toString()} style={{ display: 'flex', flex: 1, flexDirection: 'row', borderBottomColor: '#9c9c9c', borderBottomWidth: 1, borderStyle: 'dashed' }}>
                                                    <View><Text>Нужно пополнить {stepThreeObj.name}</Text></View>
                                                    <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'flex-end' }}><Text style={{ color: 'red' }}>{stepThreeObj.quantity}%</Text></View>
                                                </View></>) : null}
                                        </>
                                    )
                                })}
                            </Card>
                        ) : null}

                    </View>

                    <View style={{ marginTop: 30, paddingLeft: 10, paddingRight: 10, width: '100%', flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Input
                            style={{ width: '100%' }}
                            multiline={true}
                            value={comment}
                            onChangeText={(value) => setComment(value)}
                            textStyle={{ minHeight: 64 }}
                            placeholder='Комментарий'
                        />
                    </View>
                    <View style={{ marginTop: 30, marginBottom: 100, paddingLeft: 30, paddingRight: 30, width: '100%', flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Button size="medium" status='success' onPress={() => handleSendReport()}>ПОДТВЕРДИТЬ</Button>
                    </View>

                </ScrollView>
            </>
        )
    } else {
        return (
            <>
                <ScrollView>
                    <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                        <Text category='h6' style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Итоговый отчет</Text>
                        <Card status='info' style={{ width: '100%', marginTop: 10 }}>
                            <View style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Text>Формируем отчет...</Text>
                                    <ActivityIndicator />
                                </View>
                            </View>

                        </Card>

                    </View>
                </ScrollView>
            </>
        )
    }
}

export default BrigadeReportScreen;