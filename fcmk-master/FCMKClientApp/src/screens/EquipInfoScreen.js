import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Text, Input, Button, Icon, Card, Divider } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";
import { Root, Popup } from 'react-native-popup-confirm-toast'
import { getEquipInfo } from '../redux/actions/brigadeActions';
import { useFocusEffect } from '@react-navigation/native';

function EquipInfoScreen({ navigation }) {

    const dispatch = useDispatch();
    const activeBrigade = useSelector(state => state.profile.activeBrigade);
    const equipInfoLoading = useSelector(state => state.brigade.equipInfoLoading);
    const equipInfo = useSelector(state => state.brigade.equipInfo);

    const [searchVal, setSearchVal] = React.useState('');

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getEquipInfo(activeBrigade.selectedCar.id));
        }, [dispatch, activeBrigade])
    );


    let shownItems = equipInfo;

    const handleSearchChange = (e) => {
        console.log(e)
        setSearchVal(e);
    }

    shownItems = shownItems.filter(function (namefilter) {
        console.log('name');
        console.log(namefilter)
        return (
            namefilter.name
                .toLowerCase()
                .search(searchVal.toLowerCase()) !== -1
        );
    });


    return (
        <><Root>
            <View>
                <Input value={searchVal} onChangeText={(e) => handleSearchChange(e)} placeholder="Поиск"></Input>
            </View>
            <ScrollView>
                <View style={{ paddingLeft: 8, paddingRight: 8 }}>
                    {equipInfoLoading ? (<><ActivityIndicator style={{ marginTop: 40 }} /></>) : (<>

                        {shownItems.map((equip, i) => {
                            return (
                                <>
                                    <Card key={i.toString()} status='basic' style={{ width: '100%', marginTop: 10 }}>
                                        <View>
                                            <View style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                                {equip.images.map((image, y) => {
                                                    return (
                                                        <>
                                                            <Image style={{ marginRight: 4, width: 270, height: 170 }} source={{ uri: image.url }} />
                                                        </>
                                                    )
                                                })}
                                            </View>
                                            <Text style={{ fontSize: 27 }}>{equip.name}</Text>
                                            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                                            <Text style={{ fontWeight: 'bold' }}>{equip.headertext}</Text>
                                            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                                            <Text>{equip.description}</Text>
                                            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                                            <Text>{equip.extra}</Text>
                                            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

                                            <View>

                                            </View>
                                        </View>
                                    </Card>
                                </>
                            )
                        })}
                    </>)}
                </View>
            </ScrollView>
        </Root>
        </>
    )

}

export default EquipInfoScreen;