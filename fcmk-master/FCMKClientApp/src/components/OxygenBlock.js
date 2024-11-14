import React, { useEffect, useMemo, useCallback } from 'react';
import { View, StyleSheet, ImageBackground, ActivityIndicator, FlatList } from 'react-native';
import { Text, Input, Button, Icon, Card, CheckBox } from '@ui-kitten/components';
import ProgressiveImageBackground from "./ImageBackground";
import { useSelector, useDispatch } from "react-redux";
// import { Slider } from '@miblanchard/react-native-slider';
import { updateCopyRow, updateCopyRowOxygen } from '../redux/actions/brigadeActions';
import Slider from "react-native-smooth-slider";

const OxygenBlock = (props) => {

    //equipIndex
    //item
    //step

    const dispatch = useDispatch();
    const [oxygenArray, setOxygenArray] = React.useState(null);

    useEffect(() => {
        if (props.step == 3) {
            setOxygenArray(props.item.items);
        }
        // console.log(props.item.items)
    }, [])

    const [oxygenObject, setOxygenObject] = React.useState({
        name: props.item.name,
        image: props.item.image,
    })


    const checkItem = (val, index) => {
        let tmp = [...oxygenArray];
        tmp[index].extraChecked = val;
        setOxygenArray(tmp);
        dispatch(updateCopyRowOxygen(props.step, index, props.equipIndex, val))
    }

    const setItemValue = (val, index) => {
        console.log(val)
        let tmp = [...oxygenArray];
        tmp[index].value = val;
        setOxygenArray(tmp)
    }


    const handleSetItemValueComplete = (value, index) => {
        console.log('value');
        console.log(value);
        //equipIndex = i from item
        dispatch(updateCopyRow(props.step, index, props.equipIndex, value))
    }


    function renderOxygenItem(item, index) {
        return (<>
            <View style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

                <View style={{ marginTop: 10, paddingLeft: 5 }}><Text style={{ fontSize: 10, marginBottom:20 }} category='h6'>{item.name}</Text></View>

                {item.image != '' ? (
                    <View style={{ height: 70, width: 70 }}>
                        <ProgressiveImageBackground style={{ height: 70, width: 70 }} source={{ uri: item.image }}></ProgressiveImageBackground>
                    </View>) : null}

                <Text style={{ fontSize: 10, marginTop:20 }} category='h6'>{item.extraName}</Text>

                {item.extraChecked != null ? (
                    <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10, marginBottom:20 }}>
                        <View>
                            {item.extraChecked ? (<>
                                <Button onPress={() => checkItem(false, index)} appearance='ghost' status='danger' accessoryLeft={<Icon fill='#32a852' name='checkmark-circle-2-outline' />} />
                            </>) : (<>
                                <Button onPress={() => checkItem(true, index)} appearance='ghost' status='danger' accessoryLeft={<Icon fill='#004ce3' name='radio-button-off-outline' />} />
                            </>)}
                        </View>
                    </View>
                ) : null}


                <View style={{ display: 'flex', flex: 1, height: 150 }}>
                    <Slider
                        vertical={true}
                        style={{ width: 150,height:150 }}
                        maximumValue={item.max}
                        minimumValue={item.min}
                        step={item.step}
                        value={item.value}
                        onValueChange={value => setItemValue(value, index)}
                        onSlidingComplete={value => handleSetItemValueComplete(value, index)}
                    />
                </View>

                <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>%: {item.value}</Text>
            </View>
        </>)
    }


    return (<>
        {oxygenObject.image != '' ? (
            <View style={{ height: 150, marginBottom: 16, marginTop: 16 }}>
                <ProgressiveImageBackground source={{ uri: oxygenObject.image }}></ProgressiveImageBackground>
            </View>
        ) : (<></>)}
        <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#adadad', marginBottom: 16, }}>
            {/* <EquipStatus step={props.step} parentIndex={props.equipIndex} /> */}
            <View><Text category='h4' style={{ textAlign: 'center', marginBottom: 0 }}>{oxygenObject.name}</Text></View>
        </View>

        {oxygenArray != null ? (
            <>
                <View style={{ borderWidth: 1, borderColor: '#adadad', borderRadius: 6, marginBottom: 10, width: '100%', display: 'flex', flexDirection: 'row', flex: 1 }}>
                    {oxygenArray.map((oxygen, y) => {
                        console.log(oxygen);
                        return (
                            <>
                                {renderOxygenItem(oxygen, y)}
                                {/* <EquipItem item={equip} index={y} step={props.step} parentIndex={props.equipIndex} /> */}
                            </>
                        )
                    })}
                </View>
            </>) : (<></>)}
    </>)
}

export default OxygenBlock;



