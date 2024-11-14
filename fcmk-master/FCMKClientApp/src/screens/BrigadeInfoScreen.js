import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Input, Button, Icon, Card, ButtonGroup } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";
import { getBrigadeCarList, setSelectedBrigadeCar, setBrigade, getBrigadeUserList, sendBrigadeUsers } from '../redux/actions/brigadeActions';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

function BrigadeInfoScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);
    const hash = useSelector(state => state.profile.hash);

    const brigadeCarList = useSelector(state => state.brigade.brigadeCarList);
    const brigadeCarLoading = useSelector(state => state.brigade.brigadeCarLoading);
    const selectedBrigade = useSelector(state => state.brigade.selectedBrigade);
    const selectedBrigadeCar = useSelector(state => state.brigade.selectedBrigadeCar);

    const isBrigadeSet = useSelector(state => state.brigade.isBrigadeSet);

    const brigadeUserList = useSelector(state => state.brigade.brigadeUserList);
    const brigadeUserListLoading = useSelector(state => state.brigade.brigadeUserListLoading);

    const brigadeUsersAdded = useSelector(state => state.brigade.brigadeUsersAdded);
    const brigadeUsersAdding = useSelector(state => state.brigade.brigadeUsersAdding);

    const brigadeFormed = useSelector(state => state.brigade.brigadeFormed);

    React.useEffect(() => {
        dispatch(getBrigadeUserList(hash));
    }, [])

    // React.useEffect(() => {
    //     if(brigadeFormed == true){
    //         navigation.navigate('BrigadeEquipmentScreen');
    //     }
    // }, [brigadeFormed])

    const [selectedBrigadeUser, setSelectedBrigadeUser] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    // React.useEffect(() => {
    //     // console.log('selectedBrigadeUser');
    //     // console.log(selectedBrigadeUser);

    // }, [selectedBrigadeUser])

    function getNameById(id) {
        var result = brigadeUserList.filter(e => {
            return e._id == id
        })
        return result[0].name;
    }

    const handleSendBrigade = () => {
        dispatch(sendBrigadeUsers(user._id, selectedBrigadeUser, hash, selectedBrigade, selectedBrigadeCar))
    }

    return (
        <>
        <ScrollView>
            <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 10, paddingRight: 10, paddingTop: 20, justifyContent: 'flex-start' }}>
                <Card status='basic' style={{ width: '100%' }}>
                    <Text category='h6'>Бригада:</Text>
                    <Text category='s1'>{selectedBrigade.brigadeName}</Text>
                </Card>

                <Card status='basic' style={{ width: '100%' }}>

                    <Text category='h6'>Машина: </Text>
                    <Text>{selectedBrigadeCar.carNumber}</Text>
                </Card>
                <Card status='basic' style={{ width: '100%' }}>

                    <Text category='h6'>Состав бригады:</Text>
                    {selectedBrigadeUser != null ? (
                        <>
                            <Text>- {user.name}</Text>
                            <Text>- {getNameById(selectedBrigadeUser)}</Text>
                        </>) : (<><Text>- {user.name}</Text></>)}
                </Card>
                {brigadeUserListLoading ? (<><ActivityIndicator /></>) : (

                    <View style={{ alignItems: 'center', display: 'flex', marginBottom: 10, marginTop: 10 }}>
                        {brigadeUsersAdding ? (<><ActivityIndicator /></>) : (<>
                            {brigadeUsersAdded ? (<></>) : (<>
                                <Text>С кем Вы работаете:</Text>
                                <DropDownPicker
                                    schema={{
                                        label: 'name',
                                        value: '_id'
                                    }}
                                    style={{ width: '100%', marginBottom:150 }}
                                    dropDownContainerStyle={{
                                        width: '100%',
                                    }}
                                    dropDownMaxHeight={5100}
                                    searchable={true}
                                    open={open}
                                    value={selectedBrigadeUser}
                                    items={brigadeUserList}
                                    setOpen={setOpen}
                                    setValue={setSelectedBrigadeUser}
                                    setItems={setItems}
                                    translation={{
                                        PLACEHOLDER: "Выберите напарника",
                                        SEARCH_PLACEHOLDER: "Введите имя...",
                                        NOTHING_TO_SHOW: "Никого не найдено."
                                    }}
                                />

                                <View style={{display:'flex', flexDirection:'row', height:46, marginTop:20, marginBottom:10}}>
                                    <Button  status='success' disabled={selectedBrigadeUser == null} onPress={() => handleSendBrigade()}>Подтвердить выбор</Button>
                                    <Button status='warning' onPress={() => handleSendBrigade()}>Я работаю один :(</Button>
                                </View>


                            </>)}

                            {brigadeUsersAdded ? (<>
                                <View style={{display:'flex', height:46, marginTop:20, marginBottom:10, alignItems:'center', justifyContent:'center'}}>
                                    <Button status='success' onPress={() => navigation.navigate('BrigadeEquipmentScreen')}>Начать проверку</Button>
                                </View>
                            </>) : (<></>)}

                        </>)}

                    </View>

                )}








                {/* <Select
                    selectedIndex={selectedBrigadeUser}
                    onSelect={index => setSelectedBrigadeUser(index)}>
                    <SelectItem title='Option 1' />
                    <SelectItem title='Option 2' />
                </Select> */}





                <View>
                    <Button onPress={() => navigation.navigate('SelectBrigadeScreen')}>Назад</Button>
                </View>





            </View>
            </ScrollView>
        </>
    )

}

export default BrigadeInfoScreen;