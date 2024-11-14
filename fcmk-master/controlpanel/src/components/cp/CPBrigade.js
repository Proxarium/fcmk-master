import React, { useEffect } from "react";
import { Button, Card, Classes, Elevation, H3, H5, H6, Label, Slider, Switch, Spinner, Divider, Icon, Dialog } from "@blueprintjs/core";
import { connect, useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from 'react-grid-system';
import {
    getBrigadeInfos,
    addBrigade,
    addBrigadeCar
} from "../../redux/actions/brigadeActions";


const CPBrigade = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const brigadeCars = useSelector(state => state.brigade.brigadeCars);
    const brigades = useSelector(state => state.brigade.brigades);
    const brigadeInfosLoading = useSelector(state => state.brigade.brigadeInfosLoading);

    useEffect(() => {
        setAddBrigadeData({
            brigadeName: '',
        })
        setAddBrigadeShow(false);
    }, [brigades])

    useEffect(() => {
        setAddBrigadeCarData({
            carNumber: '',
        })
        setAddBrigadeCarShow(false);
    }, [brigadeCars])


    const [addBrigadeData, setAddBrigadeData] = React.useState({
        brigadeName: '',
    });

    const [addBrigadeCarData, setAddBrigadeCarData] = React.useState({
        carNumber: '',
    });



    useFetching(getBrigadeInfos, useDispatch(), auth);


    const [addBrigadeShow, setAddBrigadeShow] = React.useState(false);
    const handleShowAddBrigade = () => {
        setAddBrigadeShow(true);
    }
    const handleCloseAddBrigadeShow = (user) => {
        setAddBrigadeShow(false);
    }

    const [addBrigadeCarShow, setAddBrigadeCarShow] = React.useState(false);
    const handleShowAddBrigadeCar = () => {
        setAddBrigadeCarShow(true);
    }
    const handleCloseAddBrigadeCarShow = (user) => {
        setAddBrigadeCarShow(false);
    }

    const handleAddBrigade = () => {
        dispatch(addBrigade(addBrigadeData, auth.user));
    }
    const handleAddBrigadeCar = () => {
        dispatch(addBrigadeCar(addBrigadeCarData, auth.user));
    }

    function renderAddBrigade() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h4>Добавление бригады</h4>
                <input value={addBrigadeData.brigadeName} onChange={(e) => setAddBrigadeData({ ...addBrigadeData, brigadeName: e.target.value })} class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="Название бригады" dir="auto" />
                <Button icon="small-tick" intent="success" onClick={handleAddBrigade} style={{marginTop:20, marginBottom:10}}>Сохранить</Button>
            </div>
        )
    }

    function renderAddBrigadeCar() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h4>Добавление автомобиля</h4>
                <input value={addBrigadeCarData.carNumber} onChange={(e) => setAddBrigadeCarData({ ...addBrigadeCarData, carNumber: e.target.value })} class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="Госномер автомобиля" dir="auto" />
                <Button icon="small-tick" intent="success" onClick={handleAddBrigadeCar} style={{marginTop:20, marginBottom:10}}>Сохранить</Button>
            </div>
        )
    }

    return (
        <div className="content-div">
            <Card>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}><a href="#">Управления бригадами</a></div>
                </div>
            </Card>
            {brigadeInfosLoading ? (<><Spinner /></>) : (
                <>

                    <Divider vertical={true} style={{ marginTop: 20 }} />
                    <H3 style={{ textAlign: 'center' }}>Бригады</H3>
                    <Divider vertical={true} />
                    <Button icon="add" intent="success" onClick={() => handleShowAddBrigade()}>Добавить бригаду</Button>

                    {brigades.map((brigade, i) => {
                        return (
                            <Card style={{ marginTop: 10, borderLeft: 0, borderTop: 0, borderRight: 0, borderBottom: 0, alignItems: 'center', display: 'flex', flex: 1, flexDirection: 'row' }}>
                                <Icon icon="people" size={30} />
                                <span style={{ marginLeft: 20 }}>{brigade.brigadeName}</span>
                            </Card>
                        )
                    })}

                    <Divider vertical={true} style={{ marginTop: 20 }} />
                    <H3 style={{ textAlign: 'center' }}>Автомобили</H3>
                    <Divider vertical={true} />
                    <Button icon="add" intent="success" onClick={() => handleShowAddBrigadeCar()}>Добавить автомобиль</Button>
                    {brigadeCars.map((brigadecar, i) => {
                        return (
                            <Card style={{ marginTop: 10, borderLeft: 0, borderTop: 0, borderRight: 0, borderBottom: 0, alignItems: 'center', display: 'flex', flex: 1, flexDirection: 'row' }}>
                                <Icon icon="drive-time" size={30} />
                                <div>
                                    <span style={{ marginLeft: 20 }}>Госномер: {brigadecar.carNumber}</span><br />
                                    <span style={{ marginLeft: 20 }}>Взята: {brigadecar.isTaken ? (<>Да</>) : (<>Нет</>)}</span>
                                </div>
                            </Card>
                        )
                    })}

                </>)}

            <Dialog style={{ maxWidth: '300px', width: '100%', paddingTop: 10, paddingBottom: 10 }} isOpen={addBrigadeShow} onClose={handleCloseAddBrigadeShow}>
                {renderAddBrigade()}
            </Dialog>
            <Dialog style={{ maxWidth: '300px', width: '100%', paddingTop: 10, paddingBottom: 10 }} isOpen={addBrigadeCarShow} onClose={handleCloseAddBrigadeCarShow}>
                {renderAddBrigadeCar()}
            </Dialog>
        </div>
    );
};

const useFetching = (getBrigadeInfos, dispatch, auth) => {
    useEffect(() => {
        dispatch(getBrigadeInfos(auth));
    }, []);
};

export default CPBrigade;
