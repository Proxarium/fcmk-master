import * as React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Input, Button, Icon, Card } from '@ui-kitten/components';
import { useSelector, useDispatch } from "react-redux";
import { passBrigade } from '../redux/actions/profileActions';
import { saveRecipe, sendRecipe} from '../redux/actions/brigadeActions';
function BrigadeRecipeScreen({ navigation }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);
    const hash = useSelector(state => state.profile.hash);
    const activeBrigadeFinding = useSelector(state => state.profile.activeBrigadeFinding);
    const activeBrigade = useSelector(state => state.profile.activeBrigade);
    const shouldAsk = useSelector(state => state.profile.shouldAsk);
    const passingBrigade = useSelector(state => state.profile.passingBrigade);

    const brigadeRecipe = useSelector(state => state.brigade.brigadeRecipe);
    const brigadeRecipeSending = useSelector(state => state.brigade.brigadeRecipeSending);
    const wasSended = useSelector(state => state.brigade.wasSended);

    // React.useEffect(()=>{
    //     if(!passingBrigade){
    //         if(shouldAsk){
    //             navigation.navigate('BaseScreen', {
    //                 ask: true
    //               });
    //         }
    //     }
    // },[passingBrigade])


    // console.log('activeBrigade');
    // console.log(activeBrigade);

    const [showSuccessSave, setShowSuccessSave] = React.useState(false)
    const [recipeItems, setRecipeItems] = React.useState(brigadeRecipe);

    React.useEffect(()=>{
        dispatch(saveRecipe(recipeItems));
    },[recipeItems])

    React.useEffect(()=>{
        if(!brigadeRecipeSending && wasSended){
            setShowSuccessSave(true);
            setTimeout(() => {
                setShowSuccessSave(false);
            }, 5000);
        }
    },[brigadeRecipeSending])


    const addRecipeRow = () => {
        console.log(recipeItems)
        let recipeItemsTmp = [...recipeItems.recipes];
        console.log('recipeItemsTmp');
        console.log(recipeItemsTmp)
        recipeItemsTmp.push({ kvNum: '', items: [
            {name: '', quantity: ''},
            {name: '', quantity: ''},
            {name: '', quantity: ''},
            {name: '', quantity: ''},
            {name: '', quantity: ''}
        ], comment: '' });
        setRecipeItems({ ...recipeItems, recipes: recipeItemsTmp });
    }

    const handleChangeVal = (e, i, y, val) => {

        let recipeItemsTmp = [...recipeItems.recipes];
        switch (val) {
            case 'name':
                recipeItemsTmp[i].items[y].name = e;
                break;
            case 'quantity':
                recipeItemsTmp[i].items[y].quantity = e;
                break;
        }
        setRecipeItems({ ...recipeItems, recipes: recipeItemsTmp });
    }

    const handleChangeComment = (e, i) => {

        let recipeItemsTmp = [...recipeItems.recipes];
        recipeItemsTmp[i].comment = e;
        setRecipeItems({ ...recipeItems, recipes: recipeItemsTmp });
    }


    const addItemToRecipe = (i) => {
        let recipeItemsTmp = [...recipeItems.recipes];
        console.log('recipeItemsTmp');
        console.log(recipeItemsTmp)
        recipeItemsTmp[i].items.push({ name: '', quantity: '' });
        setRecipeItems({ ...recipeItems, recipes: recipeItemsTmp });
    }

    const handleChangeKv = (e,i) => {
        let recipeItemsTmp = [...recipeItems.recipes];
        recipeItemsTmp[i].kvNum = e;
        setRecipeItems({ ...recipeItems, recipes: recipeItemsTmp });
    }

    const handleSaveRecipe = () => {
        dispatch(sendRecipe(brigadeRecipe, hash))
    }

    function renderRecipeRow() {
        return (

            <>
                {recipeItems.recipes.map((row, i) => {
                    return (
                        <Card status='info' style={{ width: '100%', marginLeft: 5, marginRight: 5, marginTop: 10 }}>
                            <View style={{ marginBottom: 10, paddingBottom: 20, borderBottomColor: '#131313', borderBottomWidth: 1 }}><Input value={row.kvNum} onChangeText={(e) => handleChangeKv(e, i)} placeholder="№КВ"></Input></View>
                            {row.items.map((item, y) => {
                                return (
                                    <View style={{ marginBottom: 10, paddingBottom: 20, borderBottomColor: '#131313', borderBottomWidth: 1, display:'flex', flex:1, flexDirection:'row'}}>
                                        <Input value={item.name} style={{ marginTop: 10, flexGrow:1, marginRight:5 }} onChangeText={(e) => handleChangeVal(e, i, y, 'name')} placeholder="Название"></Input>
                                        <Input value={item.quantity} style={{ marginTop: 10 }} onChangeText={(e) => handleChangeVal(e, i, y, 'quantity')} placeholder="Кол-во"></Input>
                                    </View>
                                )
                            })}
                            <Input value={row.comment} style={{ marginTop: 20, marginBottom: 30 }} onChangeText={(e) => handleChangeComment(e, i)} placeholder="Комментарий"></Input>
                            <Button onPress={() => addItemToRecipe(i)}>Добавить позицию</Button>
                        </Card>
                    )
                })}
            </>
        )
    }

    // const handlePassBrigade = () => {
    //     console.log('pass');
    //     dispatch(passBrigade(hash, activeBrigade._id, personOne, personTwo, recipeItems));
    // }


    return (
        <>
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>
                    <Card status='info' style={{ width: '100%', marginLeft: 5, marginRight: 5, marginTop: 10 }}>
                        <Input value={recipeItems.personOneName} onChangeText={(e) => setRecipeItems({ ...recipeItems, personOneName: e })} placeholder="ФИО врача"></Input>
                        <Input value={recipeItems.personTwoName} onChangeText={(e) => setRecipeItems({ ...recipeItems, personTwoName: e })} style={{ marginTop: 10 }} placeholder="ФИО фельдшера"></Input>
                    </Card>
                    {recipeItems.recipes.length > 0 ? (<>{renderRecipeRow()}</>) : (<></>)}
                    <View style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', marginBottom: 200, marginTop: 20}}>
                        <Button style={{ marginBottom: 20, marginTop: 20 }} onPress={() => addRecipeRow()} status="primary">Добавить рецепт</Button>
                        
                        {showSuccessSave ? (<><Text style={{textAlign:'center', color:'green'}}>Сохранено</Text></>):null}
                        {brigadeRecipeSending ? (<ActivityIndicator/>):(<Button style={{ marginBottom: 20, marginTop: 20 }} onPress={() => handleSaveRecipe()} status="success">Сохранить</Button>)}
                        
                    </View>

                </View>
            </ScrollView>
        </>
    )

}

export default BrigadeRecipeScreen;