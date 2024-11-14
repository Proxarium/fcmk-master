import {EQUIP_INFO_LOADING, EQUIP_INFO_LOADED, FOUND_YOUR_BRIGADE_RECIPE, RECIPE_SENDED, RECIPE_SENDING, SAVE_RECIPE, RESET_BRIGADE, REPORT_SENDING, REPORT_SENDED, UPDATE_COPY_ROW_OXY, UPDATE_COPY_ROW, CAR_EQUIP_UPDATE, BRIGADE_EQUIP_UPDATE, BRIGADE_EQUIP_CHANGE, BRIGADE_EQUIP_LOADED, BRIGADE_EQUIP_LOADING, BRIGADE_USERS_ADDING, BRIGADE_USERS_ADDED, BRIGADE_USER_LOADED, BRIGADE_USER_LOADING, BRIGADE_SETING, BRIGADE_SETED, BRIGADE_LOADING, BRIGADE_LOADED, BRIGADE_SELECTED, BRIGADE_CAR_LOADING, BRIGADE_CAR_LOADED, BRIGADE_CAR_SELECTED } from '../actions/types';
import update from 'immutability-helper';

const initialState = {
    brigadelist: [],
    brigadeLoading: true,
    selectedBrigade: null,
    brigadeCarList: [],
    brigadeCarLoading: true,
    selectedBrigadeCar: null,
    isBrigadeSet: false,
    brigadeSeting: false,
    brigadeUserList: [],
    brigadeUserListLoading: true,
    brigadeUsersAdded: false,
    brigadeUsersAdding: false,
    brigadeFormed: false,
    brigadeEquipLoading: true,
    brigadeEquipment: [],
    carEquipment: [],
    brigadeEquipmentCopy: [],
    carEquipmentCopy: [],
    stepOneComplete: false,
    stepTwoComplete: false,
    carOxygen: [],
    carOxygenCopy: [],
    brigadeCompleted: false,
    brigadeSended: false,
    brigadeRecipe: {
        personOneName: '',
        personTwoName: '',
        recipes: [],
    },
    brigadeRecipeSending: false,
    wasSended:false,
    equipInfoLoading:false,
    equipInfo:[]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case EQUIP_INFO_LOADING:
            return{
                ...state,
                equipInfoLoading:true
            }
        case EQUIP_INFO_LOADED:
            return{
                ...state,
                equipInfoLoading:false,
                equipInfo:action.payload.equipment
            }
        case FOUND_YOUR_BRIGADE_RECIPE:
            // console.log('FOUND_YOUR_BRIGADE_RECIPE');
            return {
                ...state,
                brigadeRecipe: action.payload
            }
        case RECIPE_SENDING:
            return {
                ...state,
                brigadeRecipeSending: true,
                wasSended:false,
            }
        case RECIPE_SENDED:
            return {
                ...state,
                brigadeRecipeSending: false,
                wasSended:true,
            }
        case SAVE_RECIPE:
            console.log('SAVE_RECIPE');
            console.log(action.payload)
            return {
                ...state,
                brigadeRecipe: action.payload
            }

        case RESET_BRIGADE:
            return {
                ...state,
                brigadelist: [],
                brigadeLoading: true,
                selectedBrigade: null,
                brigadeCarList: [],
                brigadeCarLoading: true,
                selectedBrigadeCar: null,
                isBrigadeSet: false,
                brigadeSeting: false,
                brigadeUserList: [],
                brigadeUserListLoading: true,
                brigadeUsersAdded: false,
                brigadeUsersAdding: false,
                brigadeFormed: false,
                brigadeEquipLoading: true,
                brigadeEquipment: [],
                carEquipment: [],
                brigadeEquipmentCopy: [],
                carEquipmentCopy: [],
                stepOneComplete: false,
                stepTwoComplete: false,
                carOxygen: [],
                carOxygenCopy: [],
                brigadeCompleted: false,
                brigadeSended: false,
            }
        case REPORT_SENDED:
            console.log('REPORT_SENDED');
            return {
                ...state,
                brigadeCompleted: true,
                brigadeSended: true,
            }
        case UPDATE_COPY_ROW_OXY:
            console.log('UPDATE_COPY_ROW_OXY');
            console.log(action.payload);


            const updateCarOxyEquipmentCopy = state.carOxygenCopy;
            updateCarOxyEquipmentCopy[action.payload.parentIndex].items[action.payload.index].extraChecked = action.payload.value;

            return {
                ...state,
                carOxygenCopy: [...updateCarOxyEquipmentCopy],
            }

        case UPDATE_COPY_ROW:
            console.log('UPDATE_COPY_ROW')
            console.log(action.payload);

            // payload: {step:step, index:index, parentIndex:parentIndex, value:value }
            if (action.payload.step == 1) {
                const updateBrigadeRowEquipmentCopy = state.brigadeEquipmentCopy;
                if (updateBrigadeRowEquipmentCopy[action.payload.parentIndex].equipment[action.payload.index].quantity != action.payload.value) {
                    if (!updateBrigadeRowEquipmentCopy[action.payload.parentIndex].equipment[action.payload.index].isChanged) {
                        updateBrigadeRowEquipmentCopy[action.payload.parentIndex].equipment[action.payload.index].isChanged = true;
                        updateBrigadeRowEquipmentCopy[action.payload.parentIndex].equipment[action.payload.index].originalValue = updateBrigadeRowEquipmentCopy[action.payload.parentIndex].equipment[action.payload.index].quantity;
                    }
                }
                updateBrigadeRowEquipmentCopy[action.payload.parentIndex].equipment[action.payload.index].quantity = action.payload.value;
                return {
                    ...state,
                    brigadeEquipmentCopy: [...updateBrigadeRowEquipmentCopy]
                }
            }

            if (action.payload.step == 2) {
                const updateCarRowEquipmentCopy = state.carEquipmentCopy;
                if (updateCarRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].quantity != action.payload.value) {
                    if (!updateCarRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].isChanged) {
                        updateCarRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].isChanged = true;
                        updateCarRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].originalValue = updateCarRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].quantity;
                    }
                }
                updateCarRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].quantity = action.payload.value;
                return {
                    ...state,
                    carEquipmentCopy: [...updateCarRowEquipmentCopy]
                }
            }

            if (action.payload.step == 3) {
                console.log('step 3')
                const updateCarOxyRowEquipmentCopy = state.carOxygenCopy;
                console.log(updateCarOxyRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].value);
                console.log(action.payload.value);

                if (updateCarOxyRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].value != action.payload.value) {
                    console.log('не равны');
                    console.log(updateCarOxyRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].value);
                    console.log(action.payload.value);
                    if (!updateCarOxyRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].isChanged) {
                        updateCarOxyRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].isChanged = true;
                        updateCarOxyRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].originalValue = updateCarOxyRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].value;
                    }
                }
                updateCarOxyRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].value = action.payload.value;
                return {
                    ...state,
                    carOxygenCopy: [...updateCarOxyRowEquipmentCopy]
                }
            }


        // if (action.payload.step == 2) {
        //     const updateCarRowEquipmentCopy = state.carEquipmentCopy;

        //     if (updateCarRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].quantity != action.payload.value) {
        //         updateCarRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].isChanged = true;
        //     }
        //     updateCarRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].quantity = action.payload.value;

        //     return {
        //         ...state,
        //         carEquipmentCopy: [...updateCarRowEquipmentCopy]
        //     }
        // }
        // if (action.payload.step == '3') {
        //     const updateBrigadeRowEquipmentCopy = state.brigadeEquipmentCopy;

        //     if (updateBrigadeRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].quantity != action.payload.value) {
        //         updateBrigadeRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].isChanged = true;
        //     }
        //     updateBrigadeRowEquipmentCopy[action.payload.parentIndex].items[action.payload.index].quantity = action.payload.value;

        //     return {
        //         ...state,
        //         brigadeEquipmentCopy: [...updateBrigadeRowEquipmentCopy]
        //     }
        // }

        case CAR_EQUIP_UPDATE:
            console.log('CAR_EQUIP_UPDATE');
            // console.log(action.payload.index)
            // console.log(action.payload.parentIndex)
            // console.log(action.payload.value)
            const updateCarEquipmentCopy = state.carEquipmentCopy;
            updateCarEquipmentCopy[action.payload.parentIndex].items[action.payload.index].checked = action.payload.value;



            let carBlockCount = updateCarEquipmentCopy[action.payload.parentIndex].items.length;
            console.log('carBlockCount ' + carBlockCount)
            let currentCarChecked = 0;
            for (let index = 0; index < updateCarEquipmentCopy[action.payload.parentIndex].items.length; index++) {
                if (updateCarEquipmentCopy[action.payload.parentIndex].items[index].checked == true) {
                    currentCarChecked += 1;
                    console.log('currentCarChecked + 1');
                    console.log(currentCarChecked);
                }
            }
            if (currentCarChecked == carBlockCount) {
                updateCarEquipmentCopy[action.payload.parentIndex].checked = true;
            } else {
                updateCarEquipmentCopy[action.payload.parentIndex].checked = false;
            }
            let checkedCarBlockCount = 0;
            for (let index = 0; index < updateCarEquipmentCopy.length; index++) {
                if (updateCarEquipmentCopy[index].checked) {
                    checkedCarBlockCount += 1;
                    console.log('stepTwoComplete +1')
                }
            }

            let isStepTwoChecked = false;
            if (checkedCarBlockCount == updateCarEquipmentCopy.length) {
                isStepTwoChecked = true;
                console.log('complete!!!!')
            }

            // console.log(updateCarEquipmentCopy[action.payload.parentIndex].items)
            // console.log(updateCarEquipmentCopy[action.payload.parentIndex].items.map((tmp)=>{console.log(tmp)}));
            return {
                ...state,
                carEquipmentCopy: [...updateCarEquipmentCopy],
                stepTwoComplete: isStepTwoChecked,
            }





        case BRIGADE_EQUIP_UPDATE:
            console.log('BRIGADE_EQUIP_UPDATE');
            // console.log(action.payload.index)
            // console.log(action.payload.parentIndex)
            // console.log(action.payload.value)

            const updateBrigadeEquipmentCopy = state.brigadeEquipmentCopy;
            updateBrigadeEquipmentCopy[action.payload.parentIndex].equipment[action.payload.index].checked = action.payload.value;


            let brigadeBlockCount = updateBrigadeEquipmentCopy[action.payload.parentIndex].equipment.length;
            console.log('brigadeBlockCount ' + brigadeBlockCount)
            let currentBrigadeChecked = 0;
            for (let index = 0; index < updateBrigadeEquipmentCopy[action.payload.parentIndex].equipment.length; index++) {
                if (updateBrigadeEquipmentCopy[action.payload.parentIndex].equipment[index].checked == true) {
                    currentBrigadeChecked += 1;
                    console.log('currentBrigadeChecked + 1');
                    console.log(currentBrigadeChecked);
                }
            }
            if (currentBrigadeChecked == brigadeBlockCount) {
                updateBrigadeEquipmentCopy[action.payload.parentIndex].checked = true;
            } else {
                updateBrigadeEquipmentCopy[action.payload.parentIndex].checked = false;
            }
            let checkedBrigadeBlockCount = 0;
            for (let index = 0; index < updateBrigadeEquipmentCopy.length; index++) {
                if (updateBrigadeEquipmentCopy[index].checked) {
                    checkedBrigadeBlockCount += 1;
                    console.log('stepTwoComplete +1')
                }
            }

            let isStepOneChecked = false;
            if (checkedBrigadeBlockCount == updateBrigadeEquipmentCopy.length) {
                isStepOneChecked = true;
                console.log('complete!!!!')
            }

            // console.log(updateBrigadeEquipmentCopy[action.payload.parentIndex].equipment)
            // console.log(updateBrigadeEquipmentCopy[action.payload.parentIndex].equipment.map((tmp)=>{console.log(tmp)}));
            return {
                ...state,
                brigadeEquipmentCopy: [...updateBrigadeEquipmentCopy],
                stepOneComplete: isStepOneChecked,
            }


        case BRIGADE_EQUIP_LOADED:
            console.log('BRIGADE_EQUIP_LOADED')
            console.log(action.payload)
            return {
                ...state,
                brigadeEquipLoading: false,
                brigadeEquipment: action.payload.brigadeEquipment,
                brigadeEquipmentCopy: action.payload.brigadeEquipment,
                carEquipment: action.payload.carEquipment,
                carEquipmentCopy: action.payload.carEquipment,
                carOxygen: action.payload.carOxygen,
                carOxygenCopy: action.payload.carOxygen,
            }
        case BRIGADE_EQUIP_LOADING:
            console.log('BRIGADE_EQUIP_LOADING')
            return {
                ...state,
                brigadeEquipLoading: true,
                brigadeEquipment: [],
                carEquipment: [],
            }
        case BRIGADE_USERS_ADDED:
            console.log('BRIGADE_USERS_ADDED')
            return {
                ...state,
                brigadeFormed: true,
                brigadeUsersAdding: false,
                brigadeUsersAdded: true,
            }
        case BRIGADE_USERS_ADDING:
            console.log('BRIGADE_USERS_ADDING')
            return {
                ...state,
                brigadeFormed: false,
                brigadeUsersAdding: true,
                brigadeEquipment: [],
                carEquipment: [],
            }
        case BRIGADE_USER_LOADING:
            return {
                ...state,
                brigadeUserListLoading: true,
            }

        case BRIGADE_USER_LOADED:
            // console.log('BRIGADE_USER_LOADED');
            // console.log(action.payload.brigadeusers);
            return {
                ...state,
                brigadeUserListLoading: false,
                brigadeUserList: action.payload.brigadeusers
            }

        case BRIGADE_SETING:
            return {
                ...state,
                brigadeSeting: true,
            }
        case BRIGADE_SETED:
            return {
                ...state,
                isBrigadeSet: true,
                brigadeSeting: false,
            }
        case BRIGADE_CAR_SELECTED:
            return {
                ...state,
                selectedBrigadeCar: action.payload
            }
        case BRIGADE_CAR_LOADING:
            return {
                ...state,
                brigadeCarLoading: true,
            }
        case BRIGADE_CAR_LOADED:
            return {
                ...state,
                brigadeCarList: action.payload.brigadeCarArray,
                brigadeCarLoading: false,
            }

        case BRIGADE_SELECTED:
            console.log('BRIGADE_SELECTED');
            console.log(action.payload)
            return {
                ...state,
                brigadeUsersAdded: false,
                brigadeUsersAdding: false,
                selectedBrigade: action.payload,
                selectedBrigadeCar: null,
                isBrigadeSet: false,
                brigadeSeting: false,
            }
        case BRIGADE_LOADED:
            return {
                ...state,
                brigadeLoading: false,
                brigadelist: action.payload.brigadeArray,
            }
        case BRIGADE_LOADING:
            return {
                ...state,
                selectedBrigade: null,
                brigadeLoading: true,
            }

        default:
            return state

    }
}