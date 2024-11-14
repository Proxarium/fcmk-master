import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
// import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Button, Text, TextArea, InputGroup, Intent } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";

const Login = props => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [values, setValues] = React.useState({
        login: "",
        password: "",
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(loginUser(values, props.history));
    };
    const clickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const lockButton = (
        <Tooltip2 content={`${showPassword ? "Скрыть" : "Показать"} пароль`} >
            <Button
                icon={showPassword ? "unlock" : "lock"}
                // intent={Intent.WARNING}
                // minimal={true}
                onClick={() => clickShowPassword()}
            />
        </Tooltip2>
    );
    return (
        <div className="login-background test">
            <div className="login-block">
                <InputGroup
                    asyncControl={true}
                    disabled={false}
                    leftIcon="user"
                    onChange={(e) => setValues({ ...values, login: e.target.value })}
                    placeholder="Логин"
                    small={true}
                    value={values.login}
                    intent={auth.loginError ? Intent.DANGER : null}
                    style={{marginBottom:10}}
                />
                {auth.loginError ? (<span className="error-text">{auth.loginError}</span>) : (<></>)}
                <InputGroup
                    placeholder="Пароль..."
                    rightElement={lockButton}
                    small={true}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                    value={values.password}
                    intent={auth.passwordError ? Intent.DANGER : null}
                    style={{marginBottom:10}}
                />
                {auth.passwordError ? (<span className="error-text">{auth.passwordError}</span>) : (<></>)}
                <Button intent="success" text="Войти" onClick={handleSubmit} rightIcon="arrow-right" />
            </div>
        </div>
    );
}



export default Login;

