import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import store from "./store";
import logo from './logo.svg';
import './App.css';

import { Provider } from "react-redux";
import NotAuth from "./components/auth/NotAuth";
import IsAuth from "./components/auth/IsAuth";
import IsAdmin from "./components/auth/IsAdmin";

import Login from './components/system/Login';
import HeaderRow from './components/layout/HeaderRow';

import CPDashboard from './components/cp/CPDashboard';
import CPAdmin from './components/cp/CPAdmin';
import CPUsers from './components/cp/CPUsers';
import CPTodos from './components/cp/CPTodos';
import CPBrigade from './components/cp/CPBrigade';
import CPBrigadeReport from './components/cp/CPBrigadeReport';
import CPEquipment from './components/cp/CPEquipment';

import SocketComponent from './utils/socket'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

function App() {
  return (
    <Provider store={store}>
      <SocketComponent />
      <Router>
        <Switch>
          <NotAuth path="/" component={Login} />
        </Switch>
        <Switch>
          <IsAuth path="/" component={HeaderRow} />
        </Switch>

        <Switch>
          <IsAuth path="/cp/dashboard" component={CPDashboard} />
          <IsAdmin path="/cp/admin" component={CPAdmin} />
          <IsAdmin path="/cp/users" component={CPUsers} />
          <IsAdmin path="/cp/todos" component={CPTodos} />
          <IsAdmin path="/cp/brigade" component={CPBrigade} />
          <IsAdmin path="/cp/brigadereport" component={CPBrigadeReport} />
          <IsAdmin path="/cp/brigadeequipment" component={CPEquipment} />


        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
