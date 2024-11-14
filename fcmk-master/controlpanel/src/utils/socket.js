import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
//СОКЕТЫ
import openSocket from 'socket.io-client';
import socketIp from "../config/socket";
import { needToUpdateReportsById, needToDeleteReportsById } from '../redux/actions/dashboardActions';
import UIfx from 'uifx';
import actionSound from '../assets/action.mp3';

const SocketComponent = () => {

    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const [connected, setConnected] = React.useState(false);

    const [socketConnection, setSocketConnection] = React.useState(null);


    useEffect(() => {
        if (auth.isAuthenticated) {
            console.log('AUTHED')
            connectSocket();
        } else {
            disconnect();
        }
    }, [auth.isAuthenticated]);

    const disconnect = () => {
        if (socketConnection) {
            socketConnection.disconnect();
        }

    }
    const connectSocket = () => {

        const socket = openSocket(socketIp, {
            'reconnection': true,
            'reconnectionDelay': 1000,
            'reconnectionAttempts': 1000
        });

        console.log('subscribeServer');
        socket.on("connect", () => {
            setConnected(true);
            socket.emit("source", "panel");
        });
        socket.on("message", message => serverResponse(null, message));

        socket.on("disconnect", (message) => {
            setConnected(false);
            console.log('disconnected');
            serverResponse(null, message);
        });
        setSocketConnection(socket);
    }

    const serverResponse = (err, message) => {
        // if (auth.user.role != '') {
        if (message.type == "CONNECTED") {
            console.log('CONNECTED')
        }
        if (message.type == "CONNECTED") {
            console.log('CONNECTED')
        }
        if (message.type == "NEW_REPORT") {
            console.log('NEW_REPORT')
            const orderFX = new UIfx(actionSound, { volume: 1, throttleMs: 100 });
            orderFX.play();
            dispatch(needToUpdateReportsById(message.data));
        }
        if (message.type == "COMPLETE_REPORT") {
            console.log('COMPLETE_REPORT')
            const orderFX = new UIfx(actionSound, { volume: 1, throttleMs: 100 });
            orderFX.play();
            dispatch(needToDeleteReportsById(message.data));
        }
        // }

    }

    return (<></>);

}


export default SocketComponent;



