import { combineReducers } from "redux";

import profileReducer from './profileReducer';
import brigadeReducer from './brigadeReducer';

export default combineReducers({
    profile: profileReducer,
    brigade: brigadeReducer
})