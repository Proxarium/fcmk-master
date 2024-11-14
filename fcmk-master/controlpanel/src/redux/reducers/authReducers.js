import { SET_CURRENT_USER, CLEAR_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  loginError: null,
  passwordError: null,
  anotherError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      if (action.payload) {
        if (action.payload.login) {
          return {
            ...state,
            loginError: action.payload.login,
            passwordError: null,
            anotherError: null,
          }
        } else if (action.payload.password) {
          return {
            ...state,
            passwordError: action.payload.password,
            loginError: null,
            anotherError: null,
          }
        } else {
          return {
            ...state,
            anotherError: 'Неизвестная ошибка',
            loginError: null,
            passwordError: null,
          }
        }
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        loginError: null,
        passwordError: null,
        anotherError: null,
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload,
      };
    default:
      return state;
  }
}
