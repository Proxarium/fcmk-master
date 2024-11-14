import {
    GET_USERS_LIST,
    LOADING_USERS,
    GET_USERS_ERRORS,
    USER_ADDED,
    USER_DELETED,
    USER_EDITED,
    USER_TODO_LOADED,
    USER_TODO_LOADING,
    USER_TODO_DELETED,
    USER_TODO_DELETING,
    USER_TODO_ADDED,
    USER_TODO_ADDING,
    USER_MASS_TODO_ADDED
} from "../actions/types";

const initialState = {
    usersLoading: true,
    users: null,
    userTodosLoading: false,
    userTodos: [],
    userTodoDeleting: false,
    userTodoAdding: false,
    userRoles: [],
    massTodoAdded: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_MASS_TODO_ADDED:
            let w = state.massTodoAdded;
            return{
                ...state,
                massTodoAdded: !w
            }
        case USER_TODO_ADDED:
            return {
                ...state,
                userTodoAdding: false,
                userTodos: [...state.userTodos, action.payload.newtodo]
            }
        case USER_TODO_ADDING:
            return {
                ...state,
                userTodoAdding:true,
            }
        case USER_TODO_DELETED:
            const id = action.payload.deletedtodo._id;
            return {
                ...state,
                userTodoDeleting: false,
                userTodos: state.userTodos.filter((todo) => todo._id !== id),
            }
        case USER_TODO_DELETING:
            return {
                ...state,
                userTodoDeleting: true,
            }
        case USER_TODO_LOADING:
            return {
                ...state,
                userTodosLoading: true,
            }
        case USER_TODO_LOADED:
            return {
                ...state,
                userTodosLoading: false,
                userTodos: action.payload.usertodos,
            }
        case USER_EDITED:
            const updatedState = state.users.map((user) => {
                if (user.email === action.payload.editeduser.email) {
                    return { ...user, ...action.payload.editeduser };
                } else {
                }
                return user;
            });
            return {
                ...state,
                users: updatedState,
            };

        case USER_DELETED:
            const email = action.payload.deleteduser.email;
            return {
                ...state,
                users: state.users.filter((user) => user.email !== email),
            }

        case USER_ADDED:
            return {
                ...state,
                users: [...state.users, action.payload.newuser]
            }

        case LOADING_USERS:
            return {
                ...state,
                usersLoading: true,
            }
        case GET_USERS_LIST:
            console.log(action.payload)
            return {
                ...state,
                users: action.payload.users,
                usersLoading: false,
                userRoles: action.payload.userRoles,
            }
        default:
            return state;
    }
}