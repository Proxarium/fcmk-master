import axios from "axios";
import serverIp from "../../config/server";
import {
    BRIGADE_INFO_LOADED,
    BRIGADE_INFO_LOADING,
    BRIGADE_ADDED,
    BRIGADE_CAR_ADDED,
    BRIGADE_ERRORS,
    BRIGADE_REPORTS_LOADED,
    BRIGADE_REPORTS_LOADING,
    BRIGADE_REPORT_KV_SEARCHING,
    BRIGADE_REPORT_KV_FOUND
} from "./types";

export const searchSend = (value) => dispatch => {
    dispatch(searchSending());
    axios
        .post(serverIp + "api/brigade/searchkv", { value: value })
        .then(res => {
            dispatch({
                type: BRIGADE_REPORT_KV_FOUND,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: BRIGADE_ERRORS,
                payload: err.response
            })
        );
}
export const searchSending = () => {
    return {
        type: BRIGADE_REPORT_KV_SEARCHING
    };
};


export const getBrigadesReport = (auth, date) => dispatch => {
    dispatch(getBrigadesReportLoading());
    axios
        .post(serverIp + "api/brigade/getbrigadereports", { auth: auth, date:date})
        .then(res => {
            dispatch({
                type: BRIGADE_REPORTS_LOADED,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: BRIGADE_ERRORS,
                payload: err.response
            })
        );
}

export const getBrigadesReportLoading = () => {
    return {
        type: BRIGADE_REPORTS_LOADING
    };
};


export const addBrigade = (brigade, auth) => dispatch => {
    axios
        .post(serverIp + "api/brigade/addbrigade", { brigade: brigade, auth: auth })
        .then(res => {
            dispatch({
                type: BRIGADE_ADDED,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: BRIGADE_ERRORS,
                payload: err.response
            })
        );
}
export const addBrigadeCar = (brigadecar, auth) => dispatch => {
    axios
        .post(serverIp + "api/brigade/addbrigadecar", { brigadecar: brigadecar, auth: auth })
        .then(res => {
            dispatch({
                type: BRIGADE_CAR_ADDED,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: BRIGADE_ERRORS,
                payload: err.response
            })
        );
}

export const getBrigadeInfos = (auth) => dispatch => {
    dispatch(setBrigadeInfosLoading());
    axios
        .post(serverIp + "api/brigade/getbrigadeinfo", { auth: auth })
        .then(res => {
            dispatch({
                type: BRIGADE_INFO_LOADED,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: BRIGADE_ERRORS,
                payload: err.response
            })
        );
}
export const setBrigadeInfosLoading = () => {
    return {
        type: BRIGADE_INFO_LOADING
    };
};
