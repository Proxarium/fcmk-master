import React, { useEffect } from "react";
import { Button, Card, H1, H2, H3, H5, H6, Spinner, Divider, DrawerSize, Drawer, Position, Icon } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import 'moment/locale/ru';
import {
    getDashboardInfo,
    getDeadlinedTodos,
    hideDeadlinedTodos,
    getOngoingTodos,
    hideOngoingTodos,
    getCompletedTodos,
    hideCompletedTodos,
    clearReportAnimation,
    getReportById
} from "../../redux/actions/dashboardActions";
import {
    delDeadlineTodo,
    delAllDeadlineTodo
} from "../../redux/actions/usersActions";
import AnimateOnChange from 'react-animate-on-change';

import { Container, Row, Col, setConfiguration } from 'react-grid-system';

const CPDashboard = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const dashboardLoading = useSelector(state => state.dashboard.dashboardLoading);
    const userCount = useSelector(state => state.dashboard.userCount);
    const todoCount = useSelector(state => state.dashboard.todoCount);
    const todoCompletedCount = useSelector(state => state.dashboard.todoCompletedCount);
    const todoDeadlinedCount = useSelector(state => state.dashboard.todoDeadlinedCount);

    const deadlinedTodosLoading = useSelector(state => state.dashboard.deadlinedTodosLoading);
    const deadlinedTodos = useSelector(state => state.dashboard.deadlinedTodos);
    // const deadlinedTodosShow = useSelector(state => state.dashboard.deadlinedTodosShow);

    const ongoingTodosLoading = useSelector(state => state.dashboard.ongoingTodosLoading);
    const ongoingTodos = useSelector(state => state.dashboard.ongoingTodos);
    // const ongoingTodosShow = useSelector(state => state.dashboard.ongoingTodosShow);

    const completedTodosLoading = useSelector(state => state.dashboard.completedTodosLoading);
    const completedTodos = useSelector(state => state.dashboard.completedTodos);
    // const completedTodosShow = useSelector(state => state.dashboard.completedTodosShow);
    const ongoingBrigades = useSelector(state => state.dashboard.ongoingBrigades);

    const reportIdToAnimate = useSelector(state => state.dashboard.reportIdToAnimate);
    const needToUpdateById = useSelector(state => state.dashboard.needToUpdateById);
    const reportIdToUpdateById = useSelector(state => state.dashboard.reportIdToUpdateById);




    const [showReportDrawer, setShowReportDrawer] = React.useState(false);

    const [reportType, setReportType] = React.useState(null);

    useFetching(getDashboardInfo, useDispatch(), auth);

    setConfiguration({ containerWidths: '1540', gridColumns: 12 });


    const handleDeleteTodo = (e) => {
        dispatch(delDeadlineTodo(e.id, auth.user.id))
    }

    const handleDeleteAllDeadlinedTodo = (e) => {
        dispatch(delAllDeadlineTodo(auth.user.id))
    }


    useEffect(() => {
        console.log('effect needToUpdateById')
        if (needToUpdateById) {
            console.log(needToUpdateById);
            console.log(reportIdToUpdateById);
            dispatch(getReportById(reportIdToUpdateById));
        }
    }, [needToUpdateById]);


    function deadlinedReport() {
        return (
            <>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button intent="danger" icon="trash" onClick={() => handleDeleteAllDeadlinedTodo()}>Удалить все</Button>
                </div>

                {deadlinedTodosLoading ? (<Spinner />) : (<>
                    {deadlinedTodos.length > 0 ? (
                        <div style={{ marginTop: 20 }}>
                            {deadlinedTodos.map((deadtodo, i) => {
                                return (
                                    <>
                                        <Card className="report-card" style={{ marginTop: 10, borderLeft: 6, borderStyle: 'solid', borderLeftColor: '#A00', borderTop: 0, borderRight: 0, borderBottom: 0 }}>
                                            <p><b>Текст задачи:</b> {deadtodo.text}</p>
                                            <p><b>Имя исполнителя:</b> {deadtodo.userName}</p>
                                            <p><b>Нужно было выполнить до:</b> {moment(deadtodo.completeAt).format('LLL')}</p>
                                            <Button intent="danger" icon="trash" onClick={() => handleDeleteTodo(deadtodo)}>Удалить</Button>
                                        </Card>
                                    </>
                                )
                            })}
                        </div>
                    ) : (<></>)}
                </>)}
            </>
        )
    }

    function ongoingReport() {
        return (
            <>
                {ongoingTodosLoading ? (<Spinner />) : (<>
                    {ongoingTodos.length > 0 ? (
                        <div style={{ marginTop: 20 }}>
                            {ongoingTodos.map((ongoingtodo, i) => {
                                return (
                                    <>
                                        <Card className="report-card" style={{ marginTop: 10, borderLeft: 6, borderStyle: 'solid', borderLeftColor: 'white', borderTop: 0, borderRight: 0, borderBottom: 0 }}>
                                            <p><b>Текст задачи:</b> {ongoingtodo.text}</p>
                                            <p><b>Имя исполнителя:</b> {ongoingtodo.userName}</p>
                                            <p><b>Нужно выполнить до:</b> {moment(ongoingtodo.completeAt).format('LLL')}</p>
                                        </Card>
                                    </>
                                )
                            })}
                        </div>
                    ) : (<></>)}
                </>)}
            </>
        )
    }

    function completedReport() {
        return (
            <>
                {completedTodosLoading ? (<Spinner />) : (<>
                    {completedTodos.length > 0 ? (
                        <div style={{ marginTop: 20 }}>
                            {completedTodos.map((completedtodo, i) => {
                                return (
                                    <>
                                        <Card className="report-card" style={{ marginTop: 10, borderLeft: 6, borderStyle: 'solid', borderLeftColor: 'green', borderTop: 0, borderRight: 0, borderBottom: 0 }}>
                                            <p><b>Текст задачи:</b> {completedtodo.text}</p>
                                            <p><b>Имя исполнителя:</b> {completedtodo.userName}</p>
                                            <p><b>Время выполнения:</b> {moment(completedtodo.completedAt).format('LLL')}</p>
                                        </Card>
                                    </>
                                )
                            })}
                        </div>
                    ) : (<></>)}
                </>)}
            </>
        )
    }

    function renderReport() {
        switch (reportType) {
            case 'deadlined':
                return (
                    <>
                        {deadlinedReport()}
                    </>
                )
            case 'ongoing':
                return (
                    <>
                        {ongoingReport()}
                    </>
                )
            case 'completed':
                return (
                    <>
                        {completedReport()}
                    </>
                )
            default:
                return (<><Spinner /></>);
        }
    }

    function shouldShowArrow(array) {
        let is = false;
        array.map(item => {
            if (item.items.length > 0) {
                is = true;
            }
        })

        return is;
    }

    function renderActiveBrigades() {

        return (
            <>
                {ongoingBrigades.map((brigade, i) => {
                    return (
                        <>
                            <Card style={{ marginTop: 10, borderLeft: 6, borderStyle: 'solid', borderLeftColor: 'green', borderTop: 0, borderRight: 0, borderBottom: 0 }}>
                                <div className="brigade-report-block-dashboard">
                                    Бригада - <b>{brigade.brigadeName}</b><br />
                                    Взята: {moment(brigade.timeStart).format('LLL')}
                                </div>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', }}>
                                    <div style={{ marginLeft: 10, marginRight: 10 }}>Сотрудники: <br />
                                        {brigade.brigadeUsers.map((user, i) => {
                                            return (
                                                <>
                                                    - {user.name}<br />
                                                </>
                                            )
                                        })}
                                    </div>
                                    <div style={{ marginLeft: 10, marginRight: 10 }}>Автомобиль: <br />
                                        {brigade.selectedCarId.number}
                                    </div>

                                    {shouldShowArrow(brigade.firstReport) ? (<>
                                        <div style={{ marginLeft: 10, marginRight: 10, width: '100%', maxWidth: 300 }}>Отсутствуют: <br />
                                            {brigade.firstReport.map((reportObj, i) => {
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
                                    </>) : (<>
                                        <div style={{ marginLeft: 10, marginRight: 10, width: '100%', maxWidth: 300, textAlign: 'center' }}>
                                            <Icon icon="small-tick" intent="success" />
                                        </div>
                                    </>)}


                                    {shouldShowArrow(brigade.secondReport) ? (<>
                                        <div style={{ marginLeft: 10, marginRight: 10, width: '100%', maxWidth: 300 }}>Отсутствуют:<br />
                                            {brigade.secondReport.map((reportObj, i) => {
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
                                    </>) : (<>
                                        <div style={{ marginLeft: 10, marginRight: 10, width: '100%', maxWidth: 300, textAlign: 'center' }}>
                                            <Icon icon="small-tick" intent="success" />
                                        </div>
                                    </>)}







                                    <div style={{ marginLeft: 10, marginRight: 10, width: '100%', maxWidth: 300 }}>Кислород:<br />
                                        {brigade.oxygenReport.map((reportObj, i) => {
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
                                        {brigade.comment}
                                    </div>


                                </div>

                            </Card>
                        </>
                    )
                })}

            </>
        )

    }


    return (
        <div className="content-div">

            <Divider vertical={true} />
            <H3 style={{ textAlign: 'center' }}>Сводка задач</H3>
            <Divider vertical={true} />

            <Container style={{ maxWidth: '100%' }}>
                <Row>
                    <Col xs={3} sm={6} md={3} lg={3} xl={3} xxl={3}>
                        <Card style={{ marginTop: 10, borderLeft: 0, borderTop: 0, borderRight: 0, borderBottom: 0 }}>
                            <H6><a href="#">Просроченные задачи</a></H6>
                            {dashboardLoading ? (<Spinner />) : (<>
                                <p>Кол-во просроченных задач: <span style={{ color: 'red' }}>{todoDeadlinedCount}</span></p>
                                <Button onClick={() => { dispatch(getDeadlinedTodos(auth)); setReportType('deadlined'); setShowReportDrawer(true); }}>Показать просроченные задачи</Button>
                            </>)}
                        </Card>
                    </Col>
                    <Col xs={3} sm={6} md={3} lg={3} xl={3} xxl={3}>
                        <Card style={{ marginTop: 10, borderLeft: 0, borderTop: 0, borderRight: 0, borderBottom: 0 }}>
                            <H6><a href="#">Задачи в работе</a></H6>
                            {dashboardLoading ? (<Spinner />) : (<>
                                <p>Кол-во задач в работе: <span style={{ color: 'white' }}>{todoCount - todoCompletedCount}</span></p>
                                <Button onClick={() => { dispatch(getOngoingTodos(auth)); setReportType('ongoing'); setShowReportDrawer(true); }}>Показать задачи в работе</Button>
                            </>)}
                        </Card>
                    </Col>
                    <Col xs={3} sm={6} md={3} lg={3} xl={3} xxl={3}>
                        <Card style={{ marginTop: 10, borderLeft: 0, borderTop: 0, borderRight: 0, borderBottom: 0 }}>
                            <H6><a href="#">Выполненные задачи</a></H6>
                            {dashboardLoading ? (<Spinner />) : (<>
                                <p>Кол-во выполненных задач: <span style={{ color: 'green' }}>{todoCompletedCount}</span></p>
                                <Button onClick={() => { dispatch(getCompletedTodos(auth)); setReportType('completed'); setShowReportDrawer(true); }}>Показать выполненные задачи</Button>
                            </>)}
                        </Card>
                    </Col>

                </Row>
            </Container>


            <Divider vertical={true} style={{ marginTop: 20 }} />
            <H3 style={{ textAlign: 'center' }}>Укладки</H3>
            <Divider vertical={true} />

            <Container style={{ maxWidth: '100%' }}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Card style={{ marginTop: 10, borderLeft: 6, borderStyle: 'solid', borderLeftColor: '#A00', borderTop: 0, borderRight: 0, borderBottom: 0 }}>

                        </Card>
                    </Col>
                </Row>
            </Container>

            <Divider vertical={true} style={{ marginTop: 20 }} />
            <H3 style={{ textAlign: 'center' }}>Бригады</H3>
            <Divider vertical={true} />

            <Container style={{ maxWidth: '100%' }}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>

                        {ongoingBrigades.length > 0 ? (<>{renderActiveBrigades()}</>) : (<>Нет активных бригад</>)}

                    </Col>
                </Row>
            </Container>

            <Drawer
                className="drawer-report"
                icon="chart"
                onClose={() => setShowReportDrawer(false)}
                title={reportType == 'deadlined' ? (<>Статистика по просроченным задачам</>) : (<>{reportType == 'ongoing' ? (<>Статистика задачам в работе</>) : (<>{reportType == 'completed' ? (<>Статистика по завершенным задачам</>) : (<></>)}</>)}</>)}
                isOpen={showReportDrawer}
                vertical={true}
                position={Position.TOP}
                // size={DrawerSize.STANDARD}
                autoFocus={true}
                canEscapeKeyCloses={true}
                canOutsideClickCloses={true}
                enforceFocuss={true}
                hasBackdrops={true}
            >
                <div>
                    {renderReport()}
                </div>
            </Drawer>

            <AnimateOnChange
                baseClassName="toast-appear"
                animationClassName="toast-appear-anim"
                animate={reportIdToAnimate != null}
                onAnimationEnd={() => { dispatch(clearReportAnimation()); console.log('0000') }}
            >
                <img src="https://hungrygator.ru/toast.png" className="toast-img" />
            </AnimateOnChange>

        </div>
    );
};

const useFetching = (getDashboardInfo, dispatch, auth) => {
    useEffect(() => {
        dispatch(getDashboardInfo(auth));
    }, []);
};

export default CPDashboard;
