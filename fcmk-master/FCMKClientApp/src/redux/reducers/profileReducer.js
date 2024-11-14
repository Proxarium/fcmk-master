import { PASS_YOUR_BRIGADE, PASSING_YOUR_BRIGADE, FOUND_YOUR_BRIGADE, FINDING_YOUR_BRIGADE, TODO_COMPLETED, TODOS_LOADING, TODOS_FOUND, USER_FOUND, SET_NOT_LOGGED_IN, SET_USER_LOGGED, SET_LOGGING_IN, SET_USER_LOGGED_SAVED, SET_LOGOUT } from '../actions/types';

const initialState = {
    userLogged: false,
    userFound: false,
    loginError: null,
    loggingIn: true,
    user: {},
    hash: null,
    userLogin: null,
    todolist: [],
    todosLoading: false,
    activeBrigadeFinding: false,
    activeBrigade:null,
    passingBrigade: false,
    shouldAsk:false,
    carImg:''
}

// const updatedState = state.users.map((user) => {
//     if (user.email === action.payload.editeduser.email) {
//         return { ...user, ...action.payload.editeduser };
//     } else {
//     }
//     return user;
// });
// return {
//     ...state,
//     users: updatedState,
// };

export default function (state = initialState, action) {
    switch (action.type) {

        case PASSING_YOUR_BRIGADE:
            return{
                ...state,
                passingBrigade:true,
                shouldAsk:false,
            }
        case PASS_YOUR_BRIGADE:
            return{
                ...state,
                passingBrigade: false,
                activeBrigadeFinding: false,
                activeBrigade:null,

                shouldAsk:true,
            }
        case FOUND_YOUR_BRIGADE:
            return{
                ...state,
                activeBrigadeFinding: false,
                activeBrigade:action.payload.brigade,
                shouldAsk:false,
                carImg: action.payload.car,
            }
        case FINDING_YOUR_BRIGADE:
            return{
                ...state,
                activeBrigadeFinding: true,
            }
        case TODO_COMPLETED:
        const id = action.payload.todoItem.id;
        return {
            ...state,
            todolist: state.todolist.filter((todo) => todo.id !== id),
        }
        case TODOS_FOUND:
            return {
                ...state,
                todosLoading: false,
                todolist: action.payload.todoArray,
            }
        case TODOS_LOADING:
            return {
                ...state,
                todosLoading: true,
            }
        case SET_LOGOUT:
            return {
                ...state,
                userLogged: false,
                userFound: false,
                loginError: null,
                user: {},
                hash: null,
                userLogin: null,
                loggingIn: false,
            }

        case SET_USER_LOGGED_SAVED:
            return {
                ...state,
                loggingIn: false,
                userLogged: true,
                user: action.payload.user,
                hash: action.payload.user.hash,
                userLogin: action.payload.user.email,  //email as login
            }

        case SET_LOGGING_IN:
            return {
                ...state,
                loggingIn: true,
                loginError: null,
            }
        case SET_USER_LOGGED:
            return {
                ...state,
                userLogged: true,
                loginError: '',
                loggingIn: false,
            }
        case SET_NOT_LOGGED_IN:
            return {
                ...state,
                userLogged: false,
                userFound: false,
                loggingIn: false,
            }
        case USER_FOUND:
            switch (action.payload.success) {
                case true:
                    console.log(action.payload.user)
                    return {
                        ...state,
                        userFound: true,
                        //userLogged: true,
                        user: action.payload.user,
                        loggingIn: false,
                        hash: action.payload.user.hash,
                        userLogin: action.payload.user.email,  //email as login
                    }
                case false:
                    switch (action.payload.reason) {
                        case 'not-found':
                            return {
                                ...state,
                                userFound: false,
                                loggingIn: false,
                                loginError: 'not-found',
                            }
                    }
            }

        default:
            return state

    }
}