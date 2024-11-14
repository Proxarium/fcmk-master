import React, { useEffect, Component } from "react";
import { Dialog, Button, Card, Classes, Elevation, H5, Label, Slider, Switch, Spinner } from "@blueprintjs/core";
import { useSelector, useDispatch, connect } from "react-redux";
import Select from 'react-select'
import moment from "moment";
import 'moment/locale/ru';
import { DatePicker, DateRangePicker } from "@blueprintjs/datetime";
import MomentLocaleUtils from 'react-day-picker/moment';
import {
    getUsersList,
    getTodos,
    delTodo,
    createTodo,
    addMassTodo
} from "../../redux/actions/usersActions";

const CPTodos = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const users = useSelector(state => state.users.users);
    const userTodosLoading = useSelector(state => state.users.userTodosLoading);
    const userTodos = useSelector(state => state.users.userTodos);
    const userRoles = useSelector(state => state.users.userRoles);

    const userTodoDeleting = useSelector(state => state.users.userTodoDeleting);
    const userTodoAdding = useSelector(state => state.users.userTodoAdding);

    const massTodoAdded = useSelector(state => state.users.massTodoAdded);

    const [usersList, setUsersList] = React.useState(null);
    const [userSelected, setUserSelected] = React.useState(null);


    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: 'black',
            padding: 4,
            backgroundColor: state.isSelected ? '#EEEEEE' : null,
        }),

        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            return { ...provided, opacity, transition };
        }
    }

    const setUserToLoad = (e) => {
        console.log(e.value);
        setUserSelected(e)
        dispatch(getTodos(e.value));
    }

    useEffect(() => {
        if (users != null) {
            if (users.length > 0) {
                let usersTmpArray = [];
                users.forEach(function (element) {
                    usersTmpArray.push({ label: element.name, value: element._id })
                });
                setUsersList(usersTmpArray);
            }
        }
    }, [users])

    useEffect(() => {
        setCreateTodoData({
            userId: null,
            text: '',
            creatorId: auth.user.id,
            completeAt: null
        });
        setAddTodoShow(false);
    }, [userTodos])






    const handleLoadUsers = () => {
        dispatch(getUsersList(auth))
    }

    const handleDeleteTodo = (e) => {
        dispatch(delTodo(e._id, auth.user.id))
    }



    //СОЗДАНИЕ TODO
    const [createTodoData, setCreateTodoData] = React.useState({
        userId: null,
        text: '',
        creatorId: auth.user.id,
        completeAt: null
    })
    const [addTodoShow, setAddTodoShow] = React.useState(false);
    const handleShowAddTodo = () => {
        setCreateTodoData({ ...createTodoData, userId: userSelected.value, creatorId: auth.user.id })
        setAddTodoShow(true);
    }
    const handleCloseAddTodo = () => {
        setCreateTodoData({
            userId: null,
            text: '',
            creatorId: auth.user.id,
            completeAt: null
        });
        setAddTodoShow(false);
    }
    const handleAddTodo = () => {
        console.log(createTodoData)
        dispatch(createTodo(createTodoData))
    }
    const handleDateChange = (e) => {
        console.log(e)
        console.log(moment(e).format('LLL'))
    }

    const handleChangeDate = (date) => {
        if (date != null) {
            console.log(date.toISOString())
            // console.log(moment(date.toISOString()).format('LLL'))
            setCreateTodoData({ ...createTodoData, completeAt: date.toISOString() })
            // setDeliveryDate(date.toISOString());
        }
    }

    function renderAddTodo() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <h5 class="bp3-heading">Добавление задачи для {userSelected.label}</h5>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <textarea value={createTodoData.text} onChange={(e) => setCreateTodoData({ ...createTodoData, text: e.target.value })} class="bp3-input .modifier bp3-fill" dir="auto" style={{ width: '100%' }}></textarea>
                </div>
                <DatePicker
                    localeUtils={MomentLocaleUtils}
                    locale="ru"
                    className="class1"
                    onChange={handleChangeDate}
                    timePickerProps={{ showArrowButtons: true }}
                    timePrecision="minute"
                    highlightCurrentDay={true}
                    showActionsBar={true}
                    todayButtonText="Сегодня"
                    clearButtonText="Очистить"

                />
                <Button icon="small-tick" intent="success" onClick={handleAddTodo}>Добавить</Button>
            </div >
        )
    }

    function renderUserTodoList() {
        return (
            <>
                {userTodos.map((todo, i) => {
                    return (
                        <>
                            <Card style={{ marginBottom: 10 }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                    <div>
                                        Задача - {todo.text}<br />
                                        Назначил - {todo.creatorName}<br />
                                        Время назначения - {moment(todo.createdAt).format('LLL')}<br />
                                        {todo.completeAt != null ? (<>Выполнить до - {moment(todo.completeAt).format('LLL')}</>) : null}

                                    </div>
                                    <div>
                                        <Button intent="danger" icon="trash" onClick={() => handleDeleteTodo(todo)}>Удалить</Button>
                                    </div>
                                </div>
                            </Card>
                        </>
                    )
                })}
            </>
        )
    }

    //МАССОВОЕ ДОБАВЛЕНИЕ ЗАДАЧ

    useEffect(() => {
        setAddMassTodoShow(false);
        setMassTodoData({
            text: null,
            complete_at: null,
            creatorId: auth.user.id,
            created_at: null,
        })
        setMassAddRole(null);
        setAddMassTodoShow(false);
        setAddTodoShow(false);
    }, [massTodoAdded])

    const [addMassTodoShow, setAddMassTodoShow] = React.useState(false);
    // const [selectedMassDate, setSelectedMassDate] = React.useState(null);
    const [massTodoData, setMassTodoData] = React.useState({
        text: null,
        complete_at: null,
        creatorId: auth.user.id,
        created_at: null,
    });
    const [massAddRole, setMassAddRole] = React.useState(null);


    const handleAddMassTodo = () => {
        setAddMassTodoShow(true);

    }
    const handleCloseAddMassTodo = () => {
        // setSelectedMassDate(null);
        setMassTodoData({
            text: null,
            complete_at: null,
            creatorId: auth.user.id,
            created_at: null,
        })
        setMassAddRole(null);
        setAddMassTodoShow(false);
        setAddTodoShow(false);
    }
    const validateAddMassTodo = () => {
        dispatch(addMassTodo(massTodoData, massAddRole, auth))
    }

    function renderAddMassTodo() {
        return (<>
            <div style={{ paddingLeft: 130, paddingBottom: 10 }}>
                <h5 class="bp3-heading">Массовое назначение задачи</h5>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>

                <div style={{ paddingRight: 10 }}>
                    <span><b>Дата назначения:</b></span>
                    <DatePicker
                        localeUtils={MomentLocaleUtils}
                        locale="ru"
                        className="class1"
                        onChange={(date) => { setMassTodoData({ ...massTodoData, created_at: date.toISOString() }) }}
                        timePickerProps={{ showArrowButtons: true }}
                        timePrecision="minute"
                        highlightCurrentDay={true}
                        showActionsBar={true}
                        todayButtonText="Сегодня"
                        clearButtonText="Очистить"
                    />
                </div>
                <div>
                    <span><b>Выполнить задачу до:</b></span>
                    <DatePicker
                        localeUtils={MomentLocaleUtils}
                        locale="ru"
                        className="class1"
                        onChange={(date) => { setMassTodoData({ ...massTodoData, complete_at: date.toISOString() }) }}
                        timePickerProps={{ showArrowButtons: true }}
                        timePrecision="minute"
                        highlightCurrentDay={true}
                        showActionsBar={true}
                        todayButtonText="Сегодня"
                        clearButtonText="Очистить"
                    />
                </div>
            </div>
            <div style={{ paddingTop: 20, paddingLeft: 10, paddingRight:10, paddingBottom: 20, justifyContent: 'center', flexDirection: 'row' }}>

                <span>Какая группа людей получит задачу?</span>
                <Select isMulti onChange={(e) => setMassAddRole(e)} styles={customStyles} placeholder="Выберите роль" className="select-user-todos-add" options={userRoles}  />
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 10, paddingLeft:10, paddingRight:10 }}>
                <span><b>Задача:</b></span>
                <textarea value={massTodoData.text} onChange={(e) => setMassTodoData({ ...massTodoData, text: e.target.value })} class="bp3-input .modifier bp3-fill" dir="auto" style={{ width: '100%' }}></textarea>
            </div>
            <div style={{ paddingLeft: 190, justifyContent: 'space-between' }}>
                <Button icon="small-tick" intent="success" onClick={validateAddMassTodo} >Добавить</Button>
            </div>
        </>)
    }

    return (
        <>
            <div className="content-div">
                <Card style={{ marginBottom: 10 }}>
                    <H5><a href="#">Список задач</a></H5>
                    {users != null ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <Select onChange={(e) => setUserToLoad(e)} styles={customStyles} placeholder="Выберите пользователя" className="select-user-todos" options={usersList} />
                            {userSelected != null ? (
                                <Button style={{ marginRight: 10 }} intent="success" icon="add" onClick={handleShowAddTodo}>Добавить задачу</Button>
                            ) : (<></>)}
                            <Button icon="add" onClick={handleAddMassTodo}>Массовое назначение задач</Button>
                        </div>
                    ) : (<>
                        <p>Список пользователей не загружен</p>
                        <Button icon="small-tick" intent="success" onClick={handleLoadUsers}>Загрузить список пользователей</Button>
                    </>)}

                </Card>

                {userSelected != null ? (
                    <>
                        {userTodosLoading ? (
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginTop: 20 }}>
                                <Spinner size={20} />
                            </div>) : (
                            <>
                                {userTodos.length > 0 ? (<>
                                    {renderUserTodoList()}
                                </>) : (<>
                                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginTop: 20 }}>
                                        <span>Нет задач</span>
                                    </div>
                                </>)}
                            </>
                        )}
                    </>
                ) : (<></>)}

                {userTodoDeleting ? (
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginTop: 20 }}>
                        <Spinner size={20} />
                    </div>
                ) : (<></>)}
                {userTodoAdding ? (
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginTop: 20 }}>
                        <Spinner size={20} />
                    </div>
                ) : (<></>)}


            </div>
            {userSelected ? (
                <Dialog style={{ maxWidth: '300px', width: '100%', paddingTop: 10, paddingBottom: 10 }} isOpen={addTodoShow} onClose={handleCloseAddTodo}>
                    {renderAddTodo()}
                </Dialog>
            ) : null}


            <Dialog style={{ maxWidth: '500px', width: '100%', paddingTop: 10, paddingBottom: 10 }} isOpen={addMassTodoShow} onClose={handleCloseAddMassTodo}>
                {renderAddMassTodo()}
            </Dialog>

        </>
    );
};

export default CPTodos;
