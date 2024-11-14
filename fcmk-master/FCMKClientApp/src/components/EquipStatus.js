import React, { useEffect, useMemo, useCallback } from 'react';
import { View, StyleSheet, ImageBackground, ActivityIndicator, FlatList } from 'react-native';
import { Text, Input, Button, Icon, Card, CheckBox } from '@ui-kitten/components';
import ProgressiveImageBackground from "./ImageBackground";
import { updateBrigadeEquip, updateCarEquip, updateRow } from '../redux/actions/brigadeActions';
import { useSelector, useDispatch } from "react-redux";

const EquipStatus = (props) => {

    //step - номер шага
    //parentIndex - порядковый номер родительского блока

    const brigadeEquipObjectRedux = useSelector(state => state.brigade.brigadeEquipmentCopy);
    const carEquipObjectRedux = useSelector(state => state.brigade.carEquipmentCopy);

    if (props.step == '1') {
        return (
            <>
                <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                    {brigadeEquipObjectRedux[props.parentIndex].checked ? (<Icon style={{ width: 30, height: 30 }} fill='#0fe000' name='checkmark-outline' />) : (<Text>-</Text>)}
                </View>

            </>
        )
    } else if (props.step == '2') {
        return (
            <>
                <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                    {carEquipObjectRedux[props.parentIndex].checked ? (<Icon style={{ width: 30, height: 30 }} fill='#0fe000' name='checkmark-outline' />) : (<Text>-</Text>)}
                </View>

            </>
        )
    }

}

export default EquipStatus;