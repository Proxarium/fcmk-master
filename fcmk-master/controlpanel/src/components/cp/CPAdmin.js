import React, { Component } from "react";
import { Button, Card, Classes, Elevation, H5, Label, Slider, Switch } from "@blueprintjs/core";
import { connect, useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from 'react-grid-system';

const CPAdmin = () => {
    const dispatch = useDispatch();

    return (
        <div className="content-div">
            <Container style={{ maxWidth: 'none', paddingLeft: 0, paddingRight: 0 }}>

                <Card style={{ marginBottom: 5, padding: 8 }}>
                    <span>..//..</span>
                    <Button style={{ marginLeft: 20 }} small >..//..</Button>
                </Card>

                <Row style={{ marginLeft: 0, marginRight: 0 }}>
                    <div></div>
                </Row>

            </Container>
        </div>
    );
};

export default CPAdmin;
