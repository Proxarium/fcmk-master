import axios from "axios";
import serverIp from "../../config/server";
import {
  GET_USERS_LIST,
  LOADING_USERS,
  USER_ADDED,
  USER_DELETED,
  USER_EDITED,
  GET_USERS_ERRORS,
  USER_TODO_LOADED,
  USER_TODO_LOADING,
  USER_TODO_DELETED,
  USER_TODO_DELETING,
  USER_TODO_ADDING,
  USER_TODO_ADDED,
  USER_MASS_TODO_ADDED,
  USER_DEADLINED_TODO_DELETED,
  USER_DEADLINED_TODOS_DELETED
} from "./types";



export const addMassTodo = (data, role, auth) => dispatch => {
  // dispatch(setUsersTodoAdding());
  axios
    .post(serverIp + "api/users/addmasstodo", { todoData: data, userRoles: role, auth: auth })
    .then(res => {
      dispatch({
        type: USER_MASS_TODO_ADDED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS_ERRORS,
        payload: err.response
      })
    );
}


export const createTodo = (todoData) => dispatch => {
  dispatch(setUsersTodoAdding());
  axios
    .post(serverIp + "api/users/addtodo", { todoData: todoData })
    .then(res => {
      dispatch({
        type: USER_TODO_ADDED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS_ERRORS,
        payload: err.response
      })
    );
}

export const setUsersTodoAdding = () => {
  return {
    type: USER_TODO_ADDING
  };
};

export const delAllDeadlineTodo = (userId) => dispatch => {
  axios
    .post(serverIp + "api/users/deletealldeadlinetodo", {userId: userId})
    .then(res => {
      dispatch({
        type: USER_DEADLINED_TODOS_DELETED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS_ERRORS,
        payload: err.response
      })
    );
}

export const delDeadlineTodo = (todoId, userId) => dispatch => {
  axios
    .post(serverIp + "api/users/deleteusertodo", { todoId: todoId, userId: userId})
    .then(res => {
      dispatch({
        type: USER_DEADLINED_TODO_DELETED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS_ERRORS,
        payload: err.response
      })
    );
}

export const delTodo = (todoId, userId) => dispatch => {
  dispatch(setUsersTodoDeleting());
  axios
    .post(serverIp + "api/users/deleteusertodo", { todoId: todoId, userId: userId})
    .then(res => {
      dispatch({
        type: USER_TODO_DELETED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS_ERRORS,
        payload: err.response
      })
    );
}

export const setUsersTodoDeleting = () => {
  return {
    type: USER_TODO_DELETING
  };
};


export const getTodos = (userId) => dispatch => {
  dispatch(setUsersTodoLoading());
  axios
    .post(serverIp + "api/users/getusertodo", { userId: userId})
    .then(res => {
      dispatch({
        type: USER_TODO_LOADED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS_ERRORS,
        payload: err.response
      })
    );
}
export const setUsersTodoLoading = () => {
  return {
    type: USER_TODO_LOADING
  };
};


export const editUser = (userData, role) => dispatch => {
  axios
    .post(serverIp + "api/users/edituser", { userData: userData, role: role})
    .then(res => {
      dispatch({
        type: USER_EDITED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS_ERRORS,
        payload: err.response
      })
    );
}
 
export const deleteUser = (user) => dispatch => {
  axios
    .post(serverIp + "api/users/deleteuser", { user: user })
    .then(res => {
      dispatch({
        type: USER_DELETED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS_ERRORS,
        payload: err.response
      })
    );
}

export const createUser = (userData, role) => dispatch => {
  axios
    .post(serverIp + "api/users/adduser", { userData: userData, role: role })
    .then(res => {
      dispatch({
        type: USER_ADDED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS_ERRORS,
        payload: err.response
      })
    );
}

export const getUsersList = (auth) => dispatch => {
  dispatch(setUsersLoading());
  axios
    .post(serverIp + "api/users/getuserslist", { userId: auth.user })
    .then(res => {
      dispatch({
        type: GET_USERS_LIST,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS_ERRORS,
        payload: err.response
      })
    );
};

export const setUsersLoading = () => {
  return {
    type: LOADING_USERS
  };
};
