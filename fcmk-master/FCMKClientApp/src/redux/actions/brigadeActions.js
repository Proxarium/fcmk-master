import {EQUIP_INFO_LOADING, EQUIP_INFO_LOADED, RECIPE_SENDED, RECIPE_SENDING, SAVE_RECIPE, REPORT_SENDING, REPORT_SENDED, UPDATE_COPY_ROW_OXY, UPDATE_COPY_ROW, CAR_EQUIP_UPDATE, BRIGADE_EQUIP_UPDATE, BRIGADE_EQUIP_LOADED, BRIGADE_EQUIP_LOADING, BRIGADE_USERS_ADDING, BRIGADE_USERS_ADDED, BRIGADE_USER_LOADED, BRIGADE_USER_LOADING, BRIGADE_SETING, BRIGADE_SETED, BRIGADE_LOADING, BRIGADE_LOADED, BRIGADE_SELECTED, BRIGADE_CAR_LOADING, BRIGADE_CAR_LOADED, BRIGADE_CAR_SELECTED } from './types';
import serverIp from "../../config/server";
import axios from 'axios';


export const getEquipInfo = (brigade) => dispatch => {
  dispatch(setEquipInfoLoading());
  axios
    .post(serverIp + "api/brigade/getequipinfo", { brigade: brigade })
    .then(res => {
      dispatch({
        type: EQUIP_INFO_LOADED,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );
}

export const setEquipInfoLoading = () => dispatch => {
  dispatch({
    type: EQUIP_INFO_LOADING
  })
}


export const sendRecipe = (recipe, hash) => dispatch => {
  dispatch(setRecipeSending());
  axios
    .post(serverIp + "api/brigade/sendrecipe", { recipe: recipe, hash: hash })
    .then(res => {
      dispatch({
        type: RECIPE_SENDED,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );
}

export const setRecipeSending = () => dispatch => {
  dispatch({
    type: RECIPE_SENDING
  })
}

export const saveRecipe = (recipe) => dispatch => {
  dispatch({
    type: SAVE_RECIPE,
    payload: recipe
  });
}

export const sendReport = (stepOneReport, stepTwoReport, stepThreeReport, comment, user, hash) => dispatch => {
  dispatch(setReportSending());
  axios
    .post(serverIp + "api/brigade/sendreport", { stepOneReport: stepOneReport, stepTwoReport: stepTwoReport, stepThreeReport: stepThreeReport, comment: comment, user: user, hash: hash })
    .then(res => {
      dispatch({
        type: REPORT_SENDED,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );
}
export const setReportSending = () => dispatch => {
  dispatch({
    type: REPORT_SENDING
  })
}


export const updateCopyRowOxygen = (step, index, parentIndex, value) => dispatch => {
  dispatch({
    type: UPDATE_COPY_ROW_OXY,
    payload: { step: step, index: index, parentIndex: parentIndex, value: value }
  });
}

//updateCopyRow 
export const updateCopyRow = (step, index, parentIndex, value) => dispatch => {
  dispatch({
    type: UPDATE_COPY_ROW,
    payload: { step: step, index: index, parentIndex: parentIndex, value: value }
  });
}

//updateRow
export const updateRow = (step, index, parentIndex, value) => dispatch => {
  console.log('updateRow');
  console.log(step)
  if (step == '1') {
    dispatch({
      type: BRIGADE_EQUIP_UPDATE,
      payload: { index: index, parentIndex: parentIndex, value: value }
    });
  } else if (step == '2') {
    dispatch({
      type: CAR_EQUIP_UPDATE,
      payload: { index: index, parentIndex: parentIndex, value: value }
    });
  }

}

//updateCarEquip
export const updateCarEquip = (object, i) => dispatch => {
  dispatch({
    type: CAR_EQUIP_UPDATE,
    payload: { object: object, i: i }
  });
}

//updateBrigadeEquip
export const updateBrigadeEquip = (object, i) => dispatch => {
  dispatch({
    type: BRIGADE_EQUIP_UPDATE,
    payload: { object: object, i: i }
  });
}


export const getBrigadeEquipment = (carId, brigadeId, hash) => dispatch => {
  dispatch(setBrigadeEquipmentLoading());
  axios
    .post(serverIp + "api/brigade/getcarequip", { carId: carId, brigadeId: brigadeId, hash: hash })
    .then(res => {
      dispatch({
        type: BRIGADE_EQUIP_LOADED,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );
}
export const setBrigadeEquipmentLoading = () => dispatch => {
  dispatch({
    type: BRIGADE_EQUIP_LOADING
  })
}
//BRIGADE USER LIST

export const sendBrigadeUsers = (user, brigadeUser, hash, selectedBrigade, selectedBrigadeCar) => dispatch => {
  console.log('sendBrigadeUsers')
  dispatch(setBrigadeUserListSendingLoading());
  axios
    .post(serverIp + "api/brigade/appsetbrigadeuserlist", { user: user, brigadeUser: brigadeUser, hash: hash, selectedBrigade: selectedBrigade, selectedBrigadeCar: selectedBrigadeCar })
    .then(res => {
      dispatch({
        type: BRIGADE_USERS_ADDED,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );
}
export const setBrigadeUserListSendingLoading = () => dispatch => {
  dispatch({
    type: BRIGADE_USERS_ADDING
  })
}




export const getBrigadeUserList = (hash) => dispatch => {
  dispatch(setBrigadeUserListLoading());
  axios
    .post(serverIp + "api/brigade/appgetbrigadeuserlist", { hash: hash })
    .then(res => {
      dispatch({
        type: BRIGADE_USER_LOADED,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );
}
export const setBrigadeUserListLoading = () => dispatch => {
  dispatch({
    type: BRIGADE_USER_LOADING
  })
}




export const setBrigade = (selectedBrigade, selectedBrigadeCar, user, hash) => dispatch => {
  // dispatch(setBrigadeSeting());
  dispatch({
    type: BRIGADE_SETED
  })

}
export const setBrigadeSeting = () => dispatch => {
  dispatch({
    type: BRIGADE_SETING
  })
}

//BRIGADE CAR
export const getBrigadeCarList = (hash) => dispatch => {
  dispatch(setBrigadeCarLoading());
  axios
    .post(serverIp + "api/brigade/appgetbrigadecar", { hash: hash })
    .then(res => {
      dispatch({
        type: BRIGADE_CAR_LOADED,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );
}
export const setBrigadeCarLoading = () => dispatch => {
  dispatch({
    type: BRIGADE_CAR_LOADING
  })
}

export const setSelectedBrigadeCar = (brigadecar) => dispatch => {
  dispatch({
    type: BRIGADE_CAR_SELECTED,
    payload: brigadecar
  })
}



//BRIGADE
export const setSelectedBrigade = (brigade) => dispatch => {
  dispatch({
    type: BRIGADE_SELECTED,
    payload: brigade
  })
}

export const getBrigadeList = (hash) => dispatch => {
  dispatch(setBrigadeLoading());
  axios
    .post(serverIp + "api/brigade/appgetbrigade", { hash: hash })
    .then(res => {
      dispatch({
        type: BRIGADE_LOADED,
        payload: res.data
      });
    })
    .catch(err =>
      console.log(err)
    );
}
export const setBrigadeLoading = () => dispatch => {
  dispatch({
    type: BRIGADE_LOADING
  })
}