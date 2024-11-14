import {
    DASHBOARD_LOADED,
    DASHBOARD_LOADING,
    DASHBOARD_DEADLINED_TODOS_LOADED,
    DASHBOARD_DEADLINED_TODOS_LOADING,
    DASHBOARD_DEADLINED_TODOS_CLEAR,
    DASHBOARD_ONGOING_TODOS_LOADED,
    DASHBOARD_ONGOING_TODOS_LOADING,
    DASHBOARD_ONGOING_TODOS_CLEAR,
    DASHBOARD_COMPLETED_TODOS_LOADED,
    DASHBOARD_COMPLETED_TODOS_LOADING,
    DASHBOARD_COMPLETED_TODOS_CLEAR,
    USER_DEADLINED_TODO_DELETED,
    USER_DEADLINED_TODOS_DELETED,
    SET_NEED_TO_UPDATE_REPORT_BY_ID,
    CLEAR_NEED_TO_UPDATE_REPORT_BY_ID,
    CLEAR_ANIMATION,
    REPORT_BY_ID_LOADED,
    NEED_TO_DELETE_REPORT_BY_ID
} from "../actions/types";

const initialState = {
    dashboardLoading: true,
    dashboardData: {},
    userCount: null,
    todoCount: null,
    todoCompletedCount: null,
    todoDeadlinedCount: 0,
    deadlinedTodosLoading: false,
    deadlinedTodos: [],
    deadlinedTodosShow: false,
    ongoingTodosLoading: false,
    ongoingTodos: [],
    ongoingTodosShow: false,
    completedTodosLoading: false,
    completedTodos: [],
    completedTodosShow: false,
    ongoingBrigades:[],
    reportIdToAnimate:null,
    needToUpdateById:false,
    reportIdToUpdateById: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case NEED_TO_DELETE_REPORT_BY_ID:
            const idReportToDelete = action.payload;
            return {
                ...state,
                ongoingBrigades: state.ongoingBrigades.filter((report) => report._id !== idReportToDelete),
            }

        case REPORT_BY_ID_LOADED:
            return{
                ...state,
                reportIdToAnimate: action.payload.brigade._id,
                ongoingBrigades: [...state.ongoingBrigades, action.payload.brigade]
            }
        case CLEAR_ANIMATION:
            return{
                ...state,
                reportIdToAnimate: null,
            }
        case SET_NEED_TO_UPDATE_REPORT_BY_ID:
            console.log(action.payload)
            return{
                ...state,
                needToUpdateById: true,
                reportIdToUpdateById: action.payload,
            }
        case CLEAR_NEED_TO_UPDATE_REPORT_BY_ID:
            return{
                ...state,
                needToUpdateById: false,
                reportIdToUpdateById: null
            }


        case USER_DEADLINED_TODOS_DELETED:
            return {
                ...state,
                deadlinedTodos: [],
                todoDeadlinedCount: 0,
                todoCount: action.payload.tododocCount
            }
        case USER_DEADLINED_TODO_DELETED:
            let count = 0;
            const id = action.payload.deletedtodo._id;
            let deadlinedNewArray = state.deadlinedTodos.filter((todo) => todo.id !== id);
            count = deadlinedNewArray.length;
            return {
                ...state,
                deadlinedTodos: deadlinedNewArray,
                todoDeadlinedCount: count,
                todoCount: state.todoCount - 1
            }

        case DASHBOARD_COMPLETED_TODOS_LOADED:
            return {
                ...state,
                completedTodosShow: true,
                completedTodosLoading: false,
                completedTodos: action.payload.completedtodos
            }
        case DASHBOARD_COMPLETED_TODOS_LOADING:
            return {
                ...state,
                completedTodosLoading: true
            }
        case DASHBOARD_COMPLETED_TODOS_CLEAR:
            return {
                ...state,
                completedTodosShow: false,
                completedTodosLoading: false,
                completedTodos: []
            }

        case DASHBOARD_ONGOING_TODOS_LOADED:
            return {
                ...state,
                ongoingTodosShow: true,
                ongoingTodosLoading: false,
                ongoingTodos: action.payload.ongoingtodos
            }
        case DASHBOARD_ONGOING_TODOS_LOADING:
            return {
                ...state,
                ongoingTodosLoading: true
            }
        case DASHBOARD_ONGOING_TODOS_CLEAR:
            return {
                ...state,
                ongoingTodosShow: false,
                ongoingTodosLoading: false,
                ongoingTodos: []
            }

        case DASHBOARD_DEADLINED_TODOS_CLEAR:
            return {
                ...state,
                deadlinedTodosShow: false,
                deadlinedTodosLoading: false,
                deadlinedTodos: []
            }

        case DASHBOARD_DEADLINED_TODOS_LOADED:
            return {
                ...state,
                deadlinedTodosShow: true,
                deadlinedTodosLoading: false,
                deadlinedTodos: action.payload.todoArray
            }


        case DASHBOARD_DEADLINED_TODOS_LOADING:
            return {
                ...state,
                deadlinedTodosLoading: true
            }
        case DASHBOARD_LOADED:
            return {
                ...state,
                dashboardLoading: false,
                userCount: action.payload.data.userCount,
                todoCount: action.payload.data.todoCount,
                todoCompletedCount: action.payload.data.todoCompletedCount,
                todoDeadlinedCount: action.payload.data.todoDeadlinedCount,
                ongoingBrigades: action.payload.ongoingbrigade,
            }
        case DASHBOARD_LOADING:
            return {
                ...state,
                dashboardLoading: true,
            }
        default:
            return state;
    }
}