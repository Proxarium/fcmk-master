import { combineReducers } from "redux";
import authReducers from "./authReducers";
import userReducers from "./userReducers";
import dashboardReducers from "./dashboardReducers";
import brigadeReducers from "./brigadeReducers";
import equipmentReducers from "./equipmentReducers";

export default combineReducers({
	auth: authReducers,
	users: userReducers,
	dashboard: dashboardReducers,
	brigade:brigadeReducers,
	equipment:equipmentReducers
});
