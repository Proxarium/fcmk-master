import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect, useSelector, useDispatch } from "react-redux";
//import { CLEAR_CURRENT_USER } from "../../reducers/authReducers";
import * as ACTIONS from '../../redux/actions/authActions';
import { Button, Text, TextArea, InputGroup, Popover, Intent, Menu, Icon, MenuDivider, MenuItem } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";


const TopButtons = (props) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const menuContent = (
        <Menu>
            <Link style={{textDecoration:'inherit', color:'inherit'}} to="/cp/dashboard"><MenuItem icon="chart" text="Сводка" /></Link>
            <Link style={{textDecoration:'inherit', color:'inherit'}} to="/cp/todos"><MenuItem icon="label" text="Задачи" /></Link>
            <Link style={{textDecoration:'inherit', color:'inherit'}} to="/cp/brigade"><MenuItem icon="known-vehicle" text="Бригааааады!" /></Link>
            <Link style={{textDecoration:'inherit', color:'inherit'}} to="/cp/brigadereport"><MenuItem icon="known-vehicle" text="Отчеты бригад" /></Link>
            <Link style={{textDecoration:'inherit', color:'inherit'}} to="/cp/brigadeequipment"><MenuItem icon="known-vehicle" text="Оборудование бригад" /></Link>


            <MenuDivider />
            <MenuItem icon="cog" text="Настройки...">
                {auth.user.role == 'admin' ? 
                    (<>
                    <Link style={{textDecoration:'inherit', color:'inherit'}} to="/cp/users"><MenuItem icon="mugshot" text="Пользователи" disabled={false} /></Link>
                    <Link style={{textDecoration:'inherit', color:'inherit'}} to="/cp/admin"><MenuItem icon="cog" text="Администрирование" disabled={false} /></Link>
                    </>):(<></>)}
            </MenuItem>
        </Menu>
    )

    return (
        <>
            <div className="header-flex">
                <div>
                    <Popover2 content={menuContent} placement="right-end">
                        <Button icon="menu" text="Меню" small={true} />
                    </Popover2>
                </div>
                <div>
                    <span style={{marginRight:10}}>{auth.user.name}</span>
                    {auth.isAuthenticated ? (
                        <Button style={{marginLeft:10}} small={true} onClick={() => dispatch(ACTIONS.logoutUser())}><Icon icon="log-out" style={{marginLeft:1, marginRight:5}} />Выйти</Button>
                    ) : (
                        <></>
                    )}
                </div>

            </div>



        </>
    );
};

export default TopButtons;
