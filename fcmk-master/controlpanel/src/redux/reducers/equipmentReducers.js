import {
    EQUIPMENT_LOADING,
    EQUIPMENT_LOADED,
    EQUIPMENT_DELETED,
    EQUIPMENT_DELETING,
    EQUIPMENT_ADDED,
    EQUIPMENT_ADDING,
    EQUIPMENT_EDITING,
    EQUIPMENT_EDITED
} from "../actions/types";

const initialState = {
    equipmentLoading: false,
    equipments: [],
    equipmentDeleting: false,
    equipmentAdding: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case EQUIPMENT_ADDING:
            return {
                ...state,
                equipmentAdding: true
            }
        case EQUIPMENT_ADDED:
            return {
                ...state,
                equipmentAdding: false,
                equipments: [...state.equipments, action.payload.newequipment]
            }
        case EQUIPMENT_LOADING:
            return {
                ...state,
                equipmentLoading: true
            }
        case EQUIPMENT_LOADED:
            return {
                ...state,
                equipmentLoading: false,
                equipments: action.payload.equipments
            }
        default:
            return state;
    }
}