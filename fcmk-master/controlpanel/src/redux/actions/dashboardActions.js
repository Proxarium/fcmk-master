import axios from "axios";
import serverIp from "../../config/server";
import {
    DASHBOARD_LOADED,
    DASHBOARD_LOADING,
    DASHBOARD_ERRORS,
    DASHBOARD_DEADLINED_TODOS_LOADED,
    DASHBOARD_DEADLINED_TODOS_LOADING,
    DASHBOARD_DEADLINED_TODOS_CLEAR,
    DASHBOARD_ONGOING_TODOS_LOADED,
    DASHBOARD_ONGOING_TODOS_LOADING,
    DASHBOARD_ONGOING_TODOS_CLEAR,
    DASHBOARD_COMPLETED_TODOS_LOADED,
    DASHBOARD_COMPLETED_TODOS_LOADING,
    DASHBOARD_COMPLETED_TODOS_CLEAR,
    SET_NEED_TO_UPDATE_REPORT_BY_ID,
    CLEAR_NEED_TO_UPDATE_REPORT_BY_ID,
    CLEAR_ANIMATION,
    REPORT_BY_ID_LOADED,
    NEED_TO_DELETE_REPORT_BY_ID
} from "./types";

export const getReportById = (reportId) => dispatch => {
    axios
        .post(serverIp + "api/dashboard/getreportbyid", { reportId: reportId })
        .then(res => {
            dispatch({
                type: REPORT_BY_ID_LOADED,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: DASHBOARD_ERRORS,
                payload: err.response
            })
        );
}

export const clearReportAnimation = () => dispatch => {
    console.log('clearReportAnimation')
    dispatch({
        type: CLEAR_ANIMATION
    });
};


export const needToDeleteReportsById = (reportId) => dispatch => {
    // console.log('action needToUpdateReportsById '+reportId)
    dispatch({
        type: NEED_TO_DELETE_REPORT_BY_ID,
        payload: reportId
    });
}

export const needToUpdateReportsById = (reportId) => dispatch => {
    // console.log('action needToUpdateReportsById '+reportId)
    dispatch({
        type: SET_NEED_TO_UPDATE_REPORT_BY_ID,
        payload: reportId
    });
}

export const clearNeedToUpdateReportsById = () => dispatch => {
    dispatch({
        type: CLEAR_NEED_TO_UPDATE_REPORT_BY_ID
    });
};

export const hideCompletedTodos = () => dispatch => {
    dispatch({
        type: DASHBOARD_COMPLETED_TODOS_CLEAR,
    })
}

export const getCompletedTodos = (auth) => dispatch => {
    dispatch(setCompletedTodosLoading());
    axios
        .post(serverIp + "api/dashboard/getcompletedtodos", { auth: auth })
        .then(res => {
            dispatch({
                type: DASHBOARD_COMPLETED_TODOS_LOADED,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: DASHBOARD_ERRORS,
                payload: err.response
            })
        );
}
export const setCompletedTodosLoading = () => {
    return {
        type: DASHBOARD_COMPLETED_TODOS_LOADING
    };
};

export const hideOngoingTodos = () => dispatch => {
    dispatch({
        type: DASHBOARD_ONGOING_TODOS_CLEAR,
    })
}

export const getOngoingTodos = (auth) => dispatch => {
    dispatch(setOngoingTodosLoading());
    axios
        .post(serverIp + "api/dashboard/getongoingtodos", { auth: auth })
        .then(res => {
            dispatch({
                type: DASHBOARD_ONGOING_TODOS_LOADED,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: DASHBOARD_ERRORS,
                payload: err.response
            })
        );
}
export const setOngoingTodosLoading = () => {
    return {
        type: DASHBOARD_ONGOING_TODOS_LOADING
    };
};


export const hideDeadlinedTodos = () => dispatch => {
    dispatch({
        type: DASHBOARD_DEADLINED_TODOS_CLEAR,
    })
}

export const getDeadlinedTodos = (auth) => dispatch => {
    dispatch(setDeadlinedTodosLoading());
    axios
        .post(serverIp + "api/dashboard/getdeadlinedtodos", { auth: auth })
        .then(res => {
            dispatch({
                type: DASHBOARD_DEADLINED_TODOS_LOADED,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: DASHBOARD_ERRORS,
                payload: err.response
            })
        );
}
export const setDeadlinedTodosLoading = () => {
    return {
        type: DASHBOARD_DEADLINED_TODOS_LOADING
    };
};


export const getDashboardInfo = (auth) => dispatch => {
    dispatch(setDashboardLoading());
    axios
        .post(serverIp + "api/dashboard/getdashboardinfo", { auth: auth })
        .then(res => {
            dispatch({
                type: DASHBOARD_LOADED,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: DASHBOARD_ERRORS,
                payload: err.response
            })
        );
}
export const setDashboardLoading = () => {
    return {
        type: DASHBOARD_LOADING
    };
};
