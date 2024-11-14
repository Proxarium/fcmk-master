import React, { useEffect, useMemo, useCallback } from 'react';
import { View, StyleSheet, ImageBackground, ActivityIndicator, FlatList, Image } from 'react-native';
import { Text, Input, Button, Icon, Card, CheckBox } from '@ui-kitten/components';
import ProgressiveImageBackground from "./ImageBackground";
import { updateBrigadeEquip, updateCarEquip } from '../redux/actions/brigadeActions';
import { useSelector, useDispatch } from "react-redux";

import EquipItem from './EquipItem';
import EquipStatus from './EquipStatus';

const EquipBlock = (props) => {

    //equipIndex
    //item
    //step
    //image

    const dispatch = useDispatch();
    const [equipArray, setEquipArray] = React.useState(null);

    useEffect(() => {
        if (props.step == 1) {
            setEquipArray(props.item.equipment);
        } else if (props.step == 2) {
            setEquipArray(props.item.items);
        }
    }, [])

    const [equipObject, setEquipObject] = React.useState({
        name: props.item.name,
        checked: props.item.checked,
        image: props.item.image,
    })

    // let imagePath = require(equipObject.image);

    return (<>
    {console.log('-')}
    {console.log(props.image)}
    {console.log('-')}
    {console.log(props.item)}
    {console.log(props)}
        {equipObject.image != '' ? (
            <View style={{ height: 150, marginBottom: 16, marginTop: 16 }}>
                {/* source={{ uri: equipObject.image }} */}
                {/* <Image style={{width:200, height:200}} source={props.item.image} /> */}
                {/* <Image source={imagePath} /> */}
                <ProgressiveImageBackground source={{ uri: equipObject.image }}></ProgressiveImageBackground>
            </View>
        ) : (<></>)}
        <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#adadad', marginBottom: 16, }}>
            <EquipStatus step={props.step} parentIndex={props.equipIndex} />
            <View><Text category='h4' style={{ textAlign: 'center', marginBottom: 0 }}>{equipObject.name}</Text></View>
        </View>

        {equipArray != null ? (
            <>
                {equipArray.map((equip, y) => {
                    return (
                        <>
                            <EquipItem item={equip} index={y} step={props.step} parentIndex={props.equipIndex} />
                        </>
                    )
                })}
            </>) : (<></>)}

        {/* {equipArray.map(renderItem)} */}

        {/* {equipArray.map((equip, y) => {
                    return (
                        <>
                            <View style={{ borderWidth: 1, borderColor: '#adadad', borderRadius: 6, marginBottom: 10 }}>

                                <View key={y.toString()} style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                    <View>
                                        {equip.checked ? (<>
                                            <Button onPress={() => checkEquip(false, y)} appearance='ghost' status='danger' accessoryLeft={<Icon fill='#32a852' name='checkmark-circle-2-outline' />} />
                                        </>) : (<>
                                            <Button onPress={() => checkEquip(true, y)} appearance='ghost' status='danger' accessoryLeft={<Icon fill='#004ce3' name='radio-button-off-outline' />} />
                                        </>)}

                                    </View>
                                    <View>
                                        <Text>{equip.name}</Text>
                                    </View>
                                </View>

                                <View key={y.toString()} style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                    <View>
                                        {editRow != y ? (
                                            <>
                                                <Button onPress={() => { setEditRow(y); setEditValue(equip.quantity); }} appearance='ghost' status='danger' accessoryLeft={<Icon fill='#004ce3' name='edit-outline' />} />
                                            </>
                                        ) : (
                                            <>
                                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                    <Input
                                                        style={{ width: 90, marginLeft: 5 }}
                                                        value={editValue}
                                                        onChangeText={nextValue => setEditValue(nextValue)} />
                                                    <Button style={{ marginRight: 10 }} onPress={() => handleSaveNewValue(y, editValue)} appearance='ghost' status='danger' accessoryLeft={<Icon fill='#004ce3' name='save-outline' />}></Button>
                                                </View>

                                            </>)}
                                    </View>
                                    <View>
                                        <Text>{equip.quantity} шт.</Text>
                                    </View>
                                </View>
                            </View>

                        </>
                        // <View key={y.toString()} style={{ borderWidth: 1, borderColor: '#adadad', borderRadius: 6, display: 'flex', flex: 1, alignItems: 'flex-start', paddingTop: 8, paddingLeft: 10, justifyContent: 'center', marginTop: 10, flexDirection: 'column' }}>
                        //     <View>
                        //         <CheckBox
                        //             style={{ marginBottom: 10 }}
                        //             checked={equip.checked}
                        //             onChange={newValue => checkEquip(newValue, y)}
                        //             children={<View style={{}}><Text>{equip.name} - {equip.quantity} шт.</Text></View>}
                        //         >
                        //         </CheckBox>
                        //     </View>
                        //     <View>
                        //         {editRow != y ? (
                        //             <>
                        //                 <Button onPress={() => { setEditRow(y); setEditValue(equip.quantity); }} appearance='ghost' status='danger' accessoryLeft={<Icon fill='#004ce3' name='edit-outline' />} />
                        //             </>
                        //         ) : (
                        //             <>
                        //                 <Input
                        //                     value={editValue}
                        //                     onChangeText={nextValue => setEditValue(nextValue)} />
                        //                 <Button onPress={() => handleSaveNewValue(y, editValue)}>Сохранить</Button>
                        //             </>)}
                        //     </View>
                        // </View>
                    )
                })} */}
        {/* </> */}
        {/* // ) : null
        // } */}

    </>)
}

export default EquipBlock;