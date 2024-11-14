import axios from "axios";
import serverIp from "../../config/server";
import {
    EQUIPMENT_LOADING,
    EQUIPMENT_LOADED,
    EQUIPMENT_DELETED,
    EQUIPMENT_DELETING,
    EQUIPMENT_ADDED,
    EQUIPMENT_ADDING,
    EQUIPMENT_EDITING,
    EQUIPMENT_EDITED,
    EQUIPMENT_ERROR
} from "./types";


export const addEquipment = (equip, auth) => dispatch => {
    dispatch(setEquipmentLoading());
    axios
        .post(serverIp + "api/equipment/addequip", { equipment:equip, auth: auth })
        .then(res => {
            dispatch({
                type: EQUIPMENT_ADDED,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: EQUIPMENT_ERROR,
                payload: err.response
            })
        );
}
export const setEquipmentAdding = () => {
    return {
        type: EQUIPMENT_ADDING
    };
};


export const getEquipmentList = (auth) => dispatch => {
    dispatch(setEquipmentLoading());
    axios
        .post(serverIp + "api/equipment/getequipmentlist", { auth: auth })
        .then(res => {
            dispatch({
                type: EQUIPMENT_LOADED,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: EQUIPMENT_ERROR,
                payload: err.response
            })
        );
}
export const setEquipmentLoading = () => {
    return {
        type: EQUIPMENT_LOADING
    };
};
