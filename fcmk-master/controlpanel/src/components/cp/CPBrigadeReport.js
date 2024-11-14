import React, { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Dialog, DialogProps, Button, Card, Classes, Elevation, H5, Label, Slider, Switch, Spinner } from "@blueprintjs/core";
import { Container, Row, Col } from 'react-grid-system';
import InputMask from 'react-input-mask';
import Select from 'react-select'
import { DatePicker, DateRangePicker } from "@blueprintjs/datetime";

import {
    getBrigadesReport,
    searchSend,
} from "../../redux/actions/brigadeActions";

import moment from "moment";
import 'moment/locale/ru';

const CPBrigadeReport = () => {
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const usersLoading = useSelector(state => state.users.usersLoading);
    const users = useSelector(state => state.users.users);

    const brigadeReportsLoading = useSelector(state => state.brigade.brigadeReportsLoading);
    const brigadeReports = useSelector(state => state.brigade.brigadeReports);

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const searching = useSelector(state => state.brigade.kvsearching);
    


    const handleChange = (date) => {
        console.log(date);
        setSelectedDate(date);
        if (date != null) {
            dispatch(getBrigadesReport(auth, date));
        }

    }

    const [recipeShow, RecipeShow] = React.useState(null);
    const [recipeToShow, setRecipeToShow] = React.useState({});

    const handleShowBrigadeRecipe = (recipe) => {
        setRecipeToShow(recipe)
        RecipeShow(true);
    }

    const handleCloseBrigadeRecipeShow = () => {
        RecipeShow(false);
    }

    function renderReports() {
        return (
            <>
                {brigadeReports.length > 0 ? (<>

                    {brigadeReports.map((report, i) => {
                        console.log(report)
                        return (
                            <>
                                <Card elevation={1} className="users-card">
                                    <div className="users-row">
                                        <span>{report.brigadeName}</span>
                                        <span>Бригада сдана: {moment(report.timeEnd).format('LLL')}</span>
                                        <span>Автомобиль: {report.selectedCarId.number}</span>
                                        <span>Сотрудники:</span><br />
                                        {report.brigadeUsers.map((user, i) => {
                                            return (
                                                <><span>{user.name}</span><br /></>
                                            )
                                        })}
                                    </div>



                                    <div style={{ marginLeft: 10, marginRight: 10, width: '100%', maxWidth: 300 }}>Отсутствуют: <br />
                                        {report.firstReport.map((reportObj, i) => {
                                            return (
                                                <>

                                                    {reportObj.items.length > 0 ? (<>
                                                        <span><b>{reportObj.name}</b></span><br />
                                                        {reportObj.items.map((reportObjItem, y) => {
                                                            console.log(reportObjItem)
                                                            return (
                                                                <>

                                                                    <div className="brigade-report-block-dashboard-item" key={i.toString()}>
                                                                        <div><span>{reportObjItem.name}</span></div>
                                                                        {(parseInt(reportObjItem.originalValue, 10) - parseInt(reportObjItem.quantity, 10)) > 0 ? (<>
                                                                            <div className="brigade-report-block-dashboard-item-2"><span>{parseInt(reportObjItem.originalValue, 10) - parseInt(reportObjItem.quantity, 10)}</span></div>
                                                                        </>) : null}
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                    </>) : null}
                                                </>
                                            )
                                        })}
                                    </div>


                                    <div style={{ marginLeft: 10, marginRight: 10, width: '100%', maxWidth: 300 }}>Отсутствуют:<br />
                                        {report.secondReport.map((reportObj, i) => {
                                            return (
                                                <>
                                                    {reportObj.items.length > 0 ? (<>
                                                        <span><b>{reportObj.name}</b></span><br />
                                                        {reportObj.items.map((reportObjItem, y) => {
                                                            console.log(reportObjItem)
                                                            return (
                                                                <>

                                                                    <div className="brigade-report-block-dashboard-item" key={i.toString()}>
                                                                        <div><span>{reportObjItem.name}</span></div>
                                                                        {(parseInt(reportObjItem.originalValue, 10) - parseInt(reportObjItem.quantity, 10)) > 0 ? (<>
                                                                            <div className="brigade-report-block-dashboard-item-2"><span>{parseInt(reportObjItem.originalValue, 10) - parseInt(reportObjItem.quantity, 10)}</span></div>
                                                                        </>) : null}
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                    </>) : null}




                                                </>
                                            )
                                        })}
                                    </div>







                                    <div style={{ marginLeft: 10, marginRight: 10, width: '100%', maxWidth: 300 }}>Кислород:<br />
                                        {report.oxygenReport.map((reportObj, i) => {
                                            console.log(reportObj)
                                            return (
                                                <>
                                                    <div className="brigade-report-block-dashboard-item" key={i.toString()}>
                                                        <div><span>{reportObj.name}</span></div>
                                                        <div className="brigade-report-block-dashboard-item-2"><span>{reportObj.quantity}% (Редуктор {reportObj.reductor ? (<span style={{ color: 'green' }}>есть</span>) : (<span style={{ color: 'red' }}>нет</span>)})</span></div>
                                                    </div>
                                                </>
                                            )


                                        })}
                                    </div>

                                    <div style={{ marginLeft: 10, marginRight: 10, width: '100%', maxWidth: 300 }}>Комментарий:<br />
                                        {report.comment}
                                    </div>


                                    <div style={{ marginRight: 10 }}>
                                        <Button onClick={() => handleShowBrigadeRecipe(report.recipeItems)} icon="edit">Рецепты</Button>
                                    </div>
                                </Card>
                            </>
                        )
                    })}

                </>) : (<>
                    <p>Нет отчетов за этот день</p>
                </>)}
            </>
        )
    }

    function renderRecipeShow() {
        return (
            <div style={{ padding: 10 }}>
                {recipeToShow != undefined ? (<>
                    <h4>Рецепт</h4>
                    <span>ФИО врача: {recipeToShow.personOneName}</span><br />
                    <span>ФИО фельдшера: {recipeToShow.personTwoName}</span><br />
                    {recipeToShow.recipes != undefined ? (<>
                        {recipeToShow.recipes.map((recipe, i) => {
                            return (
                                <div style={{ borderBottomColor: '#131313', borderBottomWidth: 1, borderStyle: 'solid', borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom: 20, marginTop: 20, paddingBottom: 20 }}>
                                    <span>№КВ: {recipe.kvNum}</span><br />
                                    {recipe.items.map((item, u) => {
                                        return (
                                            <><span>{item.name} - {item.quantity}</span><br /></>
                                        )
                                    })}
                                    <span>Комментарий: {recipe.comment}</span><br />
                                </div>
                            )
                        })}

                    </>) : null}

                </>) : null}

            </div>
        )
    }

    const [searchVal, setSearchVal] = React.useState('');


    const handleSearchKV = () => {
        dispatch(searchSend(searchVal))
    }

    return (
        <>
            <div className="content-div">
                {/* <Container style={{ maxWidth: 'none', paddingLeft: 0, paddingRight: 0 }}> */}

                <Card>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}><a href="#">Отчеты по бригадам</a></div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <span style={{marginRight:5}}>Поиск по №КВ</span>
                        <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)} style={{marginRight:5}}></input>
                        {searching ? (<Spinner size={14}/>):(<Button onClick={() => handleSearchKV()} icon="search">Поиск</Button>)}
                        </div>
                    </div>
                </Card>

                <Card>

                    <DatePicker
                        onChange={newDate => handleChange(newDate)}
                        value={selectedDate}
                    />

                </Card>

                {brigadeReportsLoading ? (<div style={{ marginTop: 20 }}><Spinner /></div>) : (<>{renderReports()}</>)}
                {/* </Container> */}

                <Dialog style={{ maxWidth: '300px', width: '100%', paddingTop: 10, paddingBottom: 10 }} isOpen={recipeShow} onClose={handleCloseBrigadeRecipeShow}>
                    {renderRecipeShow()}
                </Dialog>


            </div>

        </>
    );
};


export default CPBrigadeReport;