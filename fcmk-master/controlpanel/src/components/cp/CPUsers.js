import React, { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Dialog, DialogProps, Button, Card, Classes, Elevation, H5, Label, Slider, Switch, Spinner } from "@blueprintjs/core";
import { Container, Row, Col } from 'react-grid-system';
import InputMask from 'react-input-mask';
import Select from 'react-select'

import {
    getUsersList,
    createUser,
    deleteUser,
    editUser
} from "../../redux/actions/usersActions";

const CPUsers = () => {
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const usersLoading = useSelector(state => state.users.usersLoading);
    const users = useSelector(state => state.users.users);


    const [createUserData, setCreateUserData] = React.useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })
    const [createUserRole, setCreateUserRole] = React.useState(null);
    const [addUserShow, setAddUserShow] = React.useState(false);

    const handleShowAddUser = () => {
        setAddUserShow(true);
    }
    const handleCloseAddUser = () => {
        setCreateUserData({
            name: '',
            email: '',
            phone: '',
            password: ''
        });
        setCreateUserRole(null);
        setAddUserShow(false);
    }

    const roleOptions = [
        { value: 'admin', label: 'Администратор ( Глав-врач )' },
        { value: 'main-paramedic', label: 'Главный фельдшер' },
        { value: 'medical-paramedic', label: 'Старший фельдшер' },
        { value: 'nurse-man', label: 'Старший мед брат' },
        { value: 'dispatcher', label: 'Диспетчер' },
        { value: 'user', label: 'Пользователь' },
        { value: 'nurseman', label: 'Медицинский брат - анестезист'},
        { value: 'nurse-anesth', label: 'Медицинская сестра - анестезист'},
        { value: 'paramedic', label: 'Фельдешер скорой медицинской помощи'}
    ]

    function generatePassword() {
        var length = 6,
            charset = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        setCreateUserData({ ...createUserData, password: retVal });
        console.log(createUserData);
        console.log(createUserRole);
    }

    const handleAddUser = () => {
        if (createUserData.email.length > 5) {
            if (createUserData.name.length > 3) {
                if (createUserData.password.length > 5) {
                    dispatch(createUser(createUserData, createUserRole.value))
                }
            }
        }
    }

    
    useEffect(() => {
        setAddUserShow(false);
        setCreateUserData({
            name: '',
            email: '',
            phone: '',
            password: ''
        });
        setCreateUserRole(null);
        setEditUserData({
            name: '',
            email: '',
            phone: '',
            password: ''
        });
        setEditUserRole(null);
        setShowEditPsw(false);
        setEditUserShow(false);
    }, [users])



    // 0 - admin  // глав-врач
    // 1 - paramedic // глав-фельдшер
    // 2 - medical-paramedic // старший-фельдшер по ах
    // 3 - nurse-man // старший мед брат
    // 4 - dispatcher // диспетчер
    // 5 - user // пользователь без прав
    const [addProfileShow, ProfileShow] = React.useState(null);
    const [profileToShow, setProfileToShow] = React.useState(null);

    const handleShowProfileUser = (user) => {
        //console.log(user.name, getUserRole(user.role));
        setProfileToShow(user)
        ProfileShow(true);

    }
    const handleCloseProfileUser = (user) => {
        console.log(user.name, getUserRole(user.role));
        ProfileShow(false);

    }

    const handleDeleteUser = (user) => {
        console.log('Удаляем ' + user);
        dispatch(deleteUser(user))
    }

    const [editUserData, setEditUserData] = React.useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    })
    const [editUserRole, setEditUserRole] = React.useState(null);
    const [showEditPsw, setShowEditPsw] = React.useState(false)
    const [editUserShow, setEditUserShow] = React.useState(false);
    const handleShowEditUser = (user) => {
        setEditUserData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: ''
        });
        var roleObj = roleOptions.filter(obj => {
            return obj.value === user.role
        })
        setEditUserRole(roleObj[0]);
        setEditUserShow(true);
    }
    const handleCloseEditUser = () => {
        setEditUserData({
            name: '',
            email: '',
            phone: '',
            password: ''
        });
        setEditUserRole(null);
        setShowEditPsw(false);
        setEditUserShow(false);
    }
    const showEditPasswordUser = () => {
        setShowEditPsw(true);
    }

    function generateEditPassword() {
        var length = 6,
            charset = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        setEditUserData({ ...editUserData, password: retVal });
    }

    const handleEditUser = () => {
        console.log('handleEditUser');
        if (editUserData.email.length > 5) {
            if (editUserData.name.length > 3) {
                dispatch(editUser(editUserData, editUserRole.value))
            }
        }
    }

    function renderEditUser() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <h5 class="bp3-heading">Редактирование пользователя</h5>

                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Логин</span>
                    </div>
                    <div>
                        <input value={editUserData.email} onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })} class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="Логин пользователя" dir="auto" />
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Роль</span>
                    </div>
                    <div>
                        <Select value={editUserRole} onChange={setEditUserRole} placeholder="Выберите роль" className="select-role" options={roleOptions} />
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Ф.И.О</span>
                    </div>
                    <div>
                        <input value={editUserData.name} onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })} class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="ФИО пользователя" dir="auto" />
                    </div>
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Телефон</span>
                    </div>
                    <div>
                        <InputMask
                            mask='+7 (999) 999-99-99'
                            value={editUserData.phone}
                            onChange={(e) => setEditUserData({ ...editUserData, phone: e.target.value })}
                            class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="Телефон пользователя" dir="auto"
                        >
                        </InputMask>
                    </div>
                </div>
                {showEditPsw ? (<>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                        <div>
                            <span>Пароль</span>
                        </div>
                        <div>
                            <div class="bp3-input-group .modifier" style={{ width: 195 }}>
                                <input value={editUserData.password} onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })} type="text" class="bp3-input" placeholder="Пароль пользователя" />
                                <button onClick={() => generateEditPassword()} class="bp3-button bp3-minimal bp3-intent-warning bp3-icon-refresh" ></button>
                            </div>
                        </div>
                    </div>
                </>) : (<><Button style={{ marginBottom: 10 }} icon="edit" onClick={showEditPasswordUser}>Сменить пароль</Button></>)}
                <Button icon="small-tick" intent="success" onClick={handleEditUser}>Сохранить</Button>
            </div>
        )
    }

    function renderAddUser() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <h5 class="bp3-heading">Добавление нового пользователя</h5>

                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Логин</span>
                    </div>
                    <div>
                        <input value={createUserData.email} onChange={(e) => setCreateUserData({ ...createUserData, email: e.target.value })} class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="Логин пользователя" dir="auto" />
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Пароль</span>
                    </div>
                    <div>
                        <div class="bp3-input-group .modifier" style={{ width: 195 }}>
                            <input value={createUserData.password} onChange={(e) => setCreateUserData({ ...createUserData, password: e.target.value })} type="text" class="bp3-input" placeholder="Пароль пользователя" />
                            <button onClick={() => generatePassword()} class="bp3-button bp3-minimal bp3-intent-warning bp3-icon-refresh" ></button>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Роль</span>
                    </div>
                    <div>
                        <Select value={createUserRole} onChange={setCreateUserRole} placeholder="Выберите роль" className="select-role" options={roleOptions} />
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Ф.И.О</span>
                    </div>
                    <div>
                        <input value={createUserData.name} onChange={(e) => setCreateUserData({ ...createUserData, name: e.target.value })} class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="ФИО пользователя" dir="auto" />
                    </div>
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Телефон</span>
                    </div>
                    <div>
                        <InputMask
                            mask='+7 (999) 999-99-99'
                            value={createUserData.phone}
                            onChange={(e) => setCreateUserData({ ...createUserData, phone: e.target.value })}
                            class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="Телефон пользователя" dir="auto"
                        >
                        </InputMask>
                    </div>
                </div>
                <Button icon="small-tick" intent="success" onClick={handleAddUser}>Сохранить</Button>
            </div>
        )
    }
    function renderProfileShow() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <h5 class="bp3-heading">Профиль</h5>
                {profileToShow != null ? (
                    <>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>

                            <span><strong>Ф.И.О:</strong> {profileToShow.name}</span>
                        </div>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>

                            <span><strong>Должность:</strong> {getUserRole(profileToShow.role)} </span>
                        </div>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>

                            <span><strong>E-mail: </strong>{profileToShow.email}</span>
                        </div>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>

                            <span><strong>Телефон:</strong> {profileToShow.phone}</span>
                        </div>

                    </>
                            ) : null}

                        </div>

            

        )
    }


    function getUserRole(userRole) {
        switch (userRole) {
            case 'admin':
                return 'Администратор ( Глав-врач )'
            case 'main-paramedic':
                return 'Главный фельдшер'
            case 'medical-paramedic':
                return 'Старший фельдшер'
            case 'nurse-man':
                return 'Старший мед брат'
            case 'dispatcher':
                return 'Диспетчер'
            case 'user':
                return 'Пользователь'
            case 'nurseman':
                return 'Медицинский брат - анестезист'
            case 'nurse-anesth':
                return 'Медицинская сестра - анестезист'
            case 'paramedic':
                return 'Фельдешер скорой медицинской помощи'             
            default:
                return '';
        }
    }

    useFetching(getUsersList, useDispatch(), auth);
    return (
        <>
            <div className="content-div">
                {/* <Container style={{ maxWidth: 'none', paddingLeft: 0, paddingRight: 0 }}> */}

                <Card>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}><a href="#">Управления пользователями</a></div>
                        <div>
                            <Button icon="add" intent="success" onClick={() => handleShowAddUser()}>Добавить</Button>
                        </div>
                    </div>
                </Card>


                {usersLoading ? (
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginTop: 20 }}>
                        <Spinner size={20} />
                    </div>
                ) : (
                    <>
                        {users.map((user, i) => {
                            return (
                                <>
                                    <Card elevation={1} className="users-card">
                                        <div className="users-row">
                                            <span>{user.name}</span>
                                            <span>{getUserRole(user.role)}</span>
                                        </div>
                                        <div style={{ marginRight: 10 }}>
                                            <Button onClick={() => handleShowProfileUser(user)} icon="user">Профиль</Button>
                                        </div>
                                        <div style={{ marginRight: 10 }}>
                                            <Button onClick={() => handleShowEditUser(user)} icon="edit">Редактировать</Button>
                                        </div>
                                        <div>
                                            <Button intent="danger" onClick={() => handleDeleteUser(user.email)}>Удалить</Button>
                                        </div>
                                    </Card>
                                </>
                            )
                        })}
                    </>)}


                {/* </Container> */}
            </div>
            <Dialog style={{ maxWidth: '300px', width: '100%', paddingTop: 10, paddingBottom: 10 }} isOpen={addUserShow} onClose={handleCloseAddUser}>
                {renderAddUser()}
            </Dialog>
            <Dialog style={{ maxWidth: '300px', width: '100%', paddingTop: 10, paddingBottom: 10 }} isOpen={editUserShow} onClose={handleCloseEditUser}>
                {renderEditUser()}
            </Dialog>
            <Dialog style={{ maxWidth: '300px', width: '100%', paddingTop: 10, paddingBottom: 10 }} isOpen={addProfileShow} onClose={handleCloseProfileUser}>
                {renderProfileShow()}
            </Dialog>   
        </>
    );
};

const useFetching = (getUsersList, dispatch, auth) => {
    useEffect(() => {
        dispatch(getUsersList(auth));
    }, []);
};

export default CPUsers;