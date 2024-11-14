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
} from "../actions/types";

const initialState = {
    brigadeCars: [],
    brigades: [],
    brigadeInfosLoading: true,
    brigadeReportsLoading: false,
    brigadeReports: [],
    kvsearching: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case BRIGADE_REPORT_KV_SEARCHING:
            return {
                ...state,
                kvsearching: true,
                brigadeReports: [],
            }
        case BRIGADE_REPORT_KV_FOUND:
            if (action.payload.brigadereports == null) {
                return {
                    ...state,
                    kvsearching: false,
                    brigadeReports: [],
                }
            } else {
                return {
                    ...state,
                    kvsearching: false,
                    brigadeReports: action.payload.brigadereports,
                }
            }

        case BRIGADE_REPORTS_LOADED:
            return {
                ...state,
                brigadeReportsLoading: false,
                brigadeReports: action.payload.brigadereports,
            }
        case BRIGADE_REPORTS_LOADING:
            return {
                ...state,
                brigadeReportsLoading: true,
            }
        case BRIGADE_ADDED:
            return {
                ...state,
                brigades: [...state.brigades, action.payload.newbrigade]
            }
        case BRIGADE_CAR_ADDED:
            return {
                ...state,
                brigadeCars: [...state.brigadeCars, action.payload.newbrigadecar]
            }
        case BRIGADE_INFO_LOADED:
            return {
                ...state,
                brigadeInfosLoading: false,
                brigadeCars: action.payload.brigadeCars,
                brigades: action.payload.brigades,
            }
        case BRIGADE_INFO_LOADING:
            return {
                ...state,
                brigadeInfosLoading: true,
            }
        default:
            return state;
    }
}