import {FOUND_YOUR_BRIGADE_RECIPE, RESET_BRIGADE, PASS_YOUR_BRIGADE, PASSING_YOUR_BRIGADE, FOUND_YOUR_BRIGADE, FINDING_YOUR_BRIGADE, TODO_COMPLETED, TODOS_LOADING, TODOS_FOUND, USER_FOUND, SET_NOT_LOGGED_IN, GET_ERRORS, CLEAR_ERRORS, SET_LOGGING_IN, SET_USER_LOGGED, SET_USER_LOGGED_SAVED, SET_LOGOUT } from './types';
import serverIp from "../../config/server";
import axios from 'axios';



export const completeTodo = (hash, todoId) => dispatch => {
  // dispatch(setTodosLoading());
  axios
    .post(serverIp + "api/todos/completetodo", { hash: hash, todoId: todoId })
    .then(res => {
      dispatch({
        type: TODO_COMPLETED,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );
}

// (hash, activeBrigade._id, personOne, personTwo, recipeItems)

export const passBrigade = (hash, brigade, recipe) => dispatch => {
  dispatch(setBrigadesPassing());
  axios
    .post(serverIp + "api/brigade/passbrigade", { hash: hash, brigade:brigade, recipe:recipe })
    .then(res => {
      dispatch({
        type: PASS_YOUR_BRIGADE,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );

}
export const setBrigadesPassing = () => dispatch => {
  // console.log('setLoggedIn')
  dispatch(resetBrigade());
  dispatch({
    type: PASSING_YOUR_BRIGADE
  })
}

export const resetBrigade = () => dispatch => {
  console.log('RESET BRIGADE')
  dispatch({
    type: RESET_BRIGADE
  })
}


export const askBrigades = (hash) => dispatch => {
  dispatch(setBrigadesLoading());
  axios
    .post(serverIp + "api/brigade/askbrigades", { hash: hash })
    .then(res => {
      dispatch({
        type: FOUND_YOUR_BRIGADE,
        payload: res.data
      });
      dispatch({
        type: FOUND_YOUR_BRIGADE_RECIPE,
        payload: res.data.recipe
      });
    })
    .catch(err =>
      console.log(err)
    );
}

export const setBrigadesLoading = () => dispatch => {
  // console.log('setLoggedIn')
  dispatch({
    type: FINDING_YOUR_BRIGADE
  })
}



export const getTodos = (hash) => dispatch => {
  dispatch(setTodosLoading());
  axios
    .post(serverIp + "api/todos/gettodos", { hash: hash })
    .then(res => {
      dispatch({
        type: TODOS_FOUND,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );
}

export const sendLogin = (login, psw) => dispatch => {
  console.log('login');
  dispatch(setLoggingIn());
  axios
    .post(serverIp + "api/auth/login", { login: login, password: psw })
    .then(res => {
      dispatch({
        type: USER_FOUND,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );
};

export const askSavedData = (login, hash) => dispatch => {
  dispatch(setLoggingIn());
  axios
    .post(serverIp + "api/auth/checkprofile", { login: login, hash: hash })
    .then(res => {
      if (res.data.success) {
        console.log(res.data)
        dispatch({
          type: SET_USER_LOGGED_SAVED,
          payload: res.data
        });
      } else {
        dispatch({
          type: SET_NOT_LOGGED_IN
        });
      }

    })
    .catch(err =>
      console.log(err)
    );
}

export const setTodosLoading = () => dispatch => {
  // console.log('setLoggedIn')
  dispatch({
    type: TODOS_LOADING
  })
}

export const setLoggedIn = () => dispatch => {
  // console.log('setLoggedIn')
  dispatch({
    type: SET_USER_LOGGED
  })
}

export const logOut = () => dispatch => {
  dispatch({
    type: SET_LOGOUT
  })
}

export const setLoggingIn = () => dispatch => {
  // console.log('setLoggingIn');
  dispatch({
    type: SET_LOGGING_IN
  })
}

export const setNotLoggedIn = () => dispatch => {
  dispatch({
    type: SET_NOT_LOGGED_IN
  })
}