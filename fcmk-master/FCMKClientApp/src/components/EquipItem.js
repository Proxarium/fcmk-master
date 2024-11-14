import React, { useEffect, useMemo, useCallback } from 'react';
import { View, StyleSheet, ImageBackground, ActivityIndicator, FlatList } from 'react-native';
import { Text, Input, Button, Icon, Card, CheckBox } from '@ui-kitten/components';
import ProgressiveImageBackground from "./ImageBackground";
import { updateBrigadeEquip, updateCarEquip, updateRow, updateCopyRow } from '../redux/actions/brigadeActions';
import { useSelector, useDispatch } from "react-redux";

const EquipItem = (props) => {

    //item - сам чекбокс
    //index - порядковый номер в блоке
    //step - номер шага
    //parentIndex - порядковый номер родительского блока

    const dispatch = useDispatch();

    const [itemData, setItemData] = React.useState(props.item);
    const [editRow, setEditRow] = React.useState(false);

    const [editValue, setEditValue] = React.useState(null);

    const checkEquip = (newValue) => { // STEP 1 & 2
        setItemData({ ...itemData, checked: newValue });
        console.log('checkEquip')
        console.log(props)
        dispatch(updateRow(props.step, props.index, props.parentIndex, newValue))
    }


    const handleSaveNewValue = (val) => {
        console.log(val);

        if (itemData.changedQuantity != true) {
            setItemData({ ...itemData, baseQuantity: itemData.quantity })
        }
        setItemData({ ...itemData, changedQuantity: true, quantity: val });
        //step, index, parentIndex, value, ischanged
        dispatch(updateCopyRow(props.step, props.index, props.parentIndex, val))
        setEditRow(false);
        setEditValue(null);
    }

    return (
        <>
            {/* {console.log(itemData)} */}
            <View style={{ borderWidth: 1, borderColor: '#adadad', borderRadius: 6, marginBottom: 10 }}>

                {/* {itemData.image != undefined ? (
                    <View style={{ height: 150, marginBottom: 16, marginTop: 16 }}>
                        <ProgressiveImageBackground source={{ uri: itemData.image }} />
                    </View>
                ) : null} */}

                <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                    <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <View>
                            {itemData.checked ? (<>
                                <Button onPress={() => checkEquip(false)} appearance='ghost' status='danger' accessoryLeft={<Icon fill='#32a852' name='checkmark-circle-2-outline' />} />
                            </>) : (<>
                                <Button onPress={() => checkEquip(true)} appearance='ghost' status='danger' accessoryLeft={<Icon fill='#004ce3' name='radio-button-off-outline' />} />
                            </>)}
                        </View>
                        <View style={{flexGrow:1, width:'80%', maxWidth:'80%'}}>
                            <Text>{itemData.name}</Text>
                        </View>
                    </View>


                    {itemData.image != undefined ? (
                        <View style={{ height: 60, width: 60, marginRight:10, marginTop:10}}>
                            <ProgressiveImageBackground style={{ height: 60, width: 60,}} source={{ uri: itemData.image }} />
                        </View>
                    ) : null}




                </View>

                <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                    <View>
                        {!editRow ? (
                            <>
                                <Button disabled={itemData.checked} onPress={() => { setEditRow(true); setEditValue(itemData.quantity); }} appearance='ghost' status='danger' accessoryLeft={<Icon fill='#004ce3' name='edit-outline' />} />
                            </>
                        ) : (
                            <>
                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <Input
                                        style={{ width: 90, marginLeft: 5 }}
                                        value={editValue}
                                        onChangeText={nextValue => setEditValue(nextValue)} />
                                    <Button style={{ marginRight: 10 }} onPress={() => handleSaveNewValue(editValue)} appearance='ghost' status='danger' accessoryLeft={<Icon fill='#004ce3' name='save-outline' />}></Button>
                                </View>

                            </>)}
                    </View>
                    <View>
                        {itemData.type != undefined ? (
                            <Text>{itemData.quantity} {itemData.type}</Text>
                        ) : (
                            <Text>{itemData.quantity} шт.</Text>
                        )}
                    </View>
                </View>
            </View>

        </>
    )
}

export default EquipItem;