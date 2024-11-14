import React, { useEffect, Component } from "react";
import { Dialog, Button, Card, Classes, Elevation, H5, Label, Slider, Switch, Spinner } from "@blueprintjs/core";
import { useSelector, useDispatch, connect } from "react-redux";
import Select from 'react-select'
import moment from "moment";
import 'moment/locale/ru';
import { DatePicker, DateRangePicker } from "@blueprintjs/datetime";
import MomentLocaleUtils from 'react-day-picker/moment';
import {
    getEquipmentList,
    addEquipment
} from "../../redux/actions/equipmentActions";

const CPEquipment = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const users = useSelector(state => state.users.users);
    const equipmentLoading = useSelector(state => state.equipment.equipmentLoading);
    const equipments = useSelector(state => state.equipment.equipments);

    const equipmentDeleting = useSelector(state => state.equipment.equipmentDeleting);
    const equipmentAdding = useSelector(state => state.equipment.equipmentAdding);

    useFetching(getEquipmentList, useDispatch(), auth);

    const [showAddEquip, setShowAddEquip] = React.useState(false);

    useEffect(() => {
        setCreateEquipData({
            name: '',
            headertext: '',
            description: '',
            extra: '',
            images: [{ name: '', url: '' }],
        })
        setShowAddEquip(false);
    }, [equipments]);

    const handleAddEquip = () => {
        setCreateEquipData({
            name: '',
            headertext: '',
            description: '',
            extra: '',
            images: [{ name: '', url: '' }],
        })
        setShowAddEquip(true);
    }
    const handleHideAddEquip = () => {
        setShowAddEquip(false);
        setCreateEquipData({
            name: '',
            headertext: '',
            description: '',
            extra: '',
            images: [{ name: '', url: '' }],
        })
    }

    //СОЗДАНИЕ EQUIP
    const [createEquipData, setCreateEquipData] = React.useState({
        name: '',
        headertext: '',
        description: '',
        extra: '',
        images: [{ name: '', url: '' }],
    })

    const addImageName = (name, i) => {
        let array = [...createEquipData.images];
        array[i].name = name;
        setCreateEquipData({ ...createEquipData, images: array })
    }
    const addImageUrl = (url, i) => {
        let array = [...createEquipData.images];
        array[i].url = url;
        setCreateEquipData({ ...createEquipData, images: array })
    }
    const handleAddImageItem = () => {
        let array = [...createEquipData.images];
        array.push({ name: '', url: '' });
        setCreateEquipData({ ...createEquipData, images: array })
    }

    const handleAddEquipment = () => {
        dispatch(addEquipment(createEquipData, auth))
    }

    function renderAddEquip() {
        return (
            <>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Название</span>
                    </div>
                    <div>
                        <input value={createEquipData.name} onChange={(e) => setCreateEquipData({ ...createEquipData, name: e.target.value })} class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="Название" dir="auto" />
                    </div>
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Заголовок</span>
                    </div>
                    <div>
                        <input value={createEquipData.headertext} onChange={(e) => setCreateEquipData({ ...createEquipData, headertext: e.target.value })} class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="Заголовок" dir="auto" />
                    </div>
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Описание</span>
                    </div>
                    <div>
                        <textarea value={createEquipData.description} onChange={(e) => setCreateEquipData({ ...createEquipData, description: e.target.value })} class="bp3-input .modifier bp3-fill" dir="auto" style={{ width: '100%' }}></textarea>
                    </div>
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Доп. информация</span>
                    </div>
                    <div>
                        <textarea value={createEquipData.extra} onChange={(e) => setCreateEquipData({ ...createEquipData, extra: e.target.value })} class="bp3-input .modifier bp3-fill" dir="auto" style={{ width: '100%' }}></textarea>
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <div>
                        <span>Изображения:</span>
                    </div>
                    {createEquipData.images.map((image, i) => {
                        return (
                            <>
                                <div>
                                    <input value={image.name} onChange={(e) => addImageName(e.target.value, i)} class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="Название" dir="auto" />
                                </div>
                                <div className="image-add-row">
                                    <input value={image.url} onChange={(e) => addImageUrl(e.target.value, i)} class="bp3-input .modifier" style={{ width: 195 }} type="text" placeholder="URL" dir="auto" />
                                </div>
                            </>
                        )
                    })}
                    <div>
                        <Button icon="add" onClick={handleAddImageItem}>Добавить фото</Button>
                    </div>
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
                    <Button icon="add" onClick={handleAddEquipment}>Добавить</Button>
                </div>
            </>
        )
    }



    function renderEquipment() {

        return (
            <>
                {equipments.map((equipment, i) => {
                    return (
                        <Card style={{ marginBottom: 10 }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <div>
                                    <span className="equipment-row-name">Название: </span>{equipment.name}<br />
                                    <span className="equipment-row-name">Заголовок: </span>{equipment.headertext}<br />
                                    <span className="equipment-row-name">Описание: </span>{equipment.description}<br />
                                    <span className="equipment-row-name">Доп. информация: </span>{equipment.extra}<br />
                                    <h4>Изображения</h4>
                                    <div className="equipment-image-row">
                                        {equipment.images.map((image, u) => {
                                            return (
                                                <div className="equipment-image-block">
                                                    {image.name}
                                                    <br />
                                                    <img style={{ maxWidth: 70 }} src={image.url} />
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                                <div>

                                </div>
                            </div>
                        </Card>
                    )
                })}
            </>
        )
    }

    return (
        <>
            <div className="content-div">
                <Card style={{ marginBottom: 10 }}>
                    <H5><a href="#">Список оборудования</a></H5>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <Button icon="add" onClick={handleAddEquip}>Добавить</Button>
                    </div>
                </Card>

                {equipments.length > 0 ? (
                    <>{renderEquipment()}</>
                ) : (<>
                    <p>Нет оборудования</p>
                </>)}

                <Dialog style={{ maxWidth: '300px', width: '100%', paddingTop: 10, paddingBottom: 10 }} isOpen={showAddEquip} onClose={handleHideAddEquip}>
                    {renderAddEquip()}
                </Dialog>

            </div>
        </>
    );
};


const useFetching = (getEquipmentList, dispatch, auth) => {
    useEffect(() => {
        dispatch(getEquipmentList(auth));
    }, []);
};


export default CPEquipment;
