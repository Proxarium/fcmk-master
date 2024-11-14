import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator, Image, ScrollView, FlatList } from 'react-native';
import { Text, Input, Button, Icon, Card, CheckBox } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";
import { getBrigadeEquipment } from '../redux/actions/brigadeActions';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ProgressiveImageBackground from "../components/ImageBackground";

// import VerticalSlider from "rn-vertical-slider";
import { Slider } from '@miblanchard/react-native-slider';

import EquipBlock from '../components/EquipBlock'
import OxygenBlock from '../components/OxygenBlock'

import assets from '../images/assets';

function BrigadeEquipmentScreen({ navigation }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);
    const hash = useSelector(state => state.profile.hash);
    const selectedBrigade = useSelector(state => state.brigade.selectedBrigade);
    const selectedBrigadeCar = useSelector(state => state.brigade.selectedBrigadeCar);

    const brigadeEquipLoading = useSelector(state => state.brigade.brigadeEquipLoading);
    const brigadeEquipment = useSelector(state => state.brigade.brigadeEquipment);
    const carEquipment = useSelector(state => state.brigade.carEquipment);
    const carOxygen = useSelector(state => state.brigade.carOxygen);

    const stepOneComplete = useSelector(state => state.brigade.stepOneComplete);
    const stepTwoComplete = useSelector(state => state.brigade.stepTwoComplete);

    React.useEffect(() => {
        dispatch(getBrigadeEquipment(selectedBrigadeCar._id, selectedBrigade._id, hash));
    }, [])

    const [brigadeEquipArray, setBrigadeEquipArray] = React.useState([]);
    const [carEquipArray, setCarEquipArray] = React.useState([]);
    const [carOxygenArray, setCarOxygenArray] = React.useState([]);

    const scrollRef = React.useRef();

    // React.useEffect(() => {
    //     let count = brigadeEquipment.length;
    //     let cango = 0;
    //     for (let i = 0; i < brigadeEquipment.length; i++) {
    //         if (brigadeEquipment[i].checked) {
    //             console.log('checked')
    //             cango += 1;
    //         }
    //         if (cango == count) {
    //             setStepOneChecked(true);
    //         } else {
    //             setStepOneChecked(false);
    //         }
    //     }
    // }, [brigadeEquipment]);



    React.useEffect(() => {
        console.log('useEffect 1')
        if (!brigadeEquipLoading) {
            setBrigadeEquipArray(brigadeEquipment);
            setCarEquipArray(carEquipment);
            setCarOxygenArray(carOxygen);
        }
    }, [brigadeEquipLoading]);


    // React.useEffect(() => {
    //     let count = carEquipment.length;
    //     let cango = 0;
    //     for (let i = 0; i < carEquipment.length; i++) {
    //         if (carEquipment[i].checked) {
    //             console.log('checked')
    //             cango += 1;
    //         }
    //         if (cango == count) {
    //             setStepTwoChecked(true);
    //         } else {
    //             setStepTwoChecked(false);
    //         }
    //     }
    // }, [carEquipment]);

    const [stepOneChecked, setStepOneChecked] = React.useState(false);
    const [stepTwoChecked, setStepTwoChecked] = React.useState(false);
    const [stepThreeChecked, setStepThreeChecked] = React.useState(false);


    function renderBrigadeEquip() {
        if (checkStep == 0) {
            return (
                <>
                    {brigadeEquipArray.map((brigadeItem, i) => {
                        // {console.log('BRIGADE')}
                        // {console.log(brigadeItem)}
                        return (
                            <View key={i.toString()} style={{ marginBottom: 30, width: '100%', paddingLeft: 14, paddingRight: 14 }}>
                                <EquipBlock equipIndex={i} item={brigadeItem} step={1} />
                            </View>
                        )
                    })}
                </>
            )
        } else {
            return (
                <>
                </>
            )
        }

    }

    function renderCarEquip() {
        if (checkStep == 1) {
            return (
                <>
                    {carEquipArray.map((caritem, i) => {
                        return (
                            <View key={i.toString()} style={{ marginBottom: 30, width: '100%', paddingLeft: 14, paddingRight: 14 }}>
                                <EquipBlock equipIndex={i} item={caritem} step={2} />
                            </View>
                        )
                    })}
                </>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }




    const handleCompleteCheck = () => {
        navigation.navigate('BrigadeReportScreen')
    }


    const [oxygenOne, setOxygenOne] = React.useState(0);
    const [oxygenTwo, setOxygenTwo] = React.useState(10);
    const [oxygenThree, setOxygenThree] = React.useState(25);

    const handleChangeOxygenOne = (e) => {
        setOxygenOne(e);
    }


    const handleChangeOxygenTwo = (e) => {
        console.log(e)
        setOxygenTwo(
            prev => e
        );


        // setOxygenTwo(e);
    }

    function renderOxygen() {

        if (checkStep == 2) {
            return (
                <>
                    {carOxygenArray.map((oxygenItem, i) => {
                        return (
                            <View key={i.toString()} style={{ marginBottom: 30, width: '100%', paddingLeft: 14, paddingRight: 14 }}>
                                <OxygenBlock equipIndex={i} item={oxygenItem} step={3} />
                            </View>
                        )
                    })}
                </>
            )
        } else {
            return (
                <>
                </>
            )
        }

    }

    const progressStepsStyle = {
        activeStepIconBorderColor: '#949494',
        activeLabelColor: '#000000',
        activeStepNumColor: '#000000',
        activeStepIconColor: '#ffffff',
        completedStepIconColor: '#eeeeee',
        completedProgressBarColor: '#eeeeee',
        completedCheckColor: '#4bb543',
        disabledStepNumColor: '#ffffff',
        disabledStepIconColor: '#949494',
        // disabledStepLabelColor:'#000000',
        progressBarColor: '#949494',
        labelFontSize: 14,
        marginBottom: 30,
        borderWidth: 1,
        activeStepBorderWidth: 3
    };

    const [checkStep, setCheckStep] = React.useState(0);

    onPrevStep = () => {
        setCheckStep(checkStep - 1);
    }

    onNextStep1 = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
        setCheckStep(checkStep + 1);
    }

    return (
        <>
            <ScrollView ref={scrollRef}>
                <View style={{ flex: 1 }}>
                    <ProgressSteps activeStep={checkStep} {...progressStepsStyle}>
                        <ProgressStep removeBtnRow={true} style={{ marginBottom: 0 }} label="Шаг 1">
                            <View style={{ marginTop: 30, alignItems: 'center' }}>
                                {renderBrigadeEquip()}
                                <View style={{ marginTop: 30, marginBottom: 100, paddingLeft: 30, paddingRight: 30, width: '100%', flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    {stepOneComplete ? <Button size="medium" status='success' onPress={() => onNextStep1()}>Следующий шаг</Button> : null}
                                </View>
                            </View>
                        </ProgressStep>
                        <ProgressStep removeBtnRow={true} style={{ marginBottom: 0 }} label="Шаг 2">
                            <View style={{ marginTop: 30, alignItems: 'center' }}>
                                {renderCarEquip()}
                                <View style={{ marginTop: 30, marginBottom: 100, paddingLeft: 30, paddingRight: 30, width: '100%', flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Button size="medium" onPress={() => onPrevStep()}>Назад</Button>
                                    {stepTwoComplete ? <Button size="medium" status='success' onPress={() => onNextStep1()}>Следующий шаг</Button> : null}
                                </View>
                            </View>
                        </ProgressStep>
                        <ProgressStep removeBtnRow={true} style={{ marginBottom: 0 }} label="Шаг 3">
                            <View style={{ marginTop: 30, alignItems: 'center' }}>

                                {renderOxygen()}
                                <View style={{ marginTop: 30, marginBottom: 100, paddingLeft: 30, paddingRight: 30, width: '100%', flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Button size="medium" onPress={() => onPrevStep()}>Назад</Button>
                                    <Button size="medium" status='success' onPress={() => handleCompleteCheck()}>Завершить проверку</Button>
                                </View>
                            </View>
                        </ProgressStep>
                    </ProgressSteps>
                </View>
                {/* <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                {brigadeEquipLoading ? (<ActivityIndicator />) : (<>
                    {brigadeEquipment.length > 0 ? (<>
                        {renderBrigadeEquip()}
                    </>) : (<></>)}
                    {carEquipment.length > 0 ? (<>{renderCarEquip()}</>) : (<></>)}
                </>)}
            </View> */}
            </ScrollView>
        </>
    )

}

export default BrigadeEquipmentScreen;
