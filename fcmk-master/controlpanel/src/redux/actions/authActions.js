import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import serverIp from "../../config/server";

import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

// register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(serverIp+"api/auth/register", userData)
    .then(res => {
      // redirect user to login page
      history.push("/login");
      // clear errors
      dispatch({
        type: CLEAR_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// login user
export const loginUser = (userData, history) => dispatch => {
  axios
    .post(serverIp+"api/auth/cplogin", userData)
    .then(res => {
      console.log('res')
      console.log(res)
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      history.push("/cp/dashboard");
      dispatch({
        type: CLEAR_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set token of logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log user out
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Clear the current user
  dispatch({
    type: CLEAR_CURRENT_USER,
    payload: {}
  });
};
